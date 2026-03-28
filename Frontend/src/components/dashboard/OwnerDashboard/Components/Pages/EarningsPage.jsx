import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import StatCard from "../UI/StatCard";
import CustomTooltip from "../UI/CustomTooltip";
import { earningsData, payoutHistory } from "../../data";

const EarningsPage = ({ totalEarnings, totalBookings }) => (
  <div className="space-y-6">
    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Earnings"   value={`₹${(totalEarnings / 100000).toFixed(1)}L`} sub="All time" accent />
      <StatCard label="This Month"       value="₹26,900"  sub="December 2025" />
      <StatCard label="Avg per Booking"  value={`₹${Math.round(totalEarnings / totalBookings).toLocaleString()}`} sub="Per rental" />
      <StatCard label="Total Payouts"    value="₹1.92L"   sub="Disbursed" />
    </div>

    {/* Bar chart */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-base font-bold text-gray-900 mb-1">Monthly Breakdown</h2>
      <p className="text-xs text-gray-400 mb-6">Earnings vs bookings across 2025</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={earningsData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left"  dataKey="earnings" fill="#16a34a" radius={[6, 6, 0, 0]} name="earnings" />
          <Bar yAxisId="right" dataKey="bookings" fill="#bbf7d0" radius={[6, 6, 0, 0]} name="bookings" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Payout history */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-base font-bold text-gray-900 mb-5">Payout History</h2>
      <div className="space-y-3">
        {payoutHistory.map((p, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-semibold text-gray-900">{p.month}</p>
              <p className="text-xs text-gray-400">Paid on {p.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{p.amount}</p>
              <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EarningsPage;