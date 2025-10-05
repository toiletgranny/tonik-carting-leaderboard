interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`bg-background-default animate-pulse ${className}`}
    />
  );
}
