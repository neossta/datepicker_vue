export interface ILocaleTranslation {
	en: string
	ru: string
}

export interface IMonthDictionaryObj {
	value: number
	label: ILocaleTranslation
	shortLabel: ILocaleTranslation
	countLabel: ILocaleTranslation
	days: number
}

export interface IDaysDictionaryObj {
	value: number
	shortLabel: ILocaleTranslation
	label: ILocaleTranslation
}
