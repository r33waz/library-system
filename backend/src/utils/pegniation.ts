export function validatePagination(pageCount: string, perpageData: string): [number, number] {
  const page = !Number.isNaN(parseInt(pageCount)) ? +pageCount : 1
  const perpage = !Number.isNaN(parseInt(perpageData)) ? +perpageData : 10

  return [page, perpage]
}



export const getPagingData = (
  total: number,
  page: number | undefined,
  limit: number
): {
  total: number
  totalPages: number
  currentPage: number
  perpage: number
} => {
  const currentPage: number = page ?? 1
  const totalPages: number = Math.ceil(total / limit)

  return { total, totalPages, currentPage, perpage: limit }
}
