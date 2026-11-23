// // import { useState } from 'react';
// // import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const nav = [
// //   { to: '/superadmin/dashboard',       label: 'Dashboard' },
// //   { to: '/superadmin/manage-admins',   label: 'Manage Admins' },
// //   { to: '/superadmin/company-profile', label: 'Company Profile' },
// //   { to: '/superadmin/analytics',       label: 'Analytics' },
// // ];

// // function Sidebar({ user, onLogout, onClose }) {
// //   return (
// //     <aside className="w-64 h-full bg-[#111] border-r border-[#C8A253]/20 flex flex-col">
// //       {/* Brand + close btn (mobile only) */}
// //       <div className="px-8 py-7 border-b border-[#C8A253]/20 flex items-center justify-between">
// //         <div>
// //           <p className="text-[#C8A253] font-serif text-xl tracking-widest">TRUEE</p>
// //           <p className="text-xs text-gray-500 tracking-wider mt-0.5">SUPER ADMIN</p>
// //         </div>
// //         {onClose && (
// //           <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white p-1">
// //             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //             </svg>
// //           </button>
// //         )}
// //       </div>

// //       {/* User info */}
// //       <div className="px-6 py-5 border-b border-[#C8A253]/10">
// //         <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
// //         <span className="inline-block mt-1 text-[10px] tracking-widest uppercase bg-[#C8A253]/15 text-[#C8A253] border border-[#C8A253]/30 px-2 py-0.5 rounded-full">
// //           Super Admin
// //         </span>
// //       </div>

// //       {/* Nav links */}
// //       <nav className="flex-1 px-4 py-6 space-y-1">
// //         {nav.map(({ to, label }) => (
// //           <NavLink
// //             key={to}
// //             to={to}
// //             onClick={onClose}
// //             className={({ isActive }) =>
// //               `block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
// //                 isActive
// //                   ? 'bg-[#C8A253]/15 text-[#C8A253] font-semibold border border-[#C8A253]/30'
// //                   : 'text-gray-400 hover:text-white hover:bg-white/5'
// //               }`
// //             }
// //           >
// //             {label}
// //           </NavLink>
// //         ))}
// //       </nav>

// //       {/* Logout */}
// //       <div className="px-4 pb-6">
// //         <button
// //           onClick={onLogout}
// //           className="w-full px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-left"
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </aside>
// //   );
// // }

// // export default function SuperAdminLayout() {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [open, setOpen] = useState(false);

// //   const handleLogout = () => { logout(); navigate('/login'); };

// //   return (
// //     <div className="min-h-screen flex bg-[#0A0A0A] text-white">

// //       {/* ── Desktop sidebar (always visible ≥lg) ── */}
// //       <div className="hidden lg:flex lg:shrink-0">
// //         <Sidebar user={user} onLogout={handleLogout} />
// //       </div>

// //       {/* ── Mobile drawer ── */}
// //       {open && (
// //         <div className="lg:hidden fixed inset-0 z-40 flex">
// //           {/* Backdrop */}
// //           <div
// //             className="absolute inset-0 bg-white/70 backdrop-blur-sm"
// //             onClick={() => setOpen(false)}
// //           />
// //           {/* Drawer */}
// //           <div className="relative z-50 flex h-full w-64 animate-[slideIn_0.22s_ease-out]">
// //             <Sidebar user={user} onLogout={handleLogout} onClose={() => setOpen(false)} />
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Main area ── */}
// //       <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
// //         {/* Mobile top bar */}
// //         <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-[#111] border-b border-[#C8A253]/20 shrink-0">
// //           <button
// //             onClick={() => setOpen(true)}
// //             className="p-2 rounded-lg text-gray-400 hover:text-[#C8A253] hover:bg-[#C8A253]/10 transition-colors"
// //           >
// //             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //             </svg>
// //           </button>
// //           <p className="text-[#C8A253] font-serif tracking-widest text-base">TRUEE</p>
// //           <span className="ml-auto text-[10px] tracking-widest uppercase bg-[#C8A253]/15 text-[#C8A253] border border-[#C8A253]/30 px-2 py-0.5 rounded-full">
// //             Super Admin
// //           </span>
// //         </header>

// //         <main className="flex-1 overflow-auto p-4 lg:p-8">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const nav = [
//   { to: '/superadmin/dashboard', label: 'Dashboard' },
//   { to: '/superadmin/manage-admins', label: 'Manage Admins' },
//   { to: '/superadmin/company-profile', label: 'Company Profile' },
//   { to: '/superadmin/analytics', label: 'Analytics' },
//   { to: '/superadmin/blogs', label: 'Blogs' },
// ];

// function Sidebar({ user, onLogout, onClose }) {
//   return (
//     <aside className="w-64 h-full bg-[#111] border-r border-[#C8A253]/20 flex flex-col">
//       {/* Brand */}
//       <div className="px-8 py-7 border-b border-[#C8A253]/20 flex items-center justify-between">
//         <div>
//           <p className="text-[#C8A253] font-serif text-xl tracking-widest">
//             TRUEE
//           </p>

//           <p className="text-xs text-gray-500 tracking-wider mt-0.5">
//             SUPER ADMIN
//           </p>
//         </div>

//         {onClose && (
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close menu"
//             className="lg:hidden text-gray-500 hover:text-white p-1"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               aria-hidden="true"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         )}
//       </div>

//       {/* User info */}
//       <div className="px-6 py-5 border-b border-[#C8A253]/10">
//         <p className="text-sm font-semibold text-white truncate">
//           {user?.name}
//         </p>

//         <span className="inline-block mt-1 text-[10px] tracking-widest uppercase bg-[#C8A253]/15 text-[#C8A253] border border-[#C8A253]/30 px-2 py-0.5 rounded-full">
//           Super Admin
//         </span>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-6 space-y-1">
//         {nav.map(({ to, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             onClick={onClose}
//             className={({ isActive }) =>
//               `block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
//                 isActive
//                   ? 'bg-[#C8A253]/15 text-[#C8A253] font-semibold border border-[#C8A253]/30'
//                   : 'text-gray-400 hover:text-white hover:bg-white/5'
//               }`
//             }
//           >
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="px-4 pb-6">
//         <button
//           type="button"
//           onClick={onLogout}
//           className="w-full px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-left"
//         >
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default function SuperAdminLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex bg-[#0A0A0A] text-white">
//       {/* Desktop sidebar */}
//       <div className="hidden lg:flex lg:shrink-0">
//         <Sidebar
//           user={user}
//           onLogout={handleLogout}
//         />
//       </div>

//       {/* Mobile drawer */}
//       {open && (
//         <div className="lg:hidden fixed inset-0 z-40 flex">
//           <div
//             className="absolute inset-0 bg-white/70 backdrop-blur-sm"
//             onClick={() => setOpen(false)}
//           />

//           <div className="relative z-50 flex h-full w-64 animate-[slideIn_0.22s_ease-out]">
//             <Sidebar
//               user={user}
//               onLogout={handleLogout}
//               onClose={() => setOpen(false)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Main area */}
//       <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
//         <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-[#111] border-b border-[#C8A253]/20 shrink-0">
//           <button
//             type="button"
//             onClick={() => setOpen(true)}
//             aria-label="Open menu"
//             aria-expanded={open}
//             className="p-2 rounded-lg text-gray-400 hover:text-[#C8A253] hover:bg-[#C8A253]/10 transition-colors"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               aria-hidden="true"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>

//           <p className="text-[#C8A253] font-serif tracking-widest text-base">
//             TRUEE
//           </p>

//           <span className="ml-auto text-[10px] tracking-widest uppercase bg-[#C8A253]/15 text-[#C8A253] border border-[#C8A253]/30 px-2 py-0.5 rounded-full">
//             Super Admin
//           </span>
//         </header>

//         <main className="flex-1 overflow-auto p-4 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  BookOpen,
  LogOut,
  Menu,
  X,
   Search,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const nav = [
  {
    to: "/superadmin/dashboard",
    label: "Dashboard",
    Icon: LayoutDashboard,
  },
 {
  to: "/superadmin/seo-content",
  label: "SEO & Content",
  Icon: Search,
},
  {
    to: "/superadmin/manage-admins",
    label: "Manage Admins",
    Icon: Users,
  },
  {
    to: "/superadmin/company-profile",
    label: "Company Profile",
    Icon: Building2,
  },
  {
    to: "/superadmin/analytics",
    label: "Analytics",
    Icon: BarChart3,
  },
  {
    to: "/superadmin/blogs",
    label: "Blogs",
    Icon: BookOpen,
  },
];

function Sidebar({ user, onLogout, onClose }) {
  const initial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "T";

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#EAE6DE] bg-white text-[#252525]">
      <div className="flex items-center justify-between border-b border-[#F0EDE7] px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E9DFC9] bg-[#FAF6ED]">
            <img
              src="/Truee_Luxury_Logo.png"
              alt=""
              className="h-8 w-8 object-contain brightness-0"
            />
          </div>

          <div>
            <p className="font-serif text-xl tracking-[0.16em] text-[#222]">
              TRUEE
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#987331]">
              Management Studio
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 rounded-2xl border border-[#ECE6D9] bg-[#FCFAF5] p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEE3CB] text-sm font-bold text-[#886524]">
            {initial}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#292929]">
              {user?.name || "Super Admin"}
            </p>

            <p className="mt-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-[#987331]">
              <ShieldCheck size={12} aria-hidden="true" />
              Super Admin
            </p>
          </div>
        </div>
      </div>

      <nav
        aria-label="Super Admin navigation"
        className="flex-1 space-y-2 overflow-y-auto px-4 py-7"
      >
        <p className="mb-4 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Workspace
        </p>

        {nav.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl border px-4 py-3 text-[13px] transition-colors ${
                isActive
                  ? "border-[#E8D9B8] bg-[#F8F1E2] font-semibold text-[#886524]"
                  : "border-transparent text-[#68707B] hover:bg-[#F8F7F4] hover:text-[#252525]"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[#F0EDE7] p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={17} aria-hidden="true" />
          Logout
        </button>

        <p className="mt-4 text-center text-[9px] uppercase tracking-[0.18em] text-gray-400">
          Truee Luxury
        </p>
      </div>
    </aside>
  );
}

export default function SuperAdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  const currentPage =
    nav.find(
      (item) =>
        pathname === item.to ||
        pathname.startsWith(`${item.to}/`)
    )?.label || "Dashboard";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
        if (dialog.open) dialog.close();
      };
    }

    if (dialog.open) dialog.close();
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-[#252525]">
      <div className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <Sidebar user={user} onLogout={handleLogout} />
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Super Admin navigation"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setOpen(false);
          }
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-slate-900/25 backdrop:backdrop-blur-sm"
      >
        <div className="h-full w-64 shadow-xl">
          <Sidebar
            user={user}
            onLogout={handleLogout}
            onClose={() => setOpen(false)}
          />
        </div>
      </dialog>

      <div className="min-w-0 lg:ml-64">
        <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between gap-4 border-b border-[#EAE6DE] bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              className="rounded-xl border border-[#EAE6DE] p-2 text-gray-600 hover:bg-[#FAF8F3] lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>

            <div className="flex min-w-0 items-center gap-2 text-xs">
              <span className="hidden text-gray-400 sm:inline">
                Super Admin
              </span>

              <ChevronRight
                size={13}
                className="hidden text-gray-300 sm:block"
                aria-hidden="true"
              />

              <span className="truncate font-semibold text-[#333]">
                {currentPage}
              </span>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E8DDC6] bg-[#FBF7EF] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#96712D]">
            <ShieldCheck size={13} aria-hidden="true" />
            Super Admin
          </span>
        </header>

        <main className="min-h-[calc(100vh-76px)] min-w-0 p-4 sm:p-6 lg:p-9">
          <div className="mx-auto max-w-[1500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}