<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'
import { ref } from 'vue'

const specificDate = ref('2024-03-15')

const handleDateChange = (selectedDate: Date) => {
	console.log('дата:', selectedDate)
	return selectedDate
}
</script>

<template>
	<main>
		<h2>Примеры использования</h2>
		<div class="wrapper">
			<div>
				<h4>Без переданной даты, русский язык по умолчанию:</h4>
				<DatePicker @change="handleDateChange" />
			</div>
			<div>
				<h4>Смена языка на английский, передается дата в формате "год-месяц-день" :</h4>
				<DatePicker v-model:date="specificDate" @change="handleDateChange" :locale="'en'" />
			</div>
		</div>
	</main>
</template>

<style scoped>
@media (min-width: 1024px) {
	.wrapper {
		display: flex;
		padding-top: 20px;
	}
	.wrapper > div {
		padding-right: 6rem;
	}
}
</style>
