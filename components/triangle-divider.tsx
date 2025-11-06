"use client"

import { HeartbeatTriangle } from "./heartbeat-triangle"

export function TriangleDivider() {
  return (
    <section className="flex min-h-[40vh] w-screen shrink-0 snap-start items-center justify-center py-16 sm:py-20 md:py-24">
      <div className="flex items-center justify-center">
        <div className="h-[200px] w-[200px] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px]">
          <HeartbeatTriangle />
        </div>
      </div>
    </section>
  )
}
