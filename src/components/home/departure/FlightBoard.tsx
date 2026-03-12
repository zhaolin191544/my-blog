export function FlightBoard() {
  return (
    <pre className="text-[clamp(5px,2.05vw,44px)] leading-[1.27] whitespace-pre mx-auto w-fit">
      {`\u2502 Flight  \u2502 Destination \u2191           \u2502 Departing  \u2502 Gate  \u2502 Status       \u2502`}
      <br />
      {`\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524`}
      <br />
      {`\u2502 ZL1915  \u2502 NTG NanTong             \u2502 12:06      \u2502 15    \u2502 Delayed      \u2502`}
      <br />
      <span className="animate-[blink_1s_infinite_steps(1)]">
        {`\u2502 JJ1030  \u2502 TZ ZheTao               \u2502 10:30      \u2502 10    \u2502 On Time      \u2502`}
      </span>
      <br />
      {`\u2502 DZ1223  \u2502 SZX ShenZhen            \u2502 20:22      \u2502 C2    \u2502 On Time      \u2502`}
      <br />
      {`\u2502 DR2025  \u2502 KUL Malaysia            \u2502 06:10      \u2502 88    \u2502 On Time      \u2502`}
      <br />
      {`\u2502 USTB11  \u2502 PEK BeiJing             \u2502 16:35      \u2502 12    \u2502 Crashed      \u2502`}
    </pre>
  );
}
