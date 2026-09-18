'use client';

import { useRouter } from 'next/navigation';
import EmptyState from '@/components/EmptyState';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg flex items-center">
      <div className="container-md py-12">
        <EmptyState
          icon="compass"
          title="Такой страницы в маршруте нет"
          description="Ссылка устарела или адрес набран с опечаткой. Вернитесь на главный экран или сразу к анкете — сохранённые ответы никуда не делись."
          actionLabel="На главный экран"
          onAction={() => router.push('/')}
          secondaryLabel="Перейти к анкете"
          onSecondary={() => router.push('/profile')}
        />
      </div>
    </main>
  );
}
