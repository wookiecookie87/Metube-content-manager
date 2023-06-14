import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { TL_HEADERS, VIDEO_SEARCH_API_URL, INDEX_ID } from "../../../constants";

export async function POST(request: Request) {
  //onsole.log(request);

  const { searchQuery, searchOptions } = await request.json();

  const data = JSON.stringify({
    query: searchQuery,
    index_id: INDEX_ID,
    search_options: searchOptions,
    page_limit: 16,
  });

  const config = {
    method: "post",
    url: VIDEO_SEARCH_API_URL,
    headers: TL_HEADERS,
    data: data,
  };
  const response = await axios(config);

  const searchedDataList = response.data.data;
  const searchedPageData = response.data.page_info;

  return NextResponse.json(
    { result: searchedDataList, pages: searchedPageData },
    { status: 200 }
  );
}
