<template>
  <el-drawer
    v-model="drawer.visible.value"
    :title="eventEditor.title.value"
    direction="rtl"
    size="36%"
    header-class="text-left"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="Заголовок" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Время" required>
        <el-col :span="11">
          <el-form-item prop="startTime">
            <el-time-picker
              v-model="form.startTime"
              value-format="HH:mm"
              format="HH:mm"
              :disabled-hours="eventEditor.disabledHours"
              :disabled-minutes="eventEditor.disabledMinutes"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <p class="text-gray-500">-</p>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="endTime">
            <el-time-picker
              v-model="form.endTime"
              value-format="HH:mm"
              format="HH:mm"
              :disabled-hours="eventEditor.disabledHours"
              :disabled-minutes="eventEditor.disabledMinutes"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Подтвердить</el-button>
        <el-button
          v-if="eventEditor.event.value != null && eventEditor.event.value.id != 0"
          type="danger"
          @click="handleDelete"
          >Удалить
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { computed, inject, reactive, ref, watch } from "vue";

import { UseEventEditorType } from "@/components/EventEditor/composables/useEventEditor";
import { getFormRules } from "@/components/EventEditor/validators/useEventFormValidator";
import { UseDrawerType } from "@/composables/useDrawer";
import { Form } from "@/models/Form";
import GarageEvent from "@/models/GarageEvent";

const drawer = inject("drawer") as UseDrawerType;
const eventEditor = inject("eventEditor") as UseEventEditorType;

const formRef = ref<FormInstance>();
const form = reactive<Form>({
  title: "",
  startTime: "",
  endTime: "",
});

const rules = computed(() => getFormRules(form, eventEditor.disabledTimes.value));

const handleSubmit = async () => {
  await formRef.value!.validate((valid, _) => {
    if (valid) {
      eventEditor.save(form);
      drawer.setDrawerVisible(false);
    }
  });
};

const handleDelete = () => {
  eventEditor.remove();
  drawer.setDrawerVisible(false);
};

const handleClose = () => {
  eventEditor.resetEvent();
  drawer.setDrawerVisible(false);
};

watch(
  () => eventEditor.event.value,
  () => {
    if (eventEditor.event.value == null || eventEditor.event.value.id == 0) return;
    const event = new GarageEvent(eventEditor.event.value);

    form.title = event.title;
    form.startTime = event.startTime;
    form.endTime = event.endTime;
  },
);
</script>
