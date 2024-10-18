import { Header } from "../header/header";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function AppLayout({ children }: Props) {
  return (
    <>
      <div className="flex-col">
        <Header />
        <div className="flex-1 space-y-4 p-4 pt-6">
          <main className="flex items-center justify-between space-y-2">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
