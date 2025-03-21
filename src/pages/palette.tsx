import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import PaletteDemo from '@/components/PaletteDemo';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/post/data');
  const data = await res.json();

  return { props: { posts: data } };
}

export default function Home({ data }) {
  return (
    <div
      className="flex
                 flex-col sm:flex-row"
    >
      <aside
        className="
          min-h-screen w-full
          sm:min-w-80 sm:max-w-96 sm:w-full
          bg-lightSecondary dark:bg-darkSecondary
      "
      >
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
            <button className="bg-lightPrimary dark:bg-darkPrimary text-white px-4 py-2 rounded hover:opacity-90 transition duration-300 ease-in-out">
              Кнопка 1
            </button>

            <br />
            <br />
            <br />
            <button className="border-2 border-lightPrimary dark:border-darkPrimary text-lightPrimary dark:text-darkPrimary px-4 py-2 rounded hover:bg-lightPrimary hover:text-white dark:hover:bg-darkPrimary dark:hover:text-darkBg transition duration-300 ease-in-out">
              Кнопка 2
            </button>
            <br />
            <br />
            <br />

            <button className="bg-gradient-to-r from-lightPrimary to-lightBg dark:from-darkPrimary dark:to-darkSecondary text-lightText dark:text-darkText px-4 py-2 rounded shadow-lg hover:opacity-90 transition duration-300 ease-in-out">
              Кнопка 3
            </button>
          </div>
          <div className="col-span-2 min-h-96">02</div>
          <div className="col-span-2 min-h-96">03</div>
          <div className="col-span-2 min-h-96">04</div>
          <div className="col-span-2 min-h-96">05</div>
          <div className="col-span-2 min-h-96">06</div>
        </section>
      </main>
      <div hidden>
        {/*<ThemeSwitcher />*/}
        <PaletteDemo />
        <div className="hidden">
          <h1>data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <div className="col-span-2 min-h-96">02</div>
        <div className="col-span-2 min-h-96">03</div>
        <div className="col-span-2 min-h-96">04</div>
        <div className="col-span-2 min-h-96">05</div>
        <div className="col-span-2 min-h-96">06</div>
      </div>
    </div>
  );
}
