"use client"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { type TopicDetail } from "@/lib/types/topic"
import { type UserDetail } from "@/lib/types/user"

interface SearchResultsProps {
  type: "users" | "posts"
  keyword: string
}

export function SearchResults({ type, keyword }: SearchResultsProps) {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true)
      setError(null)
      setResults([])

      try {
        const endpoint =
          type === "users"
            ? `/api/user?uid=${keyword}`
            : `/api/topic/${keyword}`
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
        if (!res.ok) throw new Error("😭找不到结果捏")
        const json = await res.json()

        if (!json.data) {
          throw new Error("未找到相关数据")
        }

        if (type === "users") {
          setResults([json.data])
        } else {
          const post = json.data
          if (!post.topic_snapshots?.[0]?.title) {
            throw new Error("帖子数据格式错误")
          }
          setResults([post])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "搜索失败")
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    if (keyword && type) {
      fetchResults()
    }
  }, [type, keyword])

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">搜索中...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        未找到相关{type === "users" ? "用户" : "帖子"}
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {type === "users"
        ? results.map((user: UserDetail) => (
            <Link
              key={user.user_snapshots[0].id}
              href={`/users/${user.user_snapshots[0].user_uid}`}
              className="block p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.user_snapshots[0].avatar}
                  alt={user.user_snapshots[0].name}
                  className="size-12 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {user.user_snapshots[0].name}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    注册于{" "}
                    {new Date(
                      user.user_snapshots[0].metadata.reg_time,
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))
        : results.map((post: TopicDetail) => {
            const snapshot = post.topic_snapshots?.[0]
            const stats = post.topic_statistic_snapshots?.[0]

            if (!snapshot || !stats) return null

            return (
              <Link
                key={snapshot.id}
                href={`/posts/${post.topic_snapshots[0].metadata.id || snapshot.metadata.id}`}
                className="block p-4 hover:bg-gray-50"
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {snapshot.title}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        {formatDistanceToNow(
                          new Date(snapshot.topic_created_at),
                          {
                            addSuffix: true,
                            locale: zhCN,
                          },
                        )}
                      </span>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="size-4" />
                        <span>{stats.reply_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
    </div>
  )
}
