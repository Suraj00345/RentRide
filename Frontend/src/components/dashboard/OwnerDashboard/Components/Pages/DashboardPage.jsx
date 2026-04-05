import React, { useEffect, useState } from "react";
import axios from "axios";
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
import CustomTooltip from "../UI/CustomTooltip";
import RentRideLoader from "../../../../../utils/Loader";
import ErrorPage from "../../../../../utils/ErrorPage";

const BASE_URL = import.meta.env.VITE_API_URL;

const DashboardPage = ({ onViewAllOrders }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("earnings");

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}dashboard/owner`, {
          headers: { Authorization: token },
        });

        if (response.data.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching owner dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  if (loading) return <RentRideLoader />;
  if (!data) return <ErrorPage />;

  // Transform the 'monthly' object from API to Recharts Array
  // We'll map 'earnings' to the price and 'bookings' can be derived or set to a default if the API provides it
  const chartData = Object.keys(data.monthly).map((key) => ({
    month: key,
    earnings: data.monthly[key],
    bookings: Math.floor(data.monthly[key] / 2000), // Placeholder logic if bookings count per month isn't in API yet
  }));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Earnings"
          value={`₹${(data.totalEarnings / 100000).toFixed(1)}L`}
          sub="Lifetime"
          accent
        />
        <StatCard
          label="Total Bookings"
          value={data.totalBookings}
          sub="Completed"
          icon="📋"
        />
        <StatCard
          label="Active Cars"
          value={data.totalActiveCars}
          sub="Listed on RentRide"
          icon="🚗"
        />
        <StatCard
          label="Pending Orders"
          value={data.totalPendingOrders}
          sub="Needs your action"
          icon="⏳"
        />
      </div>

      {/* Area chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Performance Overview
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Earnings Trend</p>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {["earnings", "bookings"].map((t) => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  chartType === t
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
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
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                chartType === "earnings" ? `₹${(v / 1000).toFixed(0)}k` : v
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={chartType}
              stroke="#16a34a"
              strokeWidth={2.5}
              fill="url(#greenGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#16a34a" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
          <button
            className="text-xs font-semibold text-green-600 hover:text-green-700"
            onClick={onViewAllOrders}
          >
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {data.recentBookings.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {order.userId?.firstname?.charAt(0)}
                  {order.userId?.lastname?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {order.userId?.firstname} {order.userId?.lastname}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {order.carId?.carName}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">
                  ₹{order.totalPrice.toLocaleString()}
                </p>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
