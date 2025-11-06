"use client"

export function HeartbeatTriangle() {
  return (
    <div className="heartbeat-triangle">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer triangle - main stroke */}
        <path
          d="M 50 10 L 90 80 L 10 80 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/50"
        />
        {/* Inner glow triangle */}
        <path
          d="M 50 10 L 90 80 L 10 80 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary/20"
          style={{ filter: 'blur(2px)' }}
        />
        {/* Center accent lines */}
        <path
          d="M 50 10 L 50 45"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/30"
        />
      </svg>

      {/* Realistic heartbeat animation with slow rotation */}
      <style jsx>{`
        .heartbeat-triangle {
          animation: heartbeat 1.2s ease-in-out infinite, rotate 40s linear infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          5% {
            transform: scale(1.08);
            opacity: 0.8;
          }
          10% {
            transform: scale(1);
            opacity: 0.5;
          }
          15% {
            transform: scale(1.12);
            opacity: 0.9;
          }
          25% {
            transform: scale(1);
            opacity: 0.5;
          }
          30%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

