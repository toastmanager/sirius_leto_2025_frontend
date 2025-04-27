"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[917px] w-[412px] mx-auto bg-white p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Вход</h1>
      </div>

      <form className="space-y-4">
        {['Электронная почта', 'Пароль'].map((field) => (
          <div key={field}>
            <label className="block text-sm text-gray-600 mb-1">{field}</label>
            <input
              type={field === 'Пароль' ? 'password' : 'text'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="..."
            />
          </div>
        ))}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium mt-6">
          Войти
        </button>
      </form>

      <div className="text-center text-sm text-gray-500 mt-4">
        Нет аккаунта?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}