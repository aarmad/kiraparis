import { Emblem } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1600px] flex-col items-start justify-center px-4 py-24 md:px-8">
      <Emblem className="size-14 text-terracotta" />
      <h1 className="mt-6 font-display text-[6rem] md:text-[10rem]">Hors carte</h1>
      <p className="mt-4 max-w-md text-[17px] text-ink-soft">Cette page n&apos;existe pas, ou plus. Le vestiaire, lui, est toujours là.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/collections">Voir le vestiaire</ButtonLink>
        <ButtonLink href="/" variant="outline" arrow={false}>
          Accueil
        </ButtonLink>
      </div>
    </div>
  );
}
