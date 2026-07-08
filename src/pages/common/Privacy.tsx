import { Container } from "@/components/common";

export default function Privacy() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-base leading-7 text-muted-foreground">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">1. Information Collection</h2>
          <p className="text-sm leading-7 text-slate-700">
            We collect only the data needed to provide and improve our services.
            This includes account details, authentication data, and usage
            information.
          </p>
        </section>
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">2. Data Use</h2>
          <p className="text-sm leading-7 text-slate-700">
            Collected data is used to deliver features, maintain security, and
            personalize your experience.
          </p>
        </section>
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">3. Security</h2>
          <p className="text-sm leading-7 text-slate-700">
            We take reasonable measures to protect your data, but no system is
            completely secure. Use strong credentials and keep your account
            information safe.
          </p>
        </section>
      </div>
    </Container>
  );
}
