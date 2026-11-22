import { cn as clsx } from "@/lib/cn";

/**
 * Logo et emblème rendus via CSS mask : ils prennent la couleur du texte (currentColor),
 * ce qui permet de les poser sur fond clair, sombre ou photo.
 * À remplacer par les SVG officiels dès que la marque les fournit.
 */
export function Logo({ className, title = "KIRA Paris" }: { className?: string; title?: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      className={clsx("inline-block aspect-[974/256] bg-current", className)}
      style={{
        WebkitMask: "url(/images/brand/logo-wordmark.png) center / contain no-repeat",
        mask: "url(/images/brand/logo-wordmark.png) center / contain no-repeat",
      }}
    />
  );
}

export function Emblem({ className, label }: { className?: string; label?: string }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={clsx("inline-block aspect-square bg-current", className)}
      style={{
        WebkitMask: "url(/images/brand/emblem.png) center / 128% no-repeat",
        mask: "url(/images/brand/emblem.png) center / 128% no-repeat",
      }}
    />
  );
}
