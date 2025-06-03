"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface ManualOrder {
  id: string
  productName: string
  manufacturer: string
  platform: string
  purchaseDate: Date | undefined
  quantity: number
  price: number
  description: string
}

const platforms = [
  { value: "coupang", label: "쿠팡" },
  { value: "naver", label: "네이버 스토어" },
  { value: "11st", label: "11번가" },
  { value: "gmarket", label: "G마켓" },
  { value: "auction", label: "옥션" },
  { value: "tmon", label: "티몬" },
  { value: "wemakeprice", label: "위메프" },
  { value: "ssg", label: "SSG.COM" },
  { value: "lotte", label: "롯데온" },
  { value: "interpark", label: "인터파크" },
  { value: "yes24", label: "YES24" },
  { value: "kyobo", label: "교보문고" },
  { value: "other", label: "기타" },
]

export default function ManualEntry() {
  const [orders, setOrders] = useState<ManualOrder[]>([])
  const [currentOrder, setCurrentOrder] = useState<ManualOrder>({
    id: "",
    productName: "",
    manufacturer: "",
    platform: "",
    purchaseDate: undefined,
    quantity: 1,
    price: 0,
    description: "",
  })

  const handleInputChange = (field: keyof ManualOrder, value: any) => {
    setCurrentOrder((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddOrder = () => {
    if (
      !currentOrder.productName ||
      !currentOrder.manufacturer ||
      !currentOrder.platform ||
      !currentOrder.purchaseDate
    ) {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    const newOrder = {
      ...currentOrder,
      id: Date.now().toString(),
    }

    setOrders((prev) => [...prev, newOrder])
    setCurrentOrder({
      id: "",
      productName: "",
      manufacturer: "",
      platform: "",
      purchaseDate: undefined,
      quantity: 1,
      price: 0,
      description: "",
    })
  }

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id))
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
              <Label htmlFor="manufacturer">제조회사 *</Label>
              <Input
                id="manufacturer"
                placeholder="제조회사를 입력하세요"
                value={currentOrder.manufacturer}
                onChange={(e) => handleInputChange("manufacturer", e.target.value)}
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
              <Label htmlFor="quantity">수량</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={currentOrder.quantity}
                onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">가격 (원)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="0"
                value={currentOrder.price}
                onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">상품 설명 (선택사항)</Label>
              <Textarea
                id="description"
                placeholder="상품에 대한 추가 정보를 입력하세요"
                value={currentOrder.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleAddOrder} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              주문 추가
            </Button>
          </div>
        </CardContent>
      </Card>

      {orders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>수동 입력된 주문 목록</CardTitle>
            <CardDescription>총 {orders.length}개의 주문이 등록되었습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{order.productName}</h4>
                      <p className="text-gray-600">제조회사: {order.manufacturer}</p>
                      <p className="text-gray-600">구매 플랫폼: {getPlatformLabel(order.platform)}</p>
                      <p className="text-gray-600">
                        구입일: {order.purchaseDate ? format(order.purchaseDate, "PPP", { locale: ko }) : ""}
                      </p>
                      <p className="text-gray-600">
                        수량: {order.quantity}개 | 가격: {order.price.toLocaleString()}원
                      </p>
                      {order.description && <p className="text-gray-600 mt-2">설명: {order.description}</p>}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
