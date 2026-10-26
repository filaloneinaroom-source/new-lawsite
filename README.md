# Сайт адвоката — React + Vite

Перенос одностраничного `indexLAST.html` на React. Функционал и внешний вид те же,
стили вынесены в отдельный файл `src/styles.css` (скопированы из оригинала без изменений).

## Запуск

```bash
npm install
npm run dev       # разработка, http://localhost:5173
npm run build     # production-сборка в папку dist
npm run preview   # просмотр сборки
```

Демо-администратор: `admin@law.kg` / `admin123`.

## Структура

```
index.html                 корневая страница (шрифты, meta)
src/
  main.jsx                 точка входа
  App.jsx                  провайдеры + маршруты (HashRouter)
  styles.css               все стили (отдельный CSS-файл)
  config.js                WhatsApp, API, пагинация, секрет JWT
  data/services.js         начальные услуги
  i18n/translations.js     тексты RU / EN
  utils/storage.js         localStorage (+ заявки)
  utils/auth.js            демо-JWT: подпись, проверка, пользователи
  context/                 Theme, Lang, Toast, Auth, Services
  hooks/useArticles.js     загрузка статей из API (loading / ok / error)
  hooks/useScrollTo.js     прокрутка к секциям
  components/              Navbar, Footer, Modal, Photo, SectionHead,
                           ErrorBoundary, PrivateRoute, ScrollManager
  components/home/         Hero, TrustBar, ServicesSection, ArticlesSection,
                           About, BookingSection
  pages/                   Home, AuthPage, Profile, AdminPage, NotFound
```

<!-- ## Соответствие оригиналу

| Было (один файл)                         | Стало (React)                                   |
|------------------------------------------|-------------------------------------------------|
| `route()` по `location.hash`             | `HashRouter` + `Routes` (адреса те же: `#/login`) |
| `PRIVATE`, проверка роли admin           | `PrivateRoute` (`role="admin"`)                 |
| функции, возвращающие HTML-строки        | функциональные компоненты                       |
| глобальные `lang`, `category`, `articlePage` | `useState` / Context                        |
| `innerHTML` + `esc()`                    | JSX (экранирование автоматически)               |
| `data-act` / делегирование кликов        | обработчики `onClick`, `onChange`, `onSubmit`   |
| `window.addEventListener("error")`       | настоящий `ErrorBoundary` + уведомление об ошибках |
| `<dialog>` и `showModal()`               | компонент `Modal` на том же `<dialog>`          | -->
