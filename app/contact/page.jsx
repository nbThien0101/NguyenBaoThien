import ContactForm from "@/components/ContactForm";
import { site } from "@/data/portfolio";

export const metadata = {
  title: "Contact",
  description:
    "Send your contact details and job description directly to Nguyen Bao Thien.",
};

export default function ContactPage() {
  return (
    <main className="container page-content">
      <section className="hero reveal">
        <p className="eyebrow">Contact</p>
        <h1>
          Let&apos;s work together
          <span>Send hiring details and JD directly</span>
        </h1>
        <p className="lead">
          If you are hiring, please share role details and attach a JD file.
          Your submission will be delivered to my inbox.
        </p>
      </section>

      <section className="panel reveal delay-1">
        <div className="section-header compact">
          <p className="eyebrow">Direct Message</p>
          <h2>Contact form</h2>
        </div>
        <p className="lead form-lead">
          Contact email: {site.email}
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
