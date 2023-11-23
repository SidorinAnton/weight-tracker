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
- ...

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
ln -s $(pipenv --venv) venv
```

```shell
pipenv shell
```

Удалить окружение:

```shell
pipenv --rm
```
