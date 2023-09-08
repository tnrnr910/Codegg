export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const formattedDate = `${year}.${month}.${day}`

  return formattedDate
}
