"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, Calendar, DollarSign, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface PurchasedItem {
  id: number
  productName: string
  purchaseDate: string
  orderNumber: string
  totalAmount: number
  platform: string
}

const platforms = [
  { value: "Coupang", label: "쿠팡", color: "bg-red-100 text-red-800" },
  { value: "11번가", label: "11번가", color: "bg-orange-100 text-orange-800" },
  { value: "G마켓", label: "G마켓", color: "bg-blue-100 text-blue-800" },
  { value: "옥션", label: "옥션", color: "bg-purple-100 text-purple-800" },
  { value: "네이버", label: "네이버 스토어", color: "bg-green-100 text-green-800" },
  { value: "티몬", label: "티몬", color: "bg-pink-100 text-pink-800" },
  { value: "위메프", label: "위메프", color: "bg-indigo-100 text-indigo-800" },
  { value: "SSG.COM", label: "SSG.COM", color: "bg-yellow-100 text-yellow-800" },
  { value: "롯데온", label: "롯데온", color: "bg-red-100 text-red-800" },
  { value: "인터파크", label: "인터파크", color: "bg-cyan-100 text-cyan-800" },
  { value: "YES24", label: "YES24", color: "bg-emerald-100 text-emerald-800" },
  { value: "교보문고", label: "교보문고", color: "bg-slate-100 text-slate-800" },
  { value: "기타", label: "기타", color: "bg-gray-100 text-gray-800" },
]

export default function AllOrders() {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [filterBy, setFilterBy] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 실제 API에서 데이터 가져오기
  useEffect(() => {
    const fetchPurchasedItems = async () => {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("인증 토큰이 없습니다.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch("http://localhost:8080/api/purchaseditems/myitems", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setPurchasedItems(data)
        } else {
          setError("구매 내역을 불러오는데 실패했습니다.")
        }
      } catch (error) {
        console.error("구매 내역 조회 중 오류 발생:", error)
        setError("서버 연결에 실패했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchPurchasedItems()
  }, [])

  // 필터링 및 정렬
  const filteredAndSortedItems = purchasedItems
    .filter((item) => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === "all" || item.platform === filterBy
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
        case "date-asc":
          return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
        case "price-desc":
          return b.totalAmount - a.totalAmount
        case "price-asc":
          return a.totalAmount - b.totalAmount
        case "name":
          return a.productName.localeCompare(b.productName)
        default:
          return 0
      }
    })

  const totalOrders = purchasedItems.length
  const totalAmount = purchasedItems.reduce((sum, item) => sum + item.totalAmount, 0)

  // 플랫폼별 통계
  const platformStats = platforms
    .map((platform) => ({
      ...platform,
      count: purchasedItems.filter((item) => item.platform === platform.value).length,
    }))
    .filter((stat) => stat.count > 0)

  const getPlatformInfo = (platformValue: string) => {
    return (
      platforms.find((p) => p.value === platformValue) || { label: platformValue, color: "bg-gray-100 text-gray-800" }
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">구매 내역을 불러오는 중...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                <p className="text-sm text-gray-600">총 주문 건수</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString()}원</p>
                <p className="text-sm text-gray-600">총 주문 금액</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{platformStats.length}</p>
                <p className="text-sm text-gray-600">이용 플랫폼 수</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 플랫폼별 통계 */}
      {platformStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>플랫폼별 주문 현황</CardTitle>
            <CardDescription>각 쇼핑몰별 주문 건수를 확인할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {platformStats.map((stat) => (
                <div key={stat.value} className="text-center p-3 bg-gray-50 rounded-lg">
                  <Badge className={stat.color}>{stat.label}</Badge>
                  <p className="text-lg font-bold text-gray-900 mt-2">{stat.count}건</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 검색 및 필터 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            전체 주문 내역
          </CardTitle>
          <CardDescription>모든 플랫폼에서 구매한 상품을 확인할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">최신 주문순</SelectItem>
                <SelectItem value="date-asc">오래된 주문순</SelectItem>
                <SelectItem value="price-desc">높은 가격순</SelectItem>
                <SelectItem value="price-asc">낮은 가격순</SelectItem>
                <SelectItem value="name">상품명순</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="플랫폼 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 플랫폼</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 주문 목록 */}
          {filteredAndSortedItems.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterBy !== "all" ? "검색 결과가 없습니다" : "주문 내역이 없습니다"}
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterBy !== "all"
                  ? "다른 검색어나 필터를 시도해보세요"
                  : "CSV 파일을 업로드하거나 수동으로 주문을 입력해보세요"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.productName}</h3>
                      <p className="text-gray-600 mb-1">구매일: {format(new Date(item.purchaseDate), "PPP", { locale: ko })}</p>
                      <p className="text-gray-600 mb-1">주문번호: {item.orderNumber}</p>
                      <p className="text-gray-600 mb-1">가격: {item.totalAmount.toLocaleString()}원</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getPlatformInfo(item.platform).color}>
                        {getPlatformInfo(item.platform).label}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
