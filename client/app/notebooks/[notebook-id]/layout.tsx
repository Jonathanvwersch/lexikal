import { Breadcrumbs } from "@/components/header/breadcrumbs";
import {
  HeaderWrapper,
  HeaderLeftWrapper,
  HeaderRightWrapper,
} from "@/components/header/header";
import { ProfileDropdown } from "@/components/header/profile-dropdown";
import NotebookSidebarLayout from "@/components/notebook-sidebar/sidebar-layout";
import { NotebookChat } from "@/components/notebooks/chat/chat-notebook";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

interface NotebookLayoutProps {
  children: React.ReactNode;
}

export default function NotebookLayout({ children }: NotebookLayoutProps) {
  return (
    <NotebookSidebarLayout>
      <SidebarInset>
        <HeaderWrapper>
          <HeaderLeftWrapper>
            <SidebarTrigger size="icon" />
            <h1>Notebook Title</h1>
            <Breadcrumbs />
          </HeaderLeftWrapper>
          <HeaderRightWrapper>
            <ProfileDropdown />
          </HeaderRightWrapper>
        </HeaderWrapper>
        <div className="flex-1 space-y-4 flex-grow relative">
          <main className="flex items-center justify-between space-y-2 w-full h-full p-4 ">
            {children}
            <NotebookChat />
          </main>
        </div>
      </SidebarInset>
    </NotebookSidebarLayout>
  );
}
