import { useTranslations } from "next-intl";
import { Printout } from "./Printout";

export function LetterPrintout() {
  const t = useTranslations("letter");

  return (
    <div className="relative">
      <Printout className="text-[16.5px] z-[1] w-full h-auto" color="white" viewBox="0 55 1010 594">
        <pre className="relative top-[-92px] pt-[88px] px-[66px] leading-[24.75px] max-[767px]:px-[30px] max-[767px]:text-[13px]">
          {`\
${t("to_label")}                                ${t("from_label")}
${t("to_name")}                         ${t("from_name")}
${t("to_org")}               ${t("from_org")}
${t("to_addr1")}                ${t("from_addr1")}
${t("to_addr2")}                ${t("from_addr2")}


${t("greeting")}

${t("body_p1")}
`}

          <span className="bg-foam">{t("highlight1")}</span>
          {`
${t("body_p2")}`}
          <span className="bg-foam">
            {t("highlight2")}
          </span>
          <br />
          {t("body_p3")}
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
