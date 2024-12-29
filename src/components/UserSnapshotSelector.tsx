"use client"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { History } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"

import { type UserSnapshot } from "@/lib/types/user"

interface UserSnapshotSelectorProps {
  snapshots: UserSnapshot[]
  currentSnapshotId?: number
  userId: string
}

export function UserSnapshotSelector({
  snapshots,
  currentSnapshotId,
  userId,
}: UserSnapshotSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useClickAway(ref, () => {
    setIsOpen(false)
  })

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md p-1 text-sm text-gray-500 hover:bg-gray-100"
      >
        <History className="size-4" />
        <span>历史快照</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 w-64 rounded-lg border border-gray-100 bg-white p-2 shadow-lg">
          <div className="text-xs text-gray-500">选择要查看的版本：</div>
          <div className="mt-2 space-y-2">
            {snapshots.map((snapshot) => (
              <Link
                key={snapshot.id}
                href={`/users/${userId}?snapshot=${snapshot.id}`}
                className={`block rounded-md px-3 py-2 text-sm hover:bg-gray-50 ${
                  snapshot.id === currentSnapshotId ? "bg-gray-50" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium text-gray-900">
                  Version.{snapshot.id}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  快照于{" "}
                  {formatDistanceToNow(new Date(snapshot.snapshot_at), {
                    addSuffix: true,
                    locale: zhCN,
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
