import { type Video } from "@/types";
import Image from "next/image";
import * as React from "react";

export default async function VideoList({
  promise,
}: {
  promise: Promise<Video[]>;
}) {
  const videoList = await promise;

  return (
    <div>
      {videoList?.map((video: Video) => (
        <Image
          key={video.updated_at}
          src={video.thumbnail_urls[0]}
          alt="videoThumbNail"
          width="100"
          height="100"
        />
      ))}
    </div>
  );
}
