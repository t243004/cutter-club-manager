'use client';

import { useState } from 'react';
import { Cloud, Wind, Waves } from 'lucide-react';

interface WeatherData {
  windSpeed: number;
  waveHeight: number;
  weather: string;
  temperature: number;
}

interface SafetyJudgment {
  status: '🟢' | '🟡' | '🔴';
  label: string;
  menu: string[];
  advice: string;
}

const Mode1 = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SafetyJudgment | null>(null);

  const getWeatherData = async (): Promise<WeatherData> => {
    // デモデータ（実際はOpenWeather APIなど）
    return {
      windSpeed: Math.random() * 12,
      waveHeight: Math.random() * 1.5,
      weather: ['晴れ', '曇り', '雨'][Math.floor(Math.random() * 3)],
      temperature: 15 + Math.random() * 10,
    };
  };

  const judgeSafety = (weather: WeatherData): SafetyJudgment => {
    const { windSpeed, waveHeight } = weather;

    if (windSpeed <= 8 && waveHeight < 0.5) {
      return {
        status: '🟢',
        label: '安全',
        menu: ['2000m × 3本（フルペース）', 'テクニック練習：キャッチ～フィニッシュの精度向上', 'ピッチトレーニング'],
        advice: '理想的なコンディションです。高強度メニューで全力トレーニング可能。右舷・左舷のバランス練習を重視してください。',
      };
    }

    if ((windSpeed > 8 && windSpeed < 10) || (waveHeight >= 0.5 && waveHeight < 1.0)) {
      return {
        status: '🟡',
        label: '注意',
        menu: ['1500m × 2本（中程度ペース）', 'フェザリング練習（波への対応）', '陸トレ30分'],
        advice: '波や風の影響が出始めています。フェザーの技術を磨くチャンス。部員の体調確認を徹底してください。',
      };
    }

    return {
      status: '🔴',
      label: '乗艇中止',
      menu: ['陸トレメニュー：筋トレ・柔軟性向上', 'ビデオ分析と座学', 'エルゴメーター練習'],
      advice: '海上でのトレーニングは危険です。陸上で基礎体力強化と理論学習に注力してください。',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !location) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const weather = await getWeatherData();
      const judgment = judgeSafety(weather);
      setResult(judgment);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🌊 練習前の安全判断</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📅 日付</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📍 場所</label>
              <input
                type="text"
                placeholder="例：横須賀港"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !date || !location}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? '判定中...' : '安全判断を実行'}
          </button>
        </form>

        {result && (
          <div className="space-y-6 mt-8 border-t pt-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{result.status}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">出航判断：{result.label}</h3>
                  <p className="text-gray-600">推奨メニューを表示しています</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Wind className="w-5 h-5" /> 気象条件
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>風速: 7.2 m/s</p>
                  <p>波高: 0.3 m</p>
                  <p>天候: 晴れ</p>
                  <p>気温: 18°C</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Waves className="w-5 h-5" /> 推奨メニュー
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {result.menu.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Cloud className="w-5 h-5" /> アナリストからのアドバイス
              </h4>
              <p className="text-gray-700">{result.advice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mode1;
