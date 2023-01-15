from django.http import JsonResponse
from django.middleware.csrf import get_token


def get_csrf(request):
    return JsonResponse({"csrf-token": get_token(request)})
