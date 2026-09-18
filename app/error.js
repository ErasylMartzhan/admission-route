'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Icon from '@/components/Icon';

export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg flex items-center">
      <div className="container-md py-12">
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-warning-50 text-warning-900 flex-shrink-0">
              <Icon name="alert" className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-display-sm font-bold text-ink">Экран не открылся</h1>
              <p className="text-body-md text-ink-soft mt-2">
                Что-то пошло не так на этом шаге. Ваши ответы и отмеченный прогресс сохранены в
                браузере — маршрут можно продолжить с того же места.
              </p>
              {error?.digest && (
                <p className="text-body-xs text-ink-muted mt-3">Код ошибки: {error.digest}</p>
              )}

              <div className="flex flex-col-reverse md:flex-row gap-3 mt-6">
                <Button
                  variant="ghost"
                  size="lg"
                  icon="arrowLeft"
                  iconPosition="left"
                  onClick={() => router.push('/')}
                >
                  На главный экран
                </Button>
                <Button variant="primary" size="lg" icon="refresh" iconPosition="left" onClick={reset}>
                  Попробовать снова
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
