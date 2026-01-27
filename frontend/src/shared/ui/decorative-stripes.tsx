"use client";

// Diagonal stripe decorative pattern used across landing sections
const STRIPE_COUNT = 200;
const STRIPE_WIDTH = 162;
const STRIPE_HEIGHT = 4;
const LEFT_OFFSET = -58;
const TOP_OFFSET = -120;

export const DecorativeStripes = () => {
  return (
    <>
      {/* Left decorative pattern */}
      <div className="w-3 sm:w-6 md:w-8 lg:w-12 relative overflow-hidden hidden md:block shrink-0 self-stretch">
        <div
          className="absolute inset-0 flex flex-col"
          style={{ left: `${LEFT_OFFSET}px`, top: `${TOP_OFFSET}px` }}
        >
          {Array.from({ length: STRIPE_COUNT }, (_, i) => `left-stripe-${i}`).map((id) => (
            <div
              key={id}
              style={{ width: `${STRIPE_WIDTH}px`, height: `${STRIPE_HEIGHT}px` }}
              className="-rotate-45 origin-top-left border-b border-slate-200/50"
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
      <div
        className="absolute inset-0 flex flex-col"
        style={{ left: `${LEFT_OFFSET}px`, top: `${TOP_OFFSET}px` }}
      >
        {Array.from({ length: STRIPE_COUNT }, (_, i) => `right-stripe-${i}`).map((id) => (
          <div
            key={id}
            style={{ width: `${STRIPE_WIDTH}px`, height: `${STRIPE_HEIGHT}px` }}
            className="-rotate-45 origin-top-left border-b border-slate-200/50"
          />
        ))}
      </div>
    </div>
  );
};
