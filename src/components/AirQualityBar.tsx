const AirQualityBar = () => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="h-1.5 flex-1 rounded-full overflow-hidden flex">
        <div className="w-1/5 bg-green-400" />
        <div className="w-1/5 bg-yellow-400" />
        <div className="w-1/5 bg-orange-400" />
        <div className="w-1/5 bg-red-400" />
        <div className="w-1/5 bg-purple-500" />
      </div>
    </div>
  );
};

export default AirQualityBar;
