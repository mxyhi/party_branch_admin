<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight title="学习列表">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
        <a-button type="primary" @click="$router.push('/study/partyLecture/create')">
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'poster'">
          <TableImg :size="60" :simpleShow="true" :imgList="text" />
        </template>
        <template v-if="column.key === 'video_url'">
          <div class="flex justify-center items-center relative">
            <video class="w-[60px] cursor-pointer" @click="record.play = true" :src="text"> </video>
            <div
              class="absolute w-[60px] h-full top-0 text-white hover:bg-black hover:text-opacity-100 text-opacity-0 hover:bg-opacity-20 cursor-pointer flex justify-center items-center"
              @click="record.play = true"
              >预览</div
            >
            <!-- <a href="javascript:;" >查看视频</a> -->
            <AModal
              v-model:visible="record.play"
              centered
              :footer="null"
              @ok="record.play = false"
              title="视频预览"
              style="width: 80vmin"
            >
              <video style="width: 100vmin" :src="text" controls autoplay></video> </AModal
          ></div>
        </template>
        <template v-if="column.key === 'status'">
          <!-- 进行中 -->
          <a-tag
            v-if="getEventStatus(record.start_time, record.end_time) === 'doing'"
            color="processing"
          >
            <template #icon>
              <sync-outlined :spin="true" />
            </template>
            进行中
          </a-tag>
          <!-- 结束 -->
          <a-tag
            v-if="getEventStatus(record.start_time, record.end_time) === 'end'"
            color="warning"
          >
            <template #icon>
              <exclamation-circle-outlined />
            </template>
            已结束
          </a-tag>
          <a-tag
            v-if="getEventStatus(record.start_time, record.end_time) === 'waiting'"
            color="default"
          >
            <template #icon>
              <clock-circle-outlined />
            </template>
            等待中
          </a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction :actions="editEventData(record)" />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { Tag as ATag, Button as AButton, Modal as AModal } from 'ant-design-vue';
  import {
    SyncOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
  } from '@ant-design/icons-vue';
  import { BasicTable, useTable, TableImg, TableAction, EditRecordRow } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { lectureDeleteApi, getLectureListApi } from '/@/api/party/lecture';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useRouter } from 'vue-router';

  const { apiUrl } = useGlobSetting();

  const getEventStatus = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = Date.now();
    // 进行中
    if (start <= now && now < end) {
      return 'doing';
    }
    // 结束
    if (now > end) {
      return 'end';
    }
    // 等待
    if (start > now) {
      return 'waiting';
    }
  };

  const [registerTable, { reload }] = useTable({
    title: '活动列表',
    api: async ({ page, pageSize }: { page: number; pageSize: number }) => {
      const res = await getLectureListApi({ page, limit: pageSize });
      if (apiUrl) {
        (res.data as any) = res.data.map((item) => ({
          ...item,
          poster: [apiUrl ? apiUrl + item.poster : item.poster],
          video_url: [apiUrl ? apiUrl + item.video_url : item.video_url],
          play: false,
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
            path: '/study/partyLecture/create',
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
          await lectureDeleteApi(record.id);
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
