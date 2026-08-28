"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-controls";
import { services } from "@/data/services";

type ContactInput = {
  name: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  website: string;
};

const initial: ContactInput = {
  name: "",
  email: "",
  phoneCountryCode: "+1",
  phone: "",
  company: "",
  service: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  function validate() {
    const nextErrors: Partial<Record<keyof ContactInput, string>> = {};

    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Tell us a little about the project.";
    if (values.website) nextErrors.website = "Invalid submission.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Unable to submit the message.");
      }

      setDone(true);
      setValues(initial);
    } catch {
      setSubmitError("Something went wrong while sending your message. Please email vivek@attendez.in directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)]">
        <h3 className="text-xl font-semibold text-foreground">Message received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out - Vivek will respond within 1 business day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setDone(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} required>
          <Input
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Email" error={errors.email} required>
          <Input
            type="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="jane@company.com"
            autoComplete="email"
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,1fr)]">
        <Field label="Code" error={errors.phoneCountryCode}>
          <Select
            value={values.phoneCountryCode}
            onChange={(event) => update("phoneCountryCode", event.target.value)}
            autoComplete="tel-country-code"
            className="pl-2 pr-8"
          >
            <option value="+1">+1 (US)</option>
            <option value="+91">+91 (India)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+61">+61 (Australia)</option>
          </Select>
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <Input
            type="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="(555) 123-4567"
            autoComplete="tel-national"
            inputMode="tel"
          />
        </Field>
        <Field label="Company" error={errors.company}>
          <Input
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </Field>
      </div>

      <Field label="What are you interested in?" error={errors.service}>
        <ServiceMultiSelect value={values.service} onChange={(value) => update("service", value)} />
      </Field>

      <Field label="Tell us about your project" error={errors.message} required>
        <Textarea
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="What problem are you trying to solve? What's the current process?"
          rows={6}
          required
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending..." : "Send message"}
      </Button>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. We don't share your details.
      </p>
    </form>
  );
}

const serviceOptions = [...services.map((service) => service.title), "Not sure yet - let's talk"];

function ServiceMultiSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  function toggleOption(option: string) {
    const next = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    onChange(next.join(", "));
  }

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-10 w-full items-center justify-between gap-3 rounded-lg border border-input bg-surface px-3 py-2 text-left text-sm shadow-sm transition-all focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className={selected.length ? "text-foreground" : "text-muted-foreground"}>
          {selected.length ? selected.join(", ") : "Choose service(s) (optional)"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-soft)]"
        >
          {serviceOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}