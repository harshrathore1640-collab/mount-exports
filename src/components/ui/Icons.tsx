import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M7 43V19a17 17 0 0 1 34 0v24" />
        <path d="M13.5 35.5 21 23.5l5.5 8 3.5-4.5 4.5 8.5" />
      </g>
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M6.6 3.5h2.2l1.5 3.8-1.9 1.4a11.4 11.4 0 0 0 5.4 5.4l1.4-1.9 3.8 1.5v2.2a2.6 2.6 0 0 1-2.9 2.6C10.3 19.8 4.2 13.7 3.9 6.4A2.6 2.6 0 0 1 6.6 3.5Z"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle {...stroke} cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 12h15m0 0-5.6-5.6M19 12l-5.6 5.6" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 20V4m0 0-6 6m6-6 6 6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M5 9l7 7 7-7" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M3.5 7h17M3.5 12h17M3.5 17h11" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle {...stroke} cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3" y="5.5" width="18" height="13" rx="1.6" />
      <path {...stroke} d="m3.6 6.6 8.4 6 8.4-6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="12" r="8.6" />
      <path {...stroke} d="M3.4 12h17.2M12 3.4c2.4 2.4 3.6 5.3 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.3-3.6-8.6S9.6 5.8 12 3.4Z" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m12 3.4 8.4 4.3-8.4 4.3-8.4-4.3 8.4-4.3Z" />
      <path {...stroke} d="m4.4 12.4 7.6 3.9 7.6-3.9M4.4 16.6l7.6 3.9 7.6-3.9" />
    </svg>
  );
}

export function BlockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 8.4 12 4l8 4.4v7.2L12 20l-8-4.4V8.4Z" />
      <path {...stroke} d="M4 8.4 12 13l8-4.6M12 13v7" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3.6" y="5.2" width="16.8" height="15" rx="1.6" />
      <path {...stroke} d="M3.6 10h16.8M8.4 3.4v3.4M15.6 3.4v3.4" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M2.6 12S6 6.2 12 6.2 21.4 12 21.4 12 18 17.8 12 17.8 2.6 12 2.6 12Z" />
      <circle {...stroke} cx="12" cy="12" r="2.9" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M20.4 12.4c0 4-3.8 7.2-8.4 7.2a9.9 9.9 0 0 1-2.9-.4L4 21l1.3-3.4a6.9 6.9 0 0 1-1.7-4.5c0-4 3.8-7.2 8.4-7.2s8.4 3.2 8.4 7.2Z" />
      <path {...stroke} d="M8.8 12.2h6.4M8.8 9.6h4.4" />
    </svg>
  );
}

export function ShipIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M3.6 13.4 5 9.2h14l1.4 4.2M3.6 13.4h16.8l-1.7 5.1a2 2 0 0 1-1.9 1.3H7.2a2 2 0 0 1-1.9-1.3L3.6 13.4Z" />
      <path {...stroke} d="M9.4 9.2V5.1h5.2v4.1" />
    </svg>
  );
}

export function FrameIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3.6" y="3.6" width="16.8" height="16.8" rx="1" />
      <rect {...stroke} x="7.2" y="7.2" width="9.6" height="9.6" rx="0.6" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M0 24V13.1C0 5.9 4.2 1.2 11.4 0l1.2 3.3C8.4 4.6 6.2 7 6.2 10.4h4.9V24H0Zm19.4 0V13.1C19.4 5.9 23.6 1.2 30.8 0L32 3.3c-4.2 1.3-6.4 3.7-6.4 7.1h4.9V24H19.4Z"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m4.8 12.6 4.6 4.6 9.8-10.4" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M9.6 3.6H3.6v6M14.4 20.4h6v-6M20.4 9.6v-6h-6M3.6 14.4v6h6" />
    </svg>
  );
}
