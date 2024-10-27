import { Icons } from "@/assets/icons";
import { cn } from "@/utils/styles";
import { Lato } from "next/font/google";
import Link from "next/link";
import { memo, useMemo } from "react";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Props = Readonly<{
  asLink?: boolean;
  iconClassName?: string;
  textClassName?: string;
  darkMode?: boolean;
}>;

function _Logo({
  asLink = true,
  iconClassName,
  textClassName,
  darkMode,
}: Props) {
  const body = useMemo(
    () => (
      <>
        <Icons.logo className={cn(`rounded-md`, iconClassName)} />
        <h1
          className={cn(
            `${lato.className} hidden sm:block text-md font-bold`,
            textClassName,
            darkMode && "text-white"
          )}
        >
          Lexikal
        </h1>
      </>
    ),
    []
  );

  return asLink ? (
    <Link href="/" className="flex items-center gap-2">
      {body}
    </Link>
  ) : (
    <div className="flex items-center gap-2">{body}</div>
  );
}

export const Logo = memo(_Logo);
