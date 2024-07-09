export default function Page({ params }: { params: { username: string } }) {
  return <h1>User: {params.username}</h1>
}
