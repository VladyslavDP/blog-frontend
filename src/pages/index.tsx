import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Calendar, Clock, Tag } from 'lucide-react';
import { formatDate, formatTimeToRead, onEnterOrSpaceKeyDown } from '@/utils';
import { generatePosts } from '@/mocks';
import PaginationWrapper from '@/components/PaginationWrapper';
import { Image, MapPin, Github, Phone, Linkedin, Mail } from 'lucide-react';
import React, { useEffect } from 'react';
import { httpClient } from '@/services/http-client';
import { useQuery } from '@tanstack/react-query';

export async function getServerSideProps(context) {
  const fullUrl = `https://${context.req.headers.host}${context.req.url}`;
  console.log('Full URL:', fullUrl);

  const postsData = generatePosts(16, 1, 3); // Генерация на сервере
  const realData = await httpClient.post.postControllerGetPosts({ page: 1, size: 10 });

  realData.content = realData?.content?.map((item) => ({
    ...item,
    createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
    updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
  }));

  return { props: { posts: postsData, realData: realData } };
}

export default function Home({ posts, realData }) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const handleChange = (value: number) => {
    setPage(value);
  };

  const { data, refetch } = useQuery({
    queryKey: ['posts', page, pageSize],
    queryFn: () => httpClient.post.postControllerGetPosts({ page, size: pageSize }),
  });

  return (
    <div
      className="flex
                 flex-col sm:flex-row"
    >
      <aside
        className="
          p-4
          sm:p-0
          sm:min-h-screen w-full
          sm:min-w-80 sm:max-w-80 sm:w-full
          bg-lightSecondary dark:bg-darkSecondary
      "
      >
        <div
          className="sm:fixed
                      w-full
                      max-w-[320px]
                      h-full
                      flex
                      flex-col
                      px-6
                      pt-[5%]
                      sm:items-center
        "
        >
          <div>
            <div
              className="
                border-solid
                border-4
                rounded-full
                max-w-[200px]
                max-h-[200px]
                w-full
                h-full
                border-lightPrimary
                dark:border-darkPrimary"
            >
              <Image height={200} width={200} />
            </div>
          </div>

          <h2 className="text-lightText dark:text-darkText text-2xl font-semibold my-6">Vladyslav Sharapat</h2>
          <ul className="mt-4 space-y-4 self-start">
            <li className="text-lightText dark:text-darkText hover-primary flex gap-2">
              <MapPin />
              <span>Wrocław, Poland</span>
            </li>
            <li className="text-lightText dark:text-darkText hover-primary cursor-pointer">
              <a className="flex gap-2" href="https://github.com/VladyslavDP" target="_blank">
                <Github />
                VladyslavDP
              </a>
            </li>
            <li className="text-lightText dark:text-darkText hover-primary cursor-pointer flex gap-2">
              <a className="flex gap-2" href="https://www.linkedin.com/in/vladyslav-sharapat/" target="_blank">
                <Linkedin />
                vladyslav-sharapat
              </a>
            </li>
            <li className="text-lightText dark:text-darkText hover-primary cursor-pointer flex gap-2">
              <Mail />
              <span>v.sharapat@gmail.com</span>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText p-8">
        <div className="fixed right-10 top-10">
          <ThemeSwitcher />
        </div>
        <div>
          <h1 className="mb-10 text-2xl font-bold ">Articles</h1>

          <div className="flex flex-col justify-between  max-w-[500px] min-h-[85vh] pb-3">
            <div className="flex flex-col h-[100%]  ">
              {posts.content.map((post) => (
                <div
                  key={post.id}
                  className="blog--wrapper
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
            </div>
            <PaginationWrapper className="pt-4" totalPages={1010} page={page} onPageChange={handleChange} />
          </div>
        </div>
      </main>
    </div>
  );
}
