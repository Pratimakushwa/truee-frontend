

import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  Trash2,
  PlusCircle,
  Loader2,
  Tag,
  Settings,
  Users,
  MonitorPlay,
} from "lucide-react";

const inputClass =
  "w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8A253] focus:ring-4 focus:ring-[#C8A253]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

function Field({ label, children, className = "" }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-2 block text-xs font-medium text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

function FormSection({ title, icon: Icon, children }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FAF5E9] text-[#A67D2D]">
          <Icon size={18} />
        </span>
        <h3 className="text-sm font-semibold text-slate-800">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

export default function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    campaignType: "Festival",
    name: "",
    code: "",
    description: "",
    discountType: "flat",
    discountValue: "",
    maxDiscount: "",
    startDate: "",
    expiryDate: "",
    status: "Active",
    minOrderValue: "",
    maxOrderValue: "",
    applicableFor: "All Users",
    isFirstOrderOnly: false,
    applicableBrand: "All",
    applicableCategory: "All",
    usageLimit: "",
    perUserLimit: 1,
    showOn: [],
    isReward: false,
    rewardCondition: "",
    rewardCode: "",
    autoApply: false,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/coupons/all");
      setCoupons(data.coupons || []);
    } catch (err) {
      console.error("Error fetching coupons", err);
    } finally {
      setLoading(false);
    }
  };

  const updateCouponStatus = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/coupons/update/${id}`, {
        status: newStatus,
      });
      fetchCoupons();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleDateUpdate = async (id, newDate) => {
    try {
      await axiosInstance.put(`/coupons/update-date/${id}`, {
        newExpiryDate: newDate,
      });
      fetchCoupons();
    } catch (err) {
      alert("Error updating expiry date");
      console.error(err);
    }
  };

  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  const handleCheckboxChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.checked,
    });
  };

  const handleShowOnChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      showOn: prev.showOn.includes(value)
        ? prev.showOn.filter((item) => item !== value)
        : [...prev.showOn, value],
    }));
  };

  const createCoupon = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/coupons/create", formData);
      alert("Coupon Created Successfully!");

      setFormData({
        campaignType: "Festival",
        name: "",
        code: "",
        description: "",
        discountType: "flat",
        discountValue: "",
        maxDiscount: "",
        startDate: "",
        expiryDate: "",
        status: "Active",
        minOrderValue: "",
        maxOrderValue: "",
        applicableFor: "All Users",
        isFirstOrderOnly: false,
        applicableBrand: "All",
        applicableCategory: "All",
        usageLimit: "",
        perUserLimit: 1,
        showOn: [],
        isReward: false,
        rewardCondition: "",
        rewardCode: "",
        autoApply: false,
      });

      fetchCoupons();
    } catch (err) {
      alert(
        err.response?.data?.message || "Error creating coupon"
      );
    }
  };

  const deleteCoupon = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this campaign?"
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(`/coupons/${id}`);
      fetchCoupons();
    } catch (err) {
      alert("Error deleting coupon");
    }
  };

  return (
    <div className="space-y-7 text-slate-900">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67D2D]">
          Offers & campaigns
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Coupon Management
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Create offers and manage coupon validity and placements.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FAF5E9] text-[#A67D2D]">
            <PlusCircle size={23} />
          </span>

          <div>
            <h2 className="text-lg font-semibold">
              Create New Campaign
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Configure the offer and choose where it appears.
            </p>
          </div>
        </div>

        <form
          onSubmit={createCoupon}
          className="space-y-8 p-5 sm:p-6"
        >
          <FormSection title="1. Campaign Information" icon={Tag}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Campaign type">
                <select
                  value={formData.campaignType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      campaignType: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="Festival">Festival Offer</option>
                  <option value="Brand Offer">Brand Offer</option>
                  <option value="Welcome Offer">Welcome Offer</option>
                  <option value="Checkout Offer">Checkout Offer</option>
                </select>
              </Field>

              <Field label="Coupon name">
                <input
                  type="text"
                  placeholder="e.g. Diwali Sale"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Coupon code">
                <input
                  type="text"
                  placeholder="e.g. DIWALI500"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className={`${inputClass} font-semibold uppercase tracking-wider`}
                  required
                />
              </Field>

              <Field label="Status">
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </Field>
            </div>

            <Field label="Description">
              <input
                type="text"
                placeholder="e.g. Get ₹500 OFF on your first purchase"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className={inputClass}
              />
            </Field>
          </FormSection>

          <div className="border-t border-slate-100" />

          <FormSection
            title="2. Discount Rules & Validity"
            icon={Settings}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Discount type">
                <select
                  value={formData.discountType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountType: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="flat">Flat Discount (₹)</option>
                  <option value="percentage">Percentage (%)</option>
                  <option value="free_shipping">Free Shipping</option>
                </select>
              </Field>

              <Field label="Discount value">
                <input
                  type="number"
                  placeholder="Enter discount value"
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountValue: e.target.value,
                    })
                  }
                  className={inputClass}
                  required={formData.discountType !== "free_shipping"}
                  disabled={formData.discountType === "free_shipping"}
                />
              </Field>

              <Field label="Maximum discount (₹)">
                <input
                  type="number"
                  placeholder="Only for percentage discounts"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxDiscount: e.target.value,
                    })
                  }
                  className={inputClass}
                  disabled={formData.discountType !== "percentage"}
                  title="Only for Percentage"
                />
              </Field>

              <Field label="Start date">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Expiry date">
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiryDate: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </Field>
            </div>
          </FormSection>

          <div className="border-t border-slate-100" />

          <FormSection title="3. Targeting & Limits" icon={Users}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Minimum order amount (₹)">
                <input
                  type="number"
                  placeholder="Minimum order amount"
                  value={formData.minOrderValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minOrderValue: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Total usage limit">
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usageLimit: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Applicable users">
                <select
                  value={formData.applicableFor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicableFor: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="All Users">All Users</option>
                  <option value="New Users">New Users Only</option>
                  <option value="Premium Users">Premium Users Only</option>
                </select>
              </Field>

              <Field label="Applicable brand">
                <select
                  value={formData.applicableBrand}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicableBrand: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="All">All Brands</option>
                  <option value="Marshall">Marshall</option>
                  <option value="Sony">Sony</option>
                  <option value="Bose">Bose</option>
                </select>
              </Field>
            </div>
          </FormSection>

          <div className="border-t border-slate-100" />

          <FormSection title="4. Display Settings" icon={MonitorPlay}>
            <div className="flex flex-wrap gap-5 rounded-2xl border border-[#EDE3CF] bg-[#FCFAF5] p-4">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isFirstOrderOnly}
                  onChange={(e) =>
                    handleCheckboxChange(e, "isFirstOrderOnly")
                  }
                  className="h-4 w-4 accent-[#A67D2D]"
                />
                First Order Only
              </label>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.autoApply}
                  onChange={(e) =>
                    handleCheckboxChange(e, "autoApply")
                  }
                  className="h-4 w-4 accent-[#A67D2D]"
                />
                Auto Apply Coupon
              </label>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#967025]">
                <input
                  type="checkbox"
                  checked={formData.isReward}
                  onChange={(e) =>
                    handleCheckboxChange(e, "isReward")
                  }
                  className="h-4 w-4 accent-[#A67D2D]"
                />
                Set as Reward Coupon
              </label>
            </div>

            <fieldset className="rounded-2xl border border-slate-200 p-4">
              <legend className="px-2 text-sm font-medium text-slate-700">
                Coupon visibility
              </legend>

              <p className="mb-4 text-xs text-slate-500">
                Choose one or more placements.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Home Banner",
                  "Product Page",
                  "Checkout Page",
                  "Payment Success",
                  "My Coupons",
                ].map((place) => (
                  <label
                    key={place}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      formData.showOn.includes(place)
                        ? "border-[#DEC99E] bg-[#FAF5E9] text-[#8C6927]"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={place}
                      checked={formData.showOn.includes(place)}
                      onChange={handleShowOnChange}
                      className="h-4 w-4 accent-[#A67D2D]"
                    />
                    {place}
                  </label>
                ))}
              </div>
            </fieldset>
          </FormSection>

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8A253] px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-[#B89140] sm:w-auto"
            >
              <PlusCircle size={18} />
              Publish Campaign
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Campaigns & Database
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage campaign status, expiry dates and placements.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {[
                  "Campaign",
                  "Code",
                  "Discount",
                  "Status",
                  "Placements",
                  "Used",
                  "Expiry",
                  "Action",
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
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center">
                    <Loader2
                      className="mx-auto animate-spin text-[#A67D2D]"
                      size={28}
                      aria-label="Loading campaigns"
                    />
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="p-12 text-center text-sm text-slate-500"
                  >
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr
                    key={c._id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {c.name}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg border border-[#EADFC7] bg-[#FCFAF5] px-2.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-[#967025]">
                        {c.code}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs font-semibold text-slate-700">
                      {c.discountType === "percentage"
                        ? `${c.discountValue}%`
                        : `₹${c.discountValue}`}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          updateCouponStatus(c._id, e.target.value)
                        }
                        aria-label={`Status for ${c.code}`}
                        className={`cursor-pointer rounded-lg border px-2.5 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#C8A253]/30 ${
                          c.status === "Active"
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-red-100 bg-red-50 text-red-700"
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {c.showOn?.join(", ") || "Hidden"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {c.usedCount || 0}
                    </td>

                    <td className="px-5 py-4">
                      <input
                        type="date"
                        value={formatDateForInput(c.expiryDate)}
                        onChange={(e) =>
                          handleDateUpdate(c._id, e.target.value)
                        }
                        aria-label={`Expiry date for ${c.code}`}
                        className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none focus:border-[#C8A253] focus:ring-2 focus:ring-[#C8A253]/10"
                      />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => deleteCoupon(c._id)}
                        aria-label={`Delete campaign ${c.name}`}
                        className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}