"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { FALLBACK_IMAGE } from "@/lib/site";

/* ------------------------------------------------------------------ Reveal */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  as?: ElementType;
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const Component = as as ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      data-direction={direction}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}

/* ----------------------------------------------------------- Magnetic wrap */

export function Magnetic({
  children,
  className,
  strength = 0.26,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabledRef.current = fine && !reduce;
  }, []);

  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || !enabledRef.current) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-block transition-transform duration-[420ms] ease-out will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- StoneImage */

type StoneImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function StoneImage({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
}: StoneImageProps) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setCurrent(src);
    setLoaded(false);
  }

  return (
    <img
      src={current}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== FALLBACK_IMAGE) setCurrent(FALLBACK_IMAGE);
      }}
      className={cn(
        "h-full w-full object-cover transition-opacity duration-700",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ Buttons */

const VARIANTS: Record<string, string> = {
  primary: "btn btn-primary",
  dark: "btn bg-espresso text-ivory hover:bg-walnut",
  outlineLight: "btn btn-outline-light",
  outlineDark: "btn btn-outline-dark",
  whatsapp: "btn btn-whatsapp",
  champagne: "btn bg-champagne text-espresso hover:bg-beige",
};

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  buttonClassName?: string;
  ariaLabel?: string;
  onClick?: () => void;
  icon?: ReactNode;
};

export function Cta({
  href,
  children,
  variant = "primary",
  external = false,
  magnetic = true,
  className,
  buttonClassName,
  ariaLabel,
  onClick,
  icon,
}: CtaProps) {
  const link = (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(VARIANTS[variant], buttonClassName)}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {icon}
    </a>
  );

  return magnetic ? (
    <Magnetic className={className}>{link}</Magnetic>
  ) : (
    <span className={cn("inline-block", className)}>{link}</span>
  );
}

/* -------------------------------------------------------------- Back to top */

export function BackToTop({ label = "Back to top" }: { label?: string }) {
  const toTop = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={toTop}
      className="group inline-flex items-center gap-3 text-sm tracking-[0.18em] text-beige/80 uppercase transition-colors hover:text-champagne"
    >
      <span className="grid size-11 place-items-center border border-champagne/35 transition-colors group-hover:border-champagne/70">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M12 20V4m0 0-6 6m6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label}
    </button>
  );
}
