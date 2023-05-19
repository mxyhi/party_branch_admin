import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  EVENT_ADD = '/message/add',
  EVENT_LIST = '/message/list',
  EVENT_FIND_ONE = '/message/detail',
  EVENT_DELETE = '/message/delete',
}

/**
 * @description: event info
 */
export function addOrUpdateQuotesApi(data: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
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
export const getQuotesListApi = (params: any) =>
  defHttp.get({
    url: Api.EVENT_LIST,
    params,
  });

/**
 * @description: 查询活动信息
 */
export const quotesFindOneApi = (id: string) =>
  defHttp.get({
    url: Api.EVENT_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除活动
 */
export const quotesDeleteApi = (id: string) =>
  defHttp.post({
    url: Api.EVENT_DELETE,
    params: {
      id,
    },
  });
