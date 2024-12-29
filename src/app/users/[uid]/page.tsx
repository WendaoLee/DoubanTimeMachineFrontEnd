import { notFound } from "next/navigation"

import { Header } from "@/components/Header"
import { UserContent } from "@/components/UserContent"
import { UserSnapshotSelector } from "@/components/UserSnapshotSelector"
import { getUserDetailById } from "@/lib/api"
import { type UserDetail } from "@/lib/types/user"

interface PageProps {
  params: {
    uid: string
  }
  searchParams: {
    snapshot?: string
  }
}

export default async function UserDetailPage({
  params,
  searchParams,
}: PageProps) {
  const data: UserDetail = await getUserDetailById(params.uid)

  // 按快照时间降序排序
  const sortedSnapshots = data.user_snapshots.sort(
    (a, b) =>
      new Date(b.snapshot_at).getTime() - new Date(a.snapshot_at).getTime(),
  )

  // 获取指定快照或最新快照
  const snapshotId = searchParams.snapshot
  const currentSnapshot = snapshotId
    ? sortedSnapshots.find((s) => s.id === Number(snapshotId))
    : sortedSnapshots[0]

  if (!currentSnapshot) {
    notFound()
  }

  return (
    <>
      <Header title={currentSnapshot.name} />
      <div className="mx-auto max-w-2xl bg-white">
        <div className="border-b border-gray-100 p-4">
          {/* 用户信息头部 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={currentSnapshot.avatar}
                alt={currentSnapshot.name}
                className="size-16 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-xl font-medium text-gray-900">
                  {currentSnapshot.name}
                </h1>
                <div className="mt-1 text-sm text-gray-500">
                  注册于{" "}
                  {new Date(
                    currentSnapshot.metadata.reg_time,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>

            <UserSnapshotSelector
              snapshots={sortedSnapshots}
              currentSnapshotId={currentSnapshot.id}
              userId={params.uid}
            />
          </div>

          {/* 用户基本信息 */}
          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <div>性别：{currentSnapshot.gender === "F" ? "女" : "男"}</div>
            <div>
              豆瓣 ID：
              <span className="text-gray-900">
                {currentSnapshot.metadata.id}
              </span>
            </div>
            <div>
              豆瓣主页：
              <a
                href={currentSnapshot.metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {currentSnapshot.metadata.url}
              </a>
            </div>
          </div>
        </div>

        <UserContent userId={params.uid} />
      </div>
    </>
  )
}
