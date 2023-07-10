from djoser.serializers import UserCreateSerializer as DjoserSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
User = get_user_model()

class UserCreateSerializer(DjoserSerializer):
    class Meta(DjoserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'role', 'phone_number', 'isStudent', 'matrixNum')
        extra_kwargs = {
            'password': {'write_only': True},
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'phone_number')
