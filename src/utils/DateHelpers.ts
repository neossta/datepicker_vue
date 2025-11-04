export const isLeap = (year: number) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)

export const isToday = (date: Date) => {
	return date.toDateString() === new Date().toDateString()
}

export const parseDateString = (dateString: string | undefined): Date => {
	if (!dateString) {
		return new Date()
	}

	const parts = dateString.split('-')
	if (parts.length !== 3) {
		console.warn('Неверный формат даты. Ожидается: "год-месяц-день"')
		return new Date()
	}

	const [year, month, day] = parts.map(Number)
	if (year === undefined || month === undefined || day === undefined) {
		console.log('Неверный формат даты')
		return new Date()
	}
	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		console.warn('Дата содержит нечисловые значения')
		return new Date()
	}

	if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
		console.warn('Некорректные значения даты')
		return new Date()
	}

	const daysInMonth = new Date(year, month, 0).getDate()
	if (day > daysInMonth) {
		console.warn('Некорректные значения даты')
		return new Date()
	}

	const date = new Date(year, month - 1, day)
	return date
}
