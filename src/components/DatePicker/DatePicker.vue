<template>
  <div class="calendar">
    <DatepickerHeader
      :month-title="monthTitle"
      @prev-month="prevMonth"
      @next-month="nextMonth"
    />
    <DatePickerWeekDays :week-days="weekDays" />
    <DatepickerGrid
      :grid="grid"
      :selected-date="selectedDate"
      @select="selectDate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { buildMonthGrid, getWeekDays, type DayCell } from "../../utils/index";
import DatepickerHeader from "../DatePicker/DatepickerHeader.vue";
import DatepickerGrid from "../DatePicker/DatepickerGrid.vue";
import DatePickerWeekDays from "./DatePickerWeekDays.vue";

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
