// Простая rule-based логика подбора: каждый вуз получает score и список
// человекочитаемых причин ("почему подходит"). Веса подобраны вручную —
// это осознанно просто для 72-часового спринта (техническая реализация
// даёт всего 10% итоговой оценки, основной вес — на пути и персонализации).

export function recommend(profile, universities, limit = 3) {
  if (!profile) return [];

  // Зарубежные вузы показываем только тем, кто явно отметил интерес к этому в анкете —
  // иначе абитуриент, нацеленный на РК, получит нерелевантные варианты.
  const pool = profile.abroad
    ? universities
    : universities.filter((u) => u.country === 'Казахстан');

  const scored = pool.map((uni) => {
    const isAbroad = uni.country !== 'Казахстан';
    let score = 0;
    const reasons = [];

    const matchedInterests = (profile.interests || []).filter((i) => uni.directions.includes(i));
    if (matchedInterests.length) {
      score += 3;
      reasons.push(`Есть направления по вашим интересам: ${matchedInterests.join(', ')}`);
    }

    const affordable = uni.tuitionFromKzt != null && uni.tuitionFromKzt <= 1500000;
    if (profile.budget === 'grant' && uni.grantAvailable) {
      score += 2;
      reasons.push('Есть возможность поступить на грант / стипендию');
    } else if (profile.budget === 'flexible' && (uni.grantAvailable || affordable)) {
      score += 1;
      reasons.push('Подходит по бюджету (грант, стипендия или доступное платное обучение)');
    } else if (profile.budget === 'paid') {
      score += 1;
    }

    if (!isAbroad && profile.entScore && uni.entThreshold) {
      const diff = profile.entScore - uni.entThreshold;
      if (diff >= -5) {
        score += 2;
        const label = uni.isDemoData ? 'демо-данные' : 'данные 2025 года';
        reasons.push(
          `Ваш ожидаемый балл ЕНТ (~${profile.entScore}) близок к проходному (~${uni.entThreshold}, ${label})`
        );
      }
    }

    if (isAbroad) {
      score += 1;
      reasons.push(`Зарубежное направление: ${uni.city}, ${uni.country} — по вашему запросу рассмотреть учёбу за рубежом`);
    } else if (profile.cities && (profile.cities.includes(uni.city) || profile.cities.includes('Любой город'))) {
      score += 1;
      reasons.push(`Город: ${uni.city}`);
    }

    return { ...uni, score, reasons, isAbroad };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
