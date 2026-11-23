import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  IndianRupee,
  Package,
  RefreshCw,
  AlertCircle,
  Building2,
  ArrowRight,
} from "lucide-react";

import api from "../../utils/axiosInstance";

const formatNumber = (value) =>
  value === null || value === undefined
    ? "—"
    : Number(value).toLocaleString("en-IN");

const formatCurrency = (value) =>
  value === null || value === undefined
    ? "—"
    : `₹${Number(value).toLocaleString("en-IN")}`;

function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF5E9] text-[#A67D2D]">
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 break-words text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>

      {sub && (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {sub}
        </p>
      )}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-4">{children}</div>
    </section>
  );
}

function ErrorNotice({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700"
    >
      <AlertCircle size={20} className="shrink-0" />

      <div>
        <p className="text-sm leading-6">{message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-sm font-semibold underline underline-offset-4"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function LoadingCards({ count = 4 }) {
  return (
    <div
      role="status"
      aria-label="Loading analytics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="h-3 w-28 rounded bg-slate-100" />
          <div className="mt-6 h-8 w-20 rounded bg-slate-100" />
          <div className="mt-4 h-3 w-32 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function getError(err, fallback) {
  return (
    err.response?.data?.error ||
    err.response?.data?.message ||
    err.message ||
    fallback
  );
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Analytics() {
  const [platform, setPlatform] = useState(null);
  const [store, setStore] = useState(null);

  const [platformError, setPlatformError] = useState("");
  const [storeError, setStoreError] = useState("");

  const [platformLoading, setPlatformLoading] = useState(true);
  const [storeLoading, setStoreLoading] = useState(true);

  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setPlatformLoading(true);
    setStoreLoading(true);
    setPlatformError("");
    setStoreError("");

    async function loadPlatform() {
      try {
        const { data } = await api.get("/Superadmin/analytics");

        if (!data?.success || !data.data?.users) {
          throw new Error("Platform analytics ka response sahi nahi mila.");
        }

        if (!cancelled) setPlatform(data.data);
      } catch (err) {
        if (!cancelled) {
          setPlatformError(
            getError(err, "Platform analytics load nahi hui.")
          );
        }
      } finally {
        if (!cancelled) setPlatformLoading(false);
      }
    }

    async function loadStore() {
      try {
        const { data } = await api.get("/admin/dashboard-stats");

        if (!data?.success || !data.stats) {
          throw new Error("Store analytics ka response sahi nahi mila.");
        }

        if (!cancelled) setStore(data.stats);
      } catch (err) {
        if (!cancelled) {
          setStoreError(
            getError(err, "Store analytics load nahi hui.")
          );
        }
      } finally {
        if (!cancelled) setStoreLoading(false);
      }
    }

    // Both requests run independently.
    // One failing does not hide the other section.
    void loadPlatform();
    void loadStore();

    return () => {
      cancelled = true;
    };
  }, [reload]);

  const refresh = () => setReload((previous) => previous + 1);
  const loading = platformLoading || storeLoading;

  const dailySales = Array.isArray(store?.dailySales)
    ? store.dailySales
    : [];

  const salesTotal = dailySales.reduce(
    (total, day) => total + Number(day.revenue || 0),
    0
  );

  return (
    <div className="space-y-8 text-slate-900">
      <title>Analytics | Truee Super Admin</title>
      <meta name="robots" content="noindex,nofollow" />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
            Business insights
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            An overview of your team, customers and store activity.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </header>

      <Section
        title="Team & Customers"
        description="Registered accounts and their current status."
      >
        {platformLoading ? (
          <LoadingCards count={5} />
        ) : platformError ? (
          <ErrorNotice message={platformError} onRetry={refresh} />
        ) : platform ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Total Admins"
              value={formatNumber(platform.users.totalAdmins)}
              icon={ShieldCheck}
            />
            <StatCard
              label="Active Admins"
              value={formatNumber(platform.users.activeAdmins)}
              icon={UserCheck}
            />
            <StatCard
              label="Suspended Admins"
              value={formatNumber(platform.users.suspendedAdmins)}
              icon={UserX}
            />
            <StatCard
              label="Total Customers"
              value={formatNumber(platform.users.totalCustomers)}
              icon={Users}
            />
            <StatCard
              label="Active Customers"
              value={formatNumber(platform.users.activeCustomers)}
              sub="Customer accounts marked active."
              icon={UserCheck}
            />
          </div>
        ) : null}
      </Section>

      <Section
        title="Orders & Products"
        description="Current totals across the store."
      >
        {storeLoading ? (
          <LoadingCards count={5} />
        ) : storeError ? (
          <ErrorNotice message={storeError} onRetry={refresh} />
        ) : store ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Total Orders"
              value={formatNumber(store.orderCount)}
              sub="All recorded orders."
              icon={ShoppingBag}
            />
            <StatCard
              label="Pending Orders"
              value={formatNumber(store.pendingOrders)}
              sub="Pending, confirmed, processing or packed."
              icon={Clock}
            />
            <StatCard
              label="Delivered Orders"
              value={formatNumber(store.deliveredOrders)}
              sub="Orders marked Delivered or Completed."
              icon={CheckCircle}
            />
            <StatCard
              label="Cancelled Orders"
              value={formatNumber(store.cancelledOrders)}
              icon={XCircle}
            />
            <StatCard
              label="Total Products"
              value={formatNumber(store.productCount)}
              icon={Package}
            />
          </div>
        ) : null}
      </Section>

      {!storeLoading && !storeError && store && (
        <>
          <Section
            title="Paid Order Value"
            description="Value of orders currently marked Paid, grouped by order creation date. These totals do not deduct refunds separately."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="All Time"
                value={formatCurrency(store.totalRevenue)}
                sub="All orders marked Paid."
                icon={IndianRupee}
              />
              <StatCard
                label="This Month"
                value={formatCurrency(store.monthRevenue)}
                sub="Paid orders created this month."
                icon={IndianRupee}
              />
              <StatCard
                label="Today"
                value={formatCurrency(store.todayRevenue)}
                sub="Paid orders created today."
                icon={IndianRupee}
              />
              <StatCard
                label="Yesterday"
                value={formatCurrency(store.yesterdayRevenue)}
                sub="Paid orders created yesterday."
                icon={IndianRupee}
              />
            </div>
          </Section>

          <Section
            title="Recent Paid Orders"
            description="Daily totals returned for the last seven days."
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
                <p className="text-sm text-slate-500">
                  Paid order value in this period
                </p>

                <p className="text-xl font-semibold text-slate-900">
                  {formatCurrency(salesTotal)}
                </p>
              </div>

              {dailySales.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th scope="col" className="px-5 py-4 font-semibold">
                          Order date
                        </th>
                        <th scope="col" className="px-5 py-4 font-semibold">
                          Paid orders
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-4 text-right font-semibold"
                        >
                          Value
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {dailySales.map((day) => (
                        <tr key={day._id} className="hover:bg-slate-50">
                          <td className="px-5 py-4 text-slate-600">
                            {day._id}
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            {formatNumber(day.orders)}
                          </td>
                          <td className="px-5 py-4 text-right font-semibold">
                            {formatCurrency(day.revenue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="px-5 py-12 text-center text-sm text-slate-500">
                  No paid orders recorded in this period.
                </p>
              )}
            </div>
          </Section>
        </>
      )}

      {!platformLoading && !platformError && platform && (
        <Section title="Company">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FAF5E9] text-[#A67D2D]">
                  <Building2 size={23} />
                </span>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">
                    {platform.company?.companyName ||
                      "Company name not added"}
                  </h3>

                  <p className="mt-1 text-sm text-[#967025]">
                    {platform.company?.brandName ||
                      "Brand name not added"}
                  </p>

                  <p className="mt-3 break-all text-sm text-slate-500">
                    {platform.company?.contactEmail ||
                      "Contact email not added"}
                  </p>

                  {platform.company?.createdAt && (
                    <p className="mt-2 text-xs text-slate-400">
                      Registered on{" "}
                      {formatDate(platform.company.createdAt)}
                    </p>
                  )}
                </div>
              </div>

              <Link
                to="/superadmin/company-profile"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#967025] hover:underline"
              >
                Company Profile <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}