import React, { useEffect, useState } from "react"; // Added useEffect
import axios from "axios"; // Added axios
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "../UI/StatCard";
import StatusBadge from "../UI/StatusBadge";
import StarRating from "../UI/StarRatting";
import CustomTooltip from "../UI/CustomTooltip";

const BASE_URL = import.meta.env.VITE_API_URL;

const OverviewPage = ({ onViewAllBookings }) => {
  // Added opening brace and prop
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}dashboard/user`, {
          headers: { Authorization: token },
        });

        if (response.data.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching overview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-semibold text-gray-500">
        Loading Dashboard...
      </div>
    );
  if (!data)
    return (
      <div className="p-10 text-center text-red-500">Error loading data.</div>
    );

  // Transform API monthly object { "Jan 2026": 500 } to Recharts array [{ month: "Jan 2026", spend: 500 }]
  const chartData = Object.keys(data.monthly).map((key) => ({
    month: key,
    spend: data.monthly[key],
  }));

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          value={data.totalBookingsCount + data.totalUpcomingTrips} // Combined for 'All time'
          sub="All time"
          icon="📋"
          accent
        />
        <StatCard
          label="Completed Trips"
          value={data.totalBookingsCount}
          sub="Successfully done"
          icon="✓"
        />
        <StatCard
          label="Total Spent"
          value={`₹${data.totalSpent.toLocaleString()}`}
          sub="Across all rentals"
          icon="₹"
        />
        <StatCard
          label="Upcoming"
          value={data.totalUpcomingTrips}
          sub="Trips scheduled"
          icon="📅"
        />
      </div>

      {/* Spend chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900">Monthly Spend</h2>
          <p className="text-xs text-gray-400 mt-0.5">Expense Trend</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v === 0
                  ? "₹0"
                  : `₹${v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#16a34a"
              strokeWidth={2.5}
              fill="url(#spendGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#16a34a" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Recent Bookings</h2>
          <button
            className="text-xs font-semibold text-green-600 hover:text-green-700"
            onClick={onViewAllBookings}
          >
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {data.recentBookings.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl shrink-0">
                  🚗
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {b.carId?.carName || "Unknown Car"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(b.startDate).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                    {" → "}
                    {new Date(b.endDate).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">
                  ₹{b.totalPrice.toLocaleString()}
                </p>
                <StatusBadge status={b.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
