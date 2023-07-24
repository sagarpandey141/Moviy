const months = ["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export const DateFormator = (release_date) => {
     const date = new Date(release_date);
     const dateStr = months[date.getMonth()]
     return `${dateStr} , ${date.getFullYear()} ${date.getDate()}`
}