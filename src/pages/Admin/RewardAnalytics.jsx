
import React, { useState, useEffect } from "react";
import { Coins, TrendingUp, Users, Wallet } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function RewardAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/admin/rewards/analytics")
      .then(({ data }) => {
        if (data.success) setAnalytics(data.analytics);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
        Loading analytics...
      </div>
    );
  }

  const a = analytics || {};

  const cards = [
    {
      label: "Total Coins Issued",
      value: a.totalCoinsIssued ?? 0,
      icon: Coins,
      color: "bg-[#FAF5E9] text-[#A67D2D]",
    },
    {
      label: "Total Coins Redeemed",
      value: a.totalCoinsRedeemed ?? 0,
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Active Wallet Value",
      value: `₹${a.activeWalletValue ?? 0}`,
      icon: Wallet,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending Rewards",
      value: a.pendingRewards ?? 0,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Active Wallets",
      value: a.activeWallets ?? 0,
      icon: Users,
      color: "bg-slate-100 text-slate-600",
    },
    {
      label: "Reward Usage %",
      value: `${a.rewardUsagePercent ?? 0}%`,
      icon: TrendingUp,
      color: "bg-[#FAF5E9] text-[#A67D2D]",
    },
  ];

  return (
    <div className="space-y-7 text-slate-900">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
          Loyalty programme
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Reward Analytics
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Loyalty program performance overview
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-500">
                {label}
              </p>

              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}
              >
                <Icon size={22} />
              </span>
            </div>

            <p className="mt-5 break-words text-3xl font-semibold tracking-tight text-slate-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      {a.topCustomers?.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Top Customers by Balance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Customer wallet balances ranked by available coins.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {a.topCustomers.map((w, i) => (
              <div
                key={w._id}
                className="flex flex-col gap-3 px-5 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FAF5E9] text-xs font-semibold text-[#967025]">
                    {i + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {w.user?.name || "Customer"}
                    </p>

                    <p className="mt-1 break-all text-xs text-slate-500">
                      {w.user?.email}
                    </p>
                  </div>
                </div>

                <span className="ml-12 w-fit shrink-0 rounded-full border border-[#EADFC7] bg-[#FCFAF5] px-3 py-1.5 text-sm font-semibold text-[#967025] sm:ml-0">
                  {w.availableCoins} coins
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}