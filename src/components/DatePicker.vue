<template>
  <div class="calendar">
    <DatepickerHeader :month-title="monthTitle" @prev-month="prevMonth" @next-month="nextMonth"/>
    <div class="week-days">
      <div v-for="(day, i) in weekDays" :key="i" class="week-day">
        {{ day }}
      </div>
    </div>
    <div class="cal-grid">
      <div
        v-for="(cell, index) in grid"
        :key="index"
        class="cell"
        :class="{ 'active-cell': isSelectedDate(cell) }"
        @click="selectDate(cell)"
      >
        <span v-if="cell.day">{{ cell.day }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { buildMonthGrid, getWeekDays, type DayCell } from "../utils/index";
import DatepickerHeader from './DatePicker/DatepickerHeader.vue';

const props = defineProps<{
  modelValue: string;
  locale: string;
  firstDayOfWeek: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const viewDate = ref(new Date());
const selectedDate = ref<Date | null>(
  props.modelValue ? new Date(props.modelValue) : new Date()
);

const isSelectedDate = (cell: DayCell) => {
  if (!cell.date || !selectedDate.value) return false;
  return cell.date.toDateString() === selectedDate.value.toDateString();
};
const grid = computed<DayCell[]>(() =>
  buildMonthGrid(viewDate.value, props.firstDayOfWeek)
);

const monthTitle = computed(() => {
  return viewDate.value.toLocaleDateString(props.locale, {
    month: "long",
    year: "numeric",
  });
});

const weekDays = computed(() => {
  const loc = props.locale || "ru-RU";
  const first = props.firstDayOfWeek ?? 1;
  return getWeekDays(loc, first);
});

const prevMonth = () => {
  const d = new Date(viewDate.value);
  d.setMonth(d.getMonth() - 1);
  viewDate.value = d;
};
const nextMonth = () => {
  const d = new Date(viewDate.value);
  d.setMonth(d.getMonth() + 1);
  viewDate.value = d;
};

const selectDate = (cell: DayCell) => {
  if (!cell.day) return;
  selectedDate.value = cell.date;
  emit("update:modelValue", cell.date?.toLocaleDateString("ru-RU"));
};
</script>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  user-select: none;
  outline: none;
}

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
.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 2px;
  font-weight: bold;
  text-align: center;
}
.week-day {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.material-symbols-outlined {
	font-size: 30px;
}
</style>
