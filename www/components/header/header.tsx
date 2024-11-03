import { ProfileDropdown } from "./profile-dropdown";
import { Breadcrumbs } from "./breadcrumbs";
import { Logo } from "../ui/logo";
import { cn } from "@/utils/styles";

export function Header() {
  return (
    <HeaderWrapper>
      <HeaderLeftWrapper>
        <Logo iconClassName="w-8 h-8" />
        <Breadcrumbs />
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        <ProfileDropdown />
      </HeaderRightWrapper>
    </HeaderWrapper>
  );
}

export function HeaderLeftWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-6">{children}</div>;
}

export function HeaderRightWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center space-x-2 gap-2">{children}</div>;
}

export function HeaderWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-b py-4 px-3 flex justify-between items-center",
        className
      )}
    >
      {children}
    </header>
  );
}
