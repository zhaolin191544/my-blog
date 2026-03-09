import { Header } from "@/src/components/departure/Header";
import { CodeSection } from "@/src/components/departure/CodeSection";
import { Editor } from "@/src/components/departure/Editor";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-stretch text-cement bg-carbon selection:bg-cement selection:text-carbon">
        <CodeSection />
        <Editor />
      </main>
    </>
  );
}
