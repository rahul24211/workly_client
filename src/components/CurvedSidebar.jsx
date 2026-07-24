import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function CurvedSidebar({ title, subtitle, links, footerAction, activeItem, onSelectItem, onCollapsedChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const renderMenuContent = (compact = false) => (
    <nav className="space-y-2">
      {links.map((link) => {
        const linkId = link.id || link.to;
        const content = (
          <>
            <link.icon size={18} />
            <span className={`whitespace-nowrap transition-all duration-300 ease-out ${compact ? "ml-3 w-auto opacity-100" : isCollapsed ? "ml-0 w-0 overflow-hidden opacity-0" : "ml-3 w-auto opacity-100"}`}>
              {link.label}
            </span>
          </>
        );

        if (link.to) {
          return (
            <NavLink
              key={linkId}
              to={link.to}
              onClick={() => {
                onSelectItem?.(link.id || link.to);
                closeMobileMenu();
              }}
              end={link.to === "/adminDashboard" || link.to === "/clientDashboard" || link.to === "/freelancerDashboard" || link.to === "/freelancerdashboard" || link.to === "/chat"}
              className={({ isActive: routeIsActive }) =>
                `flex items-center rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                  compact ? "gap-3" : isCollapsed ? "justify-center" : "gap-3"
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
            onClick={() => {
              onSelectItem?.(linkId);
              closeMobileMenu();
            }}
            className={`flex w-full items-center rounded-[18px] px-4 py-3 text-sm font-medium transition ${
              compact ? "gap-3" : isCollapsed ? "justify-center" : "gap-3"
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
  );

  return (
    <>
      <div className="mb-3 flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <Menu size={18} />
          Menu
        </button>
        <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 shadow-sm">
          {subtitle}
        </div>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm lg:hidden" onClick={closeMobileMenu}>
          <div className="h-full w-[86%] max-w-sm bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">{subtitle}</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
              </div>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-3">
              {renderMenuContent(true)}
              {footerAction && (
                <button
                  type="button"
                  onClick={() => {
                    footerAction.onClick();
                    closeMobileMenu();
                  }}
                  className="mt-4 flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <footerAction.icon size={18} />
                  <span>{footerAction.label}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <aside className={`hidden w-full shrink-0 overflow-hidden lg:fixed lg:top-24 lg:bottom-4 lg:left-4 lg:z-30 lg:block transition-[width,max-width,transform,opacity] duration-300 ease-out ${isCollapsed ? "lg:w-24" : "lg:w-72"}`}>
        <div className="h-full rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-700 to-sky-700 p-px shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
          <div className="flex h-full flex-col rounded-[31px] bg-white/95 p-3 backdrop-blur sm:p-4">
            <div className={`mb-6 flex items-start justify-between rounded-3xl bg-slate-900 p-4 text-white transition-all duration-300 ease-out ${isCollapsed ? "justify-end" : ""}`}>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[14rem] opacity-100"}`}>
                {!isCollapsed && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-300">
                      {subtitle}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold">{title}</h2>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 bg-white/10 text-white transition hover:bg-white/20"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {renderMenuContent(false)}
            </div>

            {footerAction && (
              <button
                type="button"
                onClick={footerAction.onClick}
                className={`mt-4 flex w-full items-center rounded-[18px] px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 ${
                  isCollapsed ? "justify-center" : "gap-3"
                }`}
              >
                <footerAction.icon size={18} />
                <span className={`whitespace-nowrap transition-all duration-300 ease-out ${isCollapsed ? "ml-0 w-0 overflow-hidden opacity-0" : "ml-3 w-auto opacity-100"}`}>
                  {footerAction.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
