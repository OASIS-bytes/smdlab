import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero } from "@/components/home/Hero";
import { HeroReveal } from "@/components/home/HeroReveal";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ShowreelSection } from "@/components/home/ShowreelSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WorkSection } from "@/components/home/WorkSection";
import { site } from "@/lib/content";

const TITLE = `${site.brand.name} — ${site.brand.tagline}`;

const DESCRIPTION =
  "SMD Lab is a creative technology studio designing and building websites, software, video and visual identities. Small parts, big systems.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return (
    <HeroReveal>
      <Hero />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <ShowreelSection />
      <TestimonialsSection />
      <ContactSection />
    </HeroReveal>
  );
}
