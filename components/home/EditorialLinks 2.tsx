"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EditorialArrow } from "@/components/home/ContactCTA";

export type EditorialLinkItem = {
  href: string;
  label: string;
  external?: boolean;
};

export function EditorialLinks({ items, ariaLabel, className = "" }: { items: readonly EditorialLinkItem[]; ariaLabel: string; className?: string }) {
  return (
    <nav className={`homepage-editorial-links ${className}`.trim()} aria-label={ariaLabel} data-count={items.length}>
      {items.map((item) => {
        const content = <><span>{item.label}</span><EditorialArrow magnetic /></>;
        return <motion.div key={`${item.href}-${item.label}`} whileTap={{ scale: .992 }}>
          {item.external
            ? <a href={item.href} target="_blank" rel="noreferrer" data-cursor="Open">{content}</a>
            : <Link href={item.href} data-cursor="Open">{content}</Link>}
        </motion.div>;
      })}
    </nav>
  );
}
