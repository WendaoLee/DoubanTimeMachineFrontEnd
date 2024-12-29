export async function fetchPosts(page = 1, pageSize = 10) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/latest`,
    {
      cache: "no-cache",
    },
  )
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}
