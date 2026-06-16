import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'カッター部 安全管理・コーチングAI',
  description: '海の天候データからの乗艇可否判断、練習日誌作成、部員カルテ管理',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
