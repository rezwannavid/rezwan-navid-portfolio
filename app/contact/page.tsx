import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Mir Rezwan Navid and find his work across LinkedIn, Instagram, Threads, Medium and GitHub.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
