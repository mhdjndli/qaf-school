"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Get in Touch
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            We&rsquo;d love to hear from you , whether you have a question,
            want to submit an inquiry, or are ready to apply.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-lg font-bold text-orange-dark mb-3">
                  General Inquiries
                </h3>
                <div className="text-text-light text-[0.93rem] space-y-1">
                  <p>
                    Email:{" "}
                    <a href="mailto:info@qafschool.ca" className="text-orange-dark hover:underline font-medium">
                      info@qafschool.ca
                    </a>
                  </p>
                  <p>Office hours: Monday&ndash;Friday, 8:30 AM &ndash; 4:00 PM</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-lg font-bold text-orange-dark mb-3">
                  Admissions
                </h3>
                <div className="text-text-light text-[0.93rem] space-y-1">
                  <p>
                    Email:{" "}
                    <a href="mailto:admissions@qafschool.ca" className="text-orange-dark hover:underline font-medium">
                      admissions@qafschool.ca
                    </a>
                  </p>
                  <p>
                    Or{" "}
                    <a href="/inquiry" className="text-orange-dark hover:underline font-medium">
                      submit an inquiry directly
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-lg font-bold text-orange-dark mb-3">
                  Visit Us
                </h3>
                <div className="text-text-light text-[0.93rem] space-y-1">
                  <p>900 Dynes Rd</p>
                  <p>Ottawa, ON K2C 3L6</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-lg font-bold text-orange-dark mb-3">
                  Follow Us
                </h3>
                <a
                  href="https://instagram.com/qafott"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-dark hover:underline font-medium text-[0.93rem]"
                >
                  Instagram @qafott
                </a>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.3!2d-75.7!3d45.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s900+Dynes+Rd%2C+Ottawa%2C+ON+K2C+3L6!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="QAF Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">
                Send Us a Message
              </h2>
              {submitted ? (
                <div className="bg-green/10 border border-green rounded-xl p-8 text-center">
                  <div className="text-4xl mb-3">&#10003;</div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-green">
                    Message Sent!
                  </h3>
                  <p className="text-text-light">
                    Thank you for reaching out. We&rsquo;ll get back to you within
                    two business days.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-text mb-1.5">
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-1.5">
                      Your email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-1.5">
                      Your phone number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-1.5">
                      Subject *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option>Admissions</option>
                      <option>Tour</option>
                      <option>General Inquiry</option>
                      <option>Careers</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text mb-1.5">
                      Your message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all resize-y"
                    />
                  </div>

                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" id="newsletter" className="w-4 h-4 accent-orange" />
                    <label htmlFor="newsletter" className="text-text-light text-sm">
                      I&rsquo;d like to be added to the QAF newsletter
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-orange-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Send Message &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
