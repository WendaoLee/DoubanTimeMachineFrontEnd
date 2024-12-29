"use client"
import { Search as SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

import { Header } from "@/components/Header"
import { SearchResults } from "@/components/SearchResults"

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchType, setSearchType] = useState<"users" | "posts">(
    (searchParams.get("type") as "users" | "posts") || "posts",
  )
  const [keyword, setKeyword] = useState(searchParams.get("q") || "")

  // 当切换类型时，清空结果并更新 URL
  const handleTypeChange = (type: "users" | "posts") => {
    setSearchType(type)
    if (keyword) {
      const params = new URLSearchParams()
      params.set("type", type)
      params.set("q", keyword)
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword.trim()) return

    const params = new URLSearchParams()
    params.set("type", searchType)
    params.set("q", keyword)
    router.push(`/search?${params.toString()}`)
  }

  // 同步 URL 参数到状态
  useEffect(() => {
    const type = searchParams.get("type") as "users" | "posts"
    if (type) {
      setSearchType(type)
    }
    const q = searchParams.get("q")
    if (q) {
      setKeyword(q)
    }
  }, [searchParams])

  return (
    <>
      <Header title="搜索" showBack />
      <div className="mx-auto max-w-2xl bg-white">
        <div className="p-4">
          <form onSubmit={handleSearch}>
            {/* 搜索类型切换 */}
            <div className="mb-2 flex gap-4">
              <button
                type="button"
                className={`text-sm font-medium ${
                  searchType === "posts"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => handleTypeChange("posts")}
              >
                帖子
              </button>
              <button
                type="button"
                className={`text-sm font-medium ${
                  searchType === "users"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => handleTypeChange("users")}
              >
                用户
              </button>
            </div>

            {/* 搜索输入框 */}
            <div className="relative">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={
                  searchType === "posts" ? "搜索帖子..." : "搜索用户..."
                }
                className="w-full rounded-full border border-gray-200 py-2.5 pl-5 pr-12 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 hover:text-gray-600"
              >
                <SearchIcon className="size-5" />
              </button>
            </div>
          </form>
        </div>

        {/* 搜索结果 */}
        {searchParams.get("q") && (
          <SearchResults
            type={searchParams.get("type") as "users" | "posts"}
            keyword={searchParams.get("q") || ""}
          />
        )}
      </div>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        // 加载状态的展示
        <div className="mx-auto max-w-2xl bg-white">
          <Header title="搜索" showBack />
          <div className="p-4">
            <div>加载中...</div>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  )
}
