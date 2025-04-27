"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[917px] w-[412px] mx-auto bg-white p-6">
      <div className="mb-10 w-[120px] h-[120px] flex items-center justify-center">
        <Image src="/logo.svg" alt="Логотип" width={120} height={120} />
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Добро пожаловать!
      </h1>

      <p className="text-center text-gray-600 text-lg mb-10 px-4">
        Чтобы начать пользоваться приложением, нужно пройти регистрацию
      </p>

      <Link
        href="/register"
        className="w-full max-w-[320px] bg-primary hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-medium text-center transition duration-200"
      >
        Начать
      </Link>
    </div>
  );
}
