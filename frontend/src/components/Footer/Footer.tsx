import { IconLink } from "../IconLink";
import { Links } from "./Links";
import { Newsletter } from "./Newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-footer text-footer-gray">
      <div className="mx-auto max-w-310 px-2 py-14 sm:px-4">
        <div className="flex flex-col flex-wrap items-center gap-12 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="w-max">
            <h1 className="text-2xl font-bold text-black">Furniro.</h1>

            <p className="mt-12.5">
              400 University Drive Suite 200 Coral <br /> Gables, <br /> FL
              33134 USA
            </p>

            <div className="mt-13.75 flex gap-4 sm:gap-6 md:gap-7 lg:gap-9 xl:gap-11.5">
              <IconLink
                href="https://www.facebook.com/airevolutioncompany/"
                iconSrc="/Icons/facebook-icon.svg"
                alt="Facebook"
                css="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.2)]"
              />
              <IconLink
                href="https://www.instagram.com/aircompany.ai/"
                alt="Instagram"
                iconSrc="/Icons/instagram-icon.svg"
                css="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.2)]"
              />
              <IconLink
                href="https://www.instagram.com/aircompany.ai/"
                alt="Twitter"
                iconSrc="/Icons/twitter-icon.svg"
                css="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.2)]"
              />
              <IconLink
                href="https://www.linkedin.com/company/airevolutioncompany/"
                iconSrc="/Icons/linkedin-icon.svg"
                alt="LinkedIn"
                css="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>

          <div className="flex gap-12 sm:gap-20 md:gap-30">
            <Links
              title="Links"
              links={[
                { title: "Home", href: "/" },
                { title: "Shop", href: "/shop" },
                { title: "About" },
                { title: "Contact", href: "/contact" },
              ]}
            />

            <Links
              title="Help"
              links={[
                { title: "Payment Options" },
                { title: "Returns" },
                { title: "Privacy Policies" },
              ]}
            />
          </div>

          <Newsletter />
        </div>

        <div className="mt-12 border-t border-footer pt-8.75">
          <p className="text-center text-black sm:text-left">
            2023 furniro. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
