from django.contrib.auth import logout
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class LogoutView(APIView):
    @extend_schema(request=None, responses={204: None})
    def get(self, request):
        logout(request)
        return Response(None, status=status.HTTP_204_NO_CONTENT)
