import { GlitchTitle } from "@/src/components/home/departure/GlitchTitle";
import { FlightBoard } from "@/src/components/home/departure/FlightBoard";
import { TicketArea } from "@/src/components/home/departure/TicketArea";
import { LetterPrintout } from "@/src/components/home/departure/LetterPrintout";
import { Editor } from "@/src/components/home/departure/Editor";
import { CodeSection } from "@/src/components/home/departure/CodeSection";
import { TerminalDemo } from "@/src/components/home/TerminalDemo";
import FallingText from "@/src/components/home/FallingText";
import { WelcomeContent } from "@/src/components/home/WelcomeContent";
import { StaggerTestimonials } from "@/src/components/home/StaggerTestimonials";
import { LocationPlaceholder } from "@/src/components/home/LocationPlaceholder";
import { LanyardWrapper } from "@/src/components/home/Lanyard/LanyardWrapper";
import { SpotifyPlayer } from "@/src/components/home/SpotifyPlayer";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("navigation");

  return (
    <div className="min-h-screen overflow-x-hidden">
      <LanguageSwitcher />

      {/* ===== SECTION 1: Header ===== */}
      <header className="relative max-w-360 mx-auto px-11 max-[767px]:px-4 pt-25 max-[767px]:pt-17.5">
        <GlitchTitle />
      </header>

      <div className="max-w-360 mx-auto px-11 max-[767px]:px-4">
        {/* ===== SECTION 2: Welcome + Terminal & FallingText ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 mt-22 max-[767px]:mt-11 items-top">
          <WelcomeContent />
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            <TerminalDemo />
            <div className="w-full max-w-lg h-100 max-[767px]:h-75 relative block overflow-visible">
              <FallingText
                text={`frontend football CS_pro poker Vuer DouDou Reacter MY JJY LMY 1223 Kr8s 0x103`}
                highlightWords={["JJY", "DouDou", "LMY", "Kr8s", "0x103"]}
                highlightClass="text-amber italic font-serif"
                trigger="hover"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="2rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
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
        <section className="relative mt-33 max-[767px]:mt-16.5 min-h-150 max-[767px]:min-h-0">
          <div className="absolute top-0 bottom-0 z-0 left-[calc(50%-50vw)] right-[50%] max-[1115px]:right-[45%] max-[767px]:relative max-[767px]:left-0 max-[767px]:right-0 max-[767px]:h-100 max-[767px]:w-screen max-[767px]:-ml-[calc(50vw-50%)]">
            <LanyardWrapper position={[15, 0, 24]} fov={7} />
          </div>

          <div className="relative z-10 grid grid-cols-[40%_50%] h-full pointer-events-none max-[767px]:block max-[767px]:pt-11">
            <div className="max-[767px]:hidden" />
            <div className="relative pointer-events-auto max-[767px]:w-full">
              <img
                src="/assets/highlighter-outline.svg"
                alt=""
                className="absolute hidden md:block w-90 h-130 -rotate-90 -left-25 top-[10%] pointer-events-none"
              />
              <StaggerTestimonials />
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: Flight Board ===== */}
        <section className="mt-33 max-[767px]:mt-16.5 flex justify-center w-full">
          <FlightBoard />
        </section>

        {/* ===== SECTION 5: Location + Ticket ===== */}
        <section className="relative mt-33 max-[767px]:mt-16.5 w-screen left-[calc(50%-50vw)] px-11 max-[767px]:px-4">
          <div className="max-w-360 mx-auto w-full flex flex-col xl:flex-row gap-11 xl:gap-20 items-center justify-between">
            <div className="w-full max-w-70 xl:w-70 shrink-0 xl:-ml-15">
              <LocationPlaceholder />
            </div>
            <div className="w-full flex-1 overflow-visible relative">
              <TicketArea />
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: Letter Printout & Spotify Player ===== */}
        <section className="relative mt-33 max-[767px]:mt-16.5 w-screen left-[calc(50%-50vw)] px-11 max-[767px]:px-4 flex justify-center overflow-visible">
          <div className="w-full max-w-375 flex flex-col xl:flex-row items-center justify-between gap-11 xl:gap-20">
            <div className="w-full xl:flex-1 max-w-275 xl:-ml-10">
              <LetterPrintout />
            </div>
            <div className="w-full max-w-100 shrink-0">
              <SpotifyPlayer />
            </div>
          </div>
        </section>
      </div>

      {/* ===== SECTION 7: Code Section (light background) ===== */}
      <section className="relative mt-33 max-[767px]:mt-16.5 text-carbon bg-white selection:bg-foam selection:text-carbon overflow-visible pb-25 w-full">
        <CodeSection />
      </section>
    </div>
  );
}
