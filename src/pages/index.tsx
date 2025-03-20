import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/post/data');
  const data = await res.json();

  return { props: { posts: data } };
}

export default function Home({ data }) {
  return (
    <div className="text-3xl font-bold underline">
      <main className="flex min-h-screen items-center justify-center">
        <ThemeSwitcher />
      </main>
      <h1>data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
