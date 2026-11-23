import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import BlogImageUpload from "../../components/BlogImageUpload";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Education & Technology",
  authorName: "Truee",
  coverImage: "",
  coverImageAlt: "",
  logoImage: "",
  logoAlt: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  showOnHome: false,
};

const makeSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getError = (error) => {
  const data = error.response?.data;

  return (
    data?.message ||
    data?.error ||
    error.message ||
    "Request failed. Please try again."
  );
};

function Field({ label, multiline = false, ...props }) {
  const className =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 " +
    "text-sm text-gray-900 outline-none focus:border-[#C8A253] " +
    "focus:ring-2 focus:ring-[#C8A253]/15 disabled:opacity-60";

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>

      {multiline ? (
        <textarea {...props} className={className} />
      ) : (
        <input {...props} className={className} />
      )}
    </label>
  );
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/blogs/manage/all"
        );

        if (!data?.success) {
          throw new Error("Unable to load blogs.");
        }

        if (!cancelled) {
          setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
        }
      } catch (error) {
        if (!cancelled) {
          setNotice({
            type: "error",
            text: getError(error),
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const editBlog = (blog) => {
    const nextForm = { ...emptyForm };

    Object.keys(emptyForm).forEach((key) => {
      nextForm[key] = blog[key] ?? emptyForm[key];
    });

    setForm(nextForm);
    setEditingId(blog._id);
    setNotice(null);

    document.getElementById("blog-editor")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (busy) return;

    setNotice(null);

    const payload = {
      ...form,
      title: form.title.trim(),
      slug: makeSlug(form.slug || form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      coverImage: form.coverImage.trim(),
      coverImageAlt: form.coverImageAlt.trim(),
      logoImage: form.logoImage.trim(),
      logoAlt: form.logoAlt.trim(),
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
    };

    if (
      !payload.title ||
      !payload.slug ||
      !payload.excerpt ||
      !payload.content
    ) {
      setNotice({
        type: "error",
        text: "Title, valid slug, short description aur full article bharo.",
      });
      return;
    }

    if (
      payload.status === "published" &&
      (!payload.coverImage || !payload.coverImageAlt)
    ) {
      setNotice({
        type: "error",
        text: "Publish karne ke liye cover image aur uska alt text bharo.",
      });
      return;
    }

    if (
      payload.status === "published" &&
      payload.logoImage &&
      !payload.logoAlt
    ) {
      setNotice({
        type: "error",
        text: "Logo ka alt text bhi bharo.",
      });
      return;
    }

    setBusy(true);

    try {
      const { data } = editingId
        ? await axiosInstance.put(
            `/blogs/manage/${editingId}`,
            payload
          )
        : await axiosInstance.post(
            "/blogs/manage",
            payload
          );

      if (!data?.success || !data.blog?._id) {
        throw new Error("Unable to save blog.");
      }

      setBlogs((previous) => [
        data.blog,
        ...previous.filter(
          (blog) => blog._id !== data.blog._id
        ),
      ]);

      resetForm();

      setNotice({
        type: "success",
        text:
          data.blog.status === "published"
            ? "Blog Published status mein save ho gaya."
            : "Blog Draft mein save ho gaya.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: getError(error),
      });
    } finally {
      setBusy(false);
    }
  };

  const deleteBlog = async (blog) => {
    if (busy) return;

    const confirmed = window.confirm(
      `"${blog.title}" permanently delete karna hai?`
    );

    if (!confirmed) return;

    setBusy(true);
    setNotice(null);

    try {
      const { data } = await axiosInstance.delete(
        `/blogs/manage/${blog._id}`
      );

      if (!data?.success) {
        throw new Error("Unable to delete blog.");
      }

      setBlogs((previous) =>
        previous.filter((item) => item._id !== blog._id)
      );

      if (editingId === blog._id) {
        resetForm();
      }

      setNotice({
        type: "success",
        text: "Blog delete ho gaya.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: getError(error),
      });
    } finally {
      setBusy(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    `${blog.title} ${blog.category} ${blog.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const seoTitle =
    form.seoTitle.trim() ||
    `${form.title.trim() || "Article Title"} | Truee`;

  const seoDescription =
    form.seoDescription.trim() || form.excerpt.trim();

  const slugPreview = makeSlug(form.slug || form.title);

  return (
    <div className="rounded-2xl bg-[#faf9f6] p-4 text-gray-900 sm:p-6">
      <title>Manage Blogs | Truee</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a17d35]">
          Truee Journal
        </p>

        <h1 className="mt-2 text-3xl font-serif">
          Blog Management
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Articles, images aur SEO details yahan manage karo.
        </p>
      </div>

      {notice && (
        <div
          role={notice.type === "error" ? "alert" : "status"}
          className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
            notice.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-800"
          }`}
        >
          {notice.text}
        </div>
      )}

      <section
        id="blog-editor"
        className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-serif">
            {editingId ? "Edit Blog" : "Add New Blog"}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={busy}
              className="text-sm underline disabled:opacity-50"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSave}>
          <fieldset
            disabled={busy}
            className="min-w-0 space-y-5"
          >
            <Field
              label="Blog Title *"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={200}
              placeholder="AI Gurukl: AI Learning for School Students"
            />

            <Field
              label="Slug — URL ka aakhri hissa"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              maxLength={200}
              placeholder="ai-gurukl-school-learning"
            />

            <p className="text-xs text-gray-500">
              Khali chhodne par title se slug banega.
              Published article ka slug badalne se purana
              link badal jayega.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                maxLength={100}
              />

              <Field
                label="Author Name"
                name="authorName"
                value={form.authorName}
                onChange={handleChange}
                maxLength={100}
              />
            </div>

            <Field
              label="Short Description — card par dikhegi *"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              multiline
              rows={3}
              required
              maxLength={500}
            />

            <Field
              label="Full Article *"
              name="content"
              value={form.content}
              onChange={handleChange}
              multiline
              rows={14}
              required
              maxLength={100000}
              placeholder="Article plain text mein likho. Paragraph ke beech ek khali line chhodo."
            />

            <div className="border-t border-gray-100 pt-6">
              <h3 className="mb-4 text-lg font-serif">
                Cover Image & Logo
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="min-w-0 space-y-4">
                  <Field
                    label="Cover Image URL / Path"
                    name="coverImage"
                    value={form.coverImage}
                    onChange={handleChange}
                    placeholder="Upload karne par yahan link bhar jayega"
                    required={form.status === "published"}
                  />

                  <Field
                    label="Cover Image Alt Text"
                    name="coverImageAlt"
                    value={form.coverImageAlt}
                    onChange={handleChange}
                    maxLength={250}
                    placeholder="Image mein kya dikh raha hai?"
                    required={form.status === "published"}
                  />

                  <BlogImageUpload
                    key={`cover-${editingId || "new"}`}
                    value={form.coverImage}
                    alt={form.coverImageAlt}
                    label="Choose Cover Image"
                    disabled={busy}
                    onUploaded={(url) =>
                      setForm((previous) => ({
                        ...previous,
                        coverImage: url,
                      }))
                    }
                  />
                </div>

                <div className="min-w-0 space-y-4">
                  <Field
                    label="Logo URL / Path"
                    name="logoImage"
                    value={form.logoImage}
                    onChange={handleChange}
                    placeholder="Upload karne par yahan link bhar jayega"
                  />

                  <Field
                    label="Logo Alt Text"
                    name="logoAlt"
                    value={form.logoAlt}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="AI Gurukl logo"
                    required={
                      form.status === "published" &&
                      Boolean(form.logoImage.trim())
                    }
                  />

                  <BlogImageUpload
                    key={`logo-${editingId || "new"}`}
                    value={form.logoImage}
                    alt={form.logoAlt}
                    label="Choose Logo"
                    disabled={busy}
                    onUploaded={(url) =>
                      setForm((previous) => ({
                        ...previous,
                        logoImage: url,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="mb-4 text-lg font-serif">
                SEO Settings
              </h3>

              <div className="space-y-4">
                <Field
                  label={`SEO Title (${form.seoTitle.length}/100)`}
                  name="seoTitle"
                  value={form.seoTitle}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="AI Gurukl: AI Learning for Schools | Truee"
                />

                <Field
                  label={`SEO Description (${form.seoDescription.length}/300)`}
                  name="seoDescription"
                  value={form.seoDescription}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  maxLength={300}
                  placeholder="Article ka clear aur short summary likho."
                />
              </div>

              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Search Preview — example
                </p>

                <p className="break-all text-xs text-green-800">
                  https://truee.in/blog/
                  {slugPreview || "article-slug"}
                </p>

                <p className="mt-2 break-words text-xl text-blue-800">
                  {seoTitle}
                </p>

                <p className="mt-2 break-words text-sm text-gray-600">
                  {seoDescription ||
                    "SEO description yahan dikhegi."}
                </p>

                <p className="mt-4 text-xs text-gray-400">
                  Ye form ka preview hai. Google apna title
                  ya description bhi dikha sakta hai.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-t border-gray-100 pt-6">
              <label className="block text-sm font-medium">
                Status

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="ml-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="showOnHome"
                  checked={form.showOnHome}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#C8A253]"
                />

                Show on Homepage
              </label>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#C8A253] px-7 py-3 text-sm font-bold text-black transition hover:bg-[#b89244] disabled:opacity-50"
            >
              {busy
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "Save Blog"}
            </button>
          </fieldset>
        </form>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-serif">
            Saved Blogs ({blogs.length})
          </h2>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search blogs..."
            aria-label="Search saved blogs"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#C8A253]"
          />
        </div>

        {loading ? (
          <p role="status" className="py-6 text-gray-500">
            Loading blogs...
          </p>
        ) : filteredBlogs.length === 0 ? (
          <p className="py-6 text-gray-500">
            {blogs.length
              ? "Search se koi blog nahi mila."
              : "Abhi koi blog save nahi hai. Upar form bharo."}
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-wrap items-center justify-between gap-4 py-5"
              >
                <div className="min-w-0">
                  <h3 className="break-words font-semibold">
                    {blog.title}
                  </h3>

                  <p className="mt-1 break-all text-xs text-gray-500">
                    /blog/{blog.slug}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        blog.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {blog.status === "published"
                        ? "Published"
                        : "Draft"}
                    </span>

                    {blog.showOnHome && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        Homepage selected
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => editBlog(blog)}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => deleteBlog(blog)}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}