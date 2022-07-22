[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# ***Проект Mesto фронтенд + бэкенд***
Данный проект является итоговой работой за 13-14 спринт на ***Яндекс.Практикуме***.
## *Описание*
----
### ***О чём проект?***

Данное серверное приложение предназначено для храниния и обмена файлами с вэб-приложением Mesto.

***В нём представлены:***

* Модели (схемы) для базы данных;
* Контроллеры;
* Роуты.

---
## *Функциональность:*
* Регистрация;
* Авторизация;
* Обновление данных пользователя;
* Обновление аватара;
* Получение списка пользователя;
* Получение пользователя по ID;
* Получение информации о текущем пользователе;
* Получение списка карточек;
* Создание карточки;
* Удаление карточки;
* Постановка лайка;
* Снятие лайка;
* Ообработка ошибок;
* Валидация входящих данных.
---
## *Используемые технологии:*

* NodeJS
* Express
* MongoDB
* Mongoose
---
## Директории:

`/routes` — папка с файлами роутера;

`/controllers` — папка с файлами контроллеров пользователя и карточки; 

`/models` — папка с файлами описания схем пользователя и карточки.

---
## Запуск проекта:
`npm i` — установка зависимостей;

`mongod` — запускает mongodDB;

`npm run lint` — запускает линтер;

`npm run start` — запускает сервер;

`npm run dev` — запускает сервер с hot-reload.
