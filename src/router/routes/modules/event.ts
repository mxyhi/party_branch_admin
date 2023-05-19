import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const event: AppRouteModule = {
  path: '/event',
  name: 'Event',
  component: LAYOUT,
  meta: {
    icon: 'material-symbols:event',
    title: '活动管理',
    orderNo: 1,
    roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
  },
  children: [
    {
      path: 'obligation',
      name: 'Obligation',
      component: LAYOUT,
      meta: {
        icon: 'material-symbols:event',
        title: '义务活动',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'ObligationList',
          component: () => import('/@/views/develop/obligation/List.vue'),
          meta: {
            title: '义务活动',
            icon: 'material-symbols:event-upcoming',
          },
        },
        {
          path: 'create',
          name: 'ObligationCreate',
          component: () => import('/@/views/develop/obligation/Add.vue'),
          meta: {
            title: '新增义务',
            icon: 'material-symbols:event-note',
          },
        },
      ],
    },
    {
      path: 'read',
      name: 'Read',
      component: LAYOUT,
      meta: {
        icon: 'material-symbols:event',
        title: '读书活动',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'ReadList',
          component: () => import('/@/views/develop/read/List.vue'),
          meta: {
            title: '读书活动',
            icon: 'material-symbols:event-upcoming',
          },
        },
        {
          path: 'create',
          name: 'ReadCreate',
          component: () => import('/@/views/develop/read/Add.vue'),
          meta: {
            title: '新增读书',
            icon: 'material-symbols:event-note',
          },
        },
      ],
    },
    {
      path: 'report',
      name: 'Report',
      component: LAYOUT,
      meta: {
        icon: 'material-symbols:event',
        title: '报告活动',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'ReportList',
          component: () => import('/@/views/develop/report/List.vue'),
          meta: {
            title: '报告活动',
            icon: 'material-symbols:event-upcoming',
          },
        },
        {
          path: 'create',
          name: 'ReportCreate',
          component: () => import('/@/views/develop/report/Add.vue'),
          meta: {
            title: '新增报告',
            icon: 'material-symbols:event-note',
          },
        },
      ],
    },
    {
      path: 'service',
      name: 'Service',
      component: LAYOUT,
      meta: {
        icon: 'material-symbols:event',
        title: '服务活动',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'ServiceList',
          component: () => import('/@/views/develop/service/List.vue'),
          meta: {
            title: '服务活动',
            icon: 'material-symbols:event-upcoming',
          },
        },
        {
          path: 'create',
          name: 'ServiceCreate',
          component: () => import('/@/views/develop/service/Add.vue'),
          meta: {
            title: '新增服务',
            icon: 'material-symbols:event-note',
          },
        },
      ],
    },
  ],
};

export default event;
