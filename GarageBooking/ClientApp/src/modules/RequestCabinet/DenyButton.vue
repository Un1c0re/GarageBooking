<template>
  <el-button v-loading="isLoading" plain type="danger" :icon="Close" @click="denyRequest" />
</template>

<script setup lang="ts">
import { Close } from "@element-plus/icons-vue";
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

const denyRequest = async () => {
  const event = props.event;
  event.status = EventStatus.Denied;

  try {
    isLoading.value = true;

    const result = await GarageEventService.UpdateEvent(event);
    store.updateEvent(result);

    ElNotification.success(`Заявка ${result.title} отклонена`);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
