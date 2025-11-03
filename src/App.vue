<script setup lang="ts">
import Calendar from './components/Calendar.vue'
import { ref } from 'vue'

const currentDate = ref(new Date())

const handleDateChange = (dateInfo: Date) => {
  console.log('дата:', dateInfo)
}
</script>

<template>
  <main>
    <div class="wrapper">
      <Calendar v-model:date="currentDate" @change="handleDateChange"  />
    </div>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  .wrapper {
    padding: 20px;
  }
}
</style>
