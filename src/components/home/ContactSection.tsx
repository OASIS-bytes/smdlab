"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact } from "@/lib/content";
import { cn } from "@/lib/cn";

type Values = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", service: "", budget: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Large tap targets (min-h-12) and 16px text so mobile never zooms on focus. */
const FIELD =
  "min-h-12 w-full border bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/70 focus-visible:border-ink";

function inputClass(error?: string) {
  return cn(FIELD, error ? "border-2 border-copper-deep" : "border-ink/60");
}

export function ContactSection() {
  const { form, errors: messages } = contact;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof Values) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const validate = (next: Values): Errors => {
    const found: Errors = {};
    if (!next.name.trim()) found.name = messages.name;
    if (!next.email.trim()) found.email = messages.emailRequired;
    else if (!EMAIL_PATTERN.test(next.email.trim())) found.email = messages.emailInvalid;
    if (!next.service.trim()) found.service = messages.service;
    if (next.message.trim().length < 10) found.message = messages.message;
    return found;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Placeholder handler: nothing is sent anywhere.
    setSubmitted(true);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
  };

  return (
    // Flat sand, so the section stays visually separate from the ink footer.
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-sand py-24 text-ink md:py-32"
    >
      <div className="mx-auto max-w-shell px-gutter md:px-gutter-wide">
        <SectionReveal>
          <SectionHeader
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            accent={contact.accent}
            tone="sand"
            lede={contact.lede}
            headingId="contact-heading"
          />

          <div className="mt-12 max-w-2xl">
            {submitted ? (
              <div role="status" className="border border-ink/20 bg-cream p-6 md:p-8">
                <p className="label-micro text-copper-deep">{form.successTitle}</p>
                <p className="mt-3 font-display text-lede leading-snug">{form.success}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-base font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label={form.name.label} error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={form.name.placeholder}
                    value={values.name}
                    onChange={update("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass(errors.name)}
                  />
                </Field>

                <Field id="email" label={form.email.label} error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={form.email.placeholder}
                    value={values.email}
                    onChange={update("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(errors.email)}
                  />
                </Field>

                <Field id="service" label={form.service.label} error={errors.service}>
                  <Select
                    id="service"
                    value={values.service}
                    onChange={update("service")}
                    placeholder={form.service.placeholder}
                    options={form.service.options}
                    error={errors.service}
                  />
                </Field>

                <Field id="budget" label={form.budget.label} error={errors.budget}>
                  <Select
                    id="budget"
                    value={values.budget}
                    onChange={update("budget")}
                    placeholder={form.budget.placeholder}
                    options={form.budget.options}
                    error={errors.budget}
                  />
                </Field>

                <Field
                  id="message"
                  label={form.message.label}
                  error={errors.message}
                  className="sm:col-span-2"
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={form.message.placeholder}
                    value={values.message}
                    onChange={update("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(inputClass(errors.message), "min-h-32 resize-y")}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-copper px-6 text-base font-medium text-ink transition-colors hover:bg-copper-deep hover:text-cream"
                  >
                    {form.submit}
                  </button>
                  <p className="mt-4 text-sm text-ink/70">{form.note}</p>
                </div>
              </form>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-center gap-2 text-sm text-ink"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper-deep"
          />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  placeholder,
  options,
  error,
}: {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: string[];
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          inputClass(error),
          "appearance-none pr-10",
          !value && "text-ink/70",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink"
      >
        <path
          d="M1 1l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}
