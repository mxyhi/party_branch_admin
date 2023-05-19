import { defHttp } from '/@/utils/http/axios';
import {
  LectureItem,
  LectureCreate,
  LectureListQuery,
  LectureListResponse,
} from './model/lectureModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  EVENT_ADD = '/study/party/lecture/create',
  EVENT_LIST = '/study/party/lecture/list',
  EVENT_FIND_ONE = '/study/party/lecture/find',
  EVENT_DELETE = '/study/party/lecture/delete',
}

/**
 * @description: event info
 */
export function addOrUpdateLectureApi(data: LectureCreate, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LectureItem>(
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
export const getLectureListApi = (params: LectureListQuery) =>
  defHttp.get<LectureListResponse>({
    url: Api.EVENT_LIST,
    params,
  });

/**
 * @description: 查询活动信息
 */
export const lectureFindOneApi = (id: string) =>
  defHttp.get<LectureItem>({
    url: Api.EVENT_FIND_ONE,
    params: {
      id,
    },
  });

/**
 * @description: 删除活动
 */
export const lectureDeleteApi = (id: string) =>
  defHttp.get<LectureItem>({
    url: Api.EVENT_DELETE,
    params: {
      id,
    },
  });
