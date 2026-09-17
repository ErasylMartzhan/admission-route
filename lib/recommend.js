// Простая rule-based логика подбора: каждый вуз получает score и список
// человекочитаемых причин ("почему подходит"). Веса подобраны вручную —
// это осознанно просто для 72-часового спринта (техническая реализация
// даёт всего 10% итоговой оценки, основной вес — на пути и персонализации).

export function recommend(profile, universities, limit = 3) {
  if (!profile) return [];

  const scored = universities.map((uni) => {
    let score = 0;
    const reasons = [];

    const matchedInterests = (profile.interests || []).filter((i) => uni.directions.includes(i));
    if (matchedInterests.length) {
      score += 3;
      reasons.push(`Есть направления по вашим интересам: ${matchedInterests.join(', ')}`);
    }

    if (profile.budget === 'grant' && uni.grantAvailable) {
      score += 2;
      reasons.push('Есть возможность поступить на грант');
    } else if (profile.budget === 'flexible' && (uni.grantAvailable || uni.tuitionFromKzt <= 1500000)) {
      score += 1;
      reasons.push('Подходит по бюджету (грант или доступное платное обучение)');
    } else if (profile.budget === 'paid') {
      score += 1;
    }

    if (profile.entScore && uni.entThreshold) {
      const diff = profile.entScore - uni.entThreshold;
      if (diff >= -5) {
        score += 2;
        const label = uni.isDemoData ? 'демо-данные' : 'данные 2025 года';
        reasons.push(
          `Ваш ожидаемый балл ЕНТ (~${profile.entScore}) близок к проходному (~${uni.entThreshold}, ${label})`
        );
      }
    }

    if (profile.cities && (profile.cities.includes(uni.city) || profile.cities.includes('Любой город'))) {
      score += 1;
      reasons.push(`Город: ${uni.city}`);
    }

    return { ...uni, score, reasons };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
