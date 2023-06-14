import { TL_HEADERS, VIDEO_LIST_API_URL } from "@/app/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params;

  const response = await axios.get(`${VIDEO_LIST_API_URL}/${videoId}`, {
    headers: TL_HEADERS,
  });

  return NextResponse.json({ result: response.data.hls }, { status: 200 });
}
