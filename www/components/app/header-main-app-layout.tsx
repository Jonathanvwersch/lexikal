import { Header } from "../header/header";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function HeaderMainAppLayout({ children }: Props) {
  return (
    <div className="flex-col">
      <Header />
      <main className="flex items-center justify-between flex-1 space-y-6 p-4 pt-6">
        {children}
      </main>
    </div>
  );
}
