export interface WorkNoticeBody {
  id?: number;
  title: string;
  desc: string;
  content: string;
  poster: string;
  start_time: string;
  end_time: string;
}

export interface WorkNoticeListParams {
  page: number;
  limit: number;
}

export interface WorkNoticeData {
  id: number;
  title: string;
  desc: string;
  content: string;
  poster: string;
  create_time: string;
  updated_time: string;
  click_count: number;
  start_time: string;
  end_time: string;
}

export interface WorkNoticeListData {
  total: number;
  data: WorkNoticeData[];
}
