export interface QuotesItem {
  id: number;
  title: string; // 名称
  desc: string; // 简介
  content: string; // 内容
  create_time: string; // 创建时间
  updated_time: string; // 修改时间
  click_count: number; // 点击量
  star_count: number; // 点赞数
  collect_count: number; // 收藏数
  start_time: string; // 开始时间
  end_time: string; // 结束时间
}

export type QuotesList = QuotesItem[];

export interface QuotesListResponse {
  total: number;
  data: QuotesList;
}

export type QuotesCreate = Pick<
  QuotesItem,
  'title' | 'desc' | 'content' | 'start_time' | 'end_time'
> &
  Partial<Pick<QuotesItem, 'id'>>;

export interface QuotesListQuery {
  page: number;
  limit: number;
}
