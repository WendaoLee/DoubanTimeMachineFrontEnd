"use client"

import { ArrowLeft, Home, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title?: string
  showBack?: boolean
}

export function Header({ title, showBack }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b border-gray-100 bg-white px-4">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center text-gray-500 hover:text-gray-900"
        >
          <Home className="size-5" />
        </Link>
        <Link
          href="/search"
          className="flex items-center text-gray-500 hover:text-gray-900"
        >
          <Search className="size-5" />
        </Link>
        {showBack && (
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-900"
            type="button"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
      </div>

      <h1 className="flex-1 text-center text-base font-medium">{title}</h1>

      <div className="w-[88px]" />
    </header>
  )
}
