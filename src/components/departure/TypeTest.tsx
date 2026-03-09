"use client";

type TypeSampleProps = {
  className?: string;
  style?: React.CSSProperties;
  copy: string;
  size: number;
  tracking?: number;
};

const SAMPLES: TypeSampleProps[] = [
  {
    className: "hidden-small",
    copy: "ATTN: PASSENGERS QUIET IN THE CABIN",
    size: 121,
    tracking: -11,
    style: { gap: "3px", lineHeight: 1 },
  },
  {
    copy: "FLIGHT ATTENDANTS, PREPARE FOR TAKEOFF",
    size: 55,
    tracking: -5,
    style: { gap: "13px", lineHeight: 1 },
  },
  {
    copy: "DEPARTURE MONO IS A MONOSPACED PIXEL FONT INSPIRED BY THE CONSTRAINTS OF EARLY COMMAND-LINE AND GRAPHICAL USER INTERFACES, THE TINY PIXEL FONTS OF THE LATE 90s/EARLY 00s, AND SCI-FI CONCEPTS FROM FILM AND TELEVISION.",
    size: 22,
    style: { gap: "15px", maxWidth: "1124px" },
  },
  {
    copy: "Departure Mono is a monospaced pixel font inspired by the constraints of early command-line and graphical user interfaces, the tiny pixel fonts of the late 90s/early 00s, and sci-fi concepts from film and television.",
    size: 16.5,
    style: { gap: "16px", maxWidth: "895px" },
  },
];

function TypeSample({ className, style, copy, size, tracking }: TypeSampleProps) {
  return (
    <div
      className={`flex flex-col ${className === "hidden-small" ? "max-[767px]:hidden" : className ?? ""}`}
      style={style}
    >
      <div className="flex items-center gap-[55px] text-clay">
        <span>DEPARTURE MONO</span>
        <span>{size}PX</span>
        {tracking ? <span>{tracking}PX TRACK</span> : null}
      </div>
      <div
        className="[color-scheme:light] resize-none border-none text-inherit bg-transparent font-inherit w-full focus-visible:text-enamel focus-visible:bg-dark focus-visible:outline-none"
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        style={{
          fontSize: `${size}px`,
          ...(tracking ? { letterSpacing: `${tracking}px` } : {}),
        }}
      >
        {copy}
      </div>
    </div>
  );
}

export function TypeTest() {
  return (
    <div className="flex flex-col gap-[66px]">
      {SAMPLES.map((props, i) => (
        <TypeSample key={i} {...props} />
      ))}
    </div>
  );
}
