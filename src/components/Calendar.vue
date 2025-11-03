<template>
    <div class="date-picker">
        <div class="input-wrapper">
            <input type="text" class="date-input" :value="formattedDate" @focus="showCalendar = true"
                @blur="handleInputBlur" readonly placeholder="Выберите дату" />
            <button type="button" class="calendar-toggle" @click="toggleCalendar">
                📅
            </button>
        </div>
        <div v-if="showCalendar" class="calendar-dropdown">
            <div class="calendar-container">
                <div class="calendar-header">
                    <button @click="handleDecrementMonth" class="nav-button">
                        ←
                    </button>
                    <div class="month-year-display">
                        <p class="month-label">{{ monthLabel }}</p>
                        <p class="year-label">{{ year }}</p>
                    </div>
                    <button @click="handleIncrementMonth" class="nav-button">
                        →
                    </button>
                </div>
                <div class="calendar-grid">
                    <div v-for="day in WeekDayDictionary" :key="day.value" class="weekday-header">
                        {{ day.shortLabel }}
                    </div>
                    <div v-for="n in emptyCells" :key="`empty-${n}`" class="empty-cell"></div>
                    <CalendarCell v-for="day in daysInMonth" :key="day" :number="day" :is-today="isToday(day)" :is-selected="isSelected(day)"
                        @date-click="handleDateClick" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { WeekDayDictionary } from './dictionaries/WeekDayDictionary.ts'
import { MonthDictionary } from './dictionaries/MonthDictionary.ts'
import CalendarCell from './CalendarCell.vue'

const props = defineProps({
    date: {
        type: Date,
        required: true
    }
})

const emit = defineEmits(['update:date', 'change'])

const showCalendar = ref(false)
const monthNumber = ref(props.date.getMonth())
const year = ref(props.date.getFullYear())

const formattedDate = computed(() => {
    return props.date.toLocaleDateString('ru-RU')
})
const monthLabel = computed(() => {
    return MonthDictionary.find(el => el.value === monthNumber.value)?.label || '???'
})

const daysInMonth = computed(() => {
    let days = MonthDictionary.find(el => el.value === monthNumber.value)?.days || 30
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
watch(() => props.date, (newDate) => {
    monthNumber.value = newDate.getMonth()
    year.value = newDate.getFullYear()
})


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

const handleDateClick = (date: Date) => {
    emit('update:date', date)
    emit('change', date)
    showCalendar.value = false
}
const isSelected = (day: number) => {
    const cellDate = new Date(year.value, monthNumber.value, day)
    return cellDate.toDateString() === props.date.toDateString()
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

const isToday = (day: number) => {
    const cellDate = new Date(year.value, monthNumber.value, day)
    return cellDate.toDateString() === new Date().toDateString()
}

const isLeap = (year: number) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
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
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
}

.date-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.calendar-toggle {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    font-size: 1.25rem;
}

.calendar-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
}

/* .calendar-container {
    padding: 1rem;
} */

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.nav-button {
    padding: 0.5rem 1.5rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.125rem;
    transition: background-color 0.2s;
}

.nav-button:hover {
    background-color: #f3f4f6;
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
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.weekday-header {
    text-align: center;
    background-color: #f8f9fa;
    border: 1px solid #e5e7eb;
    padding: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.empty-cell {
    border: 1px solid #e5e7eb;
}
</style>