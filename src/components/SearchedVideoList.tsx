"use client";

import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchedVideoData, SearchedVideo } from "@/types";
import SearchedVideoCard from "./SearchedVideoCard";

export interface SearchedVideoListProps extends SearchedVideoData {}

export default function SearchedVideo(props: SearchedVideoListProps) {
  const [videos, setVideos] = useState<SearchedVideo[]>(props.result);
  const [nextPageToken, setNextPageToken] = useState<string>(
    props.pages.next_page_token || ""
  );
  const fetchVideos = async (pageToken: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/search/${pageToken}`
    );
    const videoData = await response.json();
    setVideos([...videos, ...videoData.result]);
    setNextPageToken(videoData.pages.next_page_token);
  };

  const handleNextPage = () => {
    fetchVideos(nextPageToken);
  };

  return (
    <>
      <Grid item xs={12} sm={12}>
        {videos.length > 0 && (
          <div className="font-bold pb-2 text-4">Searched results</div>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        {videos.length > 0 ? (
          <Grid container spacing={3}>
            {videos.map((video: SearchedVideo) => (
              <Grid key={video.video_id} item xs={12} sm={3}>
                <SearchedVideoCard key={video.video_id} video={video} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <div className="font-bold text-3xl pl-10">No search results! </div>
          </Box>
        )}
      </Grid>
      {nextPageToken && (
        <Box display="flex" justifyContent="center" sx={{ marginTop: "15px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            style={{ height: "50px", width: "500px", fontSize: "20px" }}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
}
