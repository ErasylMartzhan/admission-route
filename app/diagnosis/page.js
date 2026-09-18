'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import AiBadge from '@/components/AiBadge';
import { SkeletonText } from '@/components/Skeleton';
import { useProfile } from '@/lib/ProfileContext';
import { GRADES, BUDGETS } from '@/lib/constants';
import { useAiText } from '@/lib/ai/useAiText';

function Row({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-line last:border-0">
      <span className="flex items-center justify-center w-9 h-9 rounded-md bg-surface-subtle text-ink-soft flex-shrink-0">
        <Icon name={icon} className="w-5 h-5" />
      </span>
      <div className="min-w-0">
        <p className="text-caption font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function DiagnosisPage() {
  const { profile, loaded } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  const templateText = profile
    ? [
        `Вы — ${GRADES.find((g) => g.value === profile.grade)?.label}, интересуетесь: ${profile.interests.join(', ')}.`,
        `Бюджет: ${BUDGETS.find((b) => b.value === profile.budget)?.label}.`,
        profile.entScore ? `Ожидаемый балл ЕНТ: ${profile.entScore}.` : '',
        `Предпочитаемые города: ${profile.cities.join(', ')}.`,
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  const { data: aiText, source: aiSource, loading: aiLoading } = useAiText(
    '/api/ai/diagnosis',
    profile ? { profile, templateText } : null,
    templateText,
    (j) => j.text
  );

  if (!profile) {
    return (
      <main className="min-h-screen bg-bg">
        <StepHeader />
        <div className="container-md py-12">
          <Card padding="lg">
            <SkeletonText lines={4} />
          </Card>
        </div>
      </main>
    );
  }

  const gradeLabel = GRADES.find((g) => g.value === profile.grade)?.label;
  const budgetLabel = BUDGETS.find((b) => b.value === profile.budget)?.label;

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/recommendations');
    }, 300);
  };

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        {/* Разбор профиля: AI с откатом на шаблон */}
        <Card padding="lg" className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-heading-lg font-semibold text-ink">
              Что мы видим в вашем профиле
            </h2>
            <AiBadge source={aiSource} loading={aiLoading} className="flex-shrink-0 mt-1" />
          </div>

          {aiLoading ? (
            <SkeletonText lines={3} />
          ) : (
            <p className="text-body-md text-ink-soft leading-relaxed">{aiText}</p>
          )}

          {!aiLoading && (
            <p className="text-body-xs text-ink-muted mt-4 pt-4 border-t border-line">
              Это описание вашего профиля, а не прогноз шансов на поступление. Баллы и сроки
              берутся из данных сервиса, а не сочиняются моделью.
            </p>
          )}
        </Card>

        <Card padding="lg" className="mb-6">
          <h2 className="text-heading-lg font-semibold text-ink mb-2">Ваши ответы</h2>
          <p className="text-body-sm text-ink-soft mb-2">
            Именно на этих данных строится подбор — их можно изменить в любой момент.
          </p>

          <Row icon="graduation" label="Класс или статус">
            <p className="text-body-md font-medium text-ink">{gradeLabel}</p>
          </Row>

          <Row icon="star" label="Интересы">
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="primary" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </Row>

          {profile.entScore && (
            <Row icon="target" label="Ожидаемый балл ЕНТ">
              <p className="text-ink">
                <span className="text-display-sm font-bold text-primary-600">{profile.entScore}</span>
                <span className="text-body-sm text-ink-muted ml-2">из 140</span>
              </p>
            </Row>
          )}

          <Row icon="wallet" label="Финансирование">
            <p className="text-body-md font-medium text-ink">{budgetLabel}</p>
          </Row>

          <Row icon="pin" label="Города">
            <div className="flex flex-wrap gap-2">
              {profile.cities.map((city) => (
                <Badge key={city} variant="neutral" size="sm">
                  {city}
                </Badge>
              ))}
            </div>
          </Row>

          {profile.abroad && (
            <Row icon="globe" label="Обучение за рубежом">
              <p className="text-body-sm text-ink-soft">
                Международные варианты покажем отдельно — для них нужны IELTS или SAT, а не ЕНТ.
              </p>
            </Row>
          )}
        </Card>

        <Card variant="muted" className="mb-8">
          <div className="flex gap-3">
            <span className="text-primary-600 flex-shrink-0">
              <Icon name="info" className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-heading-md font-semibold text-ink">Как мы подбираем вузы</h2>
              <p className="text-body-sm text-ink-soft mt-1">
                Сопоставляем интересы с направлениями вуза, ожидаемый балл — с проходным баллом
                прошлого года, и учитываем бюджет с городом. Это подбор по совпадениям, а не
                прогноз шансов: окончательное решение всегда за приёмной комиссией.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3">
          <Button
            variant="ghost"
            size="lg"
            icon="arrowLeft"
            iconPosition="left"
            onClick={() => router.push('/profile')}
          >
            Изменить ответы
          </Button>
          <Button
            variant="primary"
            size="lg"
            icon="arrowRight"
            onClick={handleContinue}
            isLoading={isTransitioning}
            loadingText="Подбираем вузы…"
          >
            Смотреть рекомендации
          </Button>
        </div>
      </div>
    </main>
  );
}
