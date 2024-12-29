import { ofetch } from "ofetch"

import { type TopicDetail } from "@/lib/types/topic"
import { type UserDetail } from "@/lib/types/user"

export async function getTopicDetail(id: string): Promise<TopicDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/topic/${id}`,
    { cache: "no-cache" },
  )
  if (!res.ok) {
    throw new Error("Failed to fetch topic detail")
  }
  const json = await res.json()
  return json.data
}

type UserDetailResponse = {
  code: number
  data: UserDetail
  message: string
}

export async function getUserDetailById(id: string): Promise<UserDetail> {
  try {
    const res = await ofetch<UserDetailResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user?id=${id}`,
      { cache: "no-cache" },
    )
    if (res.data.user_snapshots.length === 0) {
      const res = await ofetch<UserDetailResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user?uid=${id}`,
        { cache: "no-cache" },
      )
      return res.data
    }
    return res.data
  } catch (error) {
    const res = await ofetch<UserDetailResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user?uid=${id}`,
      { cache: "no-cache" },
    )
    return res.data
  }
}
