<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight title="用户列表">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
        <a-button type="primary" @click="$router.push('/branch/part/create')"> 添加 </a-button>
      </template>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'avatar'">
          <TableImg :size="60" :simpleShow="true" :imgList="text" />
        </template>
        <template v-if="column.key === 'sex'">
          {{ text === 1 ? '男' : '女' }}
        </template>
        <template v-if="column.key === 'type'">
          {{ getDescByType(record.type) }}
        </template>
        <template v-if="column.key === 'action'">
          <TableAction :actions="editEventData(record)" />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableImg, TableAction, EditRecordRow } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { fetchDeleteUser, getUserList } from '../../../api/sys/user';
  import { useRouter } from 'vue-router';
  import { useGlobSetting } from '/@/hooks/setting';

  const { apiUrl } = useGlobSetting();

  const getDescByType = (type: 0 | 1 | 2) => {
    switch (type) {
      case 0:
        return '管理员';
      case 1:
        return '党支部';
      case 2:
        return '党员';
    }
  };

  const [registerTable, { reload }] = useTable({
    title: '活动列表',
    api: async ({ page, pageSize }: { page: number; pageSize: number }) => {
      const res = await getUserList({
        page,
        limit: pageSize,
      });
      if (apiUrl) {
        console.log(res.data);
        res.data = res.data.map((item) => {
          return {
            ...item,
            avatar: [
              item.avatar.startsWith('http') || item.avatar.startsWith('//')
                ? item.avatar
                : apiUrl
                ? apiUrl + item.avatar
                : item.avatar,
            ],
          };
        });
      }
      return {
        ...res,
        items: res.data,
      };
    },
    columns: getBasicColumns(),
    pagination: { pageSize: 10 },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
    },
  });

  const router = useRouter();

  const editEventData = (record: EditRecordRow) => {
    return [
      {
        label: '编辑',
        onClick: () => {
          router.push({
            path: '/branch/part/create',
            query: {
              eventId: record.username,
            },
          });
        },
      },
      {
        label: '删除',
        onClick: async () => {
          await fetchDeleteUser(record.userId);
          await reload();
        },
      },
    ];
  };

  function handleReloadCurrent() {
    reload();
  }

  function handleReload() {
    reload({
      page: 1,
    });
  }
</script>
