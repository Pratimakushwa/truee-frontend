

import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Palette,
  Ticket,
  Coins,
  Settings,
  Star,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  FileText,
  Mail,
  X,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [
      {
        to: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Commerce",
    items: [
      {
        to: "/admin/orders",
        label: "Orders",
        icon: ShoppingCart,
        badge: "orders",
      },
      { to: "/admin/products", label: "Products", icon: Package },
      { to: "/admin/users", label: "Customers", icon: Users },
      { to: "/admin/coupons", label: "Coupons", icon: Ticket },
      { to: "/admin/reviews", label: "Reviews", icon: Star },
      { to: "/admin/newsletter", label: "Newsletter", icon: Mail },
    ],
  },
  {
    title: "Rewards",
    items: [
      {
        to: "/admin/rewards",
        label: "Analytics",
        icon: Coins,
      },
      {
        to: "/admin/rewards/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "System",
    items: [
      { to: "/admin/theme", label: "Theme", icon: Palette },
      {
        to: "/admin/legal-policies",
        label: "Legal & Policies",
        icon: FileText,
      },
      { to: "/admin/profile", label: "Profile", icon: User },
    ],
  },
];

export default function AdminSidebar({
  user,
  collapsed = false,
  onToggleCollapse,
  onLogout,
  onClose,
  pendingOrders = 0,
}) {
  const { pathname } = useLocation();

  // Match the most specific route so Rewards and its Settings
  // do not both appear active.
  const activePath = NAV_SECTIONS.flatMap((section) => section.items)
    .filter(({ to }) => {
      if (to === "/admin/dashboard") {
        return pathname === "/admin" ||
          pathname === "/admin/" ||
          pathname === to;
      }

      if (
        to === "/admin/legal-policies" &&
        pathname.toLowerCase() === "/admin/legal & policies"
      ) {
        return true;
      }

      return pathname === to || pathname.startsWith(`${to}/`);
    })
    .sort((a, b) => b.to.length - a.to.length)[0]?.to;

  const orderCount = Math.max(0, Number(pendingOrders) || 0);

  return (
    <aside
      aria-label="Admin sidebar"
      className={`flex h-full flex-col border-r border-[#E8E8E5] bg-white text-slate-700 transition-[width] duration-300 ${
        collapsed
          ? "w-[var(--admin-sidebar-collapsed)]"
          : "w-[var(--admin-sidebar-w)]"
      }`}
    >
      <div
        className={`flex min-h-[88px] shrink-0 items-center border-b border-slate-100 ${
          collapsed
            ? "justify-center px-2"
            : "justify-between gap-3 px-5"
        }`}
      >
        <NavLink
          to="/admin/dashboard"
          onClick={onClose}
          aria-label="Truee admin dashboard"
          className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-[#C8A253]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#EADFC7] bg-[#FCF9F2] p-2">
            <img
              src="/Truee_Luxury_Logo.png"
              alt=""
              className="h-full w-full object-contain brightness-0"
            />
          </span>

          {!collapsed && (
            <span>
              <span className="block font-serif text-xl tracking-[0.16em] text-slate-900">
                TRUEE
              </span>
              <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.2em] text-[#967025]">
                Admin Console
              </span>
            </span>
          )}
        </NavLink>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="mx-4 mb-2 mt-5 flex items-center gap-3 rounded-2xl border border-[#EEE5D5] bg-[#FCFAF6] p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFE3C8] text-sm font-semibold text-[#8C6927]">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "Admin"}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-[#967025]">
              Store administrator
            </p>
          </div>
        </div>
      )}

      <nav
        aria-label="Admin navigation"
        className="admin-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-5"
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {section.title}
              </p>
            )}

            <ul className="space-y-1">
              {section.items.map(({ to, label, icon: Icon, badge }) => {
                const active = activePath === to;
                const count = badge === "orders" ? orderCount : 0;

                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end
                      onClick={onClose}
                      title={collapsed ? label : undefined}
                      aria-label={collapsed ? label : undefined}
                      aria-current={active ? "page" : false}
                      className={`relative flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                        collapsed ? "justify-center" : ""
                      } ${
                        active
                          ? "border-[#E9D7AF] bg-[#F8F1E2] text-[#8C651F]"
                          : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        size={19}
                        strokeWidth={active ? 2 : 1.7}
                        className="shrink-0"
                      />

                      {!collapsed && (
                        <span className="truncate">{label}</span>
                      )}

                      {count > 0 && (
                        <span
                          className={`flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#C8A253] px-1 text-[9px] font-bold text-slate-950 ${
                            collapsed
                              ? "absolute right-0 top-0"
                              : "ml-auto"
                          }`}
                        >
                          {count > 99 ? "99+" : count}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 space-y-1 border-t border-slate-100 p-3">
        {onToggleCollapse && !onClose && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            className={`hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 lg:flex ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onLogout}
          aria-label="Logout"
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && (
          <p className="pb-1 pt-3 text-center text-[9px] uppercase tracking-[0.24em] text-slate-400">
            Truee Luxury
          </p>
        )}
      </div>
    </aside>
  );
}