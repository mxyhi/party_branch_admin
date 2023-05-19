<template>
  <PageWrapper :title="isEdit ? '修改活动' : '新增活动'">
    <CollapseContainer title="请填写表单">
      <BasicForm
        @register="register"
        @submit="submit"
        @reset="setFormValues"
        :submit-button-options="{
          text: '提交',
        }"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { FormSchema, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref } from 'vue';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import CollapseContainer from '/@/components/Container/src/collapse/CollapseContainer.vue';
  import BasicForm from '/@/components/Form/src/BasicForm.vue';
  import { addOrUpdateQuotesApi, quotesFindOneApi } from '/@/api/party/quotes';
  import { QuotesItem } from '/@/api/party/model/quotesModel';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import { router } from '/@/router';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: '语录名称',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '语录名称';
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
      label: '语录简介',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '语录简介';
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
      label: '语录内容',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '语录内容';
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

  const id = route.query?.id as string;
  const isEdit = ref(false);
  const sourceData = ref({} as QuotesItem);
  if (id) {
    isEdit.value = true;
  }

  onMounted(async () => {
    if (isEdit.value) {
      try {
        const res = await quotesFindOneApi(id);
        sourceData.value = res;
        await setFieldsValue({ ...res, '[start_time, end_time]': [res.start_time, res.end_time] });
      } catch (error) {
        console.error(error);
        router.replace('/study/partyQuotes/list');
      }
    }
  });

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
    await setFieldsValue(source);
  }

  const submit = async (fromData: QuotesItem) => {
    await addOrUpdateQuotesApi({
      ...(sourceData.value as QuotesItem),
      ...fromData,
    });

    isEdit.value
      ? createMessage.success('修改成功')
      : (async () => {
          createMessage.success('添加成功');
          await setFormValues();
        })();

    router.replace('/study/partyQuotes/list');
  };
</script>
