export function FlightBoard() {
  return (
    <pre className="text-[clamp(5px,2.05vw,44px)] leading-[1.27] whitespace-pre mx-auto w-fit">
      {`\u2502 Flight  \u2502 Destination \u2191           \u2502 Departing  \u2502 Gate  \u2502 Status       \u2502`}
      <br />
      {`\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524`}
      <br />
      {`\u2502 LH789   \u2502 EUR Europa 1            \u2502 13:45      \u2502 Z23   \u2502 Delayed      \u2502`}
      <br />
      <span className="animate-[blink_1s_infinite_steps(1)]">
        {`\u2502 XX123   \u2502 KBA Kuiper Alpha        \u2502 08:00      \u2502 22    \u2502 On Time      \u2502`}
      </span>
      <br />
      {`\u2502 AF321   \u2502 MAR Mars Landing        \u2502 09:15      \u2502 12    \u2502 On Time      \u2502`}
      <br />
      {`\u2502 UA567   \u2502 NTK New Tokyo           \u2502 11:20      \u2502 C8    \u2502 Departed     \u2502`}
      <br />
      {`\u2502 QF678   \u2502 ZMB Zvezda Moonbase     \u2502 20:00      \u2502 17    \u2502 On Time      \u2502`}
    </pre>
  );
}
