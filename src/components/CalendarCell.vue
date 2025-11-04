<template>
	<div :class="['calendar-cell', { today: isToday, selected: isSelected }]" @click="handleClick">
		<div class="day-number">
			{{ props.date.getDate() }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const props = defineProps({
	date: {
		type: Date,
		required: true,
	},
	isToday: {
		type: Boolean,
		default: false,
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits(['date-click'])

const handleClick = () => {
	emit('date-click', props.date)
}
</script>

<style scoped>
.calendar-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  cursor: pointer;
  padding: 0.25rem;
  transition: background-color 0.2s;
  aspect-ratio: 1 / 1;
  background-color: var(--color-background);
}

.calendar-cell:hover {
  background-color: var(--color-primary-transparent);
}

.day-number {
  display: flex;
  font-size: 0.85rem;
  color: var(--color-text);
}

.today {
  border-color: var(--color-primary-light);
  border-width: 1.5px;
}

.selected {
  background-color: var(--color-primary-transparent);
}
</style>
