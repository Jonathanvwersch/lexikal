import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function LandingPageHeader() {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <HeaderLeftWrapper>
          <Logo iconClassName="w-8 h-8" />
        </HeaderLeftWrapper>
        <HeaderRightWrapper>
          <Button variant="outline" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <Button asChild>
            <Link href="/log-in">Log in</Link>
          </Button>
        </HeaderRightWrapper>
      </HeaderInner>
    </HeaderWrapper>
  );
}

export function HeaderLeftWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-6">{children}</div>;
}

export function HeaderInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-lg mx-auto w-full flex justify-between items-center">
      {children}
    </div>
  );
}

export function HeaderRightWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center space-x-2 gap-1">{children}</div>;
}

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 border-b py-4 px-3">{children}</header>
  );
}
