import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/aMessage',
  name: 'AMessage',
  component: LAYOUT,
  redirect: '/aMessage/list',
  meta: {
    icon: 'material-symbols:event',
    title: '留言反馈',
    orderNo: 2,
    roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
  },
  children: [
    {
      path: 'list',
      name: 'AMessageList',
      component: () => import('/@/views/develop/aMessage/List.vue'),
      meta: {
        title: '留言反馈',
        icon: 'material-symbols:event-upcoming',
      },
    },
    // {
    //   path: 'create',
    //   name: 'AMessageCreate',
    //   component: () => import('/@/views/develop/aMessage/Add.vue'),
    //   meta: {
    //     title: '新增留言',
    //     icon: 'material-symbols:event-note',
    //   },
    // },
  ],
};

export default dashboard;
