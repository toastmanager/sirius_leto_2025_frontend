'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { regions, getCitiesByRegion } from '@/lib/regions-data';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    phone: '',
    region: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (formData.region) {
      setAvailableCities(getCitiesByRegion(formData.region));
      setFormData(prev => ({ ...prev, city: '' }));
    }
  }, [formData.region]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }
      if (!formData.region || !formData.city) {
        throw new Error('Выберите регион и город');
      }

      const res = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Ошибка регистрации');
      }

      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-800">Регистрация</h1>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">ФИО</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Дата рождения</label>
          <input
            type="date"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.birthDate}
            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Электронная почта</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Номер телефона</label>
          <input
            type="tel"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Регион</label>
          <select
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
          >
            <option value="">Выбрать</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Город</label>
          <select
            required
            disabled={!formData.region}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          >
            <option value="">{formData.region ? 'Выбрать' : 'Сначала выберите регион'}</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Пароль</label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Подтверждение пароля</label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Регистрируясь, вы даёте согласие на обработку персональных данных
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500 mt-6">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Войти
        </Link>
      </div>
    </div>
  );
}