<template>
  <PageWrapper :title="isEdit ? '修改活动' : '新增活动'">
    <CollapseContainer title="请填写表单">
      <div class="ml-26">
        上传封面（1张）
        <Upload
          v-model:file-list="fileList"
          :action="uploadImage"
          list-type="picture-card"
          @preview="handlePreview"
          accept="image/*"
          multiple
          :headers="{ Authorization: `Bearer ${getToken()}` }"
          :maxCount="1"
        >
          <div v-if="fileList!.length < 1">
            <plus-outlined />
            <div style="margin-top: 8px">上传封面</div>
          </div>
        </Upload>
        <Modal
          :visible="previewVisible"
          :title="previewTitle"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" /> </Modal
      ></div>
      <BasicForm @register="register" @submit="submit" @reset="setFormValues" />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { FormSchema, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Upload, Modal, UploadFile } from 'ant-design-vue';
  import { ref } from 'vue';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import CollapseContainer from '/@/components/Container/src/collapse/CollapseContainer.vue';
  import BasicForm from '/@/components/Form/src/BasicForm.vue';
  import { FileType } from 'ant-design-vue/es/upload/interface';
  import { getToken } from '/@/utils/auth';
  import { workNoticeFindOneApi, addWorkNoticeApi } from '/@/api/work/work';
  import { WorkNoticeData } from '/@/api/work/model/workModel';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { router } from '/@/router';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: '工作名称',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '工作名称';
            const len = 50;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: 'desc',
      component: 'InputTextArea',
      label: '工作描述',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '工作描述';
            const len = 50;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: 'content',
      component: 'InputTextArea',
      label: '工作内容',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '活动内容';
            const len = 1000;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: '[start_time, end_time]',
      label: '时间范围',
      component: 'RangePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        showTime: { format: 'HH:mm:ss' },
      },
      rules: [{ required: true, message: '请填写活动时间' }],
    },
  ];

  const route = useRoute();

  const { apiUrl } = useGlobSetting();

  const id = route.query?.id as string;
  const isEdit = ref(false);
  const sourceData = ref({} as WorkNoticeData);
  if (id) {
    isEdit.value = true;
  }

  onMounted(async () => {
    if (isEdit.value) {
      try {
        const res = await workNoticeFindOneApi(id);
        fileList.value = [
          {
            uid: res.poster.toString(),
            name: 'image.png',
            url: apiUrl ? apiUrl + res.poster : res.poster,
          },
        ];
        console.log(res);
        sourceData.value = res;
        await setFieldsValue({ ...res, '[start_time, end_time]': [res.start_time, res.end_time] });
      } catch (error) {
        console.error(error);
        router.replace('/work/list');
      }
    }
  });

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');

  const fileList = ref<UploadFile<{ result: { fileUrl: string } }>[]>([]);

  const uploadImage: (file: FileType) => PromiseLike<string> = async () => {
    return apiUrl + '/static/image/upload';
  };

  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj!)) as string;
    }
    previewImage.value = file.url || file.preview!;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1);
  };
  const source = schemas.reduce(
    (p, { field }) => ((p[field] = ''), p),
    {} as Record<string, string>,
  );
  const { createMessage } = useMessage();
  const [register, { setFieldsValue }] = useForm({
    schemas,
    actionColOptions: {
      span: 24,
    },
    labelWidth: 100,
    layout: 'horizontal',
  });

  async function setFormValues() {
    fileList.value = [];
    await setFieldsValue(source);
  }

  const submit = async (fromData: WorkNoticeData) => {
    const images = fileList.value.map((item) => item.url?.replace(apiUrl, '')).filter((it) => it);
    images.push(...fileList.value.map((item) => item.response?.result?.fileUrl).filter((it) => it));
    console.log(images);
    if (images[0]) {
      fromData.poster = images[0];
      console.log({
        ...(sourceData.value as WorkNoticeData),
        ...fromData,
      });
      const res = await addWorkNoticeApi({
        ...(sourceData.value as WorkNoticeData),
        ...fromData,
        poster: images[0],
      });
      console.log(res);
    }

    isEdit.value
      ? createMessage.success('修改成功')
      : (async () => {
          createMessage.success('添加成功');
          await setFormValues();
        })();

    router.replace('/work/list');
  };
</script>
