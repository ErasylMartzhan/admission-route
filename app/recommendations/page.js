'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import AiBadge from '@/components/AiBadge';
import SourceNote from '@/components/SourceNote';
import EmptyState from '@/components/EmptyState';
import { SkeletonText } from '@/components/Skeleton';
import { useProfile } from '@/lib/ProfileContext';
import { universities } from '@/lib/data/universities';
import { recommend } from '@/lib/recommend';
import { useAiText } from '@/lib/ai/useAiText';

export default function RecommendationsPage() {
  const { profile, loaded, compareIds, toggleCompare } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  const results = profile ? recommend(profile, universities, 3) : [];

  const explainPayload =
    profile && results.length
      ? { profile, items: results.map((r) => ({ id: r.id, name: r.name, reasons: r.reasons })) }
      : null;
  const {
    data: aiById,
    source: aiSource,
    loading: aiLoading,
  } = useAiText('/api/ai/explain', explainPayload, {}, (j) => j.byId);

  if (!profile) {
    return (
      <main className="min-h-screen bg-bg">
        <StepHeader />
        <div className="container-md py-12 space-y-4">
          <Card padding="lg">
            <SkeletonText lines={3} />
          </Card>
          <Card padding="lg">
            <SkeletonText lines={3} />
          </Card>
        </div>
      </main>
    );
  }

  const handleCompare = () => {
    setIsTransitioning(true);
    setTimeout(() => router.push('/compare'), 300);
  };

  const handleRoadmap = () => {
    setIsTransitioning(true);
    setTimeout(() => router.push('/roadmap'), 300);
  };

  const canCompare = compareIds.length >= 2;

  if (results.length === 0) {
    return (
      <main className="min-h-screen bg-bg">
        <StepHeader />
        <div className="container-md py-8 md:py-12">
          <EmptyState
            icon="scan"
            title="Под такие условия ничего не подобралось"
            description="Похоже, фильтры по городу или бюджету получились слишком узкими. Попробуйте добавить направление или выбрать «Любой город» — и подбор пересчитается."
            actionLabel="Изменить ответы"
            onAction={() => router.push('/profile')}
            secondaryLabel="Всё равно посмотреть план"
            onSecondary={() => router.push('/roadmap')}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p className="text-body-md text-ink-soft">
            Подобрали {results.length} варианта под ваш профиль. Отметьте два, чтобы сравнить.
          </p>
          <Badge variant={canCompare ? 'success' : 'neutral'} icon={canCompare ? 'check' : 'columns'}>
            Выбрано {compareIds.length} из 2
          </Badge>
        </div>

        <ol className="space-y-4 mb-8">
          {results.map((uni, index) => {
            const isSelected = compareIds.includes(uni.id);
            const isBlocked = canCompare && !isSelected;

            return (
              <li key={uni.id}>
                <Card padding="lg" selected={isSelected}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4 border-b border-line">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="neutral" size="sm">
                          Вариант {index + 1}
                        </Badge>
                        {uni.isAbroad && (
                          <Badge variant="warning" size="sm" icon="globe">
                            Зарубежный вуз
                          </Badge>
                        )}
                        {uni.grantAvailable && (
                          <Badge variant="success" size="sm" icon="check">
                            Есть гранты
                          </Badge>
                        )}
                      </div>

                      <h2 className="text-heading-lg font-bold text-ink">{uni.name}</h2>

                      <p className="flex items-center gap-1.5 text-body-sm text-ink-soft mt-2">
                        <Icon name="pin" className="w-4 h-4 flex-shrink-0" />
                        {uni.city}
                        {uni.isAbroad ? `, ${uni.country}` : ''}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCompare(uni.id)}
                      disabled={isBlocked}
                      aria-pressed={isSelected}
                      title={isBlocked ? 'Уже выбрано два вуза — снимите отметку с одного' : undefined}
                      className={`inline-flex items-center justify-center gap-2 min-h-tap px-4 py-2.5 rounded-md
                        text-body-sm font-semibold whitespace-nowrap border flex-shrink-0
                        transition-all duration-base focus-ring
                        disabled:opacity-45 disabled:cursor-not-allowed
                        ${
                          isSelected
                            ? 'bg-primary-500 text-ink-inverse border-primary-500 hover:bg-primary-600 active:bg-primary-700'
                            : 'bg-surface text-ink border-line-strong hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100'
                        }`}
                    >
                      <Icon name={isSelected ? 'check' : 'plus'} className="w-4 h-4" strokeWidth={2} />
                      {isSelected ? 'В сравнении' : 'Добавить к сравнению'}
                    </button>
                  </div>

                  <div className="py-4 border-b border-line">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-body-sm font-semibold text-ink">Почему этот вуз</h3>
                      <AiBadge source={aiSource} loading={aiLoading} />
                    </div>

                    {aiLoading ? (
                      <SkeletonText lines={2} className="mb-3" />
                    ) : (
                      aiById[uni.id] && (
                        <p className="text-body-md text-ink-soft leading-relaxed mb-3">
                          {aiById[uni.id]}
                        </p>
                      )
                    )}

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {uni.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 p-2.5 bg-surface-subtle rounded-md">
                          <span className="text-success-600 flex-shrink-0 mt-0.5">
                            <Icon name="check" className="w-4 h-4" strokeWidth={2} />
                          </span>
                          <span className="text-body-sm text-ink-soft">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    {uni.isAbroad ? (
                      <SourceNote>{uni.admissionNote}</SourceNote>
                    ) : uni.isDemoData ? (
                      <SourceNote>
                        Порог ЕНТ {uni.entThreshold} — демонстрационные данные прототипа. Перед
                        подачей сверьтесь с сайтом вуза.
                      </SourceNote>
                    ) : (
                      <SourceNote variant="source" href={uni.source}>
                        Порог ЕНТ {uni.entThreshold}, набор 2025 года — каждый год меняется.
                        {uni.sourceNote ? ` ${uni.sourceNote}` : ''}
                      </SourceNote>
                    )}
                  </div>
                </Card>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <Button
            variant="ghost"
            size="lg"
            icon="arrowLeft"
            iconPosition="left"
            onClick={() => router.push('/diagnosis')}
          >
            Назад к диагностике
          </Button>

          <div className="flex flex-col-reverse md:flex-row gap-3">
            <Button variant="outline" size="lg" onClick={handleRoadmap}>
              Сразу к плану
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon="arrowRight"
              onClick={handleCompare}
              disabled={!canCompare}
              isLoading={isTransitioning && canCompare}
              loadingText="Открываем сравнение…"
            >
              Сравнить выбранные
            </Button>
          </div>
        </div>

        {!canCompare && (
          <p className="text-body-sm text-ink-muted mt-3 md:text-right">
            Чтобы открыть сравнение, отметьте два вуза. Или переходите сразу к плану.
          </p>
        )}
      </div>
    </main>
  );
}
