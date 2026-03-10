"use client";

import { Printout } from "./Printout";

const missionReport = `\
# MISSION REPORT 75X9389                                                              1/17

SUBJECT: ANOMALOUS ENERGY SIGNATURES FROM KERBEROS 5
EARTH DATE: NOV 20, 2057
MISSION DIRECTOR: E. KERNING

---

## OVERVIEW

During the exploration of Kerberos 5, our instruments detected unexplained energy bursts
emanating from the object's polar region. These signatures do not match any known natural
phenomenon and warrant further investigation.

### OBSERVATIONS

Surface Composition Analysis

\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Element/Compound   \u2502 Conc. (ppm)  \u2502 Notes                                      \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Methane (CH\u2084)      \u2502         1450 \u2502 Higher than anticipated                    \u2502
\u2502 Ethane (C\u2082H\u2086)      \u2502          720 \u2502 Consistent with previous observations      \u2502
\u2502 Complex Organics   \u2502          350 \u2502 Potential biological activity              \u2502
\u2502 Water Ice (H\u2082O)    \u2502         2100 \u2502 Abundant, suggesting subsurface ocean      \u2502
\u2502 Tholins            \u2502         1100 \u2502 Common in Kerberos 5's atmosphere          \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

Energy Burst Analysis

a) Frequency: Energy bursts occur at irregular intervals, averaging one event every 37.6
   Earth hours.
b) Duration: Each burst lasts between 3.2 to 8.7 seconds.
c) Energy Output: Estimated at 10^15 joules per event, far exceeding any known geologic
   process for an object of this size.
d) Spectral Analysis: Shows an unusual combination of gamma rays, radio waves, and
   neutrino emissions.

### CHARACTERISTICS

a) Directionality: Energy appears to be focused, rather than omnidirectional.
b) Pattern: While irregular, there are hints of an underlying pattern in the timing of
   the bursts.
c) Origin: Triangulation places the source approximately 5.3 km beneath the surface of
   the polar ice cap.

### HYPOTHESES

a) Natural Phenomenon: Possibly a new form of cryovolcanic activity involving exotic ice
   compositions.
b) Artificial Source: The regularity and energy output could suggest an artificial origin,
   potentially from an unknown civilization.
c) Quantum Fluctuations: Interaction between normal matter and theorized exotic matter in
   Kerberos 5's core.
d) Instrumental Error: While unlikely, we cannot completely rule out malfunction in our
   detection equipment.

### IMPLICATIONS

If confirmed, these energy signatures could represent:
a) A new class of astrophysical phenomena.
b) Evidence of advanced technology or non-terrestrial intelligence.
c) A novel energy source with potential technological applications.

### RECOMMENDATIONS

a) Deploy specialized probes to the polar region for close-range observations.
b) Establish a long-term monitoring station on Kerberos 5.
c) Assemble a multidisciplinary team to analyze the data and develop further hypotheses.
d) Prepare a follow-up mission with equipment designed specifically to study these energy
   signatures.

### SECURITY CONSIDERATIONS

Given the potential implications of this discovery, it is
recommended that this information be classified at the highest level until further analysis
can be conducted.
`;

export function CodeSection() {
  return (
    <div className="relative w-full max-w-[1440px] px-11 mx-auto md:px-4 flex flex-col">
      <img
        className="absolute top-[127px] left-[-505px] max-[1115px]:top-[88px] max-[1115px]:left-[-642px] max-[767px]:left-[-953px]"
        src="/assets/mercury-diagram.svg"
        alt=""
      />
      <img
        className="absolute top-[198px] left-[798px] max-[1115px]:top-[210px] max-[1115px]:left-[618px] max-[767px]:top-[88px] max-[767px]:left-[135px]"
        src="/assets/rust.svg"
        alt=""
      />
      <img
        className="absolute bottom-[-31px] left-[-3px] max-[1115px]:left-[326px] max-[767px]:left-[102px] max-[767px]:bottom-[56px]"
        src="/assets/sql.svg"
        alt=""
      />
      <p className="absolute top-[1199px] left-[798px] w-[182px] text-mud max-[1115px]:top-[1180px] max-[1115px]:left-auto max-[1115px]:right-[176px] max-[767px]:top-[1454px] text-[11px] whitespace-pre">
        {"\u2591"}{"  "}ADD A RETRO FLAVOR
        <br />
        {"\u2591"}{"  "}TO YOUR CODE AND
        <br />
        {"\u2591"}{"  "}TECHNICAL DOCUMENTATION
      </p>
      <Printout
        className="relative mt-[1375px] left-[296px] max-[1115px]:mt-[1316px] max-[1115px]:left-[87px] max-[767px]:left-0 max-[767px]:mt-[1572px] max-[767px]:mb-[320px] light"
        color="grey"
      >
        <pre
          className="relative pt-[88px] px-[44px] max-[767px]:select-none max-[767px]:pointer-events-none"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          style={{
            fontSize: "13.75px",
            maxHeight: "calc(100% - 88px)",
            overflowY: "clip",
          }}
        >
          {missionReport}
        </pre>
      </Printout>
    </div>
  );
}
