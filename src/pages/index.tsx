import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Tag, Calendar, Clock } from 'lucide-react';
import { onEnterOrSpaceKeyDown } from '@/lib/utils';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/post/data');
  const data = await res.json();

  return { props: { posts: data } };
}

const postsPerPage = 5;
const totalPosts = 15;

export default function Home({ data }) {
  return (
    <div
      className="flex
                 flex-col sm:flex-row"
    >
      <aside
        className="
          min-h-screen w-full
          sm:min-w-80 sm:max-w-80 sm:w-full
          bg-lightSecondary dark:bg-darkSecondary
      "
      >
        <div className="sm:fixed">
          <h2 className="text-lightText dark:text-darkText text-2xl font-semibold">Меню</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-lightText dark:text-darkText hover-primary cursor-pointer">Ссылка 1</li>
            <li className="text-lightText dark:text-darkText hover-primary cursor-pointer">Ссылка 2</li>
            <li className="text-lightText dark:text-darkText hover-primary cursor-pointer">Ссылка 3</li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText p-8">
        <div className="fixed right-10 top-10">
          <ThemeSwitcher />
        </div>
        <div>
          <h1 className="mb-10 text-2xl font-bold ">Vladyslav Sharapat's blog</h1>

          <div
            className="blog--wrapper max-w-[500px]
                pb-5
                mb-5
                border-dashed
                border-b-lightPrimary
                dark:border-b-darkPrimary
                border-b-2
          "
          >
            <a
              href="#"
              className="block mb-3 text-xl cursor-pointer w-fit font-bold
                        hover-primary
                        focus-ring"
              tabIndex={0}
              onKeyDown={onEnterOrSpaceKeyDown((e) => {
                console.log('clicked', e);
              })}
            >
              A Basic Introduction to HTML
            </a>
            <div className="mb-4">
              HTML is the foundation of all websites. This guide will walk you through creating your first simple
              website using HTML.
            </div>
            <div className="mb-4">
              <a tabIndex={0} className="cursor-pointer hover-primary focus-ring">
                <Tag className="inline h-4" />
                <span>HTML</span>
              </a>
              <a tabIndex={0} className="cursor-pointer hover-primary focus-ring">
                <Tag className="inline h-4" />
                <span>CSS</span>
              </a>
              <a tabIndex={0} className="cursor-pointer hover-primary focus-ring">
                <Tag className="inline h-4" />
                <span>WEB</span>
              </a>
            </div>
            <div className="flex justify-between">
              <div className="blog--publication-date">
                <Calendar className="inline h-6 mr-2" />
                <span className="align-middle">Dec 18, 2024</span>
              </div>
              <div className="blog--publication-time-to-read">
                <Clock className="inline h-4 mr-1" />
                <span className="align-middle">4 min</span>
              </div>
            </div>
          </div>

          {/*<div className="col-span-2 min-h-96">02</div>*/}
          {/*<div className="col-span-2 min-h-96">03</div>*/}
          {/*<div className="col-span-2 min-h-96">04</div>*/}
          {/*<div className="col-span-2 min-h-96">05</div>*/}
          {/*<div className="col-span-2 min-h-96">06</div>*/}
        </div>
      </main>
    </div>
  );
}
