from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    default_error_messages = {
        "wrong_authentication": "Access denied: wrong username or password",
    }
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        data = {
            "request": self.context["request"],
            "password": attrs["password"],
            "username": attrs["username"],
        }
        user = authenticate(**data)

        if user is None:
            self.fail("wrong_authentication")

        attrs["user"] = user
        return attrs
