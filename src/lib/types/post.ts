export interface User {
  topic_author_id: string
  topic_author_uid: string
  topic_author_name: string
  topic_author_avatar: string
}

export interface Post {
  topic_id: string
  topic_title: string
  topic_content: string
  topic_comments_count: number
  topic_collection_count: number
  topic_favorite_count: number
  topic_reshare_count: number
  topic_last_reply_time: string
  topic_snapshot_at: string
  topic_author_id: string
  topic_author_uid: string
  topic_author_name: string
  topic_author_avatar: string
}

export interface PostResponse {
  code: number
  message: string
  data: Post[]
}
