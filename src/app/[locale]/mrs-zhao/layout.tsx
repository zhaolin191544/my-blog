import GenerativeTreeBg from "@/src/components/GenerativeTreeBg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GenerativeTreeBg init={5} len={5} strokeStyle="#00000020" />
      {children}
    </>
  );
}
