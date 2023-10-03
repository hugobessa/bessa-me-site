"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';

export const ContactForm = ({ RECAPTCHA_SITE_KEY }: {RECAPTCHA_SITE_KEY: string}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
    captchaResponse: null,
  });
  
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success('Message sent successfully');
    } catch(e) {
      toast.error('Failed sending message');
    }
  };

  const handleCaptchaChange = (value: any) =>
    setForm({
      ...form,
      captchaResponse: value,
    });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 md:block flex flex-col mb-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          From Name
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={form.name}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          From Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={form.email}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={form.subject}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label
          htmlFor="body"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Message
        </label>
        <textarea
          id="body"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={4}
          required
          value={form.body}
          onChange={handleFormChange}
        ></textarea>
      </div>
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
      />
      <button
        type="submit"
        className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 float-right"
      >
        Send Message
      </button>
    </form>
  );
};
