# Трекер веса

Сайт - [https://antonsvm.karpovdns.net](https://antonsvm.karpovdns.net)

## Функциональность:

- Добавляем метрики (вес, обхват) и отображаем их на графике и в таблице
- Устанавливаем цель (такой-то вес к такой-то дате)

### TODO:

- _Регистрация_
- _Добавление заметок_
- _Добавление фотографий_
- _Нотификация (напоминание)_
- ...

## Инструменты:

- Django Rest Framework
- Create React App
- PostgreSQL
- Docker, docker-compose
- Ansible

## Структура:

- `backend/configuration`:
    - Базовая конфигурация проекта на Django
    - Энтрипойнты урлов


- `backend/tests`:
    - Что-то похожее на интеграционные тесты


- `backend/entrypoint`:
    - Сервис аутентификации (login / logout)


- `backend/weight_tracker`:
    - Основной АПИ сервис приложения
    - Получение данных (метрики, цели)

