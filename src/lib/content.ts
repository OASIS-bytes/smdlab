import siteJson from "@content/site.json";
import navigationJson from "@content/navigation.json";
import footerJson from "@content/footer.json";
import workJson from "@content/work.json";
import servicesJson from "@content/services.json";
import processJson from "@content/process.json";
import showreelJson from "@content/showreel.json";
import testimonialsJson from "@content/testimonials.json";
import contactJson from "@content/contact.json";
import projectsJson from "@content/projects.json";
import aboutJson from "@content/about.json";
import privacyJson from "@content/privacy.json";

export type NavLink = {
  label: string;
  /**
   * Where the link goes from an inner page. Section links are written as
   * `/#section` so the browser resolves the hash once `/` has mounted.
   */
  href: string;
  /** Home anchor id, when this link has a section to scroll to on `/`. */
  section?: string | null;
  /**
   * Route prefix that makes this link current, or `null` when the link has no
   * page of its own (Services and Process are Home sections only).
   */
  match?: string | null;
};

/** Flat brand fill used by every labelled image placeholder. */
export type Fill = "sand" | "moss" | "ink";

export type Site = {
  brand: {
    name: string;
    shortName: string;
    founder: string;
    tagline: string;
    description: string;
    url: string;
  };
  logo: { src: string; alt: string };
  disciplines: string[];
  contact: { email: string; location: string };
};

export type Navigation = {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  primary: NavLink[];
  cta: NavLink;
};

export type FooterColumn = { title: string; links: NavLink[] };

export type Footer = {
  statement: string;
  columns: FooterColumn[];
  elsewhere: NavLink[];
  legal: NavLink[];
  founderCredit: string;
  copyright: string;
};

/** A real asset for a project's media slot. Absent means the slot still renders its placeholder. */
export type ProjectMediaSource = { src: string; alt: string };

/** A card-level view of a project, derived from the case study. */
export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image?: ProjectMediaSource;
  /**
   * Stand-in caption for the labelled tile. Optional because a project with a
   * real asset has nothing left to label, and most now do.
   */
  placeholder?: string;
  fill: Fill;
  href: string;
};

export type ProjectImage = {
  label: string;
  fill: Fill;
  /** `true` spans both columns so the gallery gets a varied rhythm. */
  wide: boolean;
};

export type ProjectResult = { value: string; label: string };

export type CaseStudy = Project & {
  overview: string[];
  role: string;
  services: string[];
  gallery: ProjectImage[];
  results: ProjectResult[];
};

export type Work = {
  eyebrow: string;
  heading: string;
  accent: string;
  linkLabel: string;
  featuredSlug: string;
  slugs: string[];
};

export type Projects = {
  labels: {
    overview: string;
    role: string;
    services: string;
    gallery: string;
    results: string;
    resultsNote: string;
    backToWork: string;
    nextProject: string;
  };
  projects: CaseStudy[];
};

export type About = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  storyLabel: string;
  story: { heading: string; body: string[] }[];
  idea: { label: string; heading: string; accent: string; body: string; pull: string };
  valuesLabel: string;
  valuesHeading: string;
  values: { title: string; body: string }[];
  cta: { heading: string; body: string; label: string; secondaryLabel: string };
};

export type Privacy = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
  contactHeading: string;
  contactBody: string;
  changesNote: string;
};

export type ServiceColumn = { title: string; description: string };

export type Services = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  columns: ServiceColumn[];
};

export type ProcessStep = { title: string; summary: string };

export type Process = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  steps: ProcessStep[];
};

export type Showreel = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  placeholderLabel: string;
  placeholderNote: string;
  placeholderHelp: string;
  videoSrc: string;
  videoPoster: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Testimonials = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  badge: string;
  /** Shown above the list while quotes are still placeholders. Omitted once real quotes land. */
  notice?: string;
  items: Testimonial[];
};

export type SelectField = {
  label: string;
  placeholder: string;
  options: string[];
};

export type TextField = {
  label: string;
  placeholder: string;
};

export type Contact = {
  eyebrow: string;
  heading: string;
  accent: string;
  lede: string;
  form: {
    name: TextField;
    email: TextField;
    service: SelectField;
    budget: SelectField;
    message: TextField;
    submit: string;
    successTitle: string;
    success: string;
    note: string;
  };
  errors: {
    name: string;
    emailRequired: string;
    emailInvalid: string;
    service: string;
    message: string;
  };
};

export const site = siteJson as Site;
export const navigation = navigationJson as Navigation;
export const footer = footerJson as Footer;
export const work = workJson as Work;
export const services = servicesJson as Services;
export const process = processJson as Process;
export const showreel = showreelJson as Showreel;
export const testimonials = testimonialsJson as Testimonials;
export const contact = contactJson as Contact;
export const projects = projectsJson as Projects;
export const about = aboutJson as About;
export const privacy = privacyJson as Privacy;

/** Single source of truth: every project slug the case-study route can serve. */
export function allProjectSlugs(): string[] {
  return projects.projects.map((project) => project.slug);
}

export function getProject(slug: string): CaseStudy | undefined {
  return projects.projects.find((project) => project.slug === slug);
}

/**
 * The case study after `slug`, wrapping to the first project at the end so the
 * chain never dead-ends.
 */
export function getNextProject(slug: string): CaseStudy {
  const index = projects.projects.findIndex((project) => project.slug === slug);
  const next = projects.projects[index + 1];
  return next ?? projects.projects[0];
}

export function toProject(study: CaseStudy): Project {
  return {
    slug: study.slug,
    title: study.title,
    category: study.category,
    summary: study.summary,
    image: study.image,
    placeholder: study.placeholder,
    fill: study.fill,
    href: `/work/${study.slug}`,
  };
}

export function joinWithAnd(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}