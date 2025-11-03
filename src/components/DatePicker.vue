<template>
	<div class="calendar">
		<div class="cal-header">
			<button class="btn">></button>
			 <div class="cal-title"></div>
			<button class="btn"><</button>
		</div>
  <div class="cal-grid">
	<div v-for="(cell,index) in grid" :key="index" class="cell">
		<span v-if="cell.day">{{ cell.day }}</span>
	</div>
  </div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { buildMonthGrid, type DayCell } from '../utils/index'

const props =  defineProps<{
modelValue: string
locale:string
firstDayOfWeek: number
}>()

const emit = defineEmits(['update:modelValue','select'])

const viewDate = ref(new Date())
const grid = computed<DayCell[]>(() => buildMonthGrid( viewDate.value, props.firstDayOfWeek))
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
.cal-header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:8px;
}
.btn {
  background:transparent;
  border:1px solid #ddd;
  border-radius:4px;
  padding:4px 8px;
  cursor:pointer;
}
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.cell { height: 34px; display:flex; align-items:center; justify-content:center; }

</style>