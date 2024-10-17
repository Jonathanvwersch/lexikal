import { Lato } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ProfileDropdown } from "./profile-dropdown";
import { Breadcrumbs } from "./breadcrumbs";
import { SidebarToggle } from "../notebook-sidebar/sidebar-toggle";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Props = Readonly<{
  showLogo?: boolean;
  showSidebarToggle?: boolean;
}>;

export function Header({ showLogo = true, showSidebarToggle }: Props) {
  return (
    <>
      <header className="border-b py-4 px-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          {showSidebarToggle && <SidebarToggle />}
          {showLogo && (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                alt="Lexikal logo"
                width={32}
                height={32}
              />
              <h1 className={`${lato.className} text-lg font-bold`}>Lexikal</h1>
            </Link>
          )}
          <div className="pl-4">
            <Breadcrumbs />
          </div>
        </div>
        <div className="flex items-center space-x-2 gap-2">
          <ProfileDropdown />
        </div>
      </header>
    </>
  );
}
