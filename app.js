const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

// Настраиваем Handlebars
app.engine(".hbs", engine({
  extname: ".hbs"
}));
app.set("view engine", ".hbs");
// Папка с шаблонами "views"
app.set("views", path.join(__dirname, "views"));

// Подключаем статические файлы из public
app.use(express.static(path.join(__dirname, "public")));

// Роут на главную
app.get("/", (req, res) => {
  // Нет данных с бэка — просто рендерим статическую страницу
  res.render("index", {
    title: "Прогресс ученика — Большие карточки"
  });
});

// Запуск
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
