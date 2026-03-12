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
    <div className="relative w-full pt-12 overflow-visible">

      <div className="w-full flex flex-col lg:flex-row items-stretch relative z-30">
        
        {/* Left side: bounded to match the max-w-360 layout */}
        <div className="w-full lg:w-[50%] flex justify-end pl-11 pr-11 lg:pr-0 max-[767px]:px-4">
          <div className="w-full max-w-[680px] lg:pr-10">
             <img src="/assets/lily.png" alt="Decoration" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Right side: takes the rest of the screen */}
        <div className="w-full lg:w-[50%] flex flex-col pt-12 lg:pt-0">
          
          <div className="w-full max-w-[680px] pl-11 pr-11 lg:pl-10 lg:pr-11 max-[767px]:px-4 mb-12 lg:mb-16">
            <p className="text-mud text-[16px] xl:text-[20px] whitespace-pre font-bold tracking-widest leading-loose">
              {"\u2591"}
              {"  "}ADD A RETRO FLAVOR
              <br />
              {"\u2591"}
              {"  "}TO YOUR CODE AND
              <br />
              {"\u2591"}
              {"  "}TECHNICAL DOCUMENTATION
            </p>
          </div>

          <div className="w-full max-w-[680px] pl-11 pr-11 lg:pl-10 lg:pr-11 max-[767px]:px-4 mb-12 lg:mb-16 flex justify-start">
            <img
              className="w-75 xl:w-100 pointer-events-none opacity-100 hover:scale-105 transition-transform"
              src="/assets/sql.svg"
              alt="SQL"
            />
          </div>

          {/* 3. Printout: extends to the right edge and bottom! */}
          <div className="w-full flex-grow flex items-end justify-end bg-transparent relative pl-11 max-[767px]:pl-4 lg:pl-10">
            <div className="w-full flex bg-white shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)]">
              <Printout 
                className="w-full h-auto text-carbon block" 
                color="white"
                foreignObjectProps={{ width: 942, height: 648 }}
              >
                <pre
                  className="relative pt-17.5 px-[5%] max-[767px]:px-[4%] max-[767px]:pt-15 max-[767px]:select-none max-[767px]:pointer-events-none font-mono"
                  contentEditable
                  suppressContentEditableWarning
                  spellCheck={false}
                  style={{
                    fontSize: "clamp(12px, 1.2vw, 18px)",
                    lineHeight: "1.7",
                    height: "100%",
                    overflow: "auto",
                    margin: 0
                  }}
                >
                  {missionReport}
                </pre>
              </Printout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
