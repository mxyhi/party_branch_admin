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
  import { getBranchFindOneApi, addOrUpdateBranchApi } from '../../../api/branch/index';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import { router } from '/@/router';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '名称',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '名称';
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
      label: '描述',
      colProps: {
        span: 24,
      },
      rules: [
        {
          required: true,
          validator: async (_rule, value: string) => {
            const label = '活动描述';
            const len = 50;
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

  const eventId = route.query?.id as string;
  const isEdit = ref(false);
  const sourceData = ref({} as any);
  if (eventId) {
    isEdit.value = true;
  }

  onMounted(async () => {
    if (isEdit.value) {
      try {
        const res = await getBranchFindOneApi(eventId);
        sourceData.value = res;
        await setFieldsValue({ ...res });
      } catch (error) {
        console.error(error);
        router.replace('/event/obligation/list');
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

  const submit = async (fromData: any) => {
    await addOrUpdateBranchApi({
      ...(sourceData.value as any),
      ...fromData,
    });
    isEdit.value
      ? createMessage.success('修改成功')
      : (async () => {
          createMessage.success('添加成功');
          await setFormValues();
        })();

    router.replace({ name: 'BranchList' });
  };
</script>
