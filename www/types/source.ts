export type Source = {
  id: string;
  name: string;
  type: "url" | "file" | "text" | "google-drive" | "dropbox" | "notion";
};
