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

Запускаем локально `make play` (На сервере должен быть ssh ключ, fingerprint и установлен докер)

Для обновления сертфиката нужно ввести `certbot-update`

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
