'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import EmptyState from '@/components/EmptyState';
import SourceNote from '@/components/SourceNote';
import { SkeletonText } from '@/components/Skeleton';
import { useProfile } from '@/lib/ProfileContext';
import { universities } from '@/lib/data/universities';

export default function ComparePage() {
  const { profile, compareIds, loaded } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

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

  const selected = universities.filter((u) => compareIds.includes(u.id));

  if (selected.length < 2) {
    return (
      <main className="min-h-screen bg-bg">
        <StepHeader />
        <div className="container-md py-8 md:py-12">
          <EmptyState
            icon="columns"
            title={selected.length === 0 ? 'Пока нечего сравнивать' : 'Нужен ещё один вуз'}
            description={
              selected.length === 0
                ? 'Отметьте два вуза на экране рекомендаций — здесь они встанут рядом по баллам, стоимости и городу.'
                : 'Вы отметили один вуз. Добавьте второй — сравнение имеет смысл только для пары.'
            }
            actionLabel="Выбрать вузы"
            onAction={() => router.push('/recommendations')}
            secondaryLabel="Пропустить и перейти к плану"
            onSecondary={() => router.push('/roadmap')}
          />
        </div>
      </main>
    );
  }

  const comparisonRows = [
    {
      label: 'Город',
      icon: 'pin',
      get: (u) => (u.country !== 'Казахстан' ? `${u.city}, ${u.country}` : u.city),
    },
    {
      label: 'Гранты',
      icon: 'graduation',
      get: (u) => (u.grantAvailable ? 'Есть' : 'Нет'),
      highlight: (u) => u.grantAvailable,
    },
    {
      label: 'Стоимость обучения за год',
      icon: 'wallet',
      get: (u) =>
        u.tuitionFromKzt != null
          ? u.tuitionFromKzt === 0
            ? 'Только по гранту'
            : `от ${u.tuitionFromKzt.toLocaleString('ru-RU')} ₸`
          : 'Уточнить у вуза',
    },
    {
      label: 'Порог ЕНТ',
      icon: 'target',
      get: (u) =>
        u.entThreshold != null
          ? `около ${u.entThreshold} ${u.isDemoData ? '(демоданные)' : '(набор 2025)'}`
          : 'Поступление не через ЕНТ',
    },
    {
      label: 'Направления',
      icon: 'list',
      get: (u) => u.directions.join(', '),
    },
  ];

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => router.push('/roadmap'), 300);
  };

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        <p className="text-body-md text-ink-soft mb-6">
          Два варианта рядом по тем параметрам, которые чаще всего решают выбор.
        </p>

        {/* Десктоп: таблица */}
        <div className="hidden md:block mb-8 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Сравнение выбранных вузов по ключевым параметрам</caption>
            <thead>
              <tr>
                <th scope="col" className="p-4 w-56 text-body-sm font-semibold text-ink-muted border-b border-line">
                  Параметр
                </th>
                {selected.map((uni) => (
                  <th
                    key={uni.id}
                    scope="col"
                    className="p-4 text-heading-md font-bold text-ink border-b border-line align-bottom"
                  >
                    {uni.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-4 align-top font-medium text-ink">
                    <span className="flex items-center gap-2">
                      <Icon name={row.icon} className="w-4 h-4 text-ink-muted flex-shrink-0" />
                      {row.label}
                    </span>
                  </th>
                  {selected.map((uni) => {
                    const isHighlighted = row.highlight && row.highlight(uni);
                    return (
                      <td
                        key={uni.id}
                        className={`p-4 align-top text-body-md ${
                          isHighlighted ? 'text-success-700 font-semibold' : 'text-ink-soft'
                        }`}
                      >
                        {row.get(uni)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Мобильный: параметр за параметром */}
        <div className="md:hidden space-y-4 mb-8">
          {comparisonRows.map((row) => (
            <Card key={row.label}>
              <h2 className="flex items-center gap-2 text-heading-md font-semibold text-ink mb-3">
                <Icon name={row.icon} className="w-4 h-4 text-ink-muted flex-shrink-0" />
                {row.label}
              </h2>

              <div className="space-y-2.5">
                {selected.map((uni) => {
                  const isHighlighted = row.highlight && row.highlight(uni);
                  return (
                    <div
                      key={uni.id}
                      className={`p-3 rounded-md border ${
                        isHighlighted
                          ? 'bg-success-50 border-success-200'
                          : 'bg-surface-subtle border-line'
                      }`}
                    >
                      <p className="text-body-xs text-ink-muted mb-1">{uni.name}</p>
                      <p
                        className={`text-body-md font-semibold ${
                          isHighlighted ? 'text-success-700' : 'text-ink'
                        }`}
                      >
                        {row.get(uni)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {selected.map((uni) => (
            <Card key={uni.id} padding="lg">
              <h2 className="text-heading-md font-bold text-ink">{uni.name}</h2>
              <p className="flex items-center gap-1.5 text-body-sm text-ink-soft mt-1 mb-4">
                <Icon name="pin" className="w-4 h-4 flex-shrink-0" />
                {uni.city}
                {uni.country !== 'Казахстан' ? `, ${uni.country}` : ''}
              </p>

              {uni.admissionNote && (
                <p className="text-body-sm text-ink-soft mb-3">{uni.admissionNote}</p>
              )}

              {uni.isDemoData ? (
                <SourceNote>
                  Цифры по этому вузу — демонстрационные данные прототипа.
                </SourceNote>
              ) : (
                <SourceNote variant="source" href={uni.source}>
                  Порог набора 2025 года; условия меняются каждый год —
                </SourceNote>
              )}
            </Card>
          ))}
        </div>

        <Card variant="muted" className="mb-8">
          <div className="flex gap-3">
            <span className="text-primary-600 flex-shrink-0">
              <Icon name="info" className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-heading-md font-semibold text-ink">На что смотреть</h2>
              <ul className="text-body-sm text-ink-soft mt-2 space-y-1.5">
                <li>Насколько порог ЕНТ реалистичен для вашего ожидаемого балла.</li>
                <li>Стоимость года обучения, если грант не получится.</li>
                <li>Есть ли в вузе именно ваше направление, а не смежное.</li>
                <li>Город: переезд — это ещё и жильё, дорога и расходы.</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3">
          <Button
            variant="ghost"
            size="lg"
            icon="arrowLeft"
            iconPosition="left"
            onClick={() => router.push('/recommendations')}
          >
            Изменить выбор
          </Button>
          <Button
            variant="primary"
            size="lg"
            icon="arrowRight"
            onClick={handleContinue}
            isLoading={isTransitioning}
            loadingText="Строим план…"
          >
            Построить план поступления
          </Button>
        </div>
      </div>
    </main>
  );
}
