import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/settings/appearance");
  return null;
}
