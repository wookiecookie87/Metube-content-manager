import { MediaData } from "@/types";
import React from "react";
import VideoList from "@/components/VideoList";
import { getMediaList } from "@/utils/getMediaList";

export default async function Home() {
  const videoData: MediaData = await getMediaList();

  return (
    <>
      <VideoList result={videoData.result} pages={videoData.pages} />
    </>
  );
}
