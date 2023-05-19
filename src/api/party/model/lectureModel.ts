export interface LectureItem {
  id: number;
  title: string;
  desc: string;
  content: string;
  video_url: string;
  poster: string;
  create_time: string;
  updated_time: string;
  click_count: number;
  star_count: number;
  collect_count: number;
  start_time: string;
  end_time: string;
}

export interface LectureListResponse {
  total: number;
  data: LectureList;
}

export type LectureList = LectureItem[];

export type LectureCreate = Pick<
  LectureItem,
  'title' | 'desc' | 'content' | 'video_url' | 'poster' | 'start_time' | 'end_time'
> &
  Partial<Pick<LectureItem, 'id'>>;

export interface LectureListQuery {
  page: number;
  limit: number;
}
