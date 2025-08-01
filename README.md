# React Admin Panel

Админ-панель для управления сущностями (посты, теги, авторы ) с использованием современного фронтенд-стека: React, Next.js, TypeScript и Ant Design.

## Стек технологий

- **Next.js** — фреймворк на основе React с поддержкой SSR и маршрутизации.
- **React 18** — компонентная библиотека для построения интерфейсов.
- **TypeScript** — типизированный JavaScript для надёжной разработки.
- **Ant Design** — UI-библиотека с готовыми компонентами.
- **Redux** + `@reduxjs/toolkit` — глобальное состояние приложения.
- **redux-saga** — обработка побочных эффектов (например, API-запросов).
- **axios** — HTTP-клиент для работы с API.

## Авторизация и токены
Используется access_token и refresh_token.

Автоматическое обновление токена реализовано в apiClient.ts через axios.interceptors.

Если refresh_token устарел — происходит logout и редирект на /login.
## Установка и запуск проекта

### 1. Клонирование репозитория

```bash
git clone https://github.com/vldpvnnk/react-admin-panel.git
cd react-admin-panel
```

### 2. Установка зависимостей
```
npm install
```

### 3. Настройка переменных окружения
Создайте файл .env.local и укажите:

env
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```
### 4. Запуск проекта
```
npm run dev
```