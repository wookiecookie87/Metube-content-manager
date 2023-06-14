import { VideoData } from "@/types";
import React from "react";
import VideoList from "@/components/VideoList";
import { getMediaList } from "@/utils/getMediaList";

export default async function Home() {
  const videoData: VideoData = await getMediaList();

  return (
    <>
      <VideoList result={videoData.result} pages={videoData.pages} />
    </>
  );
}
