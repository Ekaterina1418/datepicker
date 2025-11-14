<template>
  <div
    class="cal-header"
    role="toolbar"
    tabindex="0"
    @keydown.left.prevent="onPrev"
    @keydown.right.prevent="onNext"
  >
    <button class="btn" @click="onPrev" aria-label="Предыдущий месяц">
      <span class="material-symbols-outlined"> arrow_left </span>
    </button>
    <h2 class="cal-title">{{ monthTitle }}</h2>
    <button class="btn" @click="onNext" aria-label="Следующий месяц">
      <span class="material-symbols-outlined"> arrow_right </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  monthTitle: string;
}>();
const emit = defineEmits<{
  (e: "prevMonth"): void;
  (e: "nextMonth"): void;
}>();
const onPrev = () => emit("prevMonth");
const onNext = () => emit("nextMonth");
</script>

<style scoped>
.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.btn {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
