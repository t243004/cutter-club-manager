'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface PracticeReport {
  date: string;
  weather: string;
  menu: string[];
  achievements: string[];
  challenges: string[];
  feedback: string;
}

const Mode2 = () => {
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<PracticeReport | null>(null);

  const generateReport = (input: string): PracticeReport => {
    // シンプルなテキスト解析（実際にはAIで処理）
    const today = new Date().toISOString().split('T')[0];

    return {
      date: today,
      weather: '晴れ、波高0.5m',
      menu: ['2000m × 3本（フルペース）', 'テクニック練習（キャッチ～フィニッシュ）', 'ピッチトレーニング'],
      achievements: [
        '全体的にピッチが安定してきた',
        'フェザリングの精度が向上',
        '新入生のフォーム改善が顕著',
      ],
      challenges: [
        '右舷のキャッチが深めになる傾向',
        '後半の集中力低下',
        'スターボード側のバランス調整が必要',
      ],
      feedback: '本日は天候に恵まれ、高強度なトレーニングができました。特にピッチトレーニングでの部員の反応が良好です。一方、右舷のキャッチの深さは個別指導で改善してください。明日は波が高くなる予報なので、陸トレメニューの準備も検討ください。',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memo.trim()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newReport = generateReport(memo);
      setReport(newReport);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 練習後の日誌作成</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              本日の練習メモ
            </label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="例：晴れでコンディション良好。2000m×3本やった。ピッチが安定してきた。右舷のキャッチが深めになる傾向あり。新入生の成長が目立つ。"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !memo.trim()}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? '日誌作成中...' : '日誌を作成'}
          </button>
        </form>

        {report && (
          <div className="space-y-6 mt-8 border-t pt-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📅 本日の練習レポート</h3>
              <p className="text-gray-600">日時：{report.date}</p>
              <p className="text-gray-600">天候・コンディション：{report.weather}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" /> 実施メニュー
                </h4>
                <ul className="space-y-2">
                  {report.menu.map((item, idx) => (
                    <li key={idx} className="text-gray-700 flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" /> 本日の成果
                </h4>
                <ul className="space-y-2">
                  {report.achievements.map((item, idx) => (
                    <li key={idx} className="text-gray-700 flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" /> 明確な課題
              </h4>
              <ul className="space-y-2">
                {report.challenges.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex gap-2">
                    <span className="text-orange-600">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="font-semibold text-gray-800 mb-2">⚓ アナリストからのフィードバック</h4>
              <p className="text-gray-700 leading-relaxed">{report.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mode2;
