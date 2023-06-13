import { TL_HEADERS, VIDEO_SEARCH_API_URL } from "@/app/api/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { pageToken: string } }
) {
  const { pageToken } = params;

  const response = await axios.get(`${VIDEO_SEARCH_API_URL}/${pageToken}`, {
    headers: TL_HEADERS,
  });

  const videoDataList = response.data.data;
  const videoPageData = response.data.page_info;

  return NextResponse.json(
    { result: videoDataList, pages: videoPageData },
    { status: 200 }
  );
}
