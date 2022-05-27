import dayjs from "dayjs";

const getDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
}

const getFormattedDate = (date) => {
    return dayjs(date).format('MMMM DD, YYYY');
}

const getToday = () => {
    return dayjs().format('YYYY-MM-DD');
}

const isIncludedInLastMonth = (date) => {
    return date && dayjs(date).isAfter(dayjs().subtract(30, 'day'))
}

export { getDate, getFormattedDate, getToday, isIncludedInLastMonth };