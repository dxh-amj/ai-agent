"use client";

// Diagonal stripe decorative pattern used across landing sections
export const DecorativeStripes = () => {
  return (
    <>
      {/* Left decorative pattern */}
      <div className="w-3 sm:w-6 md:w-8 lg:w-12 relative overflow-hidden hidden md:block shrink-0 self-stretch">
        <div className="absolute inset-0 flex flex-col" style={{ left: "-58px", top: "-120px" }}>
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={`left-${i}`}
              className="w-[162px] h-4 -rotate-45 origin-top-left border-b border-slate-200/50"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const DecorativeStripesRight = () => {
  return (
    <div className="w-3 sm:w-6 md:w-8 lg:w-12 relative overflow-hidden hidden md:block shrink-0 self-stretch">
      <div className="absolute inset-0 flex flex-col" style={{ left: "-58px", top: "-120px" }}>
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={`right-${i}`}
            className="w-[162px] h-4 -rotate-45 origin-top-left border-b border-slate-200/50"
          />
        ))}
      </div>
    </div>
  );
};
