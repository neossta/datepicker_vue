<template>
	<div class="date-picker">
		<div class="input-wrapper">
			<input
				type="text"
				class="date-input"
				:value="formattedDate"
				@focus="showCalendar = true"
				@blur="handleInputBlur"
				readonly
				placeholder="Выберите дату"
			/>
			<button type="button" class="calendar-toggle" @click="toggleCalendar">
				<CalendarIcon />
			</button>
		</div>
		<div v-if="showCalendar" class="calendar-dropdown">
			<div class="calendar-container">
				<div class="calendar-header">
					<button @click="handleDecrementMonth" class="nav-button">←</button>
					<div class="month-year-display">
						<p class="month-label">{{ monthLabel }}</p>
						<p class="year-label">{{ year }}</p>
					</div>
					<button @click="handleIncrementMonth" class="nav-button">→</button>
				</div>
				<div class="calendar-grid">
					<div v-for="day in WeekDayDictionary" :key="day.value" class="weekday-header">
						{{ day.shortLabel[locale] }}
					</div>
					<div v-for="n in emptyCells" :key="`empty-${n}`" class="empty-cell"></div>
					<CalendarCell
						v-for="day in daysInMonth"
						:key="day"
						:date="getCellDate(day)"
						:is-today="isToday(getCellDate(day))"
						:is-selected="isSelected(getCellDate(day))"
						@date-click="handleDateClick"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import CalendarCell from './CalendarCell.vue'
import { MonthDictionary } from '../dictionaries/MonthDictionary.ts'
import { WeekDayDictionary } from '../dictionaries/WeekDayDictionary.ts'
import { isLeap, isToday, parseDateString } from '@/utils/DateHelpers.ts'
import CalendarIcon from './icons/CalendarIcon.vue'

const props = defineProps({
	date: {
		type: String as PropType<string | undefined>,
		default: undefined,
	},
	locale: {
		type: String as PropType<'ru' | 'en'>,
		default: 'ru',
	},
})

const emit = defineEmits(['update:date', 'change'])

const initialDate = computed(() => {
	return parseDateString(props.date)
})
const displayedDate = ref(initialDate.value)

const showCalendar = ref(false)
const monthNumber = ref(initialDate.value.getMonth())
const year = ref(initialDate.value.getFullYear())

const formattedDate = computed(() => {
	if (props.locale === 'en') {
		return displayedDate.value.toLocaleDateString('en-EN')
	}
	return displayedDate.value.toLocaleDateString('ru-RU')
})

const monthLabel = computed(() => {
	return MonthDictionary.find((el) => el.value === monthNumber.value)?.label[props.locale] || '???'
})

const daysInMonth = computed(() => {
	let days = MonthDictionary.find((el) => el.value === monthNumber.value)?.days || 30
	if (monthNumber.value === 1 && isLeap(year.value)) {
		days += 1
	}
	return days
})

const firstDayOfMonth = computed(() => new Date(year.value, monthNumber.value, 1))

const emptyCells = computed(() => {
	const weekday = firstDayOfMonth.value.getDay()
	if (weekday !== 1) {
		if (weekday === 0) {
			return 6
		} else {
			return weekday - 1
		}
	}
	return 0
})

watch(
	() => props.date,
	(newDate) => {
		const targetDate = parseDateString(newDate)
		monthNumber.value = targetDate.getMonth()
		year.value = targetDate.getFullYear()
	},
)
watch(initialDate, (newDate) => {
	displayedDate.value = newDate
})

const handleDateClick = (date: Date) => {
	displayedDate.value = date
	const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
	emit('update:date', dateString)
	emit('change', date)
	showCalendar.value = false
}

const toggleCalendar = () => {
	showCalendar.value = !showCalendar.value
}
const handleInputBlur = (event: FocusEvent) => {
	// не скрываем календарь если клик был на самом календаре
	const relatedTarget = event.relatedTarget as HTMLElement
	if (relatedTarget?.closest?.('.calendar-dropdown')) {
		return
	}
	setTimeout(() => {
		showCalendar.value = false
	}, 150)
}

const getCellDate = (day: number): Date => {
	return new Date(year.value, monthNumber.value, day)
}

const isSelected = (cellDate: Date) => {
	return cellDate.toDateString() === displayedDate.value.toDateString()
}
const handleIncrementMonth = () => {
	if (monthNumber.value === 11) {
		monthNumber.value = 0
		year.value += 1
	} else {
		monthNumber.value += 1
	}
}

const handleDecrementMonth = () => {
	if (monthNumber.value === 0) {
		monthNumber.value = 11
		year.value -= 1
	} else {
		monthNumber.value -= 1
	}
}
</script>

<style scoped>
.date-picker {
	position: relative;
	width: 100%;
	max-width: 300px;
}

.input-wrapper {
	position: relative;
	display: flex;
	align-items: center;
}

.date-input {
	width: 100%;
	padding: 0.5rem 2.5rem 0.5rem 0.75rem;
	border: 1px solid var(--color-border);
	border-radius: 0.375rem;
	font-size: 1rem;
	background-color: var(--color-background);
	cursor: pointer;
	color: var(--color-text);
}

.date-input:focus {
	outline: none;
	border-color: var(--color-primary);
	box-shadow: 0 0 0 2px var(--color-focus-ring);
}

.calendar-toggle {
	position: absolute;
	right: 0.5rem;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.25rem;
	font-size: 1.25rem;
	color: var(--color-text);
}

.calendar-dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	margin-top: 0.5rem;
	background: var(--color-background);
	border: 1px solid var(--color-border);
	border-radius: 0.375rem;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	z-index: 50;
}

.calendar-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.nav-button {
	padding: 0.5rem 0.5rem;
	border: none;
	background: none;
	cursor: pointer;
	font-size: 1.125rem;
	transition: background-color 0.2s;
	color: var(--color-text);
}

.nav-button:hover {
	background-color: var(--color-background-soft);
	border-radius: 0.25rem;
}

.month-year-display {
	display: flex;
	gap: 0.5rem;
}

.month-label,
.year-label {
	font-size: 1.25rem;
	font-weight: 500;
	margin: 0;
	color: var(--color-heading);
}

.calendar-grid {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
}

.weekday-header {
	text-align: center;
	background-color: var(--color-background-soft);
	border: 1px solid var(--color-border);
	padding: 0.4rem 0.1rem;
	font-weight: 500;
	color: var(--vt-c-gray-500);
	font-size: 0.8rem;
}

.empty-cell {
	border: 1px solid var(--color-border);
}
</style>
