"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, LogOut, User } from "lucide-react"
import CoupangIntegration from "./components/coupang-integration"
import ManualEntry from "./components/manual-entry"
import RecallCheck from "./components/recall-check"
import AllOrders from "./components/all-orders"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("authToken")
      if (!token) {
        alert("로그인이 필요합니다.")
        router.push("/login")
        return
      }

      try {
        const response = await fetch("http://localhost:8080/api/users/myinfo", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUsername(data.name)
        } else {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.")
          localStorage.removeItem("authToken")
          router.push("/login")
        }
      } catch (error) {
        console.error("사용자 정보 조회 중 오류 발생:", error)
        alert("오류가 발생했습니다. 다시 시도해주세요.")
      }
    }

    fetchUserInfo()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    alert("로그아웃 되었습니다.")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">쿠팡 리콜 체커</h1>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex-1 max-w-2xl mx-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="upload">주문내역 업로드</TabsTrigger>
                  <TabsTrigger value="manual">주문 수동 입력</TabsTrigger>
                  <TabsTrigger value="orders">전체 주문내역</TabsTrigger>
                  <TabsTrigger value="recall">리콜 대상 확인</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                {username ? `${username}님, 환영합니다!` : "로딩 중..."}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="upload">
            <CoupangIntegration />
          </TabsContent>

          <TabsContent value="manual">
            <ManualEntry />
          </TabsContent>

          <TabsContent value="orders">
            <AllOrders />
          </TabsContent>

          <TabsContent value="recall">
            <RecallCheck />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
