import type { NotePost } from '@/types/NotePost';

// Fallback data for development/offline mode
export const fallbackNotesData: NotePost[] = [
  {
    id: "102",
    slug: "building-markdown-pipeline-nextjs",
    title: "Building a Secure Markdown Pipeline in Next.js",
    description:
      "A practical setup for rendering markdown with syntax highlighting, safe links, and responsive content blocks.",
    content: `# Building a Secure Markdown Pipeline in Next.js

When content comes from markdown files, rendering quality and safety need to be solved together.

## What this setup solves

- Safe markdown rendering without raw HTML execution
- Code blocks and inline code rendering
- Mobile-friendly tables and images
- Predictable metadata for notes content

## Example code block

\`\`\`ts
type NotePost = {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
};
\`\`\`

## Example table

| Feature | Why it matters |
| --- | --- |
| Sanitization | Reduces XSS risk |
| Scoped styles | Avoids global CSS conflicts |
| Responsive wrappers | Better mobile reading |

![Workspace preview](/codecollab.jpg)
`,
    publishedAt: "2026-01-15T00:00:00Z",
    views: 58,
    tags: ["Next.js", "Markdown", "Security"],
    isPublished: true,
    isDraft: false,
    readTime: 6,
  },
  {
    id: "101",
    slug: "mobile-friendly-markdown-layouts",
    title: "Designing Mobile-Friendly Markdown Layouts",
    description:
      "How to prevent overflow and preserve readability for code snippets, tables, and media on small screens.",
    content: `# Designing Mobile-Friendly Markdown Layouts

Markdown content often breaks first on narrow devices.

## Common issues

1. Long lines in code blocks force page overflow
2. Wide tables collapse or clip text
3. Images exceed container width

## Fix strategy

- Wrap tables in a horizontal scroll container
- Keep code blocks scrollable on the x-axis
- Force images to max-width 100%

\`\`\`css
.notes-md pre {
  overflow-x: auto;
}

.notes-md-table-wrap {
  overflow-x: auto;
}
\`\`\`

![Sorting visualizer](/sorting.png)
`,
    publishedAt: "2026-01-05T00:00:00Z",
    views: 41,
    tags: ["CSS", "Responsive Design", "Notes"],
    isPublished: true,
    isDraft: false,
    readTime: 5,
  },
  {
    id: "1",
    slug: "getting-started-with-react",
    title: "Getting Started with React - A Comprehensive Guide",
    description: "Learn the fundamentals of React development with practical examples and best practices.",
    content: `# Getting Started with React...`,
    publishedAt: "2025-01-15T00:00:00Z",
    views: 324,
    tags: ["React", "JavaScript", "Frontend"],
    isPublished: true,
    isDraft: false,
    readTime: 8,
  },
  {
    id: "2",
    slug: "advanced-nextjs-patterns",
    title: "Advanced Next.js Patterns and Best Practices",
    description: "Explore advanced Next.js techniques including SSR, SSG, and API routes for production applications.",
    content: `# Advanced Next.js Patterns...`, 
    publishedAt: "2025-01-10T00:00:00Z",
    views: 189,
    tags: ["Next.js", "SSR", "Performance"],
    isPublished: true,
    isDraft: false,
    readTime: 12,
  },
  {
    id: "3",
    slug: "mastering-typescript",
    title: "Mastering TypeScript for React Development",
    description: "Deep dive into TypeScript features that make React development more productive and type-safe.",
    content: `# Mastering TypeScript for React

TypeScript has become essential for modern React development, providing type safety and better developer experience.

## Why TypeScript with React?

- **Type Safety**: Catch errors at compile time
- **Better IntelliSense**: Enhanced code completion and documentation
- **Refactoring Confidence**: Safe code modifications across large codebases

\`\`\`typescript
interface UserProps {
  name: string;
  age: number;
  isActive?: boolean;
}

const UserCard: React.FC<UserProps> = ({ name, age, isActive = true }) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <span>Status: {isActive ? 'Active' : 'Inactive'}</span>
    </div>
  );
};
\`\`\`

TypeScript transforms how we build React applications.`,
    publishedAt: "2025-01-08T00:00:00Z",
    views: 267,
    tags: ["TypeScript", "React", "Type Safety"],
    isPublished: true,
    isDraft: false,
    readTime: 15,
  },
  {
    id: "4",
    slug: "tailwind-design-systems",
    title: "Building Design Systems with Tailwind CSS",
    description: "Create consistent, maintainable design systems using Tailwind CSS utility classes and custom components.",
    content: `# Building Design Systems with Tailwind CSS

Learn how to create scalable design systems using Tailwind's utility-first approach.

## Design System Principles

1. **Consistency**: Unified visual language
2. **Reusability**: Components that work everywhere
3. **Scalability**: Grows with your application

\`\`\`css
/* Custom design tokens */
:root {
  --color-primary: theme('colors.blue.600');
  --spacing-unit: theme('spacing.4');
}
\`\`\`

Design systems are the foundation of great user experiences.`,
    publishedAt: "2025-01-05T00:00:00Z",
    views: 198,
    tags: ["Tailwind CSS", "Design Systems", "CSS"],
    isPublished: true,
    isDraft: false,
    readTime: 10,
  },
  {
    id: "5",
    slug: "firebase-authentication-guide",
    title: "Complete Firebase Authentication Guide",
    description: "Implement secure authentication in your React apps using Firebase Auth with social providers and custom claims.",
    content: `# Complete Firebase Authentication Guide

Firebase Authentication provides backend services for authenticating users in your application.

## Setting Up Firebase Auth

\`\`\`javascript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
\`\`\`

Secure authentication is crucial for modern web applications.`,
    publishedAt: "2024-12-28T00:00:00Z",
    views: 421,
    tags: ["Firebase", "Authentication", "Security"],
    isPublished: true,
    isDraft: false,
    readTime: 18,
  },
  {
    id: "6",
    slug: "react-performance-optimization",
    title: "React Performance Optimization Techniques",
    description: "Learn advanced techniques to optimize React applications for better performance and user experience.",
    content: `# React Performance Optimization

Discover techniques to make your React applications blazingly fast.

## Key Optimization Strategies

- **React.memo**: Prevent unnecessary re-renders
- **useMemo**: Cache expensive calculations
- **useCallback**: Memoize callback functions
- **Code Splitting**: Load code when needed

\`\`\`jsx
const OptimizedComponent = React.memo(({ data }) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);
  
  return <div>{expensiveValue}</div>;
});
\`\`\`

Performance optimization is an ongoing process.`,
    publishedAt: "2024-12-22T00:00:00Z",
    views: 356,
    tags: ["React", "Performance", "Optimization"],
    isPublished: true,
    isDraft: false,
    readTime: 14,
  },
  {
    id: "7",
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques for 2025",
    description: "Explore the latest CSS features including container queries, cascade layers, and modern layout techniques.",
    content: `# Modern CSS Techniques for 2025

CSS continues to evolve with powerful new features that make styling more intuitive and maintainable.

## Container Queries

\`\`\`css
@container (min-width: 300px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

Container queries revolutionize responsive design.`,
    publishedAt: "2024-12-18T00:00:00Z",
    views: 289,
    tags: ["CSS", "Modern Web", "Layout"],
    isPublished: true,
    isDraft: false,
    readTime: 11,
  },
  {
    id: "8",
    slug: "nodejs-microservices-architecture",
    title: "Node.js Microservices Architecture Patterns",
    description: "Build scalable microservices with Node.js using modern patterns and best practices for distributed systems.",
    content: `# Node.js Microservices Architecture

Learn how to design and implement microservices using Node.js and modern architectural patterns.

## Microservices Benefits

- **Scalability**: Scale services independently
- **Technology Diversity**: Use the right tool for each job
- **Fault Isolation**: Failures don't cascade
- **Team Autonomy**: Independent development and deployment

\`\`\`javascript
// API Gateway pattern
const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

app.use('/users', httpProxy({
  target: 'http://user-service:3001',
  changeOrigin: true
}));

app.use('/orders', httpProxy({
  target: 'http://order-service:3002',
  changeOrigin: true
}));
\`\`\`

Microservices enable scalable, maintainable applications.`,
    publishedAt: "2024-12-15T00:00:00Z",
    views: 445,
    tags: ["Node.js", "Microservices", "Architecture"],
    isPublished: true,
    isDraft: false,
    readTime: 20,
  },
  {
    id: "9",
    slug: "web-accessibility-guide",
    title: "Complete Web Accessibility Guide",
    description: "Make your web applications accessible to everyone by following WCAG guidelines and implementing best practices.",
    content: `# Complete Web Accessibility Guide

Web accessibility ensures that your applications are usable by people with diverse abilities and disabilities.

## WCAG Principles

1. **Perceivable**: Information must be presentable to users
2. **Operable**: Interface components must be operable
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough for various assistive technologies

\`\`\`jsx
// Accessible form example
<form>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-error"
  />
  <div id="email-error" role="alert">
    Please enter a valid email address
  </div>
</form>
\`\`\`

Accessibility is not optional—it's essential.`,
    publishedAt: "2024-12-10T00:00:00Z",
    views: 312,
    tags: ["Accessibility", "WCAG", "Inclusive Design"],
    isPublished: true,
    isDraft: false,
    readTime: 16,
  },
  {
    id: "10",
    slug: "graphql-with-react",
    title: "GraphQL Integration with React Applications",
    description: "Learn how to integrate GraphQL with React using Apollo Client for efficient data fetching and state management.",
    content: `# GraphQL Integration with React

GraphQL provides a more efficient, powerful and flexible alternative to REST APIs.

## Why GraphQL?

- **Single Endpoint**: One URL for all data operations
- **Precise Data Fetching**: Request exactly what you need
- **Strong Type System**: Self-documenting and predictable
- **Real-time Subscriptions**: Live data updates

\`\`\`jsx
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
      posts {
        title
        publishedAt
      }
    }
  }
\`;

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

GraphQL transforms how we think about data fetching.`,
    publishedAt: "2024-12-05T00:00:00Z",
    views: 387,
    tags: ["GraphQL", "React", "Apollo Client"],
    isPublished: true,
    isDraft: false,
    readTime: 17,
  },
  {
    id: "11",
    slug: "docker-for-developers",
    title: "Docker Essentials for Frontend Developers",
    description: "Learn Docker basics and how to containerize your frontend applications for consistent development and deployment.",
    content: `# Docker Essentials for Frontend Developers

Docker simplifies development workflows by providing consistent environments across different machines.

## Docker Benefits for Frontend

- **Environment Consistency**: Same environment everywhere
- **Easy Setup**: New team members can start quickly
- **Isolation**: No conflicts between projects
- **Production Parity**: Development matches production

\`\`\`dockerfile
# Dockerfile for React app
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Docker eliminates "it works on my machine" problems.`,
    publishedAt: "2024-11-28T00:00:00Z",
    views: 256,
    tags: ["Docker", "DevOps", "Frontend"],
    isPublished: true,
    isDraft: false,
    readTime: 13,
  },
  {
    id: "12",
    slug: "testing-react-applications",
    title: "Comprehensive Testing Guide for React Applications",
    description: "Master testing in React with Jest, React Testing Library, and end-to-end testing strategies.",
    content: `# Comprehensive Testing Guide for React

Testing ensures your React applications work correctly and remain maintainable as they grow.

## Testing Pyramid

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user workflows

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter when button is clicked', () => {
  render(<Counter />);
  
  const button = screen.getByRole('button', { name: /increment/i });
  const counter = screen.getByTestId('counter-value');
  
  expect(counter).toHaveTextContent('0');
  
  fireEvent.click(button);
  
  expect(counter).toHaveTextContent('1');
});
\`\`\`

Good tests give you confidence to refactor and add features.`,
    publishedAt: "2024-11-22T00:00:00Z",
    views: 334,
    tags: ["Testing", "React", "Jest"],
    isPublished: true,
    isDraft: false,
    readTime: 19,
  },
  {
    id: "13",
    slug: "state-management-patterns",
    title: "Modern State Management Patterns in React",
    description: "Compare different state management solutions including Context API, Zustand, and Redux Toolkit.",
    content: `# Modern State Management Patterns

Choosing the right state management solution depends on your application's complexity and requirements.

## State Management Options

- **useState + useReducer**: Built-in React hooks
- **Context API**: Share state across components
- **Zustand**: Lightweight state management
- **Redux Toolkit**: Powerful state management for complex apps

\`\`\`jsx
// Zustand store example
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increment, decrement } = useStore();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
\`\`\`

Choose the right tool for your state management needs.`,
    publishedAt: "2024-11-18T00:00:00Z",
    views: 298,
    tags: ["State Management", "React", "Zustand"],
    isPublished: true,
    isDraft: false,
    readTime: 15,
  },
];
