# Трекер веса

Сайт - [https://antonsvm.karpovdns.net](https://antonsvm.karpovdns.net)

## Функциональность:

- Добавляем метрики (вес, обхват) и отображаем их на графике и в таблице
- Устанавливаем цель (такой-то вес к такой-то дате)

### TODO:

- _Регистрация_
- _Добавление заметок_
- _Добавление спортивных метрик_
- _Добавление фотографий_
- _Нотификация (напоминание)_
- _Адаптивный фронт под мобилки_
- _Пофиксить роутинг на фронте_
- ...

### Деплой

Запускаем локально `make play` (На сервере должен быть ssh ключ, fingerprint для гитхаба и установлен докер).

При первом запуске надо будет на сервере удалить в конфиге nginx'а второй блок server (для 443)
(`vi configs/nginx/w-tracker-app.conf`).

Затем `docker-compose up -d`, потом `make certbot-certonly-dry`, потом `make certbot-certonly`.

Дальше `vi configs/nginx/w-tracker-app.conf` и вставить удаленный блок.
Затем `docker-compose restart`.

Для обновления сертфиката нужно ввести `make certbot-update`

### Запустить локально

Зайти в `frontend/src/api/config.ts` и поменять **BASE_URL**.

(TODO когда-нибудь посмотреть, можно ли как-нибудь это делать через вебпак)

```shell
make start-db
```

```shell
make runserver
```

```shell
make front-start
```

### Установить зависимости

#### Frontend

```shell
cd frontend
```

```shell
npm i
```

#### Backend

```shell
pipenv install --dev
```

```shell
ln -s $(pipenv --venv) env
```

```shell
pipenv shell
```

Удалить окружение:

```shell
pipenv --rm
```
