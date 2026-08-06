import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundLines = ({
  className,
  children,
  lineColorBlue = "linear-gradient(90deg, transparent 0%, #38bdf8 30%, #818cf8 50%, #38bdf8 70%, transparent 100%)",
  lineColorGreen = "linear-gradient(90deg, transparent 0%, #A34A33 30%, #A34A33 50%, #A34A33 70%, transparent 100%)",
  duration = 5,
}) => {
  const lineWrapperTops = [
    { pos: "top-[15%]", speedOffset: 1.2, delay: 0.2 },
    { pos: "top-[35%]", speedOffset: 0.6, delay: 1.5 },
    { pos: "top-[55%]", speedOffset: -1.8, delay: 0 }, // Center line - runs much faster and carries the live purple agent spark!
    { pos: "top-[75%]", speedOffset: 0.8, delay: 0.8 },
    { pos: "top-[95%]", speedOffset: 1.5, delay: 2.2 },
  ];

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0", className)}>
      <style>{`
        @keyframes lineMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes cornerLineAnimation {
          0% { stroke-dashoffset: 200; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }
      `}</style>

      {/* Grid line overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {lineWrapperTops.map((line, index) => {
          const isCenter = index === 2;
          const currentSpeed = duration + line.speedOffset;
          
          return (
            <div key={index} className={cn("absolute w-full h-1", line.pos)}>
              {/* Horizontal grid guide track */}
              <div className={cn(
                "w-full h-px absolute top-1/2 -translate-y-1/2 transition-colors",
                isCenter ? "bg-orange-500/[0.04]" : "bg-white/[0.03]"
              )} />
              
              {/* The moving glowing spark */}
              <div className="w-full h-0.5 relative overflow-hidden">
                <div
                  className="absolute top-0 w-full h-full"
                  style={{
                    background: isCenter ? lineColorGreen : lineColorBlue,
                    animation: `lineMove ${currentSpeed}s linear infinite`,
                    animationDelay: `${line.delay}s`,
                    animationDirection: index % 2 !== 0 ? "reverse" : "normal",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Corner architectural SVG framing lines */}
      <div className="hidden lg:block absolute inset-0 z-10">
        {/* Left side framing path */}
        <svg
          className="absolute top-[18%] left-[8%] w-[120px] h-[120px] opacity-[0.15]"
          viewBox="0 0 100 100"
          stroke="#38bdf8"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="100"
          style={{
            animation: "cornerLineAnimation 9s linear infinite",
          }}
        >
          <path d="M 100,0 L 20,0 Q 0,0 0,20 L 0,100" />
        </svg>

        {/* Right side framing path (emerald green to represent local compiler approval gate) */}
        <svg
          className="absolute bottom-[22%] right-[8%] w-[120px] h-[120px] opacity-[0.18] transform rotate-180"
          viewBox="0 0 100 100"
          stroke="#10b981"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="100"
          style={{
            animation: "cornerLineAnimation 9s linear infinite",
            animationDelay: "4.5s",
          }}
        >
          <path d="M 100,0 L 20,0 Q 0,0 0,20 L 0,100" />
        </svg>
      </div>

      {children}
    </div>
  );
};
