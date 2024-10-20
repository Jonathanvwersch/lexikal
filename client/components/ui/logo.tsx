import { Lato } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { memo, useMemo } from "react";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Props = Readonly<{
  asLink?: boolean;
}>;

function _Logo({ asLink = true }: Props) {
  const body = useMemo(
    () => (
      <>
        <Image
          src="/icons/logo.svg"
          alt="Lexikal logo"
          width={32}
          height={32}
          className="rounded-md"
        />
        <h1 className={`${lato.className} hidden sm:block text-md font-bold`}>
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
