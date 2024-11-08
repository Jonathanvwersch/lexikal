import {
  HeaderWrapper,
  HeaderLeftWrapper,
  HeaderRightWrapper,
} from "@/components/header/header";
import { ProfileDropdown } from "@/components/header/profile-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotebookBreadcrumbs } from "./notebook-breadcrumbs";

type Props = Readonly<{
  notebookId: string;
  contextId?: string;
}>;

export function NotebookHeader({ notebookId, contextId }: Props) {
  return (
    <HeaderWrapper className="py-[18px]">
      <HeaderLeftWrapper>
        <SidebarTrigger size="icon" />
        <NotebookBreadcrumbs notebookId={notebookId} contextId={contextId} />
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        <ProfileDropdown />
      </HeaderRightWrapper>
    </HeaderWrapper>
  );
}
