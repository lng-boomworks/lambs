interface FlowLinesProps {
  className?: string;
}

const flows = [
  { y: 80, colour: "#264A88", dash: "0", label: "Power" },
  { y: 170, colour: "#7DA0C3", dash: "12 6", label: "Water" },
  { y: 260, colour: "#6CC5EA", dash: "2 6", label: "Gas" },
];

export function FlowLines({ className = "" }: FlowLinesProps) {
  return (
    <svg
      className={`flow-lines ${className}`}
      viewBox="0 0 1200 340"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {flows.map((flow, i) => (
        <g key={flow.label}>
          <line
            x1="0"
            y1={flow.y}
            x2="1200"
            y2={flow.y}
            stroke={flow.colour}
            strokeWidth="2"
            strokeDasharray={flow.dash}
            opacity="0.7"
          />
          <circle
            r="6"
            fill={flow.colour}
            className="flow-lines__pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path={`M0 ${flow.y} L1200 ${flow.y}`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
