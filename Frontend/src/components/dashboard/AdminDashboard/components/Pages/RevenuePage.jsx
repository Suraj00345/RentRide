import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import StatCard      from "../UI/StatCard";
import CustomTooltip from "../UI/CustomTooltip";
import { revenueData } from "../../data";

const RevenuePage = ({ stats }) => {
  const avgMonthly = Math.round(
    revenueData.reduce((s, d) => s + d.revenue, 0) / revenueData.length
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Annual Revenue"    value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}    sub="Jan–Dec 2025" accent trend={14} />
        <StatCard label="Total Commission"  value={`₹${(stats.totalCommission / 100000).toFixed(1)}L`} sub="10% per booking" trend={14} />
        <StatCard label="Avg Monthly Rev"   value={`₹${(avgMonthly / 1000).toFixed(0)}k`}            sub="Per month" />
        <StatCard label="Total Bookings"    value={stats.totalBookings}                                sub="Platform-wide" />
      </div>

      {/* Grouped bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">Revenue vs Commission</h2>
        <p className="text-xs text-gray-400 mb-6">Monthly breakdown — full year 2025</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left"  dataKey="revenue"    fill="#16a34a" radius={[5, 5, 0, 0]} name="revenue" />
            <Bar yAxisId="right" dataKey="commission" fill="#bbf7d0" radius={[5, 5, 0, 0]} name="commission" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly revenue table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">Monthly Revenue Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Month</th>
                <th className="text-right pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Revenue</th>
                <th className="text-right pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Commission</th>
                <th className="text-right pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Bookings</th>
                <th className="text-right pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Avg/Booking</th>
              </tr>
            </thead>
            <tbody>
              {[...revenueData].reverse().map((row) => (
                <tr key={row.month} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-3 font-semibold text-gray-900">{row.month} 2025</td>
                  <td className="py-3 text-right text-gray-900 font-semibold">₹{row.revenue.toLocaleString()}</td>
                  <td className="py-3 text-right text-green-700 font-semibold">₹{row.commission.toLocaleString()}</td>
                  <td className="py-3 text-right text-gray-600">{row.bookings}</td>
                  <td className="py-3 text-right text-gray-500 text-xs">₹{Math.round(row.revenue / row.bookings).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td className="py-3 font-bold text-gray-900">Total</td>
                <td className="py-3 text-right font-bold text-gray-900">₹{revenueData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</td>
                <td className="py-3 text-right font-bold text-green-700">₹{revenueData.reduce((s, d) => s + d.commission, 0).toLocaleString()}</td>
                <td className="py-3 text-right font-bold text-gray-600">{revenueData.reduce((s, d) => s + d.bookings, 0)}</td>
                <td className="py-3 text-right text-gray-500 text-xs">
                  ₹{Math.round(revenueData.reduce((s, d) => s + d.revenue, 0) / revenueData.reduce((s, d) => s + d.bookings, 0)).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;