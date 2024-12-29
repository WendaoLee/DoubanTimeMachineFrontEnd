export interface TopicSnapshot {
  id: number
  content: string
  title: string
  author_uid: string
  author_id: string
  topic_created_at: string
  topic_updated_at: string
  last_edit_time: string
  snapshot_at: string
  metadata: {
    id: string
    uri: string
    url: string
    type: string
    title: string
    author: TopicAuthor
    locked: boolean
    photos: any[]
    content: string
    abstract: string
    has_poll: boolean
    is_elite: boolean
    is_event: boolean
    cover_url: string
    is_locked: boolean
    is_private: boolean
    like_count: number
    topic_tags: any[]
    can_show_ad: boolean
    create_time: string
    gifts_count: number
    ip_location: string
    is_original: boolean
    is_richtext: boolean
    sharing_url: string
    update_time: string
    image_layout: string
    is_collected: boolean
    reaction_type: number
    ad_filter_type: number
    comments_count: number
    reshares_count: number
    screenshot_url: string
    sub_topic_tags: any[]
    is_admin_locked: boolean
    is_report_stock: boolean
    reactions_count: number
    screenshot_type: string
    origin_image_ids: string[]
    screenshot_title: string
    can_author_delete: boolean
    collections_count: number
    can_comment_outside: boolean
    is_douban_ad_author: boolean
    watermark_image_ids: string[]
    can_add_image_comment: boolean
    wechat_timeline_share: string
    is_enable_reply_comment: boolean
    can_relate_gallery_topic: boolean
    group?: {
      id: string
      name: string
      url: string
      // ... 其他群组相关字段
    }
  }
}

export interface TopicStatisticSnapshot {
  id: number
  reply_count: number
  favorite_count: number
  collect_count: number
  reshare_count: number
  last_reply_time: string
  snapshot_at: string
}

export interface TopicAuthor {
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
  avatar_side_icon?: string
  avatar_side_icon_id?: string
  avatar_side_icon_type?: number
}

export interface TopicComment {
  id: number
  user_uid: string
  content: string
  comment_id: string
  ref_comment_id: string | null
  upvote_count: number
  created_at: string
  record_created_at: string
  metadata: {
    id: string
    uri: string
    text: string
    author: TopicAuthor
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
        is_animated: boolean
      }
      origin: boolean
      tag_name: string
      watermark: boolean
      description: string
    }>
    has_ref?: boolean
    entities: any[]
    is_deleted: boolean
    vote_count: number
    create_time: string
    ip_location: string
    is_disabled: boolean
    ref_comment?: {
      id: string
      uri: string
      text: string
      author: TopicAuthor
      photos: any[]
      entities: any[]
      is_deleted: boolean
      vote_count: number
      create_time: string
      ip_location: string
      is_disabled: boolean
      is_censoring: boolean
      reaction_type: number
    }
    is_censoring: boolean
    reaction_type: number
  }
}

export interface TopicDetail {
  topic_snapshots: TopicSnapshot[]
  topic_statistic_snapshots: TopicStatisticSnapshot[]
  topic_author: {
    id: number
    user_uid: string
    name: string
    avatar: string
    ip: string | null
    user_created_at: string
    gender: string
    snapshot_at: string
    metadata: TopicAuthor
  }
  comments: TopicComment[]
}

export interface UserTopic {
  topic: {
    id: number
    topic_id: string
    topic_stat_snapshots: Array<{
      id: number
      reply_count: number
      favorite_count: number
      collect_count: number
      reshare_count: number
      last_reply_time: string
      snapshot_at: string
    }>
    topic_content_snapshots: Array<{
      id: number
      content: string
      title: string
      author_uid: string
      author_id: string
      topic_created_at: string
      topic_updated_at: string
      last_edit_time: string
      snapshot_at: string
      metadata: {
        id: string
        url: string
        group: {
          name: string
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
      }
    }>
  }
  content_snapshot: {
    id: number
    content: string
    title: string
    metadata: {
      photos: Array<{
        image: {
          normal: {
            url: string
          }
        }
      }>
    }
  }
  stat_snapshot: {
    reply_count: number
    favorite_count: number
    collect_count: number
    reshare_count: number
  }
}

export interface UserTopicsResponse {
  topics: UserTopic[]
}
