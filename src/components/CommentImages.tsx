"use client"
import Image from "next/image"
import { useState } from "react"

interface CommentImage {
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
  origin?: boolean
  tag_name?: string
  watermark?: boolean
  description?: string
}

interface CommentImagesProps {
  images: CommentImage[]
}

export function CommentImages({ images }: CommentImagesProps) {
  const [selectedImage, setSelectedImage] = useState<CommentImage | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="mt-2 flex flex-wrap gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            className="relative overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            {/* 缩略图 */}
            <img
              src={image.image.normal.url}
              alt={image.description || "评论图片"}
              className="size-20 object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>

      {/* 图片预览模态框 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={selectedImage.image.large.url}
              alt={selectedImage.description || "评论图片"}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
