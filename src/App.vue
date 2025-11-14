<template>
  <section class="container">
    <h1 class="datepicker-title">Календарь</h1>
    <p class="datepicker-date">{{ selectedDate }}</p>
    <div class="datepicker-wrapper">
      <DatePicker v-model="selectedDate" :firstDayOfWeek="1" :locale="locale" />
      <LanguageSwitcher @update:lang="changeLanguage" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "./components/DatePicker/DatePicker.vue";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher.vue";
const selectedDate = ref("");
const locale = ref("ru-RU");

const changeLanguage = (lang: string) => {
  switch (lang) {
    case "ru":
      locale.value = "ru-Ru";
      break;
    case "en":
      locale.value = "en-US";
      break;
    case "sv":
      locale.value = "sv-SE";
      break;
    default:
      locale.value = "ru-Ru";
  }
};
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
</style>
