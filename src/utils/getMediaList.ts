export async function getMediaList() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list/1/12/created_at`,
      {
        cache: "no-store",
      }
    );

    const videoData = await response.json();
    return videoData;
  } catch (error) {
    console.error("ERROR", error);
    return [];
  }
}
