import { HeaderMainAppLayout } from "@/components/app/header-main-app-layout";
import { SettingsSidebarNav } from "./components/settings-sidebar-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const sidebarNavItems = [
  // {
  //   title: "Account",
  //   href: "/settings/account",
  // },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 w-full">
      <HeaderMainAppLayout>
        <div className="space-y-6 h-full w-full p-0">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SettingsSidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </HeaderMainAppLayout>
    </div>
  );
}
