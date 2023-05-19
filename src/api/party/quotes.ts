import { defHttp } from '/@/utils/http/axios';
import { QuotesItem, QuotesCreate, QuotesListResponse, QuotesListQuery } from './model/quotesModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  EVENT_ADD = '/study/party/quotes/create',
  EVENT_LIST = '/study/party/quotes/list',
  EVENT_FIND_ONE = '/study/party/quotes/find',
  EVENT_DELETE = '/study/party/quotes/delete',
}

/**
 * @description: event info
 */
export function addOrUpdateQuotesApi(data: QuotesCreate, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<QuotesItem>(
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
export const getQuotesListApi = (params: QuotesListQuery) =>
  defHttp.get<QuotesListResponse>({
    url: Api.EVENT_LIST,
    params,
  });

/**
 * @description: 查询活动信息
 */
export const quotesFindOneApi = (id: string) =>
  defHttp.get<QuotesItem>({
    url: Api.EVENT_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除活动
 */
export const quotesDeleteApi = (id: string) =>
  defHttp.post<QuotesItem>({
    url: Api.EVENT_DELETE,
    params: {
      id,
    },
  });
