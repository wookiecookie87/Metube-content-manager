export type Video = {
  _id: string;
  video_url: string;
  thumbnail_urls: string[];
};

export type VideoData = {
  result: Array<Video>;
  pages: Pages;
};

export type SearchedVideo = {
  video_id: string;
  score: number;
  start: number;
  ends: number;
  confidence: string;
  thumbnail_url: string;
  metadata: Array<{ type: string }>;
};

export type SearchedVideoData = {
  result: Array<SearchedVideo>;
  pages: Pages;
};

export type ClassifiedVideoData = {
  className: string;
  videos: {
    video_id: string;
    score: number;
  }[];
};

export type ClassifiedVideo = {
  videoData: Array<ClassifiedVideoData>;
};

export type Pages = {
  page?: number;
  limit_per_page: number;
  total_results: number;
  total_page: number;
  next_page_token?: string;
  prev_page_token?: string;
};

export type SearchQueryData = {
  searchQuery: string;
  searchOptions: string[];
};

export type ClassGroup = {
  name: string;
  prompts: string[];
};
