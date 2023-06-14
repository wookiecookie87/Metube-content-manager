import axios from "axios";
import { NextResponse } from "next/server";
import {
  TL_HEADERS,
  VIDEO_CLASSIFY_API_URL,
  INDEX_ID,
} from "../../../constants";
import { ClassifiedVideoData } from "@/types";

type VideoClass = {
  name: string;
  score: number;
  duration_ratio: number;
};

type Video = {
  video_id: string;
  classes: VideoClass[];
};

export async function POST(request: Request) {
  const { classes } = await request.json();

  const data = {
    options: ["visual"],
    index_id: INDEX_ID,
    classes: classes,
  };

  const config = {
    method: "post",
    url: VIDEO_CLASSIFY_API_URL,
    headers: TL_HEADERS,
    data: data,
  };
  const response = await axios(config);

  const classifiedDataList = response.data.data;

  const organizedData: ClassifiedVideoData[] = classifiedDataList.reduce(
    (acc: ClassifiedVideoData[], video: Video) => {
      video.classes.forEach((classData) => {
        const existingClass = acc.find((c) => c.className === classData.name);

        if (existingClass) {
          existingClass.videos.push({
            video_id: video.video_id,
            score: classData.score,
          });
        } else {
          acc.push({
            className: classData.name,
            videos: [{ video_id: video.video_id, score: classData.score }],
          });
        }
      });

      return acc;
    },
    []
  );

  const classifiedPageData = response.data.page_info;

  return NextResponse.json(
    { result: organizedData, pages: classifiedPageData },
    { status: 200 }
  );
}
