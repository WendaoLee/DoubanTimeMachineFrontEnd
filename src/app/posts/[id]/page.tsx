import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Heart, MessageCircle, Repeat, Star, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CommentImages } from "@/components/CommentImages"
import { HtmlContent } from "@/components/HtmlContent"
import { SnapshotSelector } from "@/components/SnapshotSelector"
import { getTopicDetail } from "@/lib/api"
import { type TopicDetail } from "@/lib/types/topic"
import { Header } from "@/components/Header"

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    snapshot?: string
  }
}

export default async function PostDetailPage({
  params,
  searchParams,
}: PageProps) {
  const data: TopicDetail = await getTopicDetail(params.id)

  // 获取指定快照或最新快照
  const snapshotId = searchParams.snapshot
  const currentSnapshot = snapshotId
    ? data.topic_snapshots.find((s) => s.id === Number(snapshotId))
    : data.topic_snapshots[0]

  if (!currentSnapshot) {
    notFound()
  }

  const author = data.topic_author
  const stats = data.topic_statistic_snapshots.at(-1)
  const comments = data.comments

  return (
    <>
      <Header title={currentSnapshot.title} />
      <div className="mx-auto max-w-2xl bg-white">
        {/* 帖子头部 */}
        <div className="border-b border-gray-100 p-4">
          {/* 用户信息和发布时间 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href={`/users/${author.user_uid}`} className="shrink-0">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="size-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`/users/${author.user_uid}`}
                  className="text-base font-medium text-gray-900"
                >
                  {author.name}
                </Link>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(
                    new Date(currentSnapshot.topic_created_at),
                    {
                      addSuffix: true,
                      locale: zhCN,
                    },
                  )}
                </span>
              </div>
            </div>

            <SnapshotSelector
              snapshots={data.topic_snapshots}
              currentSnapshotId={currentSnapshot.id}
              postId={params.id}
            />
          </div>

          {/* 标题 */}
          <h1 className="mt-4 text-xl font-normal text-gray-900">
            {currentSnapshot.title}
          </h1>

          {/* 帖子内容 */}
          <div className="mt-4">
            <HtmlContent
              html={currentSnapshot.content}
              className="prose max-w-none [&_img]:my-2 [&_img]:max-h-[500px] [&_img]:rounded-lg"
            />
          </div>

          {/* 互动数据 */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="size-5" />
              <span>{stats?.reply_count || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Heart className="size-5" />
              <span>{stats?.favorite_count || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Star className="size-5" />
              <span>{stats?.collect_count || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Repeat className="size-5" />
              <span>{stats?.reshare_count || 0}</span>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="divide-y divide-gray-100">
          {comments.map((comment) => (
            <div key={comment.id} id={comment.metadata.id} className="p-4">
              <div className="flex gap-3">
                <Link href={`/users/${comment.user_uid}`} className="shrink-0">
                  <img
                    src={comment.metadata.author.avatar}
                    alt={comment.metadata.author.name}
                    className="size-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/users/${comment.user_uid}`}
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      {comment.metadata.author.name}
                    </Link>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                        locale: zhCN,
                      })}
                    </span>
                  </div>
                  {comment.ref_comment_id && (
                    <div className="mt-1 rounded-lg bg-gray-50 p-2 text-sm text-gray-500">
                      回复 @{comment.metadata.ref_comment?.author.name}:{" "}
                      {comment.metadata.ref_comment?.text}
                    </div>
                  )}
                  <div className="mt-1">
                    <HtmlContent
                      html={comment.content}
                      className="text-sm [&_img]:mt-2 [&_img]:max-h-60 [&_img]:rounded-lg"
                    />
                  </div>

                  {/* 添加评论图片展示 */}
                  {comment.metadata.photos &&
                    comment.metadata.photos.length > 0 && (
                      <CommentImages images={comment.metadata.photos} />
                    )}

                  {/* 评论点赞数 */}
                  {comment.upvote_count > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-gray-500">
                      <ThumbsUp className="size-4" />
                      <span className="text-xs">{comment.upvote_count}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
