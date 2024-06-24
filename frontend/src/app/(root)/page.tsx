import { getUsers } from '@/hooks/useUsers'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getUsers
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="pl-[100px]"></div>
      </HydrationBoundary>
    </>
  )
}
