import { Printout } from "./Printout";

export function LetterPrintout() {
  return (
    <div className="relative">
      <Printout className="text-[16.5px] z-[1] w-full h-auto" color="white" viewBox="0 55 1010 594">
        <pre className="relative top-[-92px] pt-[88px] px-[66px] leading-[24.75px] max-[767px]:px-[30px] max-[767px]:text-[13px]">
          {`\
To:                                From:
DR. Z. Lin                         PROFESSOR S. W. XIAOXIANGZI
数字冥界 华南服务集群               HM 数字灵魂研究所
1223 FeetUnder #507                88 JISUW SB
Shen Zhen, SZ 43589                NEW Mexico, NM 15507


亲爱的Lin,

有一个好消息!我找到了把你从那个待业失业烦恼中解救出来的办法了,虽然我知道你还在盯着
localhost:3000想为什么别人访问不了。别再折腾那些做给活人看的组件库了，
我给你找到了一份永生级别的差事。

`}
        
          <span className="bg-foam">"数字冥界"的南山分区目前出现了不知原因的大范围逻辑坍塌</span>
          {`
我们猜测是由于新一代人的意识过于复杂，我们的v18渲染引擎
还有果萍的引擎都出现了大规模的内存泄漏。`}
          <span className="bg-foam">
            你的首要目标如下：
          </span>
          <br />
          {`那些清朝出生的老祖宗们在虚拟社区里抱怨 UI 太过“现代化”，导致
他们出现了严重的认知失衡（一种由于无法理解 Flexbox 布局
导致的灵魂崩溃）。我们需要你用 Next.js 72.0 重新编写一套“复古模式”的渲染层，确保他们在虚拟世界
里的生活能丝滑顺畅。冥界里有些激进派开发者把系统的 Theme-Provider 搞坏了，导致现在数百万个灵魂
正生活在白茫茫的“高亮模式”下。你必须在下月 15 日前修复这个该死的亮度问题，否则我们就得面对一场真正的“代码暴乱”。
好消息是：这份工作只需要你的意识接入。你的肉体可以舒舒服服地躺在南通老家的摇椅上喝着三得利乌龙茶

随信附上的是《意识维保协议》和最新的 Git 提交规范。记住，严禁在冥界代码中使用内联样式——哪怕是死
人，也有审美追求。时间定于下月 15 日。我会为你准备好最纯净的服务器带宽。记得带上你的机械键盘，这里只有触控虚拟键，手感烂透了。
            顺颂商祺，愿你的灵魂永不 404。`}
        </pre>
      </Printout>
      <img
        className="absolute w-85 z-[1] top-0 right-[70px] max-[1115px]:right-[-50px]  max-[1023px]:hidden"
        src="/assets/evidence.jpg"
        alt=""
      />
      <img
        className="absolute z-[1] top-[-14px] right-[100px] max-[1115px]:right-[-120px] max-[1023px]:hidden"
        src="/assets/paperclip.svg"
        alt=""
      />
    </div>
  );
}
