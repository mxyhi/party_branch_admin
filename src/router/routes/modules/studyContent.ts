import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const studyContent: AppRouteModule = {
  path: '/study',
  name: 'Study',
  component: LAYOUT,
  meta: {
    icon: 'material-symbols:event',
    title: '学习内容',
    orderNo: 1,
    roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
  },
  children: [
    {
      path: 'partyHistory',
      name: 'PartyHistory',
      component: getParentLayout('PartyHistory'),
      meta: {
        icon: 'material-symbols:event',
        title: '党史管理',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'PartyHistoryList',
          component: () => import('/@/views/develop/party/history/List.vue'),
          meta: {
            title: '党史管理',
            icon: 'material-symbols:event-upcoming',
          },
        },
        {
          path: 'create',
          name: 'PartyHistoryCreate',
          component: () => import('/@/views/develop/party/history/Add.vue'),
          meta: {
            title: '新增党史',
            icon: 'material-symbols:event-note',
          },
        },
      ],
    },
    {
      path: 'partyLecture',
      name: 'PartyLecture',
      component: LAYOUT,
      meta: {
        icon: 'material-symbols:event',
        title: '党课管理',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'PartyLectureList',
          component: () => import('/@/views/develop/party/lecture/List.vue'),
          meta: {
            title: '党课管理',
            icon: 'material-symbols:event-upcoming',
            roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
          },
        },
        {
          path: 'create',
          name: 'PartyLectureCreate',
          component: () => import('/@/views/develop/party/lecture/Add.vue'),
          meta: {
            title: '新增党课',
            icon: 'material-symbols:event-note',
            roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
          },
        },
      ],
    },
    {
      path: 'partyQuotes',
      name: 'PartyQuotes',
      component: LAYOUT,
      meta: {
        icon: 'material-symbols:event',
        title: '语录管理',
        orderNo: 1,
        roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
      },
      children: [
        {
          path: 'list',
          name: 'PartyQuotesList',
          component: () => import('/@/views/develop/party/quotes/List.vue'),
          meta: {
            title: '语录管理',
            icon: 'material-symbols:event-upcoming',
            roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
          },
        },
        {
          path: 'create',
          name: 'PartyQuotesCreate',
          component: () => import('/@/views/develop/party/quotes/Add.vue'),
          meta: {
            title: '新增语录',
            icon: 'material-symbols:event-note',
            roles: [RoleEnum.ADMIN, RoleEnum.BRANCH],
          },
        },
      ],
    },
  ],
};

export default studyContent;
