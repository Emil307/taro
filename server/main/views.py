from rest_framework import (generics, views)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, CourseSerializer, ThemeSerializer
from .models import User, Course, Theme
from main.services import send_to_telegram
from rest_framework.request import Request


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
        print(request.user.is_authenticated)
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


class SendMessageView(views.APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def post(self, request: Request):
        user: User
        data = request.data
        user = request.user
        if user.is_authenticated:
            message = {
                "email": user.email,
                "name": user.name,
                "surname": user.surname,
                "role": user.role
            }
        else:
            message = dict(
                name=data['name'],
                surname=data['surname'],
                email=data['email'],
                message=data['message'],
            )

        send_to_telegram(message=message)        

        return Response(data={'result': 'ok'}, status=200)


        