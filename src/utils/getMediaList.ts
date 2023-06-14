export async function getMediaList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list/1/12/created_at`,
    {
      cache: "no-store",
    }
  );

  const videoData = await response.json();
  return videoData;
}
