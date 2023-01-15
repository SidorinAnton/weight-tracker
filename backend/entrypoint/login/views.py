from django.contrib.auth import login
from drf_spectacular.utils import extend_schema
from entrypoint.login.action import LoginSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=LoginSerializer, responses={204: None})
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)
