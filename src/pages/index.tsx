import { ThemeSwitcher } from '@/components/ThemeSwitcher';

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
          bg-lightBg dark:bg-darkBg
      "
      >
        <div className="sm:fixed">01</div>
      </aside>
      <div>
        <ThemeSwitcher />
        <div>
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
