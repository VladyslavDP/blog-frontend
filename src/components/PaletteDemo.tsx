import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function PaletteDemo() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Aside */}
      <aside className="min-h-screen w-full sm:min-w-80 sm:max-w-96 sm:w-auto p-6 hidden">
        <div className="sm:fixed">
          <h2 className="text-lightText dark:text-darkText text-2xl font-semibold">Меню</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-lightText dark:text-darkText hover:text-lightPrimary dark:hover:text-darkPrimary cursor-pointer">
              Ссылка 1
            </li>
            <li className="text-lightText dark:text-darkText hover:text-lightPrimary dark:hover:text-darkPrimary cursor-pointer">
              Ссылка 2
            </li>
            <li className="text-lightText dark:text-darkText hover:text-lightPrimary dark:hover:text-darkPrimary cursor-pointer">
              Ссылка 3
            </li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText p-8">
        <ThemeSwitcher />
        <section>
          <h1 className="text-4xl font-bold mb-4">Добро пожаловать</h1>
          <p>Пример использования светлой и темной темы для руководства стилями компонентов.</p>

          {/* Карточка */}
          <div className="p-6 mt-6 rounded-lg bg-lightPrimary dark:bg-darkPrimary text-white shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Заголовок карточки</h2>
            <p>Это пример контента внутри карточки. Она адаптируется к активной теме.</p>
          </div>

          {/* Кнопки */}
          <div className="mt-4">
            <button className="bg-lightPrimary dark:bg-darkPrimary text-white px-4 py-2 rounded hover:opacity-90">
              Кнопка 1
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
