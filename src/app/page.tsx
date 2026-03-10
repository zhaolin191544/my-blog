import { GlitchTitle } from "@/src/components/departure/GlitchTitle";
import { FlightBoard } from "@/src/components/departure/FlightBoard";
import { TicketArea } from "@/src/components/departure/TicketArea";
import { LetterPrintout } from "@/src/components/departure/LetterPrintout";
import { Editor } from "@/src/components/departure/Editor";
import { CodeSection } from "@/src/components/departure/CodeSection";
import { TerminalDemo } from "@/src/components/TerminalDemo";
import { StaggeredMenu } from "@/src/components/StaggeredMenu/StaggeredMenu";
import { WelcomeContent } from "@/src/components/WelcomeContent";
import { StaggerTestimonials } from "@/src/components/StaggerTestimonials";
import { LocationPlaceholder } from "@/src/components/LocationPlaceholder";
import { LanyardWrapper } from "@/src/components/Lanyard/LanyardWrapper";
import { SpotifyPlayer } from "@/src/components/SpotifyPlayer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <StaggeredMenu
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ]}
        socialItems={[
          { label: "GitHub", href: "https://github.com" },
          { label: "Twitter", href: "https://twitter.com" },
        ]}
        position="right"
        accentColor="#ffa133"
        colors={["#bccabb", "#ffa133"]}
      />

      {/* ===== SECTION 1: Header ===== */}
      <header className="relative max-w-360 mx-auto px-11 max-[767px]:px-4 pt-[100px] max-[767px]:pt-[70px]">
        <GlitchTitle />
      </header>

      <div className="max-w-360 mx-auto px-11 max-[767px]:px-4">
        {/* ===== SECTION 2: Welcome + Terminal ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-22 max-[767px]:mt-11 items-center">
          <WelcomeContent />
          <div className="flex justify-center">
            <TerminalDemo />
          </div>
        </section>

        {/*<section className="relative mt-33 max-[767px]:mt-16.5">
          <div className="relative grid grid-cols-[600px_1fr] gap-22 max-[1115px]:grid-cols-[300px_1fr] max-[1115px]:gap-11 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-11">
            <div className="h-150 max-[767px]:h-100">
              <LanyardWrapper position={[0, 0, 24]} fov={10} />
            </div>
            <div className="relative">
              <LetterPrintout />
            </div>
          </div>
        </section>*/}
        {/* ===== SECTION 3: Lanyard + Testimonials ===== */}
        <section className="relative mt-[132px] max-[767px]:mt-[66px] min-h-[600px] max-[767px]:min-h-0">
          <div className="absolute top-0 bottom-0 z-0 left-[calc(50%-50vw)] right-[50%] max-[1115px]:right-[45%] max-[767px]:relative max-[767px]:left-0 max-[767px]:right-0 max-[767px]:h-[400px] max-[767px]:w-[100vw] max-[767px]:-ml-[calc(50vw-50%)]">
            <LanyardWrapper position={[15, 0, 24]} fov={7} />
          </div>

          <div className="relative z-10 grid grid-cols-[40%_50%] h-full pointer-events-none max-[767px]:block max-[767px]:pt-11">
            <div className="max-[767px]:hidden" />
            <div className="relative pointer-events-auto max-[767px]:w-full">
              <img 
                src="/assets/highlighter-outline.svg" 
                alt="" 
                className="absolute hidden md:block w-90 h-130 -rotate-90 -left-[100px] top-[10%] pointer-events-none" 
              />
              <StaggerTestimonials />
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: Flight Board ===== */}
        <section className="mt-[132px] max-[767px]:mt-[66px] flex justify-center w-full">
          <FlightBoard />
        </section>

        {/* ===== SECTION 5: Location + Ticket ===== */}
        <section className="relative mt-[132px] max-[767px]:mt-[66px] w-[100vw] left-[calc(50%-50vw)] px-11 max-[767px]:px-4">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col xl:flex-row gap-11 xl:gap-20 items-center justify-between">
            <div className="w-full max-w-[280px] xl:w-[280px] flex-shrink-0 xl:-ml-[60px]">
              <LocationPlaceholder />
            </div>
            <div className="w-full flex-1 overflow-visible relative">
              <TicketArea />
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: Letter Printout & Spotify Player ===== */}
        <section className="relative mt-[132px] max-[767px]:mt-[66px] w-[100vw] left-[calc(50%-50vw)] px-11 max-[767px]:px-4 flex justify-center overflow-visible">
          <div className="w-full max-w-[1500px] flex flex-col xl:flex-row items-center justify-between gap-11 xl:gap-20">
            <div className="w-full xl:flex-1 max-w-[1100px] xl:-ml-[40px]">
              <LetterPrintout />
            </div>
            <div className="w-full max-w-[400px] flex-shrink-0">
              <SpotifyPlayer />
            </div>
          </div>
        </section>
      </div>

      {/* ===== SECTION 7: Code Section (dark background) ===== */}
      <section className="mt-[132px] max-[767px]:mt-[66px] text-cement bg-carbon selection:bg-cement selection:text-carbon overflow-hidden">
        <CodeSection />
        {/* <div className="max-w-[1440px] px-11 mx-auto max-[767px]:px-4 pt-[88px] pb-[88px]">
          <Editor />
        </div> */}
      </section>
    </div>
  );
}
