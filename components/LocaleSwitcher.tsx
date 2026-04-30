"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

/**
 * LocaleSwitcher — custom popover (not a native <select>) so the menu
 * inherits the locked Stitch tokens. Listbox semantics, full keyboard
 * support (Enter/Space to open, Up/Down to traverse, Esc to close).
 *
 * The footer variant keeps the lighter native-select fallback to ship
 * zero JS for the menu itself; only the header uses the popover.
 */
export function LocaleSwitcher({
  onNavigate,
  variant = "header",
}: {
  onNavigate?: () => void;
  variant?: "header" | "footer";
} = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const t = useTranslations("localeSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: Locale) => {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
      onNavigate?.();
    });
  };

  type ShortKey = (typeof locales)[number];
  const shortKey = (l: Locale) => l as ShortKey;
  const fullKey = (l: Locale) => `${l}Full` as `${ShortKey}Full`;

  if (variant === "footer") {
    return <FooterSelect active={active} onChange={handleChange} t={t} shortKey={shortKey} fullKey={fullKey} isPending={isPending} />;
  }

  return (
    <HeaderPopover
      active={active}
      onChange={handleChange}
      t={t}
      shortKey={shortKey}
      fullKey={fullKey}
      isPending={isPending}
    />
  );
}

type T = ReturnType<typeof useTranslations<"localeSwitcher">>;

function HeaderPopover({
  active,
  onChange,
  t,
  shortKey,
  fullKey,
  isPending,
}: {
  active: Locale;
  onChange: (l: Locale) => void;
  t: T;
  shortKey: (l: Locale) => string;
  fullKey: (l: Locale) => string;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const root = buttonRef.current?.parentElement;
      if (root && !root.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const activeIdx = locales.indexOf(active);
      setFocusIdx(activeIdx >= 0 ? activeIdx : 0);
      // Focus the listbox so arrow keys are captured.
      requestAnimationFrame(() => listRef.current?.focus());
    }
  }, [open, active]);

  const handleListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((i) => (i + 1) % locales.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((i) => (i - 1 + locales.length) % locales.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setFocusIdx(locales.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const next = locales[focusIdx];
      onChange(next);
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="relative inline-flex items-center" data-pending={isPending ? "true" : undefined}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t("label")}
        className="inline-flex items-center gap-1.5 h-9 pl-2.5 pr-2.5 rounded-pill border border-midnight-rule bg-transparent text-on-dark-muted hover:text-aqua hover:border-aqua/40 focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-deep transition-colors duration-fast"
      >
        <GlobeIcon className="w-4 h-4 text-on-dark-muted" />
        <span className="text-[13px] font-medium uppercase tracking-wider">{t(shortKey(active))}</span>
        <ChevronIcon className={`w-3 h-3 text-on-dark-faint transition-transform duration-fast ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 z-overlay min-w-[260px] rounded-lg bg-midnight-overlay border border-midnight-rule shadow-dark-overlay overflow-hidden">
          <div className="px-4 pt-3 pb-2 border-b border-midnight-rule-soft">
            <div className="text-eyebrow uppercase text-on-dark-faint">{t("label")}</div>
          </div>
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${listId}-${locales[focusIdx]}`}
            aria-label={t("label")}
            onKeyDown={handleListKey}
            className="max-h-[60vh] overflow-y-auto py-1 focus:outline-none"
          >
            {locales.map((l, i) => {
              const isActive = l === active;
              const isFocused = i === focusIdx;
              return (
                <li
                  key={l}
                  id={`${listId}-${l}`}
                  role="option"
                  aria-selected={isActive}
                  data-focused={isFocused || undefined}
                  onMouseEnter={() => setFocusIdx(i)}
                  onClick={() => {
                    onChange(l);
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                  className={`group flex items-center gap-3 mx-1.5 px-3 h-11 rounded-md cursor-pointer transition-colors duration-fast ${
                    isFocused ? "bg-midnight-elevated" : "bg-transparent"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-pill text-[11px] font-semibold uppercase tracking-wider shrink-0 transition-colors duration-fast ${
                      isActive
                        ? "bg-aqua text-midnight-deep"
                        : "bg-midnight-card border border-midnight-rule text-on-dark-muted group-data-[focused]:border-aqua/40 group-data-[focused]:text-aqua"
                    }`}
                  >
                    {t(shortKey(l))}
                  </span>
                  <span className="flex-1 min-w-0 flex items-center justify-between gap-2">
                    <span
                      lang={l}
                      className={`truncate text-[14px] ${isActive ? "text-on-dark font-medium" : "text-on-dark-muted group-data-[focused]:text-on-dark"}`}
                    >
                      {t(fullKey(l))}
                    </span>
                    {isActive && (
                      <CheckIcon className="w-4 h-4 text-aqua shrink-0" aria-hidden />
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function FooterSelect({
  active,
  onChange,
  t,
  shortKey,
  fullKey,
  isPending,
}: {
  active: Locale;
  onChange: (l: Locale) => void;
  t: T;
  shortKey: (l: Locale) => string;
  fullKey: (l: Locale) => string;
  isPending: boolean;
}) {
  return (
    <label
      aria-label={t("label")}
      className="relative inline-flex items-center text-[12px]"
      data-pending={isPending ? "true" : undefined}
    >
      <span className="sr-only">{t("label")}</span>
      <select
        value={active}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="appearance-none bg-transparent border border-midnight-rule rounded-pill pl-3 pr-7 py-1.5 text-on-dark-muted hover:text-on-dark hover:border-aqua/40 cursor-pointer focus:outline-none focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-deep transition-colors duration-fast"
        aria-label={t("label")}
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={l} className="text-on-dark bg-midnight-card">
            {t(shortKey(l))}, {t(fullKey(l))}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-on-dark-faint text-[10px]"
      >
        ▾
      </span>
    </label>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15" />
      <path d="M10 2.5c2.5 2.7 2.5 12.3 0 15" />
      <path d="M10 2.5c-2.5 2.7-2.5 12.3 0 15" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <polyline points="3,5 6,8 9,5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <polyline points="3,8.5 6.5,12 13,4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
