import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  BookOpen,
  FileCheck2,
  FileClock,
  IndianRupee,
  ShoppingBag,
  Building2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import api from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const number = (value) =>
  Number(value ?? 0).toLocaleString("en-IN");

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN")}`;

function SummaryCard({ title, value, description, icon: Icon, to }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FAF5E9] text-[#A67D2D]">
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs leading-5 text-slate-500">
          {description}
        </p>
        {to && <ArrowRight size={15} className="text-[#A67D2D]" />}
      </div>
    </>
  );

  const className =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

  return to ? (
    <Link
      to={to}
      className={`${className} transition hover:border-[#C8A253] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A253]`}
    >
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

function Panel({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="break-words text-sm font-medium text-slate-800 sm:text-right">
        {value || "Not added"}
      </dd>
    </div>
  );
}

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [analyticsResponse, blogsResponse, storeResponse] =
          await Promise.all([
            api.get("/Superadmin/analytics"),
            api.get("/blogs/manage/all"),
            api.get("/admin/dashboard-stats"),
          ]);

        const analytics = analyticsResponse.data;
        const blogs = blogsResponse.data;
        const store = storeResponse.data;

        if (
          !analytics?.success ||
          !analytics.data?.users ||
          !blogs?.success ||
          !Array.isArray(blogs.blogs) ||
          !store?.success ||
          !store.stats
        ) {
          throw new Error(
            "Dashboard data ka response expected format mein nahi mila."
          );
        }

        if (!cancelled) {
          setData({
            users: analytics.data.users,
            company: analytics.data.company,
            blogs: blogs.blogs,
            store: store.stats,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              err.response?.data?.message ||
              err.message ||
              "Dashboard load nahi hua. Dobara try karo."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [reload]);

  const publishedBlogs =
    data?.blogs.filter((blog) => blog.status === "published") || [];

  const draftBlogs =
    data?.blogs.filter((blog) => blog.status === "draft") || [];

  const homepageBlogs =
    publishedBlogs.filter((blog) => blog.showOnHome);

  const recentBlogs = [...(data?.blogs || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-7 text-slate-900">
      <title>Dashboard | Truee Super Admin</title>
      <meta name="robots" content="noindex,nofollow" />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
            Management overview
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back, {user?.name || "Super Admin"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage your team, company information and journal.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReload((value) => value + 1)}
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

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
        >
          <AlertCircle size={20} className="shrink-0" />
          <div>
            <p className="font-semibold">Dashboard load nahi hua</p>
            <p className="mt-1">{error}</p>
            <button
              type="button"
              onClick={() => setReload((value) => value + 1)}
              className="mt-3 font-semibold underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        </div>
      ) : loading ? (
        <div
          aria-label="Loading dashboard"
          aria-busy="true"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="h-3 w-24 rounded bg-slate-100" />
              <div className="mt-6 h-8 w-16 rounded bg-slate-100" />
              <div className="mt-4 h-3 w-32 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : data ? (
        <>
          <section aria-label="Team and journal summary">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Admins"
                value={number(data.users.totalAdmins)}
                description="Your management team"
                icon={ShieldCheck}
                to="/superadmin/manage-admins"
              />

              <SummaryCard
                title="Active Admins"
                value={number(data.users.activeAdmins)}
                description="Accounts marked active"
                icon={UserCheck}
                to="/superadmin/manage-admins"
              />

              <SummaryCard
                title="Suspended Admins"
                value={number(data.users.suspendedAdmins)}
                description="Accounts marked inactive"
                icon={UserX}
                to="/superadmin/manage-admins"
              />

              <SummaryCard
                title="Customers"
                value={number(data.store.userCount)}
                description="Registered customer accounts"
                icon={Users}
              />

              <SummaryCard
                title="Total Blogs"
                value={number(data.blogs.length)}
                description="All saved journal articles"
                icon={BookOpen}
                to="/superadmin/blogs"
              />

              <SummaryCard
                title="Published Blogs"
                value={number(publishedBlogs.length)}
                description="Articles available publicly"
                icon={FileCheck2}
                to="/superadmin/blogs"
              />

              <SummaryCard
                title="Draft Blogs"
                value={number(draftBlogs.length)}
                description="Articles awaiting publication"
                icon={FileClock}
                to="/superadmin/blogs"
              />

              <SummaryCard
                title="Homepage Blogs"
                value={number(homepageBlogs.length)}
                description="Published and selected for home"
                icon={BookOpen}
                to="/superadmin/blogs"
              />
            </div>
          </section>

          <Panel
            title="Business Overview"
            description="Store totals from the existing dashboard API."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SummaryCard
                title="Paid Order Value"
                value={currency(data.store.totalRevenue)}
                description="Total value of orders marked Paid"
                icon={IndianRupee}
              />

              <SummaryCard
                title="Total Orders"
                value={number(data.store.orderCount)}
                description="All recorded orders"
                icon={ShoppingBag}
              />

              <SummaryCard
                title="Pending Orders"
                value={number(data.store.pendingOrders)}
                description="Pending, confirmed, processing or packed"
                icon={ShoppingBag}
              />
            </div>
          </Panel>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Panel
              title="Company Information"
              description="Your registered business details."
            >
              <dl>
                <DetailRow
                  label="Company name"
                  value={data.company?.companyName}
                />
                <DetailRow
                  label="Brand name"
                  value={data.company?.brandName}
                />
                <DetailRow
                  label="Contact email"
                  value={data.company?.contactEmail}
                />
              </dl>

              <Link
                to="/superadmin/company-profile"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#967025] hover:underline"
              >
                Update company profile <ArrowRight size={16} />
              </Link>
            </Panel>

            <Panel
              title="Recent Blogs"
              description="Your most recently created articles."
            >
              {recentBlogs.length ? (
                <ul className="divide-y divide-slate-100">
                  {recentBlogs.map((blog) => (
                    <li
                      key={blog._id}
                      className="flex items-start justify-between gap-4 py-3 first:pt-0"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-6 text-slate-800">
                          {blog.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {blog.category || "Uncategorised"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          blog.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {blog.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
                  No blogs added yet.
                </p>
              )}

              <Link
                to="/superadmin/blogs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#967025] hover:underline"
              >
                Manage articles <ArrowRight size={16} />
              </Link>
            </Panel>
          </div>

          <section aria-label="Management shortcuts">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: "Manage Admins",
                  description: "Create and manage admin accounts.",
                  to: "/superadmin/manage-admins",
                  icon: ShieldCheck,
                },
                {
                  title: "Company Profile",
                  description: "Update business and bank details.",
                  to: "/superadmin/company-profile",
                  icon: Building2,
                },
                {
                  title: "Manage Blogs",
                  description: "Write, edit and publish articles.",
                  to: "/superadmin/blogs",
                  icon: BookOpen,
                },
              ].map(({ title, description, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="group rounded-2xl border border-[#E9DFC9] bg-[#FCFAF5] p-5 transition hover:bg-[#F7F0E1]"
                >
                  <div className="flex items-center justify-between text-[#967025]">
                    <Icon size={22} />
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>

                  <h2 className="mt-4 text-sm font-semibold text-slate-900">
                    {title}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}