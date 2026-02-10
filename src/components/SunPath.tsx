import { useMemo } from "react";

interface SunPathProps {
  progress: number;
}

const SunPath = ({ progress }: SunPathProps) => {
  const cx = 150, cy = 140, r = 110;
  const startAngle = 170; // bottom-left
  const endAngle = 10;    // bottom-right (going counterclockwise over the top)

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Progress goes from startAngle (170) down through 90 (top) to endAngle (10)
  // We need to go counterclockwise: 170 -> 90 -> 10
  const angleAtProgress = useMemo(() => {
    const span = (startAngle - endAngle + 360) % 360; // 160 degrees
    const angle = startAngle - span * Math.max(0, Math.min(1, progress));
    return angle;
  }, [progress]);

  const pos = useMemo(() => {
    const rad = toRad(angleAtProgress);
    return {
      x: cx + r * Math.cos(rad),
      y: cy - r * Math.sin(rad), // SVG y is inverted
    };
  }, [angleAtProgress]);

  const arcStartPt = {
    x: cx + r * Math.cos(toRad(startAngle)),
    y: cy - r * Math.sin(toRad(startAngle)),
  };
  const arcEndPt = {
    x: cx + r * Math.cos(toRad(endAngle)),
    y: cy - r * Math.sin(toRad(endAngle)),
  };

  // Full arc path (counterclockwise from 170° to 10° over the top = sweep-flag 0 in SVG)
  // Since we go the "short way" over the top (160°), large-arc = 0
  const arcPath = `M ${arcStartPt.x.toFixed(1)} ${arcStartPt.y.toFixed(1)} A ${r} ${r} 0 0 1 ${arcEndPt.x.toFixed(1)} ${arcEndPt.y.toFixed(1)}`;

  // Trail path (portion traversed)
  const trailEnd = {
    x: cx + r * Math.cos(toRad(angleAtProgress)),
    y: cy - r * Math.sin(toRad(angleAtProgress)),
  };
  const trailSpan = startAngle - angleAtProgress;
  const trailLargeArc = trailSpan > 180 ? 1 : 0;
  const trailPath = `M ${arcStartPt.x.toFixed(1)} ${arcStartPt.y.toFixed(1)} A ${r} ${r} 0 ${trailLargeArc} 1 ${trailEnd.x.toFixed(1)} ${trailEnd.y.toFixed(1)}`;

  return (
    <svg
      viewBox="0 10 300 150"
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
      {/* Position marker */}
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
