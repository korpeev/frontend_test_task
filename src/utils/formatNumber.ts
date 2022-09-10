const formatter = new Intl.NumberFormat('ru-RU', {useGrouping: true})
export const formatNumber = (number: number): string => {
    return formatter.format(number)
}
