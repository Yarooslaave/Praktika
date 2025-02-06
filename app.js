const express = require('express');
const path = require('path');
const app = express();

// Подключаем hbs
app.set('view engine', 'hbs');
// Указываем, где лежат наши .hbs-шаблоны
app.set('views', path.join(__dirname, 'views'));

// Подключаем папку со статикой (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут на главную страницу
app.get('/', (req, res) => {
  // Рендерим шаблон "dashboard.hbs" из папки views
  res.render('dashboard', {
    // Опционально, можем передавать данные в виде объекта:
    title: 'Пример: Успеваемость учеников',
    // ... какие-то данные
  });
});

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}. Откройте http://localhost:${PORT}`);
});
