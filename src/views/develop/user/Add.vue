<template>
  <PageWrapper :title="isEdit ? '修改活动' : '新增活动'">
    <CollapseContainer title="请填写表单">
      <div class="ml-26">
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
            <div style="margin-top: 8px">上传头像</div>
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
  import { getUserInfo, fetchAddUser } from '../../../api/sys/user';
  import { getBranchAll } from '../../../api/branch/index';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { router } from '/@/router';

  const optionsListApi = async () => {
    const result = await getBranchAll();
    return result;
  };

  const schemas: FormSchema[] = [
    {
      field: 'realName',
      component: 'Input',
      label: '昵称',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '昵称';
            const len = 16;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: 'username',
      component: 'Input',
      label: '账户名',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '账户名';
            const len = 16;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: 'password',
      component: 'Input',
      label: '密码',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '密码';
            const len = 16;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: 'sex',
      component: 'Select',
      label: '性别',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '女',
            value: 0,
            key: '0',
          },
          {
            label: '男',
            value: 1,
            key: '1',
          },
        ],
      },
    },
    // {
    //   field: 'homePath',
    //   component: 'Input',
    //   label: '默认主页',
    //   colProps: {
    //     span: 24,
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       validator: async (_rule, value: string) => {
    //         const label = '默认主页';
    //         const len = 16;
    //         if (!value) return Promise.reject(`${label}不能为空`);
    //         if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
    //         return Promise.resolve();
    //       },
    //       trigger: 'change',
    //     },
    //   ],
    // },
    {
      field: 'desc',
      component: 'InputTextArea',
      label: '描述',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '描述';
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
      field: 'class',
      component: 'Input',
      label: '班级',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '班级';
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
      field: 'age',
      component: 'InputNumber',
      label: '年龄',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '年龄';
            const len = 100;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
    {
      field: 'phone',
      component: 'Input',
      label: '手机号',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '手机号';
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
      field: 'type',
      component: 'Select',
      label: '角色',
      colProps: {
        span: 24,
      },
      componentProps: {
        options: [
          {
            label: '管理员',
            value: 0,
            key: '0',
          },
          {
            label: '党支部',
            value: 1,
            key: '1',
          },
          {
            label: '党员',
            value: 2,
            key: '2',
          },
        ],
      },
    },
    {
      field: 'partyBranchId',
      component: 'ApiSelect',
      label: '党支部名称',
      colProps: {
        span: 24,
      },
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: optionsListApi,

        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
        // onChange: (e, v) => {},
        // // atfer request callback
        // onOptionsChange: (options) => {},
      },
    },
  ];

  const route = useRoute();

  const { apiUrl } = useGlobSetting();

  const eventId = route.query?.eventId as string;
  const isEdit = ref(false);
  const sourceData = ref({} as any);
  if (eventId) {
    isEdit.value = true;
  }

  onMounted(async () => {
    if (isEdit.value) {
      try {
        const res = await getUserInfo(eventId);
        fileList.value = [
          {
            uid: res.avatar,
            name: 'image.png',
            url:
              res.avatar.startsWith('http') || res.avatar.startsWith('//')
                ? res.avatar
                : apiUrl
                ? apiUrl + res.avatar
                : res.avatar,
          },
        ];

        sourceData.value = res;
        await setFieldsValue({ ...res });
      } catch (error) {
        console.error(error);
        router.replace('/branch/part/list');
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

  const submit = async (fromData: any) => {
    const images = fileList.value.map((item) => item.url?.replace(apiUrl, '')).filter((it) => it);
    images.push(...fileList.value.map((item) => item.response?.result?.fileUrl).filter((it) => it));
    fromData.avatar = images[0] as string;
    const data = {
      homePath: '/work/list',
      token: `${Math.random()}`,
      ...(sourceData.value as any),
      ...fromData,
    };
    console.log(data);
    delete data.token;
    delete data.roles;
    delete data.updated_time;
    delete data.partyBranchName;
    await fetchAddUser(data);
    isEdit.value
      ? createMessage.success('修改成功')
      : (async () => {
          createMessage.success('添加成功');
          await setFormValues();
        })();
    router.replace('/branch/part/list');
  };
</script>
