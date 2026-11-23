

import { useEffect, useRef, useState, useId } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/axiosInstance";

const PAGE_TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/users": "Customers",
  "/admin/coupons": "Coupons",
  "/admin/reviews": "Reviews",
  "/admin/rewards": "Reward Analytics",
  "/admin/rewards/settings": "Reward Settings",
  "/admin/theme": "Theme Manager",
  "/admin/profile": "My Profile",
  "/admin/legal-policies": "Legal & Policies",
  "/admin/Legal & Policies": "Legal & Policies",
  "/admin/newsletter": "Newsletter",
};

export default function AdminHeader({ onMenuClick }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const notificationId = useId();

  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);
  const [notificationError, setNotificationError] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const pageTitle =
    pathname === "/admin" || pathname === "/admin/"
      ? "Dashboard"
      : Object.entries(PAGE_TITLES)
          .sort(([a], [b]) => b.length - a.length)
          .find(
            ([path]) =>
              pathname === path || pathname.startsWith(`${path}/`)
          )?.[1] || "Admin";

  const unread = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadNotifications() {
      try {
        const { data } = await api.get("/notifications");

        const list = Array.isArray(data?.notifications)
          ? data.notifications
          : Array.isArray(data?.data)
            ? data.data
            : null;

        if (!list) throw new Error("Invalid notification response.");

        if (!cancelled) setNotifications(list);
      } catch {
        if (!cancelled) {
          setNotificationError("Notifications load nahi hui.");
        }
      } finally {
        if (!cancelled) setNotificationLoading(false);
      }
    }

    loadNotifications();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setShowNotifications(false);
  }, [pathname]);

  useEffect(() => {
    if (!showNotifications) return;

    const handlePointer = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        notificationButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showNotifications]);

  const handleSearch = (event) => {
    event.preventDefault();

    if (search.trim()) {
      navigate("/admin/orders", {
        state: { search: search.trim() },
      });
    }
  };

  const today = time.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-[var(--admin-header-h)] shrink-0 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open admin menu"
        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
      >
        <Menu size={21} />
      </button>

      <div className="min-w-0 shrink-0">
        <div className="hidden items-center gap-1.5 text-[10px] text-slate-400 sm:flex">
          <Link
            to="/admin/dashboard"
            className="transition hover:text-[#967025]"
          >
            Admin
          </Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span className="truncate">{pageTitle}</span>
        </div>

        <p className="truncate text-sm font-semibold text-slate-900">
          {pageTitle}
        </p>
      </div>

      <form
        role="search"
        onSubmit={handleSearch}
        className="mx-3 hidden max-w-md flex-1 md:block"
      >
        <div className="relative">
          <Search
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search orders"
            placeholder="Search orders..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8A253] focus:ring-4 focus:ring-[#C8A253]/10"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="mr-1 hidden text-right xl:block">
          <p className="text-xs font-medium text-slate-500">
            {today}
          </p>
          <p className="mt-1 text-[10px] tabular-nums text-slate-400">
            {time.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div ref={notificationRef} className="relative">
          <button
            ref={notificationButtonRef}
            type="button"
            onClick={() =>
              setShowNotifications((previous) => !previous)
            }
            aria-label={
              unread
                ? `Notifications, ${unread} unread`
                : "Notifications"
            }
            aria-expanded={showNotifications}
            aria-controls={notificationId}
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Bell size={20} />

            {unread > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C8A253] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <section
              id={notificationId}
              aria-label="Notifications"
              className="fixed right-4 top-[calc(var(--admin-header-h)+8px)] z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:absolute sm:right-0 sm:top-full sm:mt-3 sm:w-80"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Notifications
                  </h2>
                  {unread > 0 && (
                    <span className="rounded-full bg-[#FAF5E9] px-2 py-0.5 text-[10px] font-semibold text-[#967025]">
                      {unread} unread
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    notificationButtonRef.current?.focus();
                  }}
                  aria-label="Close notifications"
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="admin-scrollbar max-h-80 overflow-y-auto">
                {notificationLoading ? (
                  <p role="status" className="p-8 text-center text-xs text-slate-500">
                    Loading notifications...
                  </p>
                ) : notificationError ? (
                  <p role="alert" className="p-6 text-center text-xs text-red-600">
                    {notificationError}
                  </p>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-9 text-center">
                    <Bell size={24} className="mx-auto text-slate-300" />
                    <p className="mt-3 text-xs text-slate-500">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.slice(0, 8).map((notification, index) => (
                    <div
                      key={notification._id || index}
                      className={`border-b border-slate-100 px-4 py-4 last:border-0 ${
                        !notification.isRead ? "bg-[#FCFAF5]" : ""
                      }`}
                    >
                      <p className="text-xs font-semibold leading-5 text-slate-800">
                        {notification.title ||
                          notification.message ||
                          "Notification"}
                      </p>

                      {notification.title && notification.message && (
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {notification.message}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
        </div>

        <Link
          to="/admin/profile"
          aria-label="Open my profile"
          className="flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-slate-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFE3C8] text-sm font-semibold text-[#8C6927]">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </span>

          <span className="hidden text-left lg:block">
            <span className="block max-w-[110px] truncate text-xs font-semibold text-slate-800">
              {user?.name || "Admin"}
            </span>
            <span className="mt-0.5 block text-[10px] text-slate-400">
              Administrator
            </span>
          </span>
        </Link>

        <Link
          to="/admin/profile"
          aria-label="Profile settings"
          className="hidden rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 md:flex"
        >
          <Settings size={19} />
        </Link>
      </div>
    </header>
  );
}
