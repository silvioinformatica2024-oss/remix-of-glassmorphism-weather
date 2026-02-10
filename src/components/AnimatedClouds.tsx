interface CloudProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const cloudSizes = {
  sm: "w-12 h-6",
  md: "w-20 h-10",
  lg: "w-28 h-14",
};

const Cloud = ({ className = "", size = "md" }: CloudProps) => (
  <div className={`absolute ${cloudSizes[size]} ${className}`}>
    <svg viewBox="0 0 120 60" fill="none" className="w-full h-full drop-shadow-sm">
      {/* Main body */}
      <ellipse cx="60" cy="42" rx="55" ry="16" fill="white" fillOpacity="0.35" />
      {/* Left bump */}
      <ellipse cx="38" cy="30" rx="24" ry="22" fill="white" fillOpacity="0.3" />
      {/* Center bump (tallest) */}
      <ellipse cx="62" cy="24" rx="28" ry="26" fill="white" fillOpacity="0.32" />
      {/* Right bump */}
      <ellipse cx="82" cy="32" rx="20" ry="18" fill="white" fillOpacity="0.28" />
      {/* Top highlight */}
      <ellipse cx="55" cy="20" rx="18" ry="14" fill="white" fillOpacity="0.2" />
    </svg>
  </div>
);

const AnimatedClouds = () => (
  <>
    <Cloud
      size="lg"
      className="top-[15%] -right-4 animate-[drift-slow_18s_ease-in-out_infinite]"
    />
    <Cloud
      size="md"
      className="top-[30%] left-[5%] animate-[drift-med_14s_ease-in-out_infinite_2s]"
    />
    <Cloud
      size="sm"
      className="top-[22%] right-[20%] animate-[drift-fast_10s_ease-in-out_infinite_4s]"
    />
  </>
);

export default AnimatedClouds;
