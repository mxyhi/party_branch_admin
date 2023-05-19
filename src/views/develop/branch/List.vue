<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight title="党支部列表">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
        <a-button type="primary" @click="$router.push('/branch/create')"> 添加 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="editEventData(record)" />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { Button as AButton } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction, EditRecordRow } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { historyDeleteApi, getBranchListApi } from '/@/api/branch/index';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useRouter } from 'vue-router';
  const { apiUrl } = useGlobSetting();

  const [registerTable, { reload }] = useTable({
    title: '交流论坛',
    api: async ({ page, pageSize }: { page: number; pageSize: number }) => {
      const res = await getBranchListApi({ page, limit: pageSize });
      if (apiUrl) {
        (res.data as any) = res.data.map((item) => ({
          ...item,
          poster: [apiUrl + item.poster],
        }));
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
            path: '/branch/create',
            query: {
              id: record.id,
            },
          });
        },
      },
      {
        label: '删除',
        onClick: async () => {
          console.log(record.id);
          await historyDeleteApi(record.id);
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
