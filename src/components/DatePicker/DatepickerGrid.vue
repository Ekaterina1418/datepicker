<template>
  <div class="cal-grid">
    <div
      v-for="(cell, index) in grid"
      :key="index"
      class="cell"
      :class="{ 'active-cell': isSelectedDate(cell) }"
      @click="$emit('select', cell)"
    >
      <span v-if="cell.day">{{ cell.day }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayCell } from "../../utils";

const props = defineProps<{
  grid: DayCell[];
  selectedDate?: Date | null;
}>();

const emit = defineEmits<{
  (e: "select", cell: DayCell): void;
}>();

const isSelectedDate = (cell: DayCell) => {
  if (!cell.date || !props.selectedDate) return false;
  return cell.date.toDateString() === props.selectedDate.toDateString();
};
</script>

<style scoped>
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.cell {
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.active-cell {
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
}
</style>
