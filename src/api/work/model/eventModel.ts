export interface EventInfoType {
  title: string;
  desc: string;
  content: string;
  poster: string[];
  start_time: string;
  end_time: string;
}

export interface EventAPIParams {
  page: number;
  limit: number;
  id?: string;
}

export interface EventListGetResultModel {
  total: number;
  data: EventItem[];
}

export interface EventItem {
  id: number;
  title: string;
  desc: string;
  content: string;
  start_time: string;
  end_time: string;
  poster: string[];
  create_time: string;
  updated_time: string;
}
