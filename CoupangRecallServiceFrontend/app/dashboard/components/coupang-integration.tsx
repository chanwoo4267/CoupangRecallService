"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, CheckCircle, AlertCircle, Download, ExternalLink, FileText, Chrome, HelpCircle } from "lucide-react"

interface UploadedOrder {
  id: string
  productName: string
  orderDate: string
  price: number
  quantity: number
  status: string
}

export default function CoupangIntegration() {
  const [uploadedOrders, setUploadedOrders] = useState<UploadedOrder[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setUploadStatus("error")
      alert("CSV 파일만 업로드 가능합니다.")
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")

    // 실제로는 CSV 파싱 로직 구현
    setTimeout(() => {
      const sampleOrders: UploadedOrder[] = [
        {
          id: "1",
          productName: "ABC 전자레인지 모델 XYZ-2023",
          orderDate: "2023-12-10",
          price: 89000,
          quantity: 1,
          status: "배송완료",
        },
        {
          id: "2",
          productName: "DEF 아기용품 젖병 세트",
          orderDate: "2023-11-25",
          price: 25000,
          quantity: 2,
          status: "배송완료",
        },
        {
          id: "3",
          productName: "스마트폰 케이스",
          orderDate: "2024-01-05",
          price: 15000,
          quantity: 1,
          status: "배송완료",
        },
      ]

      setUploadedOrders(sampleOrders)
      setUploadStatus("success")
      setIsUploading(false)
    }, 2000)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const openExtensionStore = () => {
    window.open(
      "https://chromewebstore.google.com/detail/%EC%BF%A0%ED%8C%A1-%EA%B2%B0%EC%A0%9C%EB%82%B4%EC%97%AD-%EC%B6%94%EC%B6%9C/fdcblndkbmcbfgpgohnbhlnkobaiablb?hl=ko&utm_source=ext_sidebar",
      "_blank",
    )
  }

  return (
    <div className="space-y-6">
      {/* 설치 안내 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Chrome className="h-5 w-5 mr-2" />
            1단계: 크롬 확장프로그램 설치
          </CardTitle>
          <CardDescription>쿠팡 주문내역을 추출하기 위해 크롬 확장프로그램을 설치해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <HelpCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>크로미움 기반 브라우저</strong>에서만 사용 가능합니다. (Chrome, Edge, Whale 등)
              </AlertDescription>
            </Alert>

            <Button onClick={openExtensionStore} className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              쿠팡 결제내역 추출 확장프로그램 설치하기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CSV 추출 안내 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            2단계: CSV 파일 추출
          </CardTitle>
          <CardDescription>설치한 확장프로그램을 사용하여 쿠팡 주문내역을 CSV 형태로 저장하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">추출 방법</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>쿠팡 웹사이트에 로그인</li>
                <li>마이쿠팡 → 주문목록 페이지로 이동</li>
                <li>설치한 확장프로그램 아이콘 클릭</li>
                <li>'CSV 다운로드' 버튼 클릭하여 파일 저장</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSV 업로드 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            3단계: CSV 파일 업로드
          </CardTitle>
          <CardDescription>추출한 CSV 파일을 업로드하여 주문내역을 불러오세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CSV 파일 업로드</h3>
              <p className="text-gray-600 mb-4">쿠팡 확장프로그램으로 추출한 CSV 파일을 선택해주세요</p>
              <Button onClick={handleUploadClick} disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "업로드 중..." : "CSV 파일 선택"}
              </Button>
            </div>

            {uploadStatus === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  CSV 파일이 성공적으로 업로드되었습니다! {uploadedOrders.length}개의 주문을 불러왔습니다.
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus === "error" && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  파일 업로드에 실패했습니다. CSV 파일 형식을 확인해주세요.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 업로드된 주문 목록 */}
      {uploadedOrders.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>업로드된 주문 목록</CardTitle>
                <CardDescription>총 {uploadedOrders.length}개의 주문이 업로드되었습니다</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                업로드 완료
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{order.productName}</h4>
                    <p className="text-sm text-gray-600">
                      주문일: {order.orderDate} | 수량: {order.quantity}개 | {order.price.toLocaleString()}원
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {order.status}
                  </Badge>
                </div>
              ))}

              {uploadedOrders.length > 5 && (
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">외 {uploadedOrders.length - 5}개 주문...</p>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{uploadedOrders.length}</div>
                <div className="text-sm text-gray-600">총 주문 건수</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {uploadedOrders.reduce((sum, order) => sum + order.price, 0).toLocaleString()}원
                </div>
                <div className="text-sm text-gray-600">총 주문 금액</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-600">리콜 대상 상품</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
