"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Loader2, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface ManualOrder {
  id: string
  productName: string
  orderNumber: string
  platform: string
  purchaseDate: Date | undefined
  totalAmount: number
}

const platforms = [
  { value: "Coupang", label: "쿠팡" },
  { value: "11번가", label: "11번가" },
  { value: "G마켓", label: "G마켓" },
  { value: "옥션", label: "옥션" },
  { value: "네이버", label: "네이버 스토어" },
  { value: "티몬", label: "티몬" },
  { value: "위메프", label: "위메프" },
  { value: "SSG.COM", label: "SSG.COM" },
  { value: "롯데온", label: "롯데온" },
  { value: "인터파크", label: "인터파크" },
  { value: "YES24", label: "YES24" },
  { value: "교보문고", label: "교보문고" },
  { value: "기타", label: "기타" },
]

export default function ManualEntry() {
  const [currentOrder, setCurrentOrder] = useState<ManualOrder>({
    id: "",
    productName: "",
    orderNumber: "",
    platform: "",
    purchaseDate: undefined,
    totalAmount: 0,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (field: keyof ManualOrder, value: any) => {
    setCurrentOrder((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddOrder = async () => {
    if (
      !currentOrder.productName ||
      !currentOrder.orderNumber ||
      !currentOrder.platform ||
      !currentOrder.purchaseDate ||
      currentOrder.totalAmount <= 0
    ) {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    setLoading(true)
    setSuccess(null)

    const token = localStorage.getItem("authToken")
    if (!token) {
      alert("로그인이 필요합니다.")
      setLoading(false)
      return
    }

    try {
      const requestData = {
        productName: currentOrder.productName,
        purchaseDate: currentOrder.purchaseDate.toISOString().split('T')[0], // YYYY-MM-DD 형식
        orderNumber: currentOrder.orderNumber,
        totalAmount: currentOrder.totalAmount,
        platform: currentOrder.platform,
      }

      const response = await fetch("http://localhost:8080/api/purchaseditems/additems/manual", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        setCurrentOrder({
          id: "",
          productName: "",
          orderNumber: "",
          platform: "",
          purchaseDate: undefined,
          totalAmount: 0,
        })
        setSuccess("주문이 성공적으로 추가되었습니다!")
      } else {
        const errorData = await response.json()
        alert(`주문 추가 실패: ${errorData.message || "알 수 없는 오류가 발생했습니다."}`)
      }
    } catch (error) {
      console.error("주문 추가 중 오류 발생:", error)
      alert("서버 연결에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const getPlatformLabel = (platform: string) => {
    return platforms.find((p) => p.value === platform)?.label || platform
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />새 주문 추가
          </CardTitle>
          <CardDescription>온라인 쇼핑몰에서 구매한 상품 정보를 수동으로 입력하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">상품명 *</Label>
              <Input
                id="productName"
                placeholder="상품명을 입력하세요"
                value={currentOrder.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNumber">주문번호 *</Label>
              <Input
                id="orderNumber"
                placeholder="주문번호를 입력하세요"
                value={currentOrder.orderNumber}
                onChange={(e) => handleInputChange("orderNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>주문 플랫폼 *</Label>
              <Select value={currentOrder.platform} onValueChange={(value) => handleInputChange("platform", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="구매한 쇼핑몰을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>구입일자 *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {currentOrder.purchaseDate ? (
                      format(currentOrder.purchaseDate, "PPP", { locale: ko })
                    ) : (
                      <span>날짜를 선택하세요</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={currentOrder.purchaseDate}
                    onSelect={(date) => handleInputChange("purchaseDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">총결제금액 (원) *</Label>
              <Input
                id="totalAmount"
                type="number"
                min="1"
                placeholder="0"
                value={currentOrder.totalAmount}
                onChange={(e) => handleInputChange("totalAmount", Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">{success}</span>
            </div>
          )}

          <div className="mt-6">
            <Button onClick={handleAddOrder} className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  주문 추가
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
