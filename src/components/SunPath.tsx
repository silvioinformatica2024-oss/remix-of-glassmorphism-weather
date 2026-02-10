import { useMemo } from "react";

interface SunPathProps {
  progress: number;
}

const SunPath = ({ progress }: SunPathProps) => {
  // Semicircular arc matching reference: starts bottom-right, arcs up-left, ends bottom-left
  // Using a circular arc centered at (200, 150) with radius 120
  // Arc goes from ~200deg to ~340deg (right-bottom sweeping up and over)
  const cx = 200, cy = 150, r = 120;
  const startAngle = 200; // degrees
  const endAngle = 340;

  const angleAtProgress = startAngle + (endAngle - startAngle) * Math.max(0, Math.min(1, progress));

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const pos = useMemo(() => {
    const rad = toRad(angleAtProgress);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }, [angleAtProgress]);

  // Build the arc path
  const arcStart = {
    x: cx + r * Math.cos(toRad(startAngle)),
    y: cy + r * Math.sin(toRad(startAngle)),
  };
  const arcEnd = {
    x: cx + r * Math.cos(toRad(endAngle)),
    y: cy + r * Math.sin(toRad(endAngle)),
  };

  // SVG arc: large arc flag = 1 since we span > 180deg (140deg, so 0), sweep = 0 (counterclockwise)
  const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
  const arcPath = `M ${arcStart.x.toFixed(1)} ${arcStart.y.toFixed(1)} A ${r} ${r} 0 ${largeArc} 0 ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}`;

  // Trail path (portion traversed)
  const trailEnd = {
    x: cx + r * Math.cos(toRad(angleAtProgress)),
    y: cy + r * Math.sin(toRad(angleAtProgress)),
  };
  const trailLargeArc = (angleAtProgress - startAngle) > 180 ? 1 : 0;
  const trailPath = `M ${arcStart.x.toFixed(1)} ${arcStart.y.toFixed(1)} A ${r} ${r} 0 ${trailLargeArc} 0 ${trailEnd.x.toFixed(1)} ${trailEnd.y.toFixed(1)}`;

  return (
    <svg
      viewBox="40 0 240 170"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Full dashed arc */}
      <path
        d={arcPath}
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        fill="none"
      />
      {/* Traversed trail */}
      {progress > 0.01 && (
        <path
          d={trailPath}
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          fill="none"
          className="transition-all duration-700"
        />
      )}
      {/* Position marker - neutral frosted dot */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r="8"
        fill="white"
        fillOpacity="0.15"
        className="transition-all duration-700"
      />
      <circle
        cx={pos.x}
        cy={pos.y}
        r="5"
        fill="white"
        fillOpacity="0.45"
        className="transition-all duration-700"
      />
    </svg>
  );
};

export default SunPath;
