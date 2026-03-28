import { useState } from "react";
import StatusBadge from "../UI/StatusBadge";
import { ORDER_FILTERS } from "../../Constant/index";

const OrderCard = ({ order, onAction }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Customer info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center shrink-0">
          {order.avatar}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-900">{order.customer}</p>
            <span className="text-xs text-gray-400">{order.id}</span>
          </div>
          <p className="text-xs text-gray-500">{order.car}</p>
          <p className="text-xs text-gray-400">
            {order.from} → {order.to} · {order.days} days
          </p>
        </div>
      </div>

      {/* Amount + status + actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="text-right">
          <p className="text-base font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
          <StatusBadge status={order.status} withDot />
        </div>
        {order.status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction(order.id, "confirm")}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => onAction(order.id, "cancel")}
              className="text-xs font-bold px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const OrdersPage = ({ orders, onOrderAction }) => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {ORDER_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
              filter === f
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 bg-white/30 text-white text-[10px] rounded-full px-1.5 py-0.5">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Order cards */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <OrderCard key={order.id} order={order} onAction={onOrderAction} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
            No orders found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;