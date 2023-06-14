"use client";
import VideoList from "@/components/VideoList";

import { getMediaList } from "@/utils/getMediaList";

import React, { useState, useEffect } from "react";
import Loading from "./loading";
import { Grid } from "@mui/material";
import { ClassGroup, ClassifiedVideoData, VideoData } from "@/types";
import ClassMultiSelect from "@/components/ClassifySelectForm";
import ClassifySelectForm from "@/components/ClassifySelectForm";
import ClassifiedVideoList from "@/components/ClassifiedVideoList";

export default function Search() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [classifiedVideoData, setClassifiedVideoData] = useState<
    ClassifiedVideoData[] | null
  >(null);
  useEffect(() => {
    const fetchMediaData = async () => {
      const data = await getMediaList();
      setVideoData(data);
    };

    fetchMediaData();
  }, []);

  const handleClassify = async (classData: ClassGroup[]) => {
    setVideoData(null);
    setClassifiedVideoData(null);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/classify`,
      {
        method: "POST",
        body: JSON.stringify({ classes: classData }),
        cache: "no-store",
      }
    );

    const data = await response.json();
    setClassifiedVideoData(data.result);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <div className="text-4xl font-bold">Classify</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <ClassifySelectForm onClassify={handleClassify} />
        </Grid>
        <Grid item xs={12} sm={10}>
          {videoData ? (
            <VideoList result={videoData.result} pages={videoData.pages} />
          ) : classifiedVideoData ? (
            <ClassifiedVideoList videoData={classifiedVideoData} />
          ) : (
            <Loading />
          )}
          ;
        </Grid>
      </Grid>
    </>
  );
}
