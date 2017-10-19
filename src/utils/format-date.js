export function formatDate(date) {
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day}.${monthIndex}.${year} ${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`
}