<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight title="留言列表">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
        <!-- <a-button type="primary" @click="$router.push('/aMessage/create')"> 添加 </a-button> -->
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
  import { BasicTable, useTable, TableAction, EditRecordRow } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { quotesDeleteApi, getQuotesListApi } from '../../../api/a_message/index';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useRouter } from 'vue-router';
  const { apiUrl } = useGlobSetting();

  const [registerTable, { reload }] = useTable({
    title: '活动列表',
    api: async ({ page, pageSize }: { page: number; pageSize: number }) => {
      const res = await getQuotesListApi({ page, limit: pageSize });
      if (apiUrl) {
        res.data = res.data.map((item) => ({
          ...item,
          uname: item.user.realName,
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
            path: '/aMessage/create',
            query: {
              eventId: record.id,
            },
          });
        },
      },
      {
        label: '删除',
        onClick: async () => {
          await quotesDeleteApi(record.id.toString());
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
