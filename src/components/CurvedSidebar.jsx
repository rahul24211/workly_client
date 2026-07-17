import { NavLink } from "react-router-dom";

export default function CurvedSidebar({ title, subtitle, links, footerAction }) {
  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72 lg:self-start">
      <div className="rounded-4xl border border-slate-200 bg-linear-to-br from-slate-900 via-indigo-700 to-sky-700 p-px shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
        <div className="rounded-[31px] bg-white/95 p-5 backdrop-blur">
          <div className="mb-6 rounded-3xl bg-slate-900 p-4 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-300">
              {subtitle}
            </p>
            <h2 className="mt-2 text-lg font-semibold">{title}</h2>
          </div>

          <nav className="space-y-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/adminDashboard" || to === "/clientDashboard" || to === "/freelancerdashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {footerAction && (
            <button
              onClick={footerAction.onClick}
              className="mt-4 flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <footerAction.icon size={18} />
              <span>{footerAction.label}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
