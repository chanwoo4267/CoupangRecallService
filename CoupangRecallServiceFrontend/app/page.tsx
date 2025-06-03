import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ShoppingCart, AlertTriangle, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">쿠팡 리콜 체커</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">로그인</Button>
              </Link>
              <Link href="/signup">
                <Button>회원가입</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            안전한 구매를 위한
            <span className="text-blue-600"> 리콜 확인 서비스</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            쿠팡에서 구매한 상품이 리콜 대상인지 자동으로 확인하고, 소비자24의 최신 리콜 정보와 비교하여 안전한
            소비생활을 도와드립니다.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                지금 시작하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>쿠팡 주문내역 업로드</CardTitle>
                <CardDescription>
                  크롬 확장프로그램으로 추출한 CSV 파일을 업로드하여 주문내역을 불러옵니다
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>리콜 정보 확인</CardTitle>
                <CardDescription>소비자24의 최신 리콜 정보와 자동 비교 분석</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>안전 알림</CardTitle>
                <CardDescription>리콜 대상 상품 발견 시 즉시 알림 제공</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">이용 방법</h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">회원가입 및 로그인</h4>
              <p className="text-gray-600">간단한 회원가입 후 서비스를 이용하세요</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">확장프로그램 설치 및 CSV 추출</h4>
              <p className="text-gray-600">크롬 확장프로그램을 설치하고 쿠팡 주문내역을 CSV로 추출하세요</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">CSV 파일 업로드</h4>
              <p className="text-gray-600">추출한 CSV 파일을 업로드하여 리콜 대상 상품을 확인하세요</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-8">
          <div className="text-center">
            <p>&copy; 2024 쿠팡 리콜 체커. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
