# Верстка News Exploer
Фронтенд чась проекта News Exploer. Нужна для чтения сохраненных новостей. Пользователи могут регистрироваться на сайте, сохранять новостные карточки для дальнейшего прочтения.

Верстку без сервера можно посмотреть по ссылке https://suholet.github.io/news-explorer-frontend/.

## Подготовка к работе
Фронтенд News Exploer представляет из себя набор html, css и js файлов. Собирается проект с помощью webpack.

### Локальная установка
В командной строке перейдите в папку, где будет развернут проект. После чего скопируйте его с GitHub
```shell
$ git clone https://github.com/suholet/news-explorer-frontend.git
```
Далее перейти в папку с проектом и установить все компоненты от которых зависит проект
```shell
$ cd news-explorer-frontend
$ npm install
```
После этого можно запустить webpack-dev-server для редактирования верстки
```shell
$ npm run dev
```
Сервер поднимется по адресу `http://localhost:8080`. 

Для сборки проекта без запуска webpack-dev-server используйте команду
```shell
$ npm run build
```
