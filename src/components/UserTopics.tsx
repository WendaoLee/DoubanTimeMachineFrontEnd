"use client"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Heart, MessageCircle, Repeat, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { type UserTopic } from "@/lib/types/topic"

interface UserTopicsProps {
  userId: string
}

export function UserTopics({ userId }: UserTopicsProps) {
  const [topics, setTopics] = useState<UserTopic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/topics?id=${userId}`,
        )
        if (!res.ok) {
          throw new Error("Failed to fetch topics")
        }
        const json = await res.json()
        if (json.data.topics.length === 0) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/topics?uid=${userId}`,
          )
          if (!res.ok) {
            throw new Error("Failed to fetch topics")
          }
          const json = await res.json()
          setTopics(json.data.topics)
        } else {
          setTopics(json.data.topics)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch topics")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopics()
  }, [userId])

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">加载中...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (topics.length === 0) {
    return <div className="p-4 text-center text-gray-500">暂无发帖记录</div>
  }

  return (
    <div className="divide-y divide-gray-100">
      {topics.map((item) => {
        const snapshot = item.topic.topic_content_snapshots[0]
        const stats = item.stat_snapshot
        const photos = snapshot.metadata.photos || []

        return (
          <div key={item.topic.id} className="p-4">
            <Link
              href={`/posts/${item.topic.topic_id}`}
              className="block hover:bg-gray-50"
            >
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-900">
                  {snapshot.title}
                </h3>

                {/* 发帖时间和小组信息 */}
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <span>
                    发表于{" "}
                    {formatDistanceToNow(new Date(snapshot.topic_created_at), {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </span>
                  <span>·</span>
                  <span>{snapshot.metadata.group.name}</span>
                </div>

                {/* 图片预览 */}
                {photos.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {photos.slice(0, 3).map((photo) => (
                      <img
                        key={photo.id}
                        src={photo.image.normal.url}
                        alt=""
                        className="h-20 w-20 shrink-0 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}

                {/* 互动数据 */}
                <div className="mt-2 flex items-center gap-6">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="size-4" />
                    <span className="text-xs">{stats.reply_count}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="size-4" />
                    <span className="text-xs">{stats.favorite_count}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Star className="size-4" />
                    <span className="text-xs">{stats.collect_count}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Repeat className="size-4" />
                    <span className="text-xs">{stats.reshare_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
