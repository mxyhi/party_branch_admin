import { defHttp } from '/@/utils/http/axios';
import { ForumItem, ForumCreate, ForumListResponse, ForumListQuery } from './model/forumModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  EVENT_ADD = '/forum/create',
  EVENT_LIST = '/study/party/quotes/list',
  EVENT_FIND_ONE = '/study/party/quotes/find',
  EVENT_DELETE = '/study/party/quotes/delete',
}

/**
 * @description: event info
 */
export function addOrUpdateQuotesApi(data: ForumCreate, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ForumItem>(
    {
      url: Api.EVENT_ADD,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取活动列表
 */
export const getQuotesListApi = (params: ForumListQuery) =>
  defHttp.get<ForumListResponse>({
    url: Api.EVENT_LIST,
    params,
  });

/**
 * @description: 查询活动信息
 */
export const quotesFindOneApi = (id: string) =>
  defHttp.get<ForumItem>({
    url: Api.EVENT_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除活动
 */
export const quotesDeleteApi = (id: string) =>
  defHttp.post<ForumItem>({
    url: Api.EVENT_DELETE,
    params: {
      id,
    },
  });
