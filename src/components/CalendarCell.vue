<template>
    <div :class="['calendar-cell', { 'today': isToday, 'selected': isSelected }]" @click="handleClick">
        <div class='day-number'>
            {{ number }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    number: {
        type: Number,
        required: true
    },
    isToday: {
        type: Boolean,
        default: false
    },
    isSelected: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['date-click'])

const handleClick = () => {
    const date = new Date()
    date.setDate(props.number)
    emit('date-click', date)
}
</script>

<style scoped>
.calendar-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    padding: 0.25rem;
    transition: background-color 0.2s;
    aspect-ratio: 1 / 1;
}

.calendar-cell:hover {
    background-color: #8eccff58;
}

.day-number {
    display: flex;
    font-size: 0.85rem;
}

.today {
    border-color: #8eccff;
    border-width: 1.5px;
}

.selected {
    background-color: #8eccff58;
}
</style>