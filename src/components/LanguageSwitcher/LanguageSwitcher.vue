<template>
  <div class="custom-select">
    <select id="locale" class="select-locale" v-model="currentLang" @change="onChange">
      <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
    </select>
    <span class="material-symbols-outlined arrow-icon">arrow_drop_down</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "update:lang", lang: string): void;
}>();

const languages = ["ru", "en", "sv"];
const currentLang = ref<string>(languages[0] || "ru");

const onChange = () => {
	emit('update:lang',currentLang.value)
}
</script>

<style scoped>
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
