import Link from 'next/link';
import StepHeader from '../components/StepHeader';

export default function HomePage() {
  return (
    <main>
      <StepHeader />
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Маршрут поступления</h1>
        <p className="text-ink-soft text-lg mb-8">
          Ответьте на несколько вопросов о себе — и получите персональный план поступления в вузы
          Казахстана: рекомендованные направления, объяснение выбора и пошаговый roadmap до
          зачисления.
        </p>
        <Link
          href="/profile"
          className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Начать за 2 минуты
        </Link>
      </section>
    </main>
  );
}
