from main.views import UserRegistration, UserList, CoursesAPIView, ThemesAPIView, ThemesByCourseIdAPIView, SendMessageView
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/user-registration", UserRegistration.as_view()),
    path("api/v1/user-list", UserList.as_view()),
    path("api/v1/courses", CoursesAPIView.as_view()),
    path("api/v1/themes", ThemesAPIView.as_view()),
    path("api/v1/themes/<int:pk>", ThemesByCourseIdAPIView.as_view()),
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/send-message/", SendMessageView.as_view()),
    re_path(r"^auth/", include("djoser.urls.authtoken"))
]
