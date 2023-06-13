export type Video = {
  _id: string;
  video_url: string;
  thumbnail_urls: string[];
};

export type SearchedVideo = {
  video_id: string;
  score: number;
  start: number;
  ends: number;
  confidence: string;
  thumbnail_url: string;
  modules: Array<{ type: string }>;
};

export type Pages = {
  page?: number;
  limit_per_page: number;
  total_results: number;
  total_page: number;
  next_page_token?: string;
  prev_page_token?: string;
};

export type MediaData = {
  result: Array<Video>;
  pages: Pages;
};

export type SearchedMediaData = {
  result: Array<SearchedVideo>;
  pages: Pages;
};

export type SearchData = {
  searchQuery: string;
  searchOptions: string[];
};
