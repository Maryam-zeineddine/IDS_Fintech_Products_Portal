interface StatCardProps {
    label: string;
    value: number | string;
}

export default function StatCard({label, value}: StatCardProps) {
    return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}