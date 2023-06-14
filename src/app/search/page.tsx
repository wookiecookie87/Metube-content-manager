"use client";
import VideoList from "@/components/VideoList";
import SearchForm from "@/components/SearchForm";
import { MediaData, SearchData, SearchedMediaData, Video } from "@/types";
import { getMediaList } from "@/utils/getMediaList";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Loading from "./loading";
import SearchedVideoList from "@/components/SearchedVideoList";

export default function Search() {
  const [searchedVideoData, setSearchedVideoData] =
    useState<SearchedMediaData | null>(null);
  const [videoData, setVideoData] = useState<MediaData | null>(null);

  useEffect(() => {
    const fetchMediaData = async () => {
      const data = await getMediaList();
      setVideoData(data);
    };

    fetchMediaData();
  }, []);

  const handleSearch = async (searchData: SearchData) => {
    setSearchedVideoData(null);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/search`,
      {
        method: "POST",
        body: JSON.stringify(searchData),
        cache: "no-store",
      }
    );

    const data = await response.json();
    setVideoData(null);
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
