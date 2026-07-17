import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CurvedSidebar({ title, subtitle, links, footerAction, activeItem, onSelectItem }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`w-full shrink-0 lg:sticky lg:top-24 lg:self-start ${isCollapsed ? "lg:w-24" : "lg:w-72"}`}>
      <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-700 to-sky-700 p-px shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
        <div className="rounded-[31px] bg-white/95 p-3 backdrop-blur sm:p-4">
          <div className={`mb-6 flex items-start justify-between rounded-3xl bg-slate-900 p-4 text-white ${isCollapsed ? "justify-end" : ""}`}>
            {!isCollapsed && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-300">
                  {subtitle}
                </p>
                <h2 className="mt-2 text-lg font-semibold">{title}</h2>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 bg-white/10 text-white transition hover:bg-white/20"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <nav className="space-y-2">
            {links.map((link) => {
              const linkId = link.id || link.to;
              const content = (
                <>
                  <link.icon size={18} />
                  {!isCollapsed && <span className="ml-3">{link.label}</span>}
                </>
              );

              if (link.to) {
                return (
                  <NavLink
                    key={linkId}
                    to={link.to}
                    onClick={() => onSelectItem?.(link.id || link.to)}
                    end={link.to === "/adminDashboard" || link.to === "/clientDashboard" || link.to === "/freelancerDashboard" || link.to === "/freelancerdashboard" || link.to === "/chat"}
                    className={({ isActive: routeIsActive }) =>
                      `flex items-center rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                        isCollapsed ? "justify-center" : "gap-3"
                      } ${
                        routeIsActive || activeItem === linkId
                          ? "bg-indigo-50 text-indigo-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`
                    }
                  >
                    {content}
                  </NavLink>
                );
              }

              return (
                <button
                  key={linkId}
                  type="button"
                  onClick={() => onSelectItem?.(linkId)}
                  className={`flex w-full items-center rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } ${
                    activeItem === linkId
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {content}
                </button>
              );
            })}
          </nav>

          {footerAction && (
            <button
              type="button"
              onClick={footerAction.onClick}
              className={`mt-4 flex w-full items-center rounded-[18px] px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <footerAction.icon size={18} />
              {!isCollapsed && <span>{footerAction.label}</span>}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
