import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Calendar, Clock, Tag } from 'lucide-react';
import { formatDate, formatTimeToRead, onEnterOrSpaceKeyDown } from '@/utils';
import { generatePosts } from '@/mocks';
import PaginationWrapper from '@/components/PaginationWrapper';
import React from 'react';

// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:4000/post/data');
//   const data = await res.json();
//
//   return { props: { posts: data } };
// }

export async function getServerSideProps() {
  const postsData = generatePosts(16, 1, 3); // Генерация на сервере
  return { props: { posts: postsData } };
}

export default function Home({ posts }) {
  const [page, setPage] = React.useState(5);
  const handleChange = (value: number) => {
    setPage(value);
  };

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

          <div className="max-w-[500px]">
            {posts.content.map((post) => (
              <div
                key={post.id}
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
                  {post.title}
                </a>

                <div className="mb-4">{post.description}</div>
                <div className="mb-4">
                  {post.tags.map((tag, index) => (
                    <a
                      key={`${post.id}-tag-${index}`}
                      tabIndex={0}
                      className="mr-3 cursor-pointer hover-primary focus-ring"
                    >
                      <Tag className="inline h-4" />
                      <span>{tag}</span>
                    </a>
                  ))}
                </div>
                <div className="flex justify-between">
                  {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
                  <div className="blog--publication-date">
                    <Calendar className="inline h-6 mr-2" />
                    {/*<span className="align-middle">Dec 18, 2024</span>*/}
                    <span className="align-middle">{formatDate(post.updatedAt)}</span>
                  </div>
                  <div className="blog--publication-time-to-read">
                    <Clock className="inline h-4 mr-1" />
                    <span className="align-middle">{formatTimeToRead(post.timeToRead)}</span>
                  </div>
                </div>
              </div>
            ))}
            <PaginationWrapper className={'pt-3'} totalPages={1010} page={page} onPageChange={handleChange} />
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
