interface IDictionaryObj {
  value: number,
  shortLabel: string,
  label: string,
}

export const WeekDayDictionary: IDictionaryObj[] = [
  { value: 0, label: 'понедельник', shortLabel: 'пн' },
  { value: 1, label: 'вторник',     shortLabel: 'вт' },
  { value: 2, label: 'среда',       shortLabel: 'ср' },
  { value: 3, label: 'четверг',     shortLabel: 'чт' },
  { value: 4, label: 'пятница',     shortLabel: 'пт' },
  { value: 5, label: 'суббота',     shortLabel: 'сб' },
  { value: 6, label: 'воскресенье', shortLabel: 'вс' },
];