export interface UserSnapshot {
  id: number
  user_uid: string
  name: string
  avatar: string
  ip: string | null
  user_created_at: string
  gender: string
  snapshot_at: string
  metadata: {
    id: string
    loc: {
      id: string
      uid: string
      name: string
    } | null
    uid: string
    uri: string
    url: string
    kind: string
    name: string
    type: string
    avatar: string
    gender: string
    is_club: boolean
    followed: boolean
    reg_time: string
    is_banned_forever: boolean
    is_readonly_forever: boolean
    // recent_comments?: UserComment[]
  }
}

export interface UserDetail {
  user_snapshots: UserSnapshot[]
}

export interface UserComment {
  id: number
  topic: {
    id: number
    topic_id: string
    group_id: string
    topic_created_at: string
    author_uid: string
    author_id: string
  }
  user_uid: string
  content: string
  comment_id: string
  ref_comment_id: string | null
  upvote_count: number
  created_at: string
  metadata: {
    id: string
    text: string
    author: {
      name: string
      avatar: string
    }
    photos: Array<{
      id: string
      image: {
        large: {
          url: string
          width: number
          height: number
        }
        normal: {
          url: string
          width: number
          height: number
        }
      }
    }>
    ip_location: string
    ref_comment?: {
      id: string
      text: string
      author: {
        name: string
      }
    }
  }
}

export interface UserCommentsResponse {
  groupedComments: {
    [key: string]: UserComment[]
  }
}
