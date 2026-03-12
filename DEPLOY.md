# 🚀 博客部署指南 (Vercel + Supabase + Cloudflare)

这份指南将手把手教你如何使用最现代、最省心的 Serverless 架构来部署你的 Next.js 全栈博客。这套方案不仅基本上免费，而且维护成本极低。

## 架构概览

- **前端 & API 服务端点**: [Vercel](https://vercel.com) (自动 CI/CD，全球边缘 CDN，极速响应)
- **数据库 (PostgreSQL)**: [Supabase](https://supabase.com) (免费的 Serverless Postgres 数据库)
- **域名解析 & 代理**: [Cloudflare](https://www.cloudflare.com) (顶级 DNS 解析，安全防护)

---

## 步骤一：准备你的代码

确保你的代码已经完整提交到了 GitHub（或 GitLab / Bitbucket）。
Vercel 将通过读取你的 Git 仓库来实现“一键推送，自动部署”。

## 步骤二：配置 Supabase 数据库

1. 登录 [Supabase](https://database.new) 并点击 **New Project** 创建一个新项目。
2. 填写项目名称和数据库密码（**务必记住并且保存好这个密码**），选择一个离你目标受众最近的节点（比如新加坡、日本或美西）。
3. 等待数据库初始化完成（大约需要 2-3 分钟）。
4. 进入项目的 **Project Settings -> Database** 选项卡。
5. 向下滚动找到 **Connection string** (连接字符串) 部分，选择 **URI** 选项卡。
6. 对于使用 Prisma 的 Next.js 项目，强烈建议配置连接池，你需要获取两个 URL：
   - **Transaction Pooler URL** (端口通常是 `6543`，带有 `?pgbouncer=true`)：作为运行时的 `DATABASE_URL`
   - **Direct connection URL** (端口通常是 `5432`，直连数据库)：作为用于执行数据库迁移的 `DIRECT_URL`
   *(复制出来后，请手动将字符串里的 `[YOUR-PASSWORD]` 替换成你刚才设置的数据库密码)*

*注意：确保你的项目 `prisma/schema.prisma` 中的 `datasource` 块是这样配置的，以支持这两种 URL：*
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## 步骤三：同步数据库结构 (本地操作)

在将项目推送到 Vercel 之前，我们需要先把本地的 Prisma 数据表结构推送到 Supabase 中。

1. 在你本地项目的根目录创建或修改 `.env` 文件（**这个文件不要提交到 Git！**），填入你刚才在 Supabase 获取的连接串：
   ```env
   DATABASE_URL="postgresql://postgres.[你的项目ID]:[密码]@aws-0-[区域].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[你的项目ID]:[密码]@aws-0-[区域].pooler.supabase.com:5432/postgres"
   ```
2. 运行 Prisma 的推送命令，将表结构自动生成到远端数据库：
   ```bash
   npx prisma db push
   # 或者，如果你在这个项目中使用的是 migrate 流程：
   # npx prisma migrate deploy
   ```

## 步骤四：在 Vercel 部署应用

1. 登录 [Vercel 控制台](https://vercel.com) 并点击 **Add New... -> Project**。
2. 授权关联你的 GitHub 账号，并在列表中找到你的博客仓库点击 **Import**。
3. 在配置页面 (Configure Project)：
   - **Framework Preset**: Vercel 应该会自动识别为 **Next.js**。
   - **Build and Output Settings**: 保持默认即可（Vercel 会根据你的 `package-lock.json` 或 `bun.lock` 自动执行构建命令，并在过程中自动触发 `prisma generate`）。
   - **Environment Variables** (环境变量) **【极度重要】**：
     在这里展开面板，把你本地 `.env` 文件里的所有环境变量一条条加进去。包括：
     - `DATABASE_URL`
     - `DIRECT_URL`
     - 邮箱 SMTP 相关的配置（你用来发送留言通知的账号密码等）
     - JWT_SECRET 或任何身份验证相关的密钥
4. 确认无误后点击 **Deploy**，等待约 2-3 分钟。Vercel 会自动为你打包、部署并分配一个类似于 `xxx.vercel.app` 的临时域名。
5. 点击访问该临时域名，进入后台或者留言板测试一下，检查网站 UI 是否正常渲染，以及数据库是否能正常读写。

## 步骤五：绑定自定义域名 (通过 Cloudflare)

1. 在 Vercel 的项目控制面板中，点击顶部的 **Settings** 选项卡，在左侧选择 **Domains**。
2. 输入你自己的域名（例如 `linblog.com` 或 `www.linblog.com`），点击 **Add**。
3. Vercel 会检测域名的当前状态，并提示你需要去 DNS 提供商处添加一条 **CNAME 记录** 或 **A 记录**。
   - 典型情况：它会要求你添加一条 `CNAME`，主机记录为 `www` 或 `@`，记录值指向 `cname.vercel-dns.com`。
4. 打开你的 **Cloudflare** 控制台，进入对应域名的 **DNS -> Records (记录)** 页面。
5. 点击 **Add record (添加记录)**，按照 Vercel 给出的要求填入。
6. **【避坑指南：小黄云 (Proxy) 的状态】**：
   - **强烈建议先关闭代理 (DNS only / 灰色云)**。在 Cloudflare 中添加记录时，先把那个橘黄色的小云朵点成灰色的 `DNS only`。
   - 原因是 Vercel 自身在全球就拥有极快的边缘网络，并且它需要验证域名的 DNS 来为你**自动签发免费的 SSL/HTTPS 证书**。如果直接开启 Cloudflare 的 Proxy（橙色云），会导致 Vercel 无法完成证书验证，甚至引发无尽的重定向循环 (ERR_TOO_MANY_REDIRECTS)。
   - **进阶操作**：当 Vercel 端显示域名配置成功，且颁发了有效的 SSL 证书后，如果你依然想要享受 Cloudflare 的 WAF 防护或特定的缓存策略，你可以随时回到 Cloudflare 把小云朵点亮（变为 Proxied）。但请务必记住：一旦点亮橙色云，请去 Cloudflare 的 **SSL/TLS** 设置中，将加密模式改为 **Full (strict)**，以防冲突。
7. 保存 DNS 记录，回到 Vercel 页面。通常在 1-5 分钟内，Vercel 就会检测到解析生效，变成蓝色的对号。

## 🎉 部署大功告成！

这就是现代 Serverless 部署的魅力。以后你只需要专注于写作和写代码：
每次你在本地完成修改并 `git push` 到 GitHub 的主分支，Vercel 就会静默在后台拉取最新代码、打包发布，并在几分钟后让你的最新博客呈现在全世界面前。

祝你的博客顺利上线！
