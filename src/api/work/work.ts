import { defHttp } from '/@/utils/http/axios';
import {
  WorkNoticeBody,
  WorkNoticeListParams,
  WorkNoticeListData,
  WorkNoticeData,
} from './model/workModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  WORK_NOTICE_ADD = '/work/notice/add',
  WORK_NOTICE_LIST = '/work/notice/list',
  WORK_NOTICE_FIND_ONE = '/work/notice/findOne',
  WORK_NOTICE_DELETE = '/work/notice/delete',
}

/**
 * @description: add
 */
export function addWorkNoticeApi(data: WorkNoticeBody, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<WorkNoticeBody>(
    {
      url: Api.WORK_NOTICE_ADD,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取
 */
export const workNoticeListApi = (params: WorkNoticeListParams) =>
  defHttp.get<WorkNoticeListData>({
    url: Api.WORK_NOTICE_LIST,
    params,
  });

/**
 * @description: 查询
 */
export const workNoticeFindOneApi = (id: string) =>
  defHttp.get<WorkNoticeData>({
    url: Api.WORK_NOTICE_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除
 */
export const deleteWorkNoticeApi = (id: string) =>
  defHttp.post<WorkNoticeData>({
    url: Api.WORK_NOTICE_DELETE,
    data: {
      id,
    },
  });
