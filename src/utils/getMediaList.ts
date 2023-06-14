import { PAGE_LIMIT } from "@/app/constants";

export async function getMediaList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list/1/${PAGE_LIMIT}/created_at`,
    {
      cache: "no-store",
    }
  );

  const videoData = await response.json();
  return videoData;
}
