from rest_framework import (generics, views)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, CourseSerializer, ThemeSerializer, EmailSerializer
from .models import User, Course, Theme
from django.core.mail import send_mail
from django.conf import settings



class UserRegistration(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserList(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        return Response({
            'users': UserSerializer(User.objects.all(), many=True).data
        })


class CoursesAPIView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ThemesAPIView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer


class ThemesByCourseIdAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ThemeSerializer

    def get_queryset(self, *args, **kwargs):
        return Theme.objects.filter(course_id=self.kwargs["pk"])


class SendEmailView(views.APIView):
    permission_classes = [AllowAny]
    serializer_class = EmailSerializer

    def post(self, request):
        data = request.data
        print(data)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['novikovemiel@yandex.ru']
        send_mail(
            'course',
            data['message'],
            email_from,
            recipient_list
        )
        return Response(data={'result': 'ok'}, status=200)


        