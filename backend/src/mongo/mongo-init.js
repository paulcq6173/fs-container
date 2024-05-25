/* eslint-disable no-undef */
blog_db = db.getSiblingDB('blog_db');
testblogsDB = db.getSiblingDB('testblogsDB');

const woodwardOid = ObjectId('65ef002005477a6735ee448c');
const mooreOid = ObjectId('65ef011105477a6735ee44a1');

db.getSiblingDB('admin').createUser({
  user: 'root',
  pwd: '17eec90207cb267cb945c7d1f53fbd86',
  roles: ['root'],
});

blog_db.createUser({
  user: 'blosswell',
  pwd: '24ee0946a4d58acc74e2f4a85f1511bf',
  roles: [{ role: 'dbOwner', db: 'blog_db' }],
});

testblogsDB.createUser({
  user: 'blosswell',
  pwd: '24ee0946a4d58acc74e2f4a85f1511bf',
  roles: [{ role: 'dbOwner', db: 'testblogsDB' }],
});

blog_db.createCollection('blogs');
blog_db.createCollection('users');
testblogsDB.createCollection('blogs');
testblogsDB.createCollection('users');

const initialBlogs = [
  {
    _id: ObjectId('65ef00aa05477a6735ee4491'),
    title:
      'How I built my Personal Blog with Next.js 13, Vercel and Contentlayer - Part 1',
    author: 'Daniel Woodward',
    url: 'https://danielwoodward.dev/posts/nextjs/how-i-built-my-personal-blog-with-nextjs-13-vercel-and-contentlayer-post-1',
    likes: 4,
    user: woodwardOid,
  },
  {
    _id: ObjectId('65ef00d205477a6735ee4495'),
    title:
      'How I built my Personal Blog - Adding support for MDX and styling with Tailwind - Part 2',
    author: 'Daniel Woodward',
    url: 'https://danielwoodward.dev/posts/nextjs/how-i-built-my-personal-blog-with-nextjs-13-vercel-and-contentlayer-post-2',
    likes: 3,
    user: woodwardOid,
  },
  {
    _id: ObjectId('65ef00e705477a6735ee4499'),
    title:
      'How I built my Personal Blog - Enabling GitHub Flavoured Markdown & Code Syntax Highlighting - Part 3',
    author: 'Daniel Woodward',
    url: 'https://danielwoodward.dev/posts/nextjs/how-i-built-my-personal-blog-with-nextjs-13-vercel-and-contentlayer-post-3',
    likes: 8,
    user: woodwardOid,
  },
  {
    _id: ObjectId('65ef15e6d83ded3af9141df9'),
    title: 'Creating a CMS using Next.js 13 + Contentlayer + MDX',
    author: 'Erik Moore',
    url: 'https://www.renaissance92.com/blog/cms-nextjs-13-appdir-contentlayer-mdx',
    likes: 5,
    user: mooreOid,
  },
];

const initialUser = [
  {
    _id: ObjectId('65ef002005477a6735ee448c'),
    username: 'Daniel Woodward',
    name: 'Daniel',
    passwordHash:
      '$2b$10$x5dAgTAYA8iKtY.2N0nMleWCx7hyhkrTcE6lhGdC7qDkfJ4qc0hV2',
    blogs: [
      ObjectId('65ef00aa05477a6735ee4491'),
      ObjectId('65ef00d205477a6735ee4495'),
      ObjectId('65ef00e705477a6735ee4499'),
    ],
  },
  {
    _id: ObjectId('65ef011105477a6735ee44a1'),
    username: 'Erik Moore',
    name: 'Erik',
    passwordHash:
      '$2b$10$.Q1FYLyf3Lb5gN.DweN7WOiZAEwELUQcKMc1jwuG4/zBYHyfFYRvm',
    blogs: [ObjectId('65ef15e6d83ded3af9141df9')],
  },
  {
    _id: ObjectId('65eecbd2bd6ae82c93809dc5'),
    username: 'Oswell Spencer',
    name: 'Spencer',
    passwordHash:
      '$2b$10$UnuQLdlfLdlzVwP4wz6R7e9sCXOMawZ0fKXKLngf8T6ghcr/JVQv.',
    blogs: [],
  },
  {
    _id: ObjectId('65eeef3f83cbe9ccf9e034f4'),
    username: 'Albert Wesker',
    name: 'Albert',
    passwordHash:
      '$2b$10$GIPvLSQWBY4xxMoFQElrgeJSGVu.RRPOH8oQH1Pe25zN9/7RAmzqC',
    blogs: [],
  },
];

blog_db.blogs.insertMany(initialBlogs);
testblogsDB.blogs.insertMany(initialBlogs);
blog_db.users.insertMany(initialUser);
testblogsDB.users.insertMany(initialUser);
