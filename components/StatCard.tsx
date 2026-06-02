interface StatCardProps {
  label: string
  value: string | number
  trend?: string
  trendPositive?: boolean
}

export default function StatCard({ label, value, trend, trendPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide truncate">
        {label}
      </p>
      <p className="mt-1 text-xl md:text-3xl font-bold text-gray-900 truncate">{value}</p>
      {trend && (
        <p
          className={`mt-0.5 text-xs font-medium truncate ${
            trendPositive ? 'text-[#1D9E75]' : 'text-red-500'
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  )
}
