interface CalendarProps {
  month: string;
  day: string;
  className?: string;
}

export function Calendar({ month, day, className = '' }: CalendarProps) {
  return (
    <div className={`bg-background-default border border-border-strong relative rounded-[6px] shrink-0 size-[40px] overflow-hidden ${className}`}>
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="bg-accent-red flex flex-col items-center justify-center p-[2px] relative shrink-0 w-full">
          <div className="flex flex-col justify-center leading-none relative shrink-0 text-[8px] text-center text-content-strong uppercase w-full font-medium">
            <p className="leading-none">{month}</p>
          </div>
        </div>
        <div className="basis-0 flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
          <div className="basis-0 flex flex-col grow justify-center leading-none min-h-px min-w-px relative shrink-0 text-body-default text-center text-content-strong w-full">
            <p className="leading-[24px]">{day}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
