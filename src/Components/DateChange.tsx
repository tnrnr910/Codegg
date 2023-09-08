export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)

  const year = date.getFullYear() - 2000
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`

  return formattedDate
}
