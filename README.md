# 📦 Snippet Vault — Frontend

React + TypeScript додаток для управління сніпетами коду та команд.

> **Стек:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Hook Form + Zod

---

## 🚀 Запуск локально

### 1. Клонувати репозиторій та перейти у папку

```bash
git clone <repo-url>
```

### 2. Встановити залежності

```bash
npm install
```

### 3. Створити файл змінних оточення

```bash
cp .env.example .env
```

### 4. Відредагувати `.env` під локальні налаштування

```env
VITE_API_URL=http://localhost:4000
```

### 5. Запустити dev-сервер

```bash
npm run dev
```

Відкрити у браузері: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Змінні оточення

| Змінна         | Опис            | Приклад                 |
| -------------- | --------------- | ----------------------- |
| `VITE_API_URL` | URL backend API | `http://localhost:4000` |

### `.env.example`

```env
VITE_API_URL=http://localhost:4000
```

> ⚠️ Усі змінні з префіксом `VITE_` доступні у браузері. Не зберігайте тут секрети.

---

## 📡 API — приклади запитів

Базовий URL: `http://localhost:4000`

### Отримати всі сніпети

```bash
curl http://localhost:4000/snippets
```

### Створити сніпет

```bash
curl -X POST http://localhost:4000/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Snippet",
    "content": "console.log(\"Hello\")",
    "tags": ["js"],
    "type": "command"
  }'
```

### Оновити сніпет

```bash
curl -X PUT http://localhost:4000/snippets/<id> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "alert(\"Hi\")",
    "tags": ["js"],
    "type": "command"
  }'
```

### Видалити сніпет

```bash
curl -X DELETE http://localhost:4000/snippets/<id>
```

---

## 🏗️ Білд та продакшн

### Зібрати production build

```bash
npm run build
```

Артефакти збираються у папку `dist/`.

### Переглянути production build локально

```bash
npm run preview
```

Відкрити у браузері: [http://localhost:4173](http://localhost:4173)

### Деплой

Вміст папки `dist/` можна розгорнути на будь-якому статичному хостингу (Vercel, Netlify, Nginx тощо).

```bash
# Приклад: Nginx
cp -r dist/* /var/www/html/
```

> При деплої переконайтесь, що `VITE_API_URL` вказує на продакшн backend.

---

## 📁 Структура проекту

```
frontend/
├── src/
│   ├── components/     # UI компоненти (SnippetForm, SnippetList, SnippetItem, Loader, Filter)
│   ├── api/            # API виклики (fetchSnippets, createSnippet, ...)
│   ├── types/          # TypeScript типи
│   ├── APP.tsx          # Головна сторінка
│   └── main.tsx        # Точка входу
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ✅ Функціональність

- Створення, редагування та видалення сніпетів
- Пошук та фільтрація за тегами
- Копіювання контенту в буфер обміну з підтвердженням
- Відображення Loader під час завантаження
- Банер з помилкою при збоях API (з можливістю закрити)
- Валідація форм через React Hook Form + Zod (всі поля обов'язкові)
