import { ProfileDropdown } from "./profile-dropdown";
import { Breadcrumbs } from "./breadcrumbs";
import { Logo } from "../ui/logo";

export function Header() {
  return (
    <HeaderWrapper>
      <HeaderLeftWrapper>
        <Logo />
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

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-b py-4 px-3 flex justify-between items-center">
      {children}
    </header>
  );
}
