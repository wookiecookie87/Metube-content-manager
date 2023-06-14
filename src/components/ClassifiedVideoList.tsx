"use client";

import { Grid } from "@mui/material";
import React, { useState } from "react";
import { ClassifiedVideo, ClassifiedVideoData } from "@/types";
import SearchedVideoCard from "./SearchedVideoCard";
import ClassifiedVideoCard from "./ClassifiedVideoCard";

export interface ClassifiedVideoListProps extends ClassifiedVideo {}

export default function ClassifiedVideoList(props: ClassifiedVideoListProps) {
  const [videos, setVideos] = useState<ClassifiedVideoData[]>(props.videoData);

  return (
    <>
      <Grid item xs={12} sm={12}>
        <div className="font-bold pb-2 text-4">Classified results</div>
      </Grid>

      <Grid item xs={12} sm={12}>
        <Grid container spacing={3}>
          {videos.map((video: ClassifiedVideoData) => (
            <>
              <hr className="border-gray-400" />
              <Grid key={video.className} item xs={12} sm={12}>
                <div className="text-4xl">{video.className}</div>
              </Grid>
              {video.videos.map(
                (video: { video_id: string; score: number }) => (
                  <Grid key={video.video_id} item xs={12} sm={3}>
                    <ClassifiedVideoCard
                      key={video.video_id}
                      video_id={video.video_id}
                      score={video.score}
                    />
                  </Grid>
                )
              )}
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
