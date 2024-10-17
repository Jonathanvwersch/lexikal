import { AppLayout } from "@/components/app/layout";
import { CreateNotebook } from "@/components/notebooks/create-notebook";
import Notebooks from "@/components/notebooks/notebooks";

export default function Home() {
  return (
    <AppLayout>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-4 items-center justify-center">
        <CreateNotebook />
        <Notebooks />
      </div>
    </AppLayout>
  );
}
