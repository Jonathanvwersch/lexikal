import { Logo } from "../ui/logo";

export function LandingPageHeader() {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <HeaderLeftWrapper>
          <Logo />
        </HeaderLeftWrapper>
        <HeaderRightWrapper>hello</HeaderRightWrapper>
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
  return <div className="flex items-center space-x-2 gap-2">{children}</div>;
}

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return <header className="border-b py-4 px-3">{children}</header>;
}
