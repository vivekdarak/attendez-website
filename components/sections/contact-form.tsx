"use client";

import { useState } from "react";

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
        <Select value={values.service} onChange={(event) => update("service", event.target.value)}>
          <option value="">Choose a service (optional)</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet - let's talk</option>
        </Select>
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