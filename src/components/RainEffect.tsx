import { useEffect, useState } from "react";

interface RainEffectProps {
  intensity?: "light" | "moderate" | "heavy";
  withLightning?: boolean;
}

const RainEffect = ({ intensity = "moderate", withLightning = false }: RainEffectProps) => {
  const [flash, setFlash] = useState(false);

  const dropCount = intensity === "light" ? 30 : intensity === "moderate" ? 60 : 100;

  useEffect(() => {
    if (!withLightning) return;
    const triggerFlash = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
      // Random next flash between 3-8s
      const next = 3000 + Math.random() * 5000;
      const id = setTimeout(triggerFlash, next);
      return id;
    };
    const id = setTimeout(triggerFlash, 2000 + Math.random() * 3000);
    return () => clearTimeout(id);
  }, [withLightning]);

  return (
    <>
      {/* Lightning flash overlay */}
      {flash && (
        <div className="absolute inset-0 z-20 pointer-events-none rounded-widget"
          style={{ background: "rgba(255,255,255,0.25)" }}
        />
      )}

      {/* Rain drops */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-widget">
        {Array.from({ length: dropCount }).map((_, i) => {
          const left = Math.random() * 110 - 5;
          const delay = Math.random() * 2;
          const duration = 0.5 + Math.random() * 0.5;
          const opacity = 0.15 + Math.random() * 0.25;
          const width = intensity === "heavy" ? 1.5 : 1;
          const height = 12 + Math.random() * 16;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `-${height}px`,
                width: `${width}px`,
                height: `${height}px`,
                background: `rgba(200, 220, 255, ${opacity})`,
                borderRadius: "1px",
                animation: `rain-fall ${duration}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Lightning bolt SVG (shown briefly with flash) */}
      {withLightning && flash && (
        <div className="absolute z-20 pointer-events-none"
          style={{ top: "8%", left: `${35 + Math.random() * 30}%` }}
        >
          <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
            <path
              d="M14 0 L8 24 L16 24 L6 60 L12 32 L4 32 L14 0Z"
              fill="rgba(255,255,220,0.9)"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default RainEffect;
