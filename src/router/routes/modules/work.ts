import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/work',
  name: 'Work',
  component: LAYOUT,
  redirect: '/work/list',
  meta: {
    icon: 'material-symbols:event',
    title: '工作通知',
    roles: [RoleEnum.ADMIN, RoleEnum.BRANCH, RoleEnum.USER],
  },
  children: [
    {
      path: 'list',
      name: 'WorkNoticeList',
      component: () => import('/@/views/develop/work/List.vue'),
      meta: {
        title: '工作通知',
        icon: 'material-symbols:event-upcoming',
      },
    },
    {
      path: 'create',
      name: 'WorkCreate',
      component: () => import('/@/views/develop/work/Add.vue'),
      meta: {
        title: '新增通知',
        icon: 'material-symbols:event-note',
      },
    },
  ],
};

export default dashboard;
