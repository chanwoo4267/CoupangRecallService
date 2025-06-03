"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, LogOut, User } from "lucide-react"
import CoupangIntegration from "./components/coupang-integration"
import ManualEntry from "./components/manual-entry"
import RecallCheck from "./components/recall-check"
import AllOrders from "./components/all-orders"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upload")

  const handleLogout = () => {
    // 로그아웃 로직
    window.location.href = "/"
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
                <span>홍길동님</span>
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
