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
  BarChart,
  Bar,
  Legend,
} from "recharts";
import StatCard from "../UI/StatCard";
import StatusBadge from "../UI/StatusBadge";
import CustomTooltip from "../UI/CustomTooltip";
import { revenueData, recentTransactions } from "../../data";
import { transactionStatusConfig } from "../../constants";
import RentRideLoader from "../../../../../utils/Loader";
import ErrorPage from "../../../../../utils/ErrorPage";

import VITE_API_URL from "../../../../../api"
const BASE_URL = VITE_API_URL;

const OverviewPage = ({ onNavigate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}dashboard/admin`, {
          headers: { Authorization: token },
        });

        if (response.data.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <RentRideLoader />;
  if (!data) return <ErrorPage />;

  // Destructure for cleaner access
  const { overview, monthly, recentTransactions } = data;
  return (
    <div className="space-y-6">
      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`₹${(overview.totalRevenue / 100000).toFixed(1)}L`}
          sub="Gross Volume"
          icon="₹"
          accent
        />
        <StatCard
          label="Commission"
          value={`₹${(overview.totalCommission / 1000).toFixed(1)}k`}
          sub="Platform Earnings"
          icon="%"
        />
        <StatCard
          label="Total Bookings"
          value={overview.totalBookings}
          sub="All time"
          icon="📋"
        />
        <StatCard
          label="Active Users"
          value={overview.activeUsers}
          sub="Owners + Renters"
          icon="👥"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Cars"
          value={overview.activeCars}
          sub="Listed & approved"
          icon="🚗"
        />
        <StatCard
          label="Active Owners"
          value={overview.activeOwners}
          sub="Verified accounts"
          icon="👤"
        />
        <StatCard
          label="Pending Owners"
          value={overview.pendingOwners}
          sub="Awaiting review"
          icon="⏳"
        />
        <StatCard
          label="Pending Cars"
          value={overview.pendingCars}
          sub="Awaiting approval"
          icon="🔍"
        />
      </div>

      {/* Revenue area chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900">
            Platform Revenue
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Total revenue vs commission earned — Jan to Dec 2025
          </p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="comGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={2.5}
              fill="url(#revGrad)"
              dot={false}
              activeDot={{ r: 4 }}
              name="revenue"
            />
            <Area
              type="monotone"
              dataKey="commission"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#comGrad)"
              dot={false}
              activeDot={{ r: 4 }}
              name="commission"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bookings bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900">
            Monthly Bookings
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Total bookings per month
          </p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthly}>
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="bookings"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
              name="bookings"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">
            Recent Transactions
          </h2>
          <button
            className="text-xs font-semibold text-green-600 hover:text-green-700"
            onClick={() => onNavigate("transactions")}
          >
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.slice(0, 5).map((txn) => (
            <div
              key={txn._id}
              className="flex items-center justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {txn.userId?.firstname} {txn.userId?.lastname}
                  </p>
                  <span className="text-xs text-gray-400">{txn._id}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {txn.carId?.carName} ·{" "}
                  {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">
                  ₹
                  {txn.totalPrice?.toLocaleString() ||
                    txn.amount?.toLocaleString()}
                </p>
                <StatusBadge config={transactionStatusConfig[txn.status]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
