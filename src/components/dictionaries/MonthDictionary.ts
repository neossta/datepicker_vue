interface IDictionaryObj {
  value: number,
  label: string,
  shortLabel: string,
  countLabel: string,
  days: number,
}

export const MonthDictionary: IDictionaryObj[] = [
  { value: 0,  label: 'Январь',   shortLabel: 'янв',  countLabel: 'января', days: 31, },
  { value: 1,  label: 'Февраль',  shortLabel: 'фев',  countLabel: 'февраля', days: 28, },
  { value: 2,  label: 'Март',     shortLabel: 'март', countLabel: 'марта', days: 31, },
  { value: 3,  label: 'Апрель',   shortLabel: 'апр',  countLabel: 'апреля', days: 30, },
  { value: 4,  label: 'Май',      shortLabel: 'май',  countLabel: 'мая', days: 31, },
  { value: 5,  label: 'Июнь',     shortLabel: 'июнь', countLabel: 'июня', days: 30, },
  { value: 6,  label: 'Июль',     shortLabel: 'июль', countLabel: 'июля', days: 31, },
  { value: 7,  label: 'Август',   shortLabel: 'авг',  countLabel: 'августа', days: 31, },
  { value: 8,  label: 'Сентябрь', shortLabel: 'сен',  countLabel: 'сентября', days: 30, },
  { value: 9,  label: 'Октябрь',  shortLabel: 'окт',  countLabel: 'октября', days: 31, },
  { value: 10, label: 'Ноябрь',   shortLabel: 'ноя',  countLabel: 'ноября', days: 30, },
  { value: 11, label: 'Декабрь',  shortLabel: 'дек',  countLabel: 'декабря', days: 31, },
];