import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  Code2,
  PenTool,
  Palette,
  Smartphone,
  Video,
  Image,
  BookOpen,
  Briefcase,
  Feather,
  Layers,
  Globe,
  Monitor,
  Camera,
  Shield,
  Cpu,
  Database,
  Wrench,
  Headphones,
  ShoppingCart,
  GraduationCap,
  Building2,
  Users,
  Rocket,
  MessageSquareText,
  Workflow,
  BadgeCheck,
  Sparkles,
  AppWindow,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { adminAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

const ICON_OPTIONS = [
  "Code2",
  "PenTool",
  "Palette",
  "Smartphone",
  "Video",
  "Image",
  "BookOpen",
  "Briefcase",
  "Feather",
  "Layers",
  "Globe",
  "Monitor",
  "Camera",
  "Shield",
  "Cpu",
  "Database",
  "Wrench",
  "Headphones",
  "ShoppingCart",
  "GraduationCap",
  "Building2",
  "Users",
  "Rocket",
  "MessageSquareText",
  "Workflow",
  "BadgeCheck",
  "Sparkles",
  "AppWindow",
];

const CATEGORY_OPTIONS = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "Copywriting",
  "Marketing",
  "SEO",
  "Video Editing",
  "Photography",
  "Data Science",
  "AI Automation",
  "Project Management",
  "Customer Support",
  "Human Resources",
  "Sales",
  "Accounting",
  "Legal Services",
  "Translation",
  "Admin Support",
  "E-commerce",
  "Product Management",
  "Research",
  "Testing",
];

const iconMap = {
  Code2,
  PenTool,
  Palette,
  Smartphone,
  Video,
  Image,
  BookOpen,
  Briefcase,
  Feather,
  Layers,
  Globe,
  Monitor,
  Camera,
  Shield,
  Cpu,
  Database,
  Wrench,
  Headphones,
  ShoppingCart,
  GraduationCap,
  Building2,
  Users,
  Rocket,
  MessageSquareText,
  Workflow,
  BadgeCheck,
  Sparkles,
  AppWindow,
};

function CategoryIcon({ iconName }) {
  const Icon = iconMap[iconName] || iconMap.Briefcase;
  return <Icon size={20} />;
}

export default function AdminCategoryManagement({ embedded = false }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", icon: ICON_OPTIONS[0], description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getCategories();
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async (values = form) => {
    if (!values.title?.trim() || !values.icon) {
      toast.error("Please select a category and icon first.");
      return false;
    }

    try {
      setSaving(true);
      if (editing) {
        await adminAPI.updateCategory(editing.id, values);
        toast.success("Category updated");
      } else {
        await adminAPI.createCategory(values);
        toast.success("Category added");
      }
      setForm({ title: "", icon: ICON_OPTIONS[0], description: "" });
      setEditing(null);
      await fetchCategories();
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to save category");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    await saveCategory(form);
  };

  const handleSelectCategory = async (title) => {
    const nextForm = { ...form, title };
    setForm(nextForm);
    if (!editing && nextForm.icon) {
      await saveCategory(nextForm);
    }
  };

  const handleSelectIcon = async (iconName) => {
    const nextForm = { ...form, icon: iconName };
    setForm(nextForm);
    if (!editing && nextForm.title?.trim()) {
      await saveCategory(nextForm);
    }
  };

  const handleEdit = (category) => {
    setEditing(category);
    setForm({ title: category.title, icon: category.icon, description: category.description || "" });
  };

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteCategory(id);
      toast.success("Category removed");
      await fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to delete category");
    }
  };

const title = editing ? "Edit Category" : "Add New Category";

  return (
    <div className={`bg-slate-50 ${embedded ? "min-h-0 py-0" : "min-h-screen py-8 px-4"}`}>
      <div className={embedded ? "mx-auto" : "max-w-7xl mx-auto grid gap-6 lg:grid-cols-[280px_1fr]"}>
        {!embedded && <AdminSidebar />}

        <main className="space-y-6">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Category Management</p>
                <h1 className="text-3xl font-bold text-slate-900">Manage Categories</h1>
              </div>
              <button
                type="button"
                onClick={() => navigate("/adminDashboard")}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <ArrowLeft size={18} /> Back to Dashboard
              </button>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm text-slate-500">Create or update categories that clients can select when posting jobs.</p>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:bg-white"
                      placeholder="Select a preset or type a category"
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-700">Quick category options</p>
                      <span className="text-xs font-medium text-slate-500">{CATEGORY_OPTIONS.length} presets</span>
                    </div>
                    <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto pr-1">
                      {CATEGORY_OPTIONS.map((category) => {
                        const selected = form.title === category;
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => handleSelectCategory(category)}
                            className={`rounded-full border px-3 py-2 text-sm transition ${
                              selected ? "border-indigo-500 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 xl:grid-cols-8">
                      {ICON_OPTIONS.map((iconName) => {
                        const Icon = iconMap[iconName];
                        const selected = form.icon === iconName;
                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => handleSelectIcon(iconName)}
                            className={`rounded-2xl border p-3 text-slate-700 transition ${
                              selected ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                            title={iconName}
                          >
                            <Icon size={18} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:bg-white"
                      rows={4}
                      placeholder="Optional description"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={18} /> {editing ? "Save Changes" : "Add Category"}
                  </button>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Selected preview</h2>
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      {form.icon ? <CategoryIcon iconName={form.icon} /> : <Briefcase size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{form.title || "Choose a category"}</p>
                      <p className="text-sm text-slate-500">This will be added as soon as you save.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                    Click any category preset or icon to populate the form instantly. The category is added when you press Add Category.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">All Categories</h2>
                <p className="text-sm text-slate-500">Edit or remove categories created by the admin.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{categories.length} total</span>
            </div>
            {loading ? (
              <div className="py-20 text-center text-slate-500">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="py-14 text-center text-slate-500">No categories created yet.</div>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] || iconMap.Briefcase;
                  return (
                    <div key={category.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{category.title}</p>
                          <p className="text-sm text-slate-500">{category.description || "No description"}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="inline-flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
