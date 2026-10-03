import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { contact, site } from "@/lib/content";

const DESCRIPTION = `Start a project with ${site.brand.name}. ${contact.lede}`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.brand.name}`,
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactPage() {
  // The same component the Home page uses, so the form, its validation and its
  // success state stay identical in one place.
  return <ContactSection />;
}
