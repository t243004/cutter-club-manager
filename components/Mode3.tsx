'use client';

import { useState } from 'react';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';

interface PersonalCard {
  name: string;
  lastMenu: string;
  issues: Array<{
    issue: string;
    status: '🔴' | '🟢';
    note: string;
  }>;
}

const Mode3 = () => {
  const [memberName, setMemberName] = useState('');
  const [memo, setMemo] = useState('');
  const [members, setMembers] = useState<PersonalCard[]>([
    {
      name: '山田太郎',
      lastMenu: '2000m × 3本（フルペース）',
      issues: [
        { issue: 'キャッチが深い', status: '🔴', note: '最新練習で改善傾向' },
        { issue: 'ピッチ安定性', status: '🟢', note: '先週から大幅改善' },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<PersonalCard | null>(null);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMember: PersonalCard = {
        name: memberName,
        lastMenu: memo || '未入力',
        issues: [
          { issue: 'フォーム修正中', status: '🔴', note: '初期記録' },
        ],
      };

      setMembers([...members, newMember]);
      setMemberName('');
      setMemo('');
      setSelectedMember(newMember);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!selectedMember ? (
        <div className="grid md:grid-cols-3 gap-6">
          {/* 新規登録 */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📋 新規部員登録</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">部員名</label>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="例：田中花子"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">初期メモ</label>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="今日のメニュー等"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? '登録中...' : '登録'}
              </button>
            </form>
          </div>

          {/* 部員一覧 */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> 部員カルテ一覧
            </h3>
            {members.length === 0 ? (
              <p className="text-gray-500">部員を登録してください</p>
            ) : (
              <div className="space-y-3">
                {members.map((member, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMember(member)}
                    className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow border-l-4 border-purple-500"
                  >
                    <h4 className="font-semibold text-gray-800">{member.name}</h4>
                    <p className="text-sm text-gray-600">直近メニュー: {member.lastMenu}</p>
                    <div className="flex gap-2 mt-2">
                      {member.issues.map((issue, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded ${
                            issue.status === '🟢'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {issue.status} {issue.issue}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => setSelectedMember(null)}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
          >
            ← 一覧に戻る
          </button>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMember.name}</h2>
              <p className="text-gray-600">
                <strong>直近の参加メニュー：</strong> {selectedMember.lastMenu}
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> 課題・改善ステータス
              </h3>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 font-semibold text-gray-700 border-b">課題</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 border-b text-center">ステータス</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 border-b">最新のコメント</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMember.issues.map((issue, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{issue.issue}</td>
                      <td className="px-4 py-3 text-center text-2xl">{issue.status}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{issue.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> コメント追加
              </h4>
              <input
                type="text"
                placeholder="例：キャッチの深さが改善されてきた"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                コメント保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mode3;
