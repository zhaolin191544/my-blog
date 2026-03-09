"use client";

import { useState } from "react";

enum Language {
  GO = "go",
  JAVASCRIPT = "javascript",
  MARKDOWN = "markdown",
  RUST = "rust",
  SQL = "sql",
  TYPESCRIPT = "typescript",
}

const snippets: Record<Language, string> = {
  [Language.RUST]: `\
use crate::biometrics::Monitor;
use crate::telemetry::Telemetry;

#[derive(Default)]
pub struct Consumables {
    pub v_ox: f32,
    pub v_aq: f32,
    pub delta_ox: f32,
    pub delta_aq: f32,
    pub suit_pressure: usize,
}

pub struct LifeSupport<'t> {
    pub bios: &'t Monitor,
    pub telemetry: &'t Telemetry,
    consumables: Consumables,
}

impl <'t> LifeSupport<'t> {
    pub fn new_with_intruments(bios: &'t Monitor, telemetry: &'t Telemetry) -> Self {
        LifeSupport {
            bios,
            telemetry,
            consumables: Default::default()
        }
    }

    pub fn eva_remaining(&self) -> std::time::Duration {
        const UPSILON: u64 = 41;
        let mut t = std::time::Duration::from_secs(UPSILON);
        t *= (self.consumables.v_ox - self.consumables.delta_ox.powi(4)) as u32;
        t * self.consumables.v_aq.powf(self.consumables.delta_aq).floor() as u32
    }
}`,
  [Language.GO]: `\
package comlink

import (
	"errors"
	"sync"
	"time"
)

const MAX_PROCESS_TIME = 90 * time.Microsecond

type MessageBus[D any] struct {
	mu       sync.Mutex
	updata   []D
	downdata []D
}

func (bus *MessageBus[D]) Drain(sink func(D) error) error {
	timeout := time.After(MAX_PROCESS_TIME)
	result := make(chan error, len(bus.downdata))
	done := make(chan error)

	bus.mu.Lock()
	defer bus.mu.Unlock()

	for i, msg := range bus.downdata {
		go func(i int, msg D) {
			err := sink(msg)
			bus.downdata = append(bus.downdata[:i], bus.downdata[i+1:]...)
			result <- err
		}(i, msg)
	}
	go func() {
		for range len(bus.downdata) {
			if err := <-result; err != nil {
				done <- err
			}
		}
		done <- nil
	}()

	select {
	case <-timeout:
		return errors.New("timed out draining downdata bus")
	case err := <-done:
		return err
	}
}`,
  [Language.JAVASCRIPT]: `\
function shortestPath(source, target) {
  if (!source || !target) return [];
  if (source === target) return [source];

  const queue = [source];
  const visited = { [source]: true };
  const predecessor = {};
  let tail = 0;

  while (tail < queue.length) {
    // Pop vertex off queue
    let last = queue[tail++];
    let neighbors = nodeMap[last];

    if (neighbors) {
      for (let neighbor of neighbors) {
        if (visited[neighbor]) continue;

        visited[neighbor] = true;
        if (neighbor === target) {
          // Check if path is complete. If so, backtrack!
          const path = [neighbor];
          while (last !== source) {
            path.push(last);
            last = predecessor[last];
          }
          path.push(last);
          path.reverse();
          return path;
        }
        predecessor[neighbor] = last;
        queue.push(neighbor);
      }
    }
  }
};`,
  [Language.TYPESCRIPT]: `\
const GRAVITATIONAL_CONSTANT: number = 9.81; // m/s^2
const EARTH_RADIUS: number = 6371; // km

function dynamicPressure(speed: number, altitude: number): number {
    return 0.5 * (speed ** 2);
}

function reentryAngle(
    speed: number,
    azimuth: number,
    altitude: number,
    mass: number,
): number {
    const az = degToRad(azimuth);
    const dp = dynamicPressure(speed, altitude);
    const fc = (speed ** 2) / (EARTH_RADIUS + altitude);
    const fg = GRAVITATIONAL_CONSTANT * mass /
        Math.pow(EARTH_RADIUS + altitude, 2);
    const ft = fc - fg;

    const angle = Math.atan2(dp, ft);
    return radToDeg(angle);
}

const speed = 7800; // m/s, typical re-entry speed
const azimuth = 45; // degrees
const altitude = 120; // km
const mass = 2000; // kg

gimbalEngines(reentryAngle(speed, azimuth, altitude, mass));`,
  [Language.SQL]: `\
-- Summarize largest space missions from Bloc Gamma
WITH gamma_bloc_missions AS (
    SELECT
        m.id,
        m.name AS mission_name,
        m.launch_date,
        s.name AS spacecraft_name,
        COUNT(ma.astronaut_id) AS astronaut_count
    FROM
        missions m
    JOIN
        spacecraft s ON m.spacecraft_id = s.id
    JOIN
        mission_astronauts ma ON m.id = ma.mission_id
    WHERE
        m.launch_date BETWEEN '2029-01-01' AND '2032-12-31'
    GROUP BY
        m.id, m.name, m.launch_date, s.name
    ORDER BY
        astronaut_count DESC,
        m.launch_date DESC
    LIMIT 5
)
SELECT
    mission_name,
    launch_date,
    spacecraft_name,
    astronaut_count
FROM
    gamma_bloc_missions;`,
  [Language.MARKDOWN]: `\
# MISSION REPORT

## SUBJECT: ASTRONAUT'S DISCOVERY ON SATURN'S MOON TITAN

DATE: JULY 20, 2031
MISSION NAME: TITAN EXPLORER I
LEAD ASTRONAUT: COMMANDER JANE DOE

---

## EXECUTIVE SUMMARY

On July 20, 2031, during the Titan Explorer I mission,
Commander Jane Doe made an unprecedented and shocking
discovery on Saturn's moon Titan. This report documents the
significant findings and initial analyses of the geological
features near the landing site.`,
};

export function Editor() {
  const [lang, setLang] = useState<Language>(Language.RUST);

  return (
    <div className="max-w-[1440px] px-11 mx-auto md:px-4 pt-[88px] pb-[88px]">
      <div className="relative w-full max-w-[824px]">
        <select
          className="absolute top-4 right-4 z-[1] bg-carbon text-cement border border-smoke py-1 px-2 font-inherit text-[11px] cursor-pointer"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
        >
          {Object.values(Language).map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <pre
          className="bg-carbon text-cement p-4 min-h-[400px] whitespace-pre overflow-auto text-[13px] leading-[1.5] caret-cement focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
        >
          {snippets[lang]}
        </pre>
      </div>
    </div>
  );
}
