<template>
 <DatePicker v-model="selectedDate" :firstDayOfWeek="1" locale="ru-RU"/>
 <p>{{ selectedDate }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from './components/DatePicker.vue';
const selectedDate = ref('');
</script>

<style scoped>

</style>
