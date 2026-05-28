interface StatCardProps {
  label: string
  value: string | number
  trend?: string
  trendPositive?: boolean
}

export default function StatCard({ label, value, trend, trendPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p
          className={`mt-1 text-sm font-medium ${
            trendPositive ? 'text-[#1D9E75]' : 'text-red-500'
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  )
}
