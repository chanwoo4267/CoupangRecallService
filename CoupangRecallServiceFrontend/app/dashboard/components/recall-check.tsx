"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertTriangle, CheckCircle, Search, RefreshCw, ExternalLink, Flame } from "lucide-react"

interface RecallItem {
  id: string
  productName: string
  manufacturer: string
  recallDate: string
  reason: string
  severity: "high" | "medium" | "low"
  status: "active" | "resolved"
  orderDate?: string
  quantity?: number
}

export default function RecallCheck() {
  const [recallItems, setRecallItems] = useState<RecallItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // 샘플 데이터
  const sampleRecallItems: RecallItem[] = [
    {
      id: "1",
      productName: "ABC 전자레인지 모델 XYZ-2023",
      manufacturer: "ABC전자",
      recallDate: "2024-01-15",
      reason: "과열로 인한 화재 위험",
      severity: "high",
      status: "active",
      orderDate: "2023-12-10",
      quantity: 1,
    },
    {
      id: "2",
      productName: "DEF 아기용품 젖병",
      manufacturer: "DEF생활용품",
      recallDate: "2024-01-20",
      reason: "유해물질 검출",
      severity: "high",
      status: "active",
      orderDate: "2023-11-25",
      quantity: 2,
    },
  ]

  const fetchRecallData = async () => {
    setIsLoading(true)
    // 실제로는 소비자24 API와 연동
    setTimeout(() => {
      setRecallItems(sampleRecallItems)
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 2000)
  }

  useEffect(() => {
    fetchRecallData()
  }, [])

  const filteredItems = recallItems.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "high":
        return "높음"
      case "medium":
        return "보통"
      case "low":
        return "낮음"
      default:
        return "알 수 없음"
    }
  }

  return (
    <div className="space-y-6">
      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-red-600">{recallItems.length}</p>
                <p className="text-sm text-gray-600">리콜 대상 상품</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Flame className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-orange-600">
                  {recallItems.filter((item) => item.severity === "high").length}
                </p>
                <p className="text-sm text-gray-600">고위험 상품</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-600">
                  {recallItems.filter((item) => item.status === "resolved").length}
                </p>
                <p className="text-sm text-gray-600">해결된 상품</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 새로고침 */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                리콜 대상 상품 목록
              </CardTitle>
              <CardDescription>마지막 업데이트: {lastUpdated.toLocaleString("ko-KR")}</CardDescription>
            </div>
            <Button onClick={fetchRecallData} disabled={isLoading} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              새로고침
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="상품명 또는 제조회사로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600">리콜 정보를 확인하는 중...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm ? "검색 결과가 없습니다" : "리콜 대상 상품이 없습니다"}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? "다른 검색어로 시도해보세요" : "현재 구매하신 상품 중 리콜 대상은 없습니다"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-6 bg-red-50 border-red-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.productName}</h3>
                      <p className="text-gray-600 mb-1">제조회사: {item.manufacturer}</p>
                      {item.orderDate && (
                        <p className="text-gray-600 mb-1">
                          구매일: {item.orderDate} | 수량: {item.quantity}개
                        </p>
                      )}
                      <p className="text-gray-600">리콜 발표일: {item.recallDate}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getSeverityColor(item.severity)}>
                        위험도: {getSeverityText(item.severity)}
                      </Badge>
                      <Badge variant={item.status === "active" ? "destructive" : "secondary"}>
                        {item.status === "active" ? "진행중" : "해결됨"}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">리콜 사유</h4>
                    <p className="text-red-700">{item.reason}</p>
                  </div>

                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      소비자24에서 자세히 보기
                    </Button>
                    <Button variant="outline" size="sm">
                      조치 완료 표시
                    </Button>
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
