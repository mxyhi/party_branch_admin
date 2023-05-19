<template>
  <PageWrapper :title="isEdit ? '修改活动' : '新增活动'">
    <CollapseContainer title="请填写表单">
      <BasicForm @register="register" @submit="submit" @reset="setFormValues" />
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
  import { quotesFindOneApi, addOrUpdateQuotesApi } from '../../../api/a_message/index';
  import { EventInfoType, EventItem } from '/@/api/work/model/eventModel';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import { router } from '/@/router';

  const schemas: FormSchema[] = [
    {
      field: 'content',
      component: 'InputTextArea',
      label: '留言内容',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '留言内容';
            const len = 1000;
            if (!value) return Promise.reject(`${label}不能为空`);
            if (value?.length > len) return Promise.reject(`${label}不得超过${len}字`);
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
    },
  ];

  const route = useRoute();
  const eventId = route.query?.eventId as string;
  const isEdit = ref(false);
  const sourceData = ref({} as EventItem);
  if (eventId) {
    isEdit.value = true;
  }

  onMounted(async () => {
    if (isEdit.value) {
      try {
        const res = await quotesFindOneApi(eventId);
        console.log(res);
        res.id = res.result.id;
        sourceData.value = res;
        await setFieldsValue({ ...res, content: res.result.content });
      } catch (error) {
        console.error(error);
        router.replace('/aMessage/list');
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

  const submit = async (fromData: EventInfoType) => {
    await addOrUpdateQuotesApi({
      ...(sourceData.value as EventInfoType),
      ...fromData,
    });
    isEdit.value
      ? createMessage.success('修改成功')
      : (async () => {
          createMessage.success('添加成功');
          await setFormValues();
        })();

    router.replace('/aMessage/list');
  };
</script>
