"use client";

import { Box, Grid, MenuItem, Pagination, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import VideoCard from "./VideoCard";
import { MediaData, Video } from "@/types";
import { AltRoute } from "@mui/icons-material";

export interface VideoListProps extends MediaData {}

export default function MediaList(props: VideoListProps) {
  const [page, setPage] = React.useState(1);
  const [videos, setVideos] = React.useState(props.result);
  const [sort, setSort] = React.useState("created_at");
  const { limit_per_page, total_page } = props.pages;

  const fetchVideos = async (pageNumber: number, sortOption: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list/${pageNumber}/${limit_per_page}/${sortOption}`
    );
    const videoData = await response.json();
    setVideos(videoData.result);
  };

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
    fetchVideos(pageNumber, sort);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    fetchVideos(1, event.target.value as string);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Select value={sort} onChange={handleSortChange}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="created_at">Rencently Uploaded</MenuItem>
        <MenuItem value="updated_at">Rencently Updated</MenuItem>
      </Select>
      <Grid item xs={12} sm={12}>
        <Grid container spacing={3}>
          {videos.map((video: Video) => (
            <Grid key={video._id} item xs={12} sm={3}>
              <VideoCard
                key={video._id}
                _id={video._id}
                thumbnail_urls={video.thumbnail_urls}
                video_url={video.video_url}
              />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={total_page}
          page={page}
          onChange={handleChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            "& button": {
              fontSize: "20px", // This increases the font size of the buttons
            },
          }}
        />
      </Grid>
    </Box>
  );
}
