"use client"

export function HeartbeatTriangle() {
  // Generate hexagonal pattern coordinates
  const generateHexagons = () => {
    const hexagons = []
    const hexSize = 6
    const hexHeight = hexSize * Math.sqrt(3)
    
    // Create hexagon path
    const createHexPath = (cx: number, cy: number) => {
      const points = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const x = cx + hexSize * Math.cos(angle)
        const y = cy + hexSize * Math.sin(angle)
        points.push(`${x},${y}`)
      }
      return `M ${points.join(' L ')} Z`
    }

    // Generate grid of hexagons within triangle bounds
    for (let row = 0; row < 12; row++) {
      const y = 15 + row * (hexHeight * 0.75)
      const offset = row % 2 === 0 ? 0 : hexSize * 1.5
      
      for (let col = 0; col < 8; col++) {
        const x = 20 + col * (hexSize * 3) + offset
        
        // Check if hexagon is within triangle bounds
        const triangleY = 10 + (x - 50) * (70 / 40)
        if (y > triangleY && y < 75 && x > 15 && x < 85) {
          hexagons.push({
            path: createHexPath(x, y),
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 2
          })
        }
      }
    }
    
    return hexagons
  }

  const hexagons = generateHexagons()

  return (
    <div className="heartbeat-triangle">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for flowing current effect */}
          <linearGradient id="currentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.6;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8">
              <animate
                attributeName="offset"
                values="0;1"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stop-opacity"
                values="0;0.8;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.6;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Radial gradient for energy pulse */}
          <radialGradient id="energyPulse">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>

          {/* Clip path for triangle */}
          <clipPath id="triangleClip">
            <path d="M 50 10 L 90 80 L 10 80 Z" />
          </clipPath>
        </defs>

        {/* Background molecular structure layer */}
        <g clipPath="url(#triangleClip)">
          {/* Hexagonal molecular pattern */}
          {hexagons.map((hex, i) => (
            <g key={i}>
              <path
                d={hex.path}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
                className="molecular-hex"
                style={{
                  opacity: 0.15,
                  animationDelay: `${hex.delay}s`,
                  animationDuration: `${hex.duration}s`
                }}
              />
            </g>
          ))}

          {/* Connection lines between hexagons (nodes) */}
          {hexagons.slice(0, 15).map((hex, i) => (
            <line
              key={`line-${i}`}
              x1={50}
              y1={45}
              x2={20 + (i * 5)}
              y2={20 + (i * 4)}
              stroke="hsl(var(--primary))"
              strokeWidth="0.2"
              className="connection-line"
              style={{
                opacity: 0.1,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}

          {/* Flowing current particles */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              r="0.8"
              fill="hsl(var(--primary))"
              className="current-particle"
              style={{
                animationDelay: `${i * 0.4}s`
              }}
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M 50 10 L 70 55 L 30 55 Z"
                begin={`${i * 0.4}s`}
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
          ))}

          {/* Energy flow lines */}
          <path
            d="M 50 15 L 50 50"
            stroke="url(#currentGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            className="energy-flow"
          />
          <path
            d="M 50 50 L 75 70"
            stroke="url(#currentGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            className="energy-flow"
            style={{ animationDelay: '0.3s' }}
          />
          <path
            d="M 50 50 L 25 70"
            stroke="url(#currentGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            className="energy-flow"
            style={{ animationDelay: '0.6s' }}
          />
        </g>

        {/* Outer triangle - main stroke */}
        <path
          d="M 50 10 L 90 80 L 10 80 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/60"
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

        {/* Central energy node */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="url(#energyPulse)"
          className="energy-node"
        />
        <circle
          cx="50"
          cy="50"
          r="1.5"
          fill="hsl(var(--primary))"
          className="energy-core"
        />
      </svg>

      {/* Enhanced animations */}
      <style jsx>{`
        .heartbeat-triangle {
          animation: heartbeat 1.2s ease-in-out infinite, rotate 40s linear infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          5% {
            transform: scale(1.08);
            opacity: 0.85;
          }
          10% {
            transform: scale(1);
            opacity: 0.6;
          }
          15% {
            transform: scale(1.12);
            opacity: 0.95;
          }
          25% {
            transform: scale(1);
            opacity: 0.6;
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

        .molecular-hex {
          animation: hexPulse 3s ease-in-out infinite;
        }

        @keyframes hexPulse {
          0%, 100% {
            opacity: 0.15;
            stroke-width: 0.3;
          }
          50% {
            opacity: 0.35;
            stroke-width: 0.5;
          }
        }

        .connection-line {
          animation: linePulse 4s ease-in-out infinite;
        }

        @keyframes linePulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .current-particle {
          filter: blur(0.5px);
        }

        .energy-flow {
          animation: flowPulse 2s ease-in-out infinite;
        }

        @keyframes flowPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .energy-node {
          animation: nodePulse 1.5s ease-in-out infinite;
        }

        @keyframes nodePulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        .energy-core {
          animation: corePulse 1.5s ease-in-out infinite;
        }

        @keyframes corePulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

