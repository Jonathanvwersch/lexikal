import { LandingPageHeader } from "./header";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function LandingPageLayout({ children }: Props) {
  return (
    <div className="flex-col">
      <LandingPageHeader />
      <main className="flex items-center justify-between flex-1 space-y-6 p-4 pt-6 max-w-screen-lg mx-auto">
        {children}
      </main>
    </div>
  );
}
