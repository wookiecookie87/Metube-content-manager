import { TL_HEADERS, VIDEO_LIST_API_URL } from "@/app/api/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { pagination: string[] } }
) {
  const { pagination } = params;

  const response = await axios.get(
    `${VIDEO_LIST_API_URL}?page=${pagination[0]}&page_limit=${pagination[1]}&sort_by=${pagination[2]}&sort_option=desc`,
    { headers: TL_HEADERS }
  );

  const videoDataList = response.data.data;
  const videoPageData = response.data.page_info;

  const videoList = await Promise.all(
    videoDataList.map(
      async (video: { _id: string; metadata: { filename: string } }) => {
        const response = await axios.get(`${VIDEO_LIST_API_URL}/${video._id}`, {
          headers: TL_HEADERS,
        });

        let videoData = response.data.hls;
        videoData._id = video._id;
        return videoData;
      }
    )
  );

  return NextResponse.json(
    { result: videoList, pages: videoPageData },
    { status: 200 }
  );
}
