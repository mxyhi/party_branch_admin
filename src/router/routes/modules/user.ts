import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/branch',
  name: 'Branch',
  component: LAYOUT,
  redirect: '/branch/list',
  meta: {
    icon: 'material-symbols:event',
    orderNo: 10,
    title: '党支部信息',
    roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
  },
  children: [
    {
      path: 'list',
      name: 'BranchList',
      component: () => import('/@/views/develop/branch/List.vue'),
      meta: {
        title: '党支部管理',
        icon: 'material-symbols:event-upcoming',
        roles: [RoleEnum.ADMIN],
      },
    },
    {
      path: 'create',
      name: 'BranchCreate',
      component: () => import('/@/views/develop/branch/Add.vue'),
      meta: {
        title: '新增党支部',
        icon: 'material-symbols:event-note',
        roles: [RoleEnum.ADMIN],
      },
    },
    {
      path: 'part/list',
      name: 'PartyListInfo',
      component: () => import('/@/views/develop/user/List.vue'),
      meta: {
        title: '党员信息',
        icon: 'material-symbols:event-upcoming',
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
    },
    {
      path: 'part/create',
      name: 'PartCreateInfo',
      component: () => import('/@/views/develop/user/Add.vue'),
      meta: {
        title: '新增党员',
        icon: 'material-symbols:event-note',
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
    },
  ],
};

export default dashboard;
