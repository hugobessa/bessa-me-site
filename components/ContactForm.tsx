"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { fieldClassName, fieldLabelClassName } from "./styles";

export const ContactForm = ({
  RECAPTCHA_SITE_KEY,
  NODE_ENV,
}: {
  RECAPTCHA_SITE_KEY: string;
  NODE_ENV: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
    captchaResponse: null,
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsSubmitting(false);
    if (response.status === 200) {
      toast.success("Message sent successfully");
    } else {
      const error = await response.json();
      toast.error(error.message);
    }
  };

  const handleCaptchaChange = (value: any) =>
    setForm({
      ...form,
      captchaResponse: value,
    });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
      <label htmlFor="name" className={fieldLabelClassName}>
        From Name
        <input
          type="text"
          name="name"
          id="name"
          className={fieldClassName}
          required
          value={form.name}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="email" className={fieldLabelClassName}>
        From Email
        <input
          type="email"
          name="email"
          id="email"
          className={fieldClassName}
          required
          value={form.email}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="subject" className={fieldLabelClassName}>
        Subject
        <input
          type="text"
          name="subject"
          id="subject"
          className={fieldClassName}
          required
          value={form.subject}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="body" className={fieldLabelClassName}>
        Message
        <textarea
          name="body"
          id="body"
          className={`${fieldClassName} leading-[1.45] resize-y`}
          rows={4}
          required
          value={form.body}
          onChange={handleFormChange}
        ></textarea>
      </label>
      {NODE_ENV === "production" && (
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start flex items-center gap-2 meta font-extrabold tracking-[.14em] px-5 py-3.5 border-2 border-ink bg-accent text-on-accent shadow-hard transition-hard duration-120 ease-linear enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-hard-sm enabled:active:translate-x-1 enabled:active:translate-y-1 enabled:active:shadow-none disabled:border-dashed disabled:border-ink-muted disabled:bg-surface-2 disabled:text-ink-muted disabled:shadow-none"
      >
        {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
        <span>Send Message</span>
      </button>
    </form>
  );
};
