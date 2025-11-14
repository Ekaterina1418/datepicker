<template>
  <section class="container">
    <h1 class="datepicker-title">Календарь</h1>
    <p class="datepicker-date">{{ selectedDate }}</p>
    <div class="datepicker-wrapper">
      <DatePicker v-model="selectedDate" :firstDayOfWeek="1" :locale="locale" />
      <div class="custom-select">
        <select id="locale" class="select-locale" v-model="locale">
          <option value="ru-RU">Русский</option>
          <option value="en-US">English</option>
        </select>
        <span class="material-symbols-outlined arrow-icon"
          >arrow_drop_down</span
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "./components/DatePicker/DatePicker.vue";
const selectedDate = ref("");
const locale = ref("ru-RU");
</script>

<style scoped>
.datepicker-wrapper {
  display: flex;
  gap: 25px;
}
.datepicker-date {
  min-height: 30px;
}
.datepicker-title {
  margin-bottom: 30px;
}
.custom-select {
  position: relative;
  display: inline-block;
}
.select-locale {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 30px;
  padding: 10px 60px;
  border-radius: 4px;
}
.custom-select .arrow-icon {
  position: absolute;
  right: 4px;
  top: 20px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 30px;
  color: #333;
}
</style>
