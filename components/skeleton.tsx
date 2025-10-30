"use client"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-foreground/5 ${className}`}
      aria-hidden="true"
    />
  )
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[4/3]">
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  )
}

export function MembershipCardSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-4 rounded-xl border border-primary/20 bg-card/60 p-5">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-8 w-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}

