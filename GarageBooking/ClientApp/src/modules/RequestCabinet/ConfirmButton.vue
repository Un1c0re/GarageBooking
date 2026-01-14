<template>
  <el-button v-loading="isLoading" plain type="success" :icon="Check" @click="confirmRequest" />
</template>

<script setup lang="ts">
import { Check } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { ref } from "vue";

import { EventStatus } from "@/enums/EventStatus";
import GarageEvent from "@/models/GarageEvent";
import GarageEventService from "@/services/GarageEventService";
import { useEventStore } from "@/store/EventStore";

const store = useEventStore();

const props = defineProps<{
  event: GarageEvent;
}>();

const isLoading = ref(false);

const confirmRequest = async () => {
  const event = props.event;
  event.status = EventStatus.Approved;

  try {
    isLoading.value = true;

    const result = await GarageEventService.UpdateEvent(event);
    store.updateEvent(result);

    ElNotification.success(`Заявка ${result.title} одобрена`);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
