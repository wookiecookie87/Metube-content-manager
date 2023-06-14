"use client";

import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import {
  ClassifiedMediaData,
  ClassifiedVideoData,
  SearchedMediaData,
  SearchedVideo,
} from "@/types";
import SearchedVideoCard from "./SearchedVideoCard";
import ClassifiedVideoCard from "./ClassifiedVideoCard";

export interface ClassifiedVideoListProps extends ClassifiedMediaData {}

export default function ClassifiedVideoList(props: ClassifiedVideoListProps) {
  const [videos, setVideos] = useState<ClassifiedVideoData[]>(props.videoData);

  return (
    <Box sx={{ p: 3 }}>
      <div>Searched results</div>
      <Grid item xs={12} sm={12}>
        <Grid container spacing={3}>
          {videos.map((video: ClassifiedVideoData) => (
            <>
              <Grid key={video.className} item xs={12} sm={12}>
                <div>{video.className}</div>
              </Grid>
              {video.videos.map(
                (video: { video_id: string; score: number }) => (
                  <Grid key={video.video_id} item xs={12} sm={3}>
                    <ClassifiedVideoCard
                      key={video.video_id}
                      video_id={video.video_id}
                    />
                  </Grid>
                )
              )}
            </>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
