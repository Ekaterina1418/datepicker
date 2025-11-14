<template>
	 <div class="week-days">
      <div v-for="(day, i) in weekDays" :key="i" class="week-day">
        {{ day }}
      </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  weekDays: string[]
}>()
</script>

<style scoped>

</style>