import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  EVENT_ADD = '/branch/add',
  EVENT_LIST = '/branch/list',
  EVENT_FIND_ONE = '/branch/detail',
  EVENT_DELETE = '/branch/delete',
}

export function getBranchAll() {
  return defHttp.get<any>({
    url: '/branch/all',
  });
}

/**
 * @description: event info
 */
export function addOrUpdateBranchApi(
  data: {
    id?: number;
    name: string;
    desc: string;
  },
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<any>(
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
export const getBranchListApi = (params: { page: number; limit: number }) =>
  defHttp.get<any>({
    url: Api.EVENT_LIST,
    params,
  });

/**
 * @description: 查询活动信息
 */
export const getBranchFindOneApi = (id: any) =>
  defHttp.get<any>({
    url: Api.EVENT_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除活动
 */
export const historyDeleteApi = (id: any) =>
  defHttp.post<any>({
    url: Api.EVENT_DELETE,
    data: {
      id,
    },
  });
