// src/pages/PostJob.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  AlignLeft,
  LayoutGrid,
  Tag,
  Lock,
  Clock,
  Star,
  Calendar,
  Send,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { clientAPI } from "../services/api";

const DURATIONS = [
  "1 Week",
  "2 Weeks",
  "1 Month",
  "3 Months",
  "4 Months",
  "5 Months",
  "6 Months",
  "7 Months",
  "8 Months",
  "9 Months",
  "10 Months",
  "11 Months",
  "1 year",
];

const EXP_LEVELS = [
  { value: "BEGINNER", label: "Beginner", sub: "0–2 years" },
  { value: "INTERMEDIATE", label: "Intermediate", sub: "2–5 years" },
  { value: "EXPERT", label: "Expert", sub: "5+ years" },
];

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function InputWrap({ icon: Icon, children }) {
  return <div className="relative">{children}</div>;
}

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-300 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100";

export default function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    budgetType: "FIXED",
    experienceLevel: "INTERMEDIATE",
    duration: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addSkill = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = skillInput.trim();
    if (val && !skills.includes(val)) setSkills([...skills, val]);
    setSkillInput("");
  };

  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await clientAPI.getCategories();
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Unable to load job categories. Please refresh.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skills.length === 0) {
      console.log("2. No Skills");
      toast.error("Add at least one skill");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      skills,
      budget: Number(formData.budget),
    };

    try {
      setLoading(true);

      const response = await clientAPI.createJob(payload);

      toast.success("Job posted successfully!");
      navigate("/MyJobs");
    } catch (err) {
      console.log("7. Error:", err);
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 uppercase tracking-wide mb-2">
            New listing
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">Post a job</h1>
          <p className="text-sm text-slate-500 mt-1">
            Fill in the details to find the right freelancer
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-6">
              {/* ── Basics ── */}
              <div className="mb-7">
                <SectionLabel icon={Briefcase}>Job basics</SectionLabel>

                <Field label="Job title">
                  <InputWrap icon={Briefcase}>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Need React Developer"
                      className={`${inputCls} h-11 pl-9 pr-4`}
                    />
                  </InputWrap>
                </Field>

                <Field label="Description">
                  <div className="relative">
                    <AlignLeft
                      size={15}
                      className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe the project, deliverables, and any specific requirements..."
                      className={`${inputCls} pl-9 pr-4 py-3`}
                    />
                  </div>
                </Field>

                <Field label="Category">
                  <div className="relative">
                    <LayoutGrid
                      size={16}
                      className="pointer-events-none absolute left-3 top-3 text-slate-400"
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className={`${inputCls} h-11 pl-9 pr-4 appearance-none bg-white`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </Field>
              </div>

              {/* ── Skills ── */}
              <div className="mb-7">
                <SectionLabel icon={Tag}>Skills required</SectionLabel>

                <Field label="Add skills" hint="Press Enter after each skill">
                  <InputWrap icon={Tag}>
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={addSkill}
                      placeholder="e.g. React, Node.js, Tailwind CSS"
                      className={`${inputCls} h-11 pl-9 pr-4`}
                    />
                  </InputWrap>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => removeSkill(s)}
                            className="text-indigo-400 hover:text-indigo-700"
                            aria-label={`Remove ${s}`}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </Field>
              </div>

              {/* ── Budget ── */}
              <div className="mb-7">
                <SectionLabel>Budget</SectionLabel>

                <Field
                  label={
                    formData.budgetType === "FIXED"
                      ? "Fixed budget (₹)"
                      : "Hourly rate (₹/hr)"
                  }
                >
                  <InputWrap>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="e.g. 15000"
                      className={`${inputCls} h-11 pl-9 pr-4`}
                    />
                  </InputWrap>
                </Field>
              </div>

              {/* ── Experience & Timeline ── */}
              <div className="mb-2">
                <SectionLabel icon={Star}>Experience and timeline</SectionLabel>

                <Field label="Experience level">
                  <div className="grid grid-cols-3 gap-2">
                    {EXP_LEVELS.map(({ value, label, sub }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, experienceLevel: value })
                        }
                        className={`py-2.5 rounded-xl text-sm border transition text-center ${
                          formData.experienceLevel === value
                            ? "bg-indigo-50 border-indigo-200 text-indigo-600 font-semibold"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {label}
                        <span
                          className={`block text-xs mt-0.5 font-normal ${
                            formData.experienceLevel === value
                              ? "text-indigo-400"
                              : "text-slate-400"
                          }`}
                        >
                          {sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Duration">
                  <InputWrap icon={Calendar}>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      className={`${inputCls} h-11 pl-9 pr-4`}
                    >
                      <option value="">Select duration</option>
                      {DURATIONS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </InputWrap>
                </Field>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
              >
                <Send size={15} />
                {loading ? "Posting job..." : "Post job"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
