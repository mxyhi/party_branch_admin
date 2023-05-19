import { defHttp } from '/@/utils/http/axios';
import {
  HistoryItem,
  HistoryCreate,
  HistoryListResponse,
  HistoryListQuery,
} from './model/historyModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  EVENT_ADD = '/study/party/history/create',
  EVENT_LIST = '/study/party/history/list',
  EVENT_FIND_ONE = '/study/party/history/find',
  EVENT_DELETE = '/study/party/history/delete',
}

/**
 * @description: event info
 */
export function addOrUpdateHistoryApi(data: HistoryCreate, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<HistoryItem>(
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
export const getHistoryListApi = (params: HistoryListQuery) =>
  defHttp.get<HistoryListResponse>({
    url: Api.EVENT_LIST,
    params,
  });

/**
 * @description: 查询活动信息
 */
export const historyFindOneApi = (id: string) =>
  defHttp.get<HistoryItem>({
    url: Api.EVENT_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除活动
 */
export const historyDeleteApi = (id: string) =>
  defHttp.post<HistoryItem>({
    url: Api.EVENT_DELETE,
    params: {
      id,
    },
  });
