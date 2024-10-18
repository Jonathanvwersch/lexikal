import { Lato } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ProfileDropdown } from "./profile-dropdown";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Props = Readonly<{
  showLogo?: boolean;
  showShare?: boolean;
}>;

export function Header({ showLogo = true, showShare = false }: Props) {
  return (
    <>
      <header className="border-b py-4 px-3 flex justify-between items-center h-[60px]">
        <div className="flex items-center gap-6">
          {showLogo && (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                alt="Lexikal logo"
                width={32}
                height={32}
              />
              <h1
                className={`${lato.className} hidden sm:block text-lg font-bold`}
              >
                Lexikal
              </h1>
            </Link>
          )}
          <div className="pl-2">
            <Breadcrumbs />
          </div>
        </div>
        <div className="flex items-center space-x-2 gap-2">
          {showShare && (
            <Button
              variant="outline"
              className="px-2 md:px-3 flex gap-2"
              size="sm"
            >
              <Share2 className="w-3 h-3" />
              <span className="text-xs hidden md:block">Share</span>
            </Button>
          )}
          <ProfileDropdown />
        </div>
      </header>
    </>
  );
}
