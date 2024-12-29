"use client"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { CommentImages } from "@/components/CommentImages"
import { type UserComment } from "@/lib/types/user"

interface UserCommentsProps {
  userId: string
}

export function UserComments({ userId }: UserCommentsProps) {
  const [comments, setComments] = useState<UserComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/comments?uid=${userId}`,
        )
        if (!res.ok) {
          throw new Error("Failed to fetch comments")
        }
        const json = await res.json()
        // 将分组的评论展平为数组
        const allComments = Object.values(
          json.data.groupedComments,
        ).flat() as UserComment[]
        setComments(allComments)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch comments",
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [userId])

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">加载中...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (comments.length === 0) {
    return <div className="p-4 text-center text-gray-500">暂无回复记录</div>
  }

  return (
    <div className="divide-y divide-gray-100">
      {comments.map((comment) => (
        <div
          key={comment.id}
          id={`comment-${comment.comment_id}`}
          className="scroll-mt-12 p-4"
        >
          <Link
            href={`/posts/${comment.topic.topic_id}#${comment.comment_id}`}
            className="block hover:bg-gray-50"
          >
            <div className="flex flex-col">
              {/* 回复内容 */}
              <div className="text-sm text-gray-900">{comment.content}</div>

              {/* 引用的回复 */}
              {comment.metadata.ref_comment && (
                <div className="mt-2 rounded-lg bg-gray-50 p-2 text-sm text-gray-500">
                  回复 @{comment.metadata.ref_comment.author.name}:{" "}
                  {comment.metadata.ref_comment.text}
                </div>
              )}

              {/* 图片 */}
              {comment.metadata.photos &&
                comment.metadata.photos.length > 0 && (
                  <CommentImages images={comment.metadata.photos} />
                )}

              {/* 评论元信息 */}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span>
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                    locale: zhCN,
                  })}
                </span>
                <span>·</span>
                <span>IP 属地：{comment.metadata.ip_location}</span>
                {comment.upvote_count > 0 && (
                  <>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="size-3" />
                      <span>{comment.upvote_count}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
