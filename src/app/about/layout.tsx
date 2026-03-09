import GenerativeTreeBg from "../../components/GenerativeTreeBg";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GenerativeTreeBg init={5} len={5} strokeStyle="#00000020" />
        {children}
      </body>
    </html>
  );
}
