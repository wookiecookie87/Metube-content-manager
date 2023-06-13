export const TL_HEADERS = {
  "x-api-key": process.env.TL_API_KEY || "",
};

export const VIDEO_LIST_API_URL = `${process.env.TL_API_URL}/indexes/${process.env.TL_INDEX_ID}/videos`;
export const VIDEO_SEARCH_API_URL = `${process.env.TL_API_URL}/search`;
