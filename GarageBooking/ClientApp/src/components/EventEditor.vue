<template>
  <el-drawer
    v-model="drawer.visible.value"
    :title="title"
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
            <el-time-select
              v-model="form.startTime"
              :start="computedStartTimeStart"
              :end="computedStartTimeEnd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <p class="text-gray-500">-</p>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="endTime">
            <el-time-select v-model="form.endTime" :start="computedEndTimeStart" end="24:00" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Подтвердить</el-button>
        <el-button
          v-if="drawer.event.value != null && drawer.event.value.id != 0"
          type="danger"
          @click="handleDelete"
          >Удалить
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { createEventsServicePlugin } from "@schedule-x/events-service";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox, ElNotification, FormInstance, FormRules } from "element-plus";
import { computed, inject, reactive, ref, watch } from "vue";

import { UseDrawerType } from "@/composables/useDrawer";
import { EventStatus } from "@/enums/EventStatus";
import TimeHelpers from "@/helpers/TimeHelpers";
import { Form } from "@/models/Form";
import GarageEvent from "@/models/GarageEvent";
import { useEventStore } from "@/store/EventStore";

const drawer = inject("drawer") as UseDrawerType;
const calendar = inject("eventService") as ReturnType<typeof createEventsServicePlugin>;
const eventStore = useEventStore();

const formRef = ref<FormInstance>();
const form = reactive<Form>({
  title: "",
  startTime: "",
  endTime: "",
});

const rules = reactive<FormRules<Form>>({
  title: [
    { required: true, message: "Пожалуйста, заполните поле", trigger: "blur" },
    { min: 3, max: 16, message: "Длина поля должна быть от 3 до 16 символов", trigger: "blur" },
  ],
  startTime: [
    {
      type: "string",
      required: true,
      message: "Выберите время начала",
      trigger: "change",
    },
  ],
  endTime: [
    {
      type: "string",
      required: true,
      message: "Выберите время окончания",
      trigger: "change",
    },
  ],
});

const title = computed(() => {
  const date = drawer.event.value ? dayjs(drawer.event.value.date).format("DD.MM.YYYY") : null;

  return "Заявка на аренду " + date;
});

const computedStartTimeStart = computed(() => {
  const event = drawer.event.value;
  if (event == null) return "06:00";

  const maxTime = eventStore.getMaxTimeByDay(event.date);
  return maxTime ?? "06:00";
});

const computedStartTimeEnd = computed(() => {
  if (form.endTime) {
    return TimeHelpers.decrementTime(form.endTime);
  }

  return "24:00";
});

const computedEndTimeStart = computed(() => {
  if (form.startTime) {
    return TimeHelpers.incrementTime(form.startTime);
  }

  const event = drawer.event.value;
  if (event == null) return "06:30";

  const maxTime = eventStore.getMaxTimeByDay(event.date);
  if (maxTime) {
    return TimeHelpers.incrementTime(maxTime);
  }

  return "06:30";
});

const handleSubmit = async () => {
  await formRef.value!.validate((valid, _) => {
    if (valid) {
      saveEvent();
    }
  });
};

const handleDelete = () => {
  if (drawer.event.value == null) return;

  ElMessageBox.alert("Удалить заявку?", "Внимание").then(() => {
    eventStore.deleteEvent(drawer.event.value!.id);
    calendar.remove(drawer.event.value!.id);
    ElMessage.success("Заявка удалена");
    handleClose();
  });
};

const handleClose = () => {
  drawer.setEvent(null);
  drawer.setDrawerVisible(false);
};

const saveEvent = () => {
  if (drawer.event.value == null) return;

  const eventToSave = new GarageEvent(drawer.event.value);
  const [startHours, startMinutes] = form.startTime.split(":").map(Number);
  const [endHours, endMinutes] = form.endTime.split(":").map(Number);

  eventToSave.title = form.title;
  eventToSave.eventStatus = EventStatus.Pending;

  eventToSave.startDate = dayjs(eventToSave.date)
    .set("hour", startHours)
    .set("minute", startMinutes)
    .toDate();

  eventToSave.endDate = dayjs(eventToSave.date)
    .set("hour", endHours)
    .set("minute", endMinutes)
    .toDate();

  if (eventToSave.id == 0) {
    const eventListLength = eventStore.events.length;
    eventToSave.id = eventListLength == 0 ? 1 : eventStore.events[eventListLength - 1].id + 1;
    eventStore.addEvent(eventToSave);
    calendar.add(eventToSave.toCalendarEvent);
  } else {
    eventStore.updateEvent(eventToSave);
    calendar.update(eventToSave.toCalendarEvent);
  }

  ElNotification.success({
    title: "Заявка  создана",
    message: "ожидайте проверки админом",
    type: "success",
  });

  handleClose();
};

watch(
  () => drawer.event.value,
  () => {
    if (drawer.event.value == null) return;
    const event = new GarageEvent(drawer.event.value);

    form.title = event.title;
    form.startTime = event.startTime;
    form.endTime = event.endTime;
  },
);
</script>

<style scoped></style>
