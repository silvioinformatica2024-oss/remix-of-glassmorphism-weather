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
    <svg viewBox="0 0 100 50" fill="none" className="w-full h-full">
      <ellipse cx="50" cy="35" rx="45" ry="15" fill="white" fillOpacity="0.25" />
      <ellipse cx="35" cy="28" rx="22" ry="18" fill="white" fillOpacity="0.2" />
      <ellipse cx="60" cy="25" rx="25" ry="20" fill="white" fillOpacity="0.22" />
      <ellipse cx="48" cy="22" rx="18" ry="15" fill="white" fillOpacity="0.18" />
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
