interface FlowLinesProps {
  className?: string;
}

const WIDTH = 1200;

function sinePath(y: number, amplitude: number, wavelength: number, width = WIDTH, step = 10) {
  const points: string[] = [];
  for (let x = 0; x <= width; x += step) {
    const dy = Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    points.push(`${x.toFixed(1)},${(y + dy).toFixed(2)}`);
  }
  return "M" + points.join(" L");
}

// Power — smooth rolling AC-style wave, longer wavelength, gentler amplitude
const POWER_PATH = sinePath(80, 16, 260);
// Water — slow rolling wave, long wavelength, softer amplitude
const WATER_PATH = sinePath(170, 16, 320);

// Power photons chase each other along the wave
const POWER_PHOTONS = [0, -1.4, -2.8].map((begin) => ({ begin, dur: 4.2 }));

// Gas particles — drift up and to the right at varying speeds
const GAS_PARTICLES = [
  { x: 70, y: 262, dx: 34, dy: -18, delay: 0, dur: 5.4, r: 5 },
  { x: 180, y: 268, dx: 46, dy: -14, delay: 1.2, dur: 6.2, r: 4.2 },
  { x: 300, y: 256, dx: 28, dy: -20, delay: 0.5, dur: 5.8, r: 5.6 },
  { x: 430, y: 264, dx: 38, dy: -12, delay: 1.9, dur: 5.2, r: 4.6 },
  { x: 560, y: 258, dx: 32, dy: -22, delay: 0.8, dur: 6.4, r: 5.2 },
  { x: 690, y: 266, dx: 48, dy: -16, delay: 0.2, dur: 5.6, r: 4.4 },
  { x: 820, y: 256, dx: 30, dy: -18, delay: 1.6, dur: 5, r: 5.4 },
  { x: 950, y: 262, dx: 40, dy: -14, delay: 0.9, dur: 6, r: 4.6 },
  { x: 1080, y: 258, dx: 34, dy: -20, delay: 1.4, dur: 5.8, r: 5 },
];

export function FlowLines({ className = "" }: FlowLinesProps) {
  return (
    <svg
      className={`flow-lines ${className}`}
      viewBox={`0 0 ${WIDTH} 340`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gas-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Power — navy rolling sine wave with fast photon stream */}
      <path
        id="flow-power-path"
        d={POWER_PATH}
        fill="none"
        stroke="#264A88"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {POWER_PHOTONS.map((p, i) => (
        <circle key={`p${i}`} r="5" fill="#264A88" filter="url(#flow-glow)">
          <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite">
            <mpath href="#flow-power-path" />
          </animateMotion>
        </circle>
      ))}

      {/* Water — mid-blue gentle rolling wave with slow drifting dot */}
      <path
        id="flow-water-path"
        d={WATER_PATH}
        fill="none"
        stroke="#7DA0C3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="10 6"
        opacity="0.65"
      />
      <circle r="6" fill="#7DA0C3" filter="url(#flow-glow)">
        <animateMotion dur="9s" repeatCount="indefinite">
          <mpath href="#flow-water-path" />
        </animateMotion>
      </circle>

      {/* Gas — cyan vapour particles drifting up and across via native SVG animations */}
      <g filter="url(#gas-blur)" aria-hidden="true">
        {GAS_PARTICLES.map((p, i) => {
          const x1 = p.x + p.dx;
          const y1 = p.y + p.dy;
          const x2 = p.x + p.dx * 1.8;
          const y2 = p.y + p.dy * 0.4;
          const dur = `${p.dur}s`;
          const begin = `${p.delay}s`;
          return (
            <g key={`g${i}`}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`${p.x},${p.y}; ${x1},${y1}; ${x2},${y2}`}
                keyTimes="0;0.5;1"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
              <circle r="0" fill="#6CC5EA">
                <animate
                  attributeName="r"
                  values={`0;${p.r};${(p.r * 1.2).toFixed(2)};0`}
                  keyTimes="0;0.2;0.6;1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.85;0.95;0.3;0"
                  keyTimes="0;0.15;0.5;0.85;1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
