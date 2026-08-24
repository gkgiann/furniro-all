import PageBanner from "@/components/Shop/PageBanner";

export function Checkout() {
  return (
    <div>
      <PageBanner
        breadcrumbCurrent="Checkout"
        breadcrumbHome="Home"
        title="Checkout"
      />

      <div className="max-w-310 mx-auto px-4 py-10">
        <h1 className="text-4xl font-semibold text-over-primary">
          Billing details
        </h1>
        {/* US-12: formulário completo */}
      </div>
    </div>
  );
}
