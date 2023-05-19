import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/user/info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  GetList = '/user/list',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(uname: string) {
  return defHttp.get<GetUserInfoModel>(
    {
      url: Api.GetUserInfo,
      params: {
        uname,
      },
    },
    { errorMessageMode: 'none' },
  );
}

/**
 * @description: getUserList
 */
export function getUserList(params: { type?: number; page: number; limit: number }) {
  return defHttp.get<any>(
    {
      params,
      url: Api.GetList,
    },
    { errorMessageMode: 'none' },
  );
}

/**
 * @description: add user
 */
export function fetchAddUser(data: any) {
  return defHttp.post<any>(
    {
      data,
      url: '/user/add',
    },
    { errorMessageMode: 'none' },
  );
}

/**
 * @description: delete user
 */
export function fetchDeleteUser(id: any) {
  return defHttp.post<any>(
    {
      params: {
        id,
      },
      url: '/user/delete',
    },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
