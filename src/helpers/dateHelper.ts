import { DateTime } from 'luxon'

export const useDateHelper = (): {
    dateFromString: (date: string) => string,
    dateFromLocalisedString: (date: string) => string,
    dateFromDatePicker: (date: string) => DateTime,
    dateFromDatePickerFormatted: (date: string) => string,
    dateTimeFromISO: (date: string) => DateTime,
    getCurrentDate: () => DateTime,
    getCurrentDateFormatted: () => string,
    getCurrentYear: () => string,
} => {
    const dateFromString = (date: string): string => {
        return DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('dd MMM yyyy').toLowerCase()
    }

    const dateFromLocalisedString = (date: string): string => {
        //return DateTime.fromFormat(date, 'yyyy-MM-dd').setLocale('nl').toFormat('dd MMM yyyy').toLowerCase()
        return DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('dd MMM yyyy').toLowerCase()
    }

    const dateFromDatePicker = (date: string): DateTime => {
        //return DateTime.fromFormat(date, 'dd MMM yyyy', { locale: 'nl' })
        return DateTime.fromFormat(date, 'dd MMM yyyy')
    }

    const dateFromDatePickerFormatted = (date: string): string => {
        return dateFromDatePicker(date).toFormat('yyyy-MM-dd')
    }

    const dateTimeFromISO = (date: string): DateTime => {
        return DateTime.fromISO(date)
    }

    const getCurrentDate = (): DateTime => {
        //return DateTime.now().setLocale('nl')
        return DateTime.now()
    }

    const getCurrentDateFormatted = (): string => {
        return getCurrentDate().toFormat('yyyy-MM-dd')
    }

    const getCurrentYear = (): string => {
        return getCurrentDate().toFormat('yyyy')
    }

    return {
        dateFromString,
        dateFromLocalisedString,
        dateFromDatePicker,
        dateFromDatePickerFormatted,
        dateTimeFromISO,
        getCurrentDate,
        getCurrentDateFormatted,
        getCurrentYear
    }
}
