import { TL_API_HEADERS } from "@/app/api/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { indexId: string } }
) {
  const VIDEO_LIST_API = `${process.env.TL_API_URL}/indexes/${params.indexId}/videos`;

  const response = await axios.get(VIDEO_LIST_API, { headers: TL_API_HEADERS });

  const videoDataList = response.data.data;

  const videoList = await Promise.all(
    videoDataList.map(async (video: { _id: string }) => {
      const response = await axios.get(`${VIDEO_LIST_API}/${video._id}`, {
        headers: TL_API_HEADERS,
      });
      return response.data.hls;
    })
  );

  return NextResponse.json({ result: videoList }, { status: 200 });
}
