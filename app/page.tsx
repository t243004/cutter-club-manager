'use client';

import { useState } from 'react';
import { Waves, BookOpen, Users } from 'lucide-react';
import Mode1 from '@/components/Mode1';
import Mode2 from '@/components/Mode2';
import Mode3 from '@/components/Mode3';

export default function Home() {
  const [activeMode, setActiveMode] = useState<'1' | '2' | '3' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Waves className="w-8 h-8" />
            <h1 className="text-3xl font-bold">カッター部 安全管理・コーチングAI</h1>
          </div>
          <p className="text-blue-100">海の天候データからの乗艇可否判断、練習日誌作成、部員カルテ管理</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* モード選択画面 */}
        {!activeMode && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* モード1 */}
            <button
              onClick={() => setActiveMode('1')}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-left group"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">🟢</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">モード1</h2>
              <p className="text-gray-600 text-sm mb-4">練習前の安全判断</p>
              <p className="text-gray-500 text-xs">日付と場所を入力 → 気象データ自動取得 → 出航判断＆メニュー提案</p>
            </button>

            {/* モード2 */}
            <button
              onClick={() => setActiveMode('2')}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-left group"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">モード2</h2>
              <p className="text-gray-600 text-sm mb-4">練習後の日誌作成</p>
              <p className="text-gray-500 text-xs">練習メモ入力 → 自動構造化 → アナリストフィードバック</p>
            </button>

            {/* モード3 */}
            <button
              onClick={() => setActiveMode('3')}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-left group"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">モード3</h2>
              <p className="text-gray-600 text-sm mb-4">部員個人カルテ管理</p>
              <p className="text-gray-500 text-xs">部員名入力 → 履歴・課題管理 → 改善ステータス追跡</p>
            </button>
          </div>
        )}

        {/* モード1 */}
        {activeMode === '1' && (
          <div>
            <button
              onClick={() => setActiveMode(null)}
              className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              ← 戻る
            </button>
            <Mode1 />
          </div>
        )}

        {/* モード2 */}
        {activeMode === '2' && (
          <div>
            <button
              onClick={() => setActiveMode(null)}
              className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              ← 戻る
            </button>
            <Mode2 />
          </div>
        )}

        {/* モード3 */}
        {activeMode === '3' && (
          <div>
            <button
              onClick={() => setActiveMode(null)}
              className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              ← 戻る
            </button>
            <Mode3 />
          </div>
        )}
      </main>
    </div>
  );
}
