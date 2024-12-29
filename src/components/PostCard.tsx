import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Heart, MessageCircle, Repeat, Star } from "lucide-react"
import Link from "next/link"

import { HtmlContent } from "@/components/HtmlContent"
import { type Post } from "@/lib/types/post"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <div
      className={cn(
        "border-b border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50",
        className,
      )}
    >
      <div className="flex gap-3">
        <Link href={`/users/${post.topic_author_id}`} className="shrink-0">
          <img
            src={post.topic_author_avatar}
            alt={post.topic_author_name}
            className="size-10 rounded-full"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2">
            <Link
              href={`/users/${post.topic_author_id}`}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              {post.topic_author_name}
            </Link>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.topic_last_reply_time), {
                addSuffix: true,
                locale: zhCN,
              })}
            </span>
          </div>
          <Link href={`/posts/${post.topic_id}`} className="group">
            <h3 className="mt-1 text-base font-medium text-gray-900 group-hover:underline">
              {post.topic_title}
            </h3>
            <div className="mt-1 overflow-hidden text-sm text-gray-500">
              {/* <HtmlContent
                html={post.topic_content}
                className="[&_img]:my-2 [&_img]:max-h-60 [&_img]:w-full [&_img]:rounded-lg [&_img]:object-cover"
              /> */}
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="size-4" />
                <span className="text-xs">{post.topic_comments_count}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Heart className="size-4" />
                <span className="text-xs">{post.topic_favorite_count}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Star className="size-4" />
                <span className="text-xs">{post.topic_collection_count}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Repeat className="size-4" />
                <span className="text-xs">{post.topic_reshare_count}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
