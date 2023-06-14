"use client";
import VideoList from "@/components/VideoList";
import SearchForm from "@/components/SearchForm";
import { VideoData, SearchQueryData, SearchedVideoData, Video } from "@/types";
import { getMediaList } from "@/utils/getMediaList";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Loading from "./loading";
import SearchedVideoList from "@/components/SearchedVideoList";

export default function Search() {
  const [searchedVideoData, setSearchedVideoData] =
    useState<SearchedVideoData | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  useEffect(() => {
    const fetchMediaData = async () => {
      const data = await getMediaList();
      setVideoData(data);
    };

    fetchMediaData();
  }, []);

  const handleSearch = async (searchQueryData: SearchQueryData) => {
    setSearchedVideoData(null);
    setVideoData(null);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/search`,
      {
        method: "POST",
        body: JSON.stringify(searchQueryData),
        cache: "no-store",
      }
    );

    const data = await response.json();
    setSearchedVideoData(data);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <div className="text-4xl font-bold">Search</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <SearchForm onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} sm={10}>
          {videoData ? (
            <VideoList result={videoData.result} pages={videoData.pages} />
          ) : searchedVideoData ? (
            <SearchedVideoList
              result={searchedVideoData.result}
              pages={searchedVideoData.pages}
            />
          ) : (
            <Loading />
          )}
          ;
        </Grid>
      </Grid>
    </>
  );
}
