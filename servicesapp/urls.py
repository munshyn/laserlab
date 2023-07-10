from . import views
from django.urls import path

urlpatterns = [
    path('lc/', views.ServicesAppLC.as_view()),
    path('rud/<int:pk>/', views.ServicesAppRUD.as_view()),
]