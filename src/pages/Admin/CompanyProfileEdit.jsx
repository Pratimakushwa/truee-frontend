// import { useState, useEffect } from 'react';
// import api from '../../utils/axiosInstance';
// import Toast from '../../components/Toast';

// function Section({ title, children }) {
//   return (
//     <div className="rounded-xl border border-[#C8A253]/10 bg-[#111] p-6 mb-6">
//       <h3 className="text-sm font-semibold text-[#C8A253] uppercase tracking-wider mb-5">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value, onChange, type = 'text', full = false }) {
//   return (
//     <div className={`relative ${full ? 'md:col-span-2' : ''}`}>
//       <input
//         type={type}
//         value={value || ''}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder=" "
//         className="peer w-full bg-white border border-[#C8A253]/20 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none focus:border-[#C8A253]/60 transition-colors"
//       />
//       <label className="absolute left-4 top-1 text-[10px] text-[#C8A253] uppercase tracking-widest pointer-events-none">
//         {label}
//       </label>
//     </div>
//   );
// }

// export default function CompanyProfileEdit() {
//   const [form, setForm]     = useState(null);
//   const [loading, setLoading]   = useState(true);
//   const [saving, setSaving]     = useState(false);
//   const [toast, setToast]       = useState(null);

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   useEffect(() => {
//     api.get('/Superadmin/company-profile')
//       .then((res) => setForm(res.data.data))
//       .catch((err) => showToast(err.response?.data?.error || 'Failed to load profile.', 'error'))
//       .finally(() => setLoading(false));
//   }, []);

//   const set = (path, value) => {
//     const keys = path.split('.');
//     setForm((prev) => {
//       const next = { ...prev };
//       let cur = next;
//       for (let i = 0; i < keys.length - 1; i++) {
//         cur[keys[i]] = { ...cur[keys[i]] };
//         cur = cur[keys[i]];
//       }
//       cur[keys[keys.length - 1]] = value;
//       return next;
//     });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await api.put('/Superadmin/company-profile', form);
//       showToast('Company profile updated successfully.');
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Save failed.', 'error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;
//   if (!form)   return <p className="text-gray-500 text-sm">Profile not found.</p>;

//   return (
//     <div>
//       {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-serif text-[#C8A253]">Company Profile</h1>
//           <p className="text-gray-500 text-sm mt-1">Update your company's registered information</p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="px-6 py-2.5 rounded-lg bg-[#C8A253] text-black text-sm font-semibold hover:bg-[#d4af65] disabled:opacity-50 transition-colors"
//         >
//           {saving ? 'Saving...' : 'Save Changes'}
//         </button>
//       </div>

//       <Section title="Core Details">
//         <Field label="Company Name"   value={form.companyName}   onChange={(v) => set('companyName', v)} />
//         <Field label="Brand Name"     value={form.brandName}     onChange={(v) => set('brandName', v)} />
//         <Field label="Contact Email"  value={form.contactEmail}  onChange={(v) => set('contactEmail', v)}  type="email" />
//         <Field label="Contact Phone"  value={form.contactPhone}  onChange={(v) => set('contactPhone', v)} />
//       </Section>

//       <Section title="Tax Details">
//         <Field label="GST Number" value={form.taxDetails?.gstNumber} onChange={(v) => set('taxDetails.gstNumber', v)} />
//         <Field label="PAN Number" value={form.taxDetails?.panNumber} onChange={(v) => set('taxDetails.panNumber', v)} />
//       </Section>

//       <Section title="Registered Address">
//         <Field label="Street"  value={form.registeredAddress?.street}  onChange={(v) => set('registeredAddress.street', v)}  full />
//         <Field label="City"    value={form.registeredAddress?.city}    onChange={(v) => set('registeredAddress.city', v)} />
//         <Field label="State"   value={form.registeredAddress?.state}   onChange={(v) => set('registeredAddress.state', v)} />
//         <Field label="Pincode" value={form.registeredAddress?.pincode} onChange={(v) => set('registeredAddress.pincode', v)} />
//         <Field label="Country" value={form.registeredAddress?.country} onChange={(v) => set('registeredAddress.country', v)} />
//       </Section>

//       <Section title="Bank Details">
//         <Field label="Account Holder" value={form.bankDetails?.accountHolderName} onChange={(v) => set('bankDetails.accountHolderName', v)} />
//         <Field label="Account Number" value={form.bankDetails?.accountNumber}      onChange={(v) => set('bankDetails.accountNumber', v)} />
//         <Field label="IFSC Code"      value={form.bankDetails?.ifscCode}           onChange={(v) => set('bankDetails.ifscCode', v)} />
//         <Field label="Bank Name"      value={form.bankDetails?.bankName}           onChange={(v) => set('bankDetails.bankName', v)} />
//         <Field label="Branch"         value={form.bankDetails?.branch}             onChange={(v) => set('bankDetails.branch', v)} />
//       </Section>
//     </div>
//   );
// }

import { useState, useEffect, useId } from "react";
import {
  Building2,
  ReceiptText,
  MapPin,
  Landmark,
  Save,
  Loader2,
} from "lucide-react";

import api from "../../utils/axiosInstance";
import Toast from "../../components/Toast";

function Section({ title, description, Icon, children }) {
  return (
    <section className="mb-6 overflow-hidden rounded-[20px] border border-[#E7E9ED] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.025)]">
      <div className="flex items-start gap-3 border-b border-[#F0F1F3] px-5 py-5 sm:px-7">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#EFE5D0] bg-[#FBF7EE] text-[#A17C37]">
          <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
        </span>

        <div>
          <h2 className="text-[14px] font-semibold text-[#252525]">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 sm:p-7">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  full = false,
}) {
  const id = useId();

  return (
    <div className={`min-w-0 ${full ? "md:col-span-2" : ""}`}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium text-[#555D68]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#DFE3E8] bg-[#FCFCFD] px-4 py-3.5 text-sm text-[#252525] outline-none transition-colors placeholder:text-gray-400 focus:border-[#C8A253] focus:bg-white focus:ring-2 focus:ring-[#C8A253]/10"
      />
    </div>
  );
}

export default function CompanyProfileEdit() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    let cancelled = false;

    api
      .get("/Superadmin/company-profile")
      .then((res) => {
        if (!cancelled) {
          setForm(res.data.data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          showToast(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Failed to load profile.",
            "error"
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const set = (path, value) => {
    const keys = path.split(".");

    setForm((prev) => {
      const next = { ...prev };
      let current = next;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSave = async () => {
    if (saving || !form) return;

    setSaving(true);

    try {
      await api.put("/Superadmin/company-profile", form);
      showToast("Company profile updated successfully.");
    } catch (err) {
      showToast(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Save failed.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const toastElement = toast ? (
    <Toast
      toast={toast}
      onClose={() => setToast(null)}
    />
  ) : null;

  if (loading) {
    return (
      <div
        role="status"
        className="flex min-h-[45vh] items-center justify-center gap-3 text-sm text-gray-500"
      >
        <Loader2
          size={20}
          className="animate-spin text-[#A17C37]"
          aria-hidden="true"
        />
        Loading company profile...
      </div>
    );
  }

  if (!form) {
    return (
      <>
        {toastElement}

        <div className="rounded-2xl border border-[#E7E9ED] bg-white px-6 py-14 text-center">
          <Building2
            size={30}
            className="mx-auto mb-4 text-[#A17C37]"
            aria-hidden="true"
          />

          <h1 className="font-serif text-2xl text-[#252525]">
            Profile unavailable
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Company profile could not be loaded.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="text-[#252525]">
      <title>Company Profile | Truee Super Admin</title>
      <meta name="robots" content="noindex, nofollow" />

      {toastElement}

      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#A17C37]">
            Business Settings
          </p>

          <h1 className="font-serif text-3xl tracking-tight text-[#252525]">
            Company Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Manage your company information, address and bank details.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex self-start items-center justify-center gap-2 rounded-xl bg-[#C8A253] px-5 py-3 text-xs font-semibold text-[#231D11] shadow-sm transition-colors hover:bg-[#B99143] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          {saving ? (
            <Loader2
              size={16}
              className="animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Save size={16} aria-hidden="true" />
          )}

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <Section
        title="Core Details"
        description="Company identity and contact information."
        Icon={Building2}
      >
        <Field
          label="Company Name"
          value={form.companyName}
          onChange={(value) => set("companyName", value)}
        />

        <Field
          label="Brand Name"
          value={form.brandName}
          onChange={(value) => set("brandName", value)}
        />

        <Field
          label="Contact Email"
          type="email"
          value={form.contactEmail}
          onChange={(value) => set("contactEmail", value)}
        />

        <Field
          label="Contact Phone"
          value={form.contactPhone}
          onChange={(value) => set("contactPhone", value)}
        />
      </Section>

      <Section
        title="Tax Details"
        description="Registered tax identification details."
        Icon={ReceiptText}
      >
        <Field
          label="GST Number"
          value={form.taxDetails?.gstNumber}
          onChange={(value) => set("taxDetails.gstNumber", value)}
        />

        <Field
          label="PAN Number"
          value={form.taxDetails?.panNumber}
          onChange={(value) => set("taxDetails.panNumber", value)}
        />
      </Section>

      <Section
        title="Registered Address"
        description="Your company's registered business location."
        Icon={MapPin}
      >
        <Field
          label="Street"
          value={form.registeredAddress?.street}
          onChange={(value) =>
            set("registeredAddress.street", value)
          }
          full
        />

        <Field
          label="City"
          value={form.registeredAddress?.city}
          onChange={(value) =>
            set("registeredAddress.city", value)
          }
        />

        <Field
          label="State"
          value={form.registeredAddress?.state}
          onChange={(value) =>
            set("registeredAddress.state", value)
          }
        />

        <Field
          label="Pincode"
          value={form.registeredAddress?.pincode}
          onChange={(value) =>
            set("registeredAddress.pincode", value)
          }
        />

        <Field
          label="Country"
          value={form.registeredAddress?.country}
          onChange={(value) =>
            set("registeredAddress.country", value)
          }
        />
      </Section>

      <Section
        title="Bank Details"
        description="Company bank account information."
        Icon={Landmark}
      >
        <Field
          label="Account Holder"
          value={form.bankDetails?.accountHolderName}
          onChange={(value) =>
            set("bankDetails.accountHolderName", value)
          }
        />

        <Field
          label="Account Number"
          value={form.bankDetails?.accountNumber}
          onChange={(value) =>
            set("bankDetails.accountNumber", value)
          }
        />

        <Field
          label="IFSC Code"
          value={form.bankDetails?.ifscCode}
          onChange={(value) =>
            set("bankDetails.ifscCode", value)
          }
        />

        <Field
          label="Bank Name"
          value={form.bankDetails?.bankName}
          onChange={(value) =>
            set("bankDetails.bankName", value)
          }
        />

        <Field
          label="Branch"
          value={form.bankDetails?.branch}
          onChange={(value) =>
            set("bankDetails.branch", value)
          }
        />
      </Section>
    </div>
  );
}