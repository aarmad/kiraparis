"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice, site } from "@/lib/site";

const messages = [
  { text: `Livraison offerte en France métropolitaine dès ${formatPrice(site.freeShippingThreshold).replace(",00", "")}`, href: "/legal/livraison" },
  { text: "Drop Athletics — disponible maintenant", href: "/collections/athletics" },
  { text: `${site.returnDays} jours pour changer d'avis`, href: "/legal/retours" },
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % messages.length), 4500);
    return () => clearInterval(id);
  }, []);
  const m = messages[i];
  return (
    <div className="relative z-50 h-9 overflow-hidden bg-ink text-clay-50">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <Link href={m.href} className="label-mono truncate !text-[10.5px] hover:text-sand">
            {m.text}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
