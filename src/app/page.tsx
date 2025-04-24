"use client";

import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";

export default function Home() {
  const { user, isLoading, logout, login } = useAuth();

  return (
    <div className="flex h-screen w-screen">
      <div className="m-auto">
        {isLoading ? (
          <p>Загрузка. Подождите</p>
        ) : !user ? (
          <p>Вы не имеете доступа к этим данным</p>
        ) : (
          <p>Это почти очень секретные данные</p>
        )}
        <Button
          variant={"outline"}
          onClick={() =>
            login({
              email: "admin@example.com",
              password: "fanta1239",
            })
          }
        >
          Войти в аккаунт
        </Button>
        <span> </span>
        <Button
          variant={"destructive"}
          onClick={() => {
            logout();
          }}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}
