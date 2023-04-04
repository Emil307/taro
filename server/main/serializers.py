from .models import Course, Theme
from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class UserSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["email", "password"]

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = "__all__"
