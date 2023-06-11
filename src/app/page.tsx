import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import * as React from "react";

async function getIndexList(IndexId: string) {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/video/list/${IndexId}`
    );

    const videolist = await response.json();
    return videolist.data;
  } catch (error) {
    console.error("ERROR", error);
    return [];
  }
}

export default async function Home() {
  const headers = {
    "x-api-key": process.env.TL_API_KEY || "",
  };
  const videoList: Array<{
    video_url: string;
    thumbnail_urls: string[];
    updated_at: string;
  }> = await getIndexList(process.env.TL_INDEX_ID as string);

  return (
    <div>
      {videoList.map(
        (video: {
          video_url: string;
          thumbnail_urls: string[];
          updated_at: string;
        }) => (
          <Image
            key={video.updated_at}
            src={video.thumbnail_urls[0]}
            alt="videoThumbNail"
            width="100"
            height="100"
          />
        )
      )}
    </div>
  );
}