import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Benefits from "@/components/Benefits/Benefits";
import PageBanner from "@/components/Shop/PageBanner";
import { Input } from "@/components/ui/Input";
import { contactSchema, type ContactFormData } from "@/schemas/contact.schema";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(_data: ContactFormData) {
    toast.success("Message sent successfully!");
    reset();
  }

  return (
    <div>
      <PageBanner breadcrumbCurrent="Contact" breadcrumbHome="Home" title="Contact" />
      <div className="max-w-310 mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-over-primary">Get In Touch With Us</h2>
          <p className="mx-auto mt-3 max-w-xl text-footer-gray">
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div className="flex gap-7.5">
              <img src="/Icons/address.svg" alt="Address" className="h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-medium text-over-primary">Address</h3>
                <p className="mt-1">236 5th SE Avenue, New York NY1000, United States</p>
              </div>
            </div>
            <div className="flex gap-7.5">
              <img src="/Icons/phone.svg" alt="Phone" className="h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-medium text-over-primary">Phone</h3>
                <p className="mt-1 ">Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
            </div>
            <div className="flex gap-7.5">
              <img src="/Icons/working-time.svg" alt="Working Time" className="h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-medium text-over-primary">Working Time</h3>
                <p className="mt-1 ">Monday-Friday: 9:00 – 22:00</p>
                <p>Saturday-Sunday: 9:00 – 21:00</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-9">
            <Input id="yourName" label="Your name" error={errors.yourName?.message} {...register("yourName")} />
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="Abc@def.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input id="subject" label="Subject" placeholder="This is an optional" {...register("subject")} />
            <Input
              id="message"
              label="Message"
              placeholder="Hi! I'd like to ask about"
              textarea
              rows={4}
              {...register("message")}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-59 rounded-lg bg-over-secundary px-22 py-3.5 text-primary transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Benefits />
    </div>
  );
}
