import { v4 as uuidv4 } from 'uuid'; // Для генерации уникальных id

const tags = ['javascript', 'typescript', 'react', 'nestjs', 'backend', 'frontend', 'nodejs', 'css'];

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

function getRandomTags() {
  const count = Math.floor(Math.random() * 3) + 1; // Количество тегов от 1 до 3
  return Array.from({ length: count }, () => tags[Math.floor(Math.random() * tags.length)]);
}

const getRandomDescription = (minLength = 100, maxLength = 255) => {
  const startIndex = Math.floor(Math.random() * (lorem.length - minLength)); // Случайная позиция в lorem
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; // Случайная длина
  return lorem.slice(startIndex, startIndex + length).trim(); // Генерация случайного отрезка текста
};

const generateRandomPost = () => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 30); // Случайная дата за последние 30 дней
  const createdAt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - randomDays).toISOString();

  return {
    id: uuidv4(),
    title: `Post Title ${Math.floor(Math.random() * 100)}`, // Генерация случайного заголовка
    slug: `post-slug-${Math.floor(Math.random() * 100)}`, // Генерация случайного слага
    tags: getRandomTags(),
    description: getRandomDescription(),
    timeToRead: Math.floor(Math.random() * 10) + 1, // Генерация времени чтения от 1 до 10 минут
    createdAt,
    updatedAt: createdAt,
  };
};

export const generatePosts = (totalPosts, pageNumber, pageSize) => {
  const posts = new Array(totalPosts).fill(1).map(() => generateRandomPost());

  return {
    content: posts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    pageable: {
      pageNumber,
      pageSize,
    },
    totalPages: Math.ceil(totalPosts / pageSize),
    totalElements: totalPosts,
  };
};
