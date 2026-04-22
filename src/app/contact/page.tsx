import InquiryForm from "@/components/InquiryForm";

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-cream via-[#FFF3E6] to-[#FDEBD0] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5 text-text">
            Get in Touch
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            We&rsquo;d love to hear from you. Share your details below and
            we&rsquo;ll be in touch within two business days.
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
                  Email
                </h3>
                <div className="text-text-light text-[0.93rem] space-y-1">
                  <p>
                    <a
                      href="mailto:admin@qafschool.ca"
                      className="text-orange-dark hover:underline font-medium"
                    >
                      admin@qafschool.ca
                    </a>
                  </p>
                  <p>Office hours: Monday&ndash;Friday, 8:30 AM &ndash; 4:00 PM</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-lg font-bold text-orange-dark mb-3">
                  Phone
                </h3>
                <div className="text-text-light text-[0.93rem]">
                  <p>
                    <a
                      href="tel:+16135818685"
                      className="text-orange-dark hover:underline font-medium"
                    >
                      +1 613 581 8685
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

            {/* Inquiry Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">
                Submit an Inquiry
              </h2>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
