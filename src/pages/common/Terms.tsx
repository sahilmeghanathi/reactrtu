import { Container } from "@/components/common";

export default function Terms() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-base leading-7 text-muted-foreground">
          Welcome to ReactRTU. These Terms of Service govern your use of our
          website and services. By accessing or using our platform, you agree to
          be bound by these terms.
        </p>
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-sm leading-7 text-slate-700">
            By using this site, you agree to follow and be bound by these
            Terms. If you do not agree, please do not use our services.
          </p>
        </section>
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">2. Use of Service</h2>
          <p className="text-sm leading-7 text-slate-700">
            You may use our site for lawful purposes only. Unauthorized use of
            the site or services is prohibited.
          </p>
        </section>
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">3. Changes</h2>
          <p className="text-sm leading-7 text-slate-700">
            We may update these terms occasionally. Continued use of the site
            after changes means you accept the updated Terms.
          </p>
        </section>
      </div>
    </Container>
  );
}
