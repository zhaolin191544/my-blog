import { Printout } from "./Printout";

export function LetterPrintout() {
  return (
    <div className="relative">
      <Printout className="text-[16.5px] z-[1] w-full h-auto" color="white" viewBox="0 55 1010 594">
        <pre className="relative top-[-92px] pt-[88px] px-[66px] leading-[24.75px] max-[767px]:px-[30px] max-[767px]:text-[13px]">
          {`\
To:                                     From:
DR. E. KERNING                          PROFESSOR H. J. FARNSWORTH
MERCURY RESEARCH LABS                   FARNSWORTH INSTITUTE
3572 WILSHIRE BLVD #9732                88 ESSEX ST
LOS ANGELES, CA 90010                   NEW NEW YORK, NY 10002



Dear Dr. Kerning,

I trust this message finds you in good spirits. I am pleased to brief
you on `}
          <span className="bg-foam">this critical scientific venture</span>
          {` at the far reaches of our
solar system. Your groundbreaking research and expertise in
exoplanetary ecosystems uniquely qualifies you for this endeavor.

`}
          <span className="bg-foam">
            Your primary objective will be to investigate an anomaly detected in
          </span>
          <br />
          <span className="bg-foam">the Kuiper belt.</span>
          {` Initial readings suggest the presence of amino acids
near newly discovered KBOs. Your team will deploy specialized
equipment to collect data and analyze the phenomenon.

Please ensure all preparations are completed according to the attached
mission protocols. We would appreciate your prompt assessment of the
included candidate profiles. Departure is set from Earth's orbit on
the 15th of next month.

I have full confidence in your ability to navigate the challenges of
this mission with scientific rigor and ethical consideration. Your
discoveries may unlock new chapters in our understanding of
extraterrestrial life.

Best regards,
Professor Hubert J. Farnsworth
Founder, Farnsworth Institute
            `}
        </pre>
      </Printout>
      <img
        className="absolute z-[1] top-0 right-[70px] max-[1115px]:right-[-50px] max-[1023px]:hidden"
        src="/assets/newspaper-clipping.svg"
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
