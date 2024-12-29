"use client"
import { useState } from "react"

import { UserComments } from "@/components/UserComments"
import { UserTopics } from "@/components/UserTopics"

interface UserContentProps {
  userId: string
}

export function UserContent({ userId }: UserContentProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts")

  return (
    <>
      {/* 标签切换 */}
      <div className="flex border-b border-gray-100">
        <button
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === "posts"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          发帖
        </button>
        <button
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === "comments"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          回复
        </button>
      </div>

      {/* 内容显示区域 */}
      {activeTab === "posts" ? (
        <UserTopics userId={userId} />
      ) : (
        <UserComments userId={userId} />
      )}
    </>
  )
}
