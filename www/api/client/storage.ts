export async function uploadFileToSupabase(
  file: File,
  signedUploadUrl: string
) {
  await fetch(signedUploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
}
