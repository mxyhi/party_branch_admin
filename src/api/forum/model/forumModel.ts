export interface ForumItem {
  id: number;
  title: string; // 名称
  desc: string; // 简介
  content: string; // 内容
  poster: string; // 封面
  create_time: string; // 创建时间
  updated_time: string; // 修改时间
  click_count: number; // 点击量
  star_count: number; // 点赞数
  collect_count: number; // 收藏数
  comment_id: number[]; // 评论id
}

export type ForumList = ForumItem[];

export interface ForumListResponse {
  total: number;
  data: ForumList;
}

export type ForumCreate = Pick<ForumItem, 'title' | 'desc' | 'content' | 'poster'> &
  Partial<Pick<ForumItem, 'id'>>;

export interface ForumListQuery {
  page: number;
  limit: number;
}
