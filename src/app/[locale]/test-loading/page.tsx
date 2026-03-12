export default async function TestLoadingPage() {
  // 模拟一个 5 秒的超慢网络请求
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa]">
      <h1 className="font-serif text-3xl text-carbon">🎉 加载完成！</h1>
      <p className="mt-4 font-serif text-smoke">
        你刚刚看到的就是我们新做好的 Loading 页面。这个测试页面为了演示，故意强制等待了 5 秒钟。
      </p>
    </div>
  );
}
