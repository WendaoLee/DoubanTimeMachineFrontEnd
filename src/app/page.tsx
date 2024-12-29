import { Search } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

import { PostCard } from "@/components/PostCard"
import { fetchPosts } from "@/lib/utils/api"
import { Post, PostResponse } from "@/lib/types/post"

export default async function Home() {
  const posts: PostResponse = await fetchPosts()

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
        <h1 className="text-lg font-medium">😽枝江存档姬 - 绝赞开发中...</h1>
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:border-gray-300"
        >
          <Search className="size-4" />
          <span>搜索</span>
        </Link>
      </header>
      <Suspense
        fallback={
          <div className="flex justify-center p-4">
            <div className="size-6 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
          </div>
        }
      >
        <div className="divide-y divide-gray-100">
          {posts.data
            .sort(
              (a, b) =>
                new Date(b.topic_last_reply_time).getTime() -
                new Date(a.topic_last_reply_time).getTime(),
            )
            .map((post) => (
              <PostCard key={post.topic_id} post={post} />
            ))}
        </div>
      </Suspense>
    </main>
  )
}
