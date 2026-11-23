// import { useState, useEffect, useCallback } from 'react';
// import api from '../../utils/axiosInstance';
// import Toast from '../../components/Toast';

// function CreateAdminModal({ onClose, onSuccess }) {
//   const [form, setForm] = useState({ name: '', email: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       await api.post('/Superadmin/create-admin', form);
//       onSuccess();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-[#111] border border-[#C8A253]/20 rounded-2xl w-full max-w-md p-8">
//         <h2 className="text-xl font-serif text-[#C8A253] mb-6">Create Admin Account</h2>

//         {error && (
//           <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { key: 'name', label: 'Full Name', type: 'text' },
//             { key: 'email', label: 'Email Address', type: 'email' },
//           ].map(({ key, label, type }) => (
//             <div key={key} className="relative">
//               <input
//                 type={type}
//                 value={form[key]}
//                 onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
//                 placeholder=" "
//                 required
//                 className="peer w-full bg-[#1A1A1A] border border-[#C8A253]/20 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none focus:border-[#C8A253]/60 transition-colors"
//               />
//               <label className="absolute left-4 top-1 text-[10px] text-[#C8A253] uppercase tracking-widest pointer-events-none">
//                 {label}
//               </label>
//             </div>
//           ))}

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 py-3 rounded-lg bg-[#C8A253] text-black font-semibold text-sm hover:bg-[#d4af65] disabled:opacity-50 transition-colors"
//             >
//               {loading ? 'Creating...' : 'Create & Send Email'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function AdminManagement() {
//   const [admins, setAdmins]     = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [toast, setToast]       = useState(null);

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   const fetchAdmins = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await api.get('/Superadmin/all-admins');
//       setAdmins(res.data.data);
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Failed to load admins.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchAdmins(); }, [fetchAdmins]);

//   const handleToggle = async (id, isActive) => {
//     try {
//       const res = await api.put(`/Superadmin/${id}/toggle-status`);
//       showToast(res.data.message);
//       setAdmins((prev) =>
//         prev.map((a) => (a._id === id ? { ...a, isActive: !isActive } : a))
//       );
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Failed to update status.', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Permanently delete this admin? This cannot be undone.')) return;
//     try {
//       await api.delete(`/Superadmin/${id}`);
//       showToast('Admin deleted.');
//       setAdmins((prev) => prev.filter((a) => a._id !== id));
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Failed to delete admin.', 'error');
//     }
//   };

//   return (
//     <div>
//       {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-serif text-[#C8A253]">Manage Admins</h1>
//           <p className="text-gray-500 text-sm mt-1">{admins.length} admin account{admins.length !== 1 ? 's' : ''}</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-5 py-2.5 rounded-lg bg-[#C8A253] text-black text-sm font-semibold hover:bg-[#d4af65] transition-colors"
//         >
//           + New Admin
//         </button>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <p className="text-gray-500 text-sm">Loading...</p>
//       ) : admins.length === 0 ? (
//         <div className="rounded-xl border border-[#C8A253]/10 bg-[#111] p-10 text-center">
//           <p className="text-gray-500 text-sm">No admins yet. Create the first one.</p>
//         </div>
//       ) : (
//         <div className="rounded-xl border border-[#C8A253]/10 bg-[#111] overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-[#C8A253]/10">
//                 {['Name', 'Email', 'Status', 'Joined', 'Actions'].map((h) => (
//                   <th key={h} className="px-6 py-4 text-left text-xs text-[#C8A253] uppercase tracking-wider font-medium">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {admins.map((admin, idx) => (
//                 <tr
//                   key={admin._id}
//                   className={`border-b border-white/5 ${idx % 2 === 0 ? '' : 'bg-white/2'}`}
//                 >
//                   <td className="px-6 py-4 text-white font-medium">{admin.name}</td>
//                   <td className="px-6 py-4 text-gray-400">{admin.email}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                       admin.isActive
//                         ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
//                         : 'bg-red-500/10 text-red-400 border border-red-500/20'
//                     }`}>
//                       {admin.isActive ? 'Active' : 'Suspended'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-gray-500">
//                     {new Date(admin.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleToggle(admin._id, admin.isActive)}
//                         className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
//                           admin.isActive
//                             ? 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10'
//                             : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
//                         }`}
//                       >
//                         {admin.isActive ? 'Suspend' : 'Reactivate'}
//                       </button>
//                       <button
//                         onClick={() => handleDelete(admin._id)}
//                         className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Create admin modal */}
//       {showModal && (
//         <CreateAdminModal
//           onClose={() => setShowModal(false)}
//           onSuccess={() => {
//             setShowModal(false);
//             showToast('Admin created! Credentials sent via email.');
//             fetchAdmins();
//           }}
//         />
//       )}
//     </div>
//   );
// }

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useId,
} from "react";
import {
  Users,
  UserCheck,
  UserX,
  Plus,
  Search,
  RefreshCw,
  X,
  Mail,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

import api from "../../utils/axiosInstance";
import Toast from "../../components/Toast";

const getError = (err, fallback) =>
  err.response?.data?.error ||
  err.response?.data?.message ||
  err.message ||
  fallback;

function CreateAdminModal({ onClose, onSuccess }) {
  const dialogRef = useRef(null);
  const submittingRef = useRef(false);
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();

  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open) dialog.close();
    };
  }, []);

  const close = () => {
    if (!submittingRef.current) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
    };

    if (!payload.name || !payload.email) {
      setError("Name aur email dono bharo.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post(
        "/Superadmin/create-admin",
        payload
      );

      if (!data?.success) {
        throw new Error(data?.error || "Admin create nahi hua.");
      }

      onSuccess(
        data.message || "Admin created! Credentials sent via email."
      );
    } catch (err) {
      setError(getError(err, "Admin create nahi hua."));
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C8A253] focus:ring-4 focus:ring-[#C8A253]/10 disabled:opacity-60";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/30 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF5E9] text-[#A67D2D]">
              <ShieldCheck size={24} />
            </span>

            <h2
              id={titleId}
              className="text-xl font-semibold tracking-tight"
            >
              Create Admin Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Temporary login credentials will be sent to this
              email address.
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            disabled={loading}
            aria-label="Close create admin form"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor={nameId}
              className="text-sm font-medium text-slate-700"
            >
              Full name
            </label>

            <input
              id={nameId}
              type="text"
              autoComplete="name"
              autoFocus
              required
              disabled={loading}
              value={form.name}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              placeholder="Enter full name"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor={emailId}
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id={emailId}
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              value={form.email}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              placeholder="name@example.com"
              className={inputClass}
            />
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-[#FCFAF5] p-4">
            <Mail
              size={18}
              className="mt-0.5 shrink-0 text-[#A67D2D]"
            />
            <p className="text-xs leading-5 text-slate-600">
              Email address check kar lo. Isi address par admin
              ke login details jayenge.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={close}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C8A253] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#B89140] disabled:opacity-50"
            >
              {loading && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {loading ? "Creating..." : "Create & Send Email"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon size={22} />
      </span>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function joinedDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const requestRef = useRef(0);
  const mutationRef = useRef(false);

  const showToast = (message, type = "success") =>
    setToast({ message, type });

  const fetchAdmins = useCallback(async () => {
    const requestId = ++requestRef.current;

    setLoading(true);
    setLoadError("");

    try {
      const { data } = await api.get("/Superadmin/all-admins");

      if (!data?.success || !Array.isArray(data.data)) {
        throw new Error("Admin list ka response sahi nahi mila.");
      }

      if (requestId === requestRef.current) {
        setAdmins(data.data);
      }
    } catch (err) {
      if (requestId === requestRef.current) {
        setLoadError(getError(err, "Failed to load admins."));
      }
    } finally {
      if (requestId === requestRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchAdmins();

    return () => {
      requestRef.current += 1;
    };
  }, [fetchAdmins]);

  const handleToggle = async (admin) => {
    if (mutationRef.current) return;

    mutationRef.current = true;
    setBusyId(admin._id);

    try {
      const { data } = await api.put(
        `/Superadmin/${admin._id}/toggle-status`
      );

      if (!data?.success || typeof data.isActive !== "boolean") {
        throw new Error("Status update confirm nahi hua.");
      }

      setAdmins((previous) =>
        previous.map((item) =>
          item._id === admin._id
            ? { ...item, isActive: data.isActive }
            : item
        )
      );

      showToast(data.message || "Admin status updated.");
    } catch (err) {
      showToast(
        getError(err, "Failed to update admin status."),
        "error"
      );
    } finally {
      mutationRef.current = false;
      setBusyId(null);
    }
  };

  const handleDelete = async (admin) => {
    if (mutationRef.current) return;

    const confirmed = window.confirm(
      `Permanently delete ${admin.name || admin.email}?\n\nThis cannot be undone.`
    );

    if (!confirmed) return;

    mutationRef.current = true;
    setBusyId(admin._id);

    try {
      const { data } = await api.delete(
        `/Superadmin/${admin._id}`
      );

      if (!data?.success) {
        throw new Error("Admin delete confirm nahi hua.");
      }

      setAdmins((previous) =>
        previous.filter((item) => item._id !== admin._id)
      );

      showToast(data.message || "Admin deleted.");
    } catch (err) {
      showToast(getError(err, "Failed to delete admin."), "error");
    } finally {
      mutationRef.current = false;
      setBusyId(null);
    }
  };

  const activeCount = admins.filter(
    (admin) => admin.isActive === true
  ).length;

  const suspendedCount = admins.filter(
    (admin) => admin.isActive === false
  ).length;

  const query = search.trim().toLowerCase();

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch = `${admin.name || ""} ${admin.email || ""}`
      .toLowerCase()
      .includes(query);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && admin.isActive === true) ||
      (statusFilter === "suspended" && admin.isActive === false);

    return matchesSearch && matchesStatus;
  });

  const summaryValue = (value) =>
    loading || loadError ? "—" : value;

  return (
    <div className="space-y-7 text-slate-900">
      <title>Manage Admins | Truee Super Admin</title>
      <meta name="robots" content="noindex,nofollow" />

      {toast && (
        <Toast
          toast={toast}
          onClose={() => setToast(null)}
        />
      )}

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
            Team management
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Manage Admins
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create admin accounts and manage their status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#C8A253] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#B89140]"
        >
          <Plus size={18} />
          New Admin
        </button>
      </header>

      <section
        aria-label="Admin account summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <SummaryCard
          title="Total Admins"
          value={summaryValue(admins.length)}
          icon={Users}
          color="bg-[#FAF5E9] text-[#A67D2D]"
        />
        <SummaryCard
          title="Active Admins"
          value={summaryValue(activeCount)}
          icon={UserCheck}
          color="bg-emerald-50 text-emerald-600"
        />
        <SummaryCard
          title="Suspended Admins"
          value={summaryValue(suspendedCount)}
          icon={UserX}
          color="bg-rose-50 text-rose-600"
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold">
              Admin Accounts
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage your store administration team.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
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
                aria-label="Search admins by name or email"
                placeholder="Search name or email..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-[#C8A253] sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              aria-label="Filter admins by status"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#C8A253]"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <button
              type="button"
              onClick={fetchAdmins}
              disabled={loading || busyId !== null}
              aria-label="Refresh admin list"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {loading ? (
          <div
            role="status"
            className="flex items-center justify-center gap-3 px-6 py-16 text-sm text-slate-500"
          >
            <Loader2 size={20} className="animate-spin" />
            Loading admin accounts...
          </div>
        ) : loadError ? (
          <div role="alert" className="p-8 text-center">
            <AlertCircle
              size={28}
              className="mx-auto text-red-500"
            />
            <p className="mt-3 text-sm text-red-600">
              {loadError}
            </p>
            <button
              type="button"
              onClick={fetchAdmins}
              className="mt-4 text-sm font-semibold text-[#967025] underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF5E9] text-[#A67D2D]">
              <Users size={26} />
            </span>

            <h3 className="mt-4 text-base font-semibold">
              {admins.length
                ? "No matching admins"
                : "No admin accounts yet"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {admins.length
                ? "Try another search or status filter."
                : "Use New Admin to create your first account."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Admin",
                      "Email address",
                      "Status",
                      "Joined",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredAdmins.map((admin) => {
                    const isBusy = busyId === admin._id;
                    const active = admin.isActive === true;
                    const suspended = admin.isActive === false;

                    return (
                      <tr
                        key={admin._id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3EBD7] font-semibold text-[#967025]">
                              {(admin.name || "A")
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                            <div>
                              <p className="font-semibold text-slate-800">
                                {admin.name || "Unnamed admin"}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                Admin
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-slate-600">
                          {admin.email || "—"}
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              active
                                ? "bg-emerald-50 text-emerald-700"
                                : suspended
                                  ? "bg-rose-50 text-rose-700"
                                  : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {active
                              ? "Active"
                              : suspended
                                ? "Suspended"
                                : "Unknown"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-5 text-slate-500">
                          {joinedDate(admin.createdAt)}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggle(admin)}
                              disabled={
                                busyId !== null ||
                                (!active && !suspended)
                              }
                              aria-label={`${
                                active ? "Suspend" : "Reactivate"
                              } ${admin.name || "admin"}`}
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-40 ${
                                active
                                  ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              }`}
                            >
                              {isBusy && (
                                <Loader2
                                  size={13}
                                  className="animate-spin"
                                />
                              )}
                              {active ? "Suspend" : "Reactivate"}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(admin)}
                              disabled={busyId !== null}
                              aria-label={`Delete ${
                                admin.name || "admin"
                              }`}
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-40"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
              Showing {filteredAdmins.length} of {admins.length}{" "}
              admin accounts
            </div>
          </>
        )}
      </section>

      {showModal && (
        <CreateAdminModal
          onClose={() => setShowModal(false)}
          onSuccess={(message) => {
            setShowModal(false);
            showToast(message);
            fetchAdmins();
          }}
        />
      )}
    </div>
  );
}