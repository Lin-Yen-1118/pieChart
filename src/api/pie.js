import service from '@/utils/request'
import { useRouterQuery } from '@/utils/getRouterQuery.js'
export function getPieData() {
  const { station } = useRouterQuery()
  return service({
    url: `${window.apiConfig.baseURL}/report/usageRate/device/${station.value}`,
    method: 'get',
    // params: query,
  })
}
