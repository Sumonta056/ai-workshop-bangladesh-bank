'use client';

import { useEffect, useState } from 'react';

interface HealthCheck {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 Cursor Workshop
          </h1>
          <h2 className="text-2xl text-gray-600">Task Manager Application</h2>
          <p className="text-sm text-gray-500 mt-2">
            NestJS + Next.js + TypeORM
          </p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            ✅ Setup Status
          </h3>

          {loading && (
            <p className="text-blue-700">Checking backend connection...</p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-700 font-semibold">❌ Backend Error</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <p className="text-red-500 text-xs mt-2">
                Make sure backend is running:{' '}
                <code className="bg-red-100 px-1 rounded">
                  npm run start:dev
                </code>
              </p>
            </div>
          )}

          {health && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Backend Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {health.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Environment:</span>
                <span className="text-gray-900 font-mono text-sm">
                  {health.environment}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Uptime:</span>
                <span className="text-gray-900 font-mono text-sm">
                  {Math.floor(health.uptime)}s
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">API Docs:</span>
                <a
                  href="http://localhost:3000/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  http://localhost:3000/api/docs
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            🎯 Workshop Ready!
          </h3>
          <p className="text-purple-700 mb-4">
            Your development environment is set up correctly. During the
            workshop, we'll build:
          </p>
          <ul className="space-y-2 text-purple-600">
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Authentication system with JWT (NestJS Guards)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Task management with TypeORM entities</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Redis caching with NestJS interceptors</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Next.js 14 App Router with Server Components</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Swagger API documentation</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Components and features will be built during the workshop</p>
          <p className="mt-1">📚 Powered by Cursor AI</p>
        </div>
      </div>
    </main>
  );
}
