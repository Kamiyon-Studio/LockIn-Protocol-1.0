interface SensorCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function SensorCard({ label, value, icon }: SensorCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-orange-500">{icon}</div>
      <p className="mt-2 text-center text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
