import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  scale: number;
  opacity: number;
  color: string;
  swayType: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate 24 flower petals with randomized properties
   const petalColors = [
  '#A64420', // Terracotta
  '#C97D3D', // Warm rust-orange
  '#7A2E12', // Deep chocolate-rust
  '#E3B274', // Soft ivory-gold
  '#F0D3A8', // Pale champagne
];

    const initialPetals = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 8}s`,
      scale: 0.5 + Math.random() * 0.7,
      opacity: 0.6 + Math.random() * 0.4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      swayType: Math.floor(Math.random() * 3) + 1,
    }));

    setPetals(initialPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute falling-petal"
          style={{
            top: '-50px',
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            opacity: petal.opacity,
            transform: `scale(${petal.scale})`,
          }}
        >
          {/* Petal SVG drawing */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              fill: petal.color,
              transform: `rotate(${Math.random() * 360}deg)`,
              filter: petal.color.startsWith('#E') || petal.color.startsWith('#C') 
                ? 'drop-shadow(0 0 3px rgba(201,168,76,0.3))' 
                : 'none'
            }}
          >
            {/* Organic leaf/petal path shape */}
            <path d="M12 2C12 2 6 9 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9 12 2 12 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
