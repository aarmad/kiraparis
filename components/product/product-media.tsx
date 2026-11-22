import Image from "next/image";
import { cn as clsx } from "@/lib/cn";
import type { ProductImage } from "@/lib/commerce/types";

/**
 * Cadre image produit au ratio 4:5.
 * - packshot (fond blanc d'origine) : contenu entier, fondu dans l'argile via multiply
 * - lifestyle / detail : plein cadre
 */
export function ProductMedia({
  image,
  sizes,
  priority,
  className,
  imgClassName,
  fit,
}: {
  image: ProductImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  fit?: "cover" | "contain";
}) {
  const isPackshot = image.kind === "packshot";
  const mode = fit ?? (isPackshot ? "contain" : "cover");
  const landscape = image.width > image.height * 1.2;
  return (
    <div className={clsx("relative overflow-hidden bg-clay-100", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={image.zoom ? { transform: `scale(${image.zoom})` } : undefined}
        className={clsx(
          mode === "contain" ? "object-contain" : "object-cover",
          isPackshot && "mix-blend-multiply",
          mode === "contain" && (landscape ? "scale-[1.32]" : "p-[6%]"),
          imgClassName,
        )}
      />
    </div>
  );
}
