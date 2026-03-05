export function WeatherCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Seattle, WA</h2>
          <p className="mt-0.5 text-sm text-white/90">Light Rain</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-white">14°</p>
          <p className="mt-1 text-sm text-white/90">H:18° L:10°</p>
        </div>
      </div>
    </div>
  );
}
