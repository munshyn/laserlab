from django.urls import path
from . import views

urlpatterns = [
    path('lc/', views.UserLC.as_view()),
    path('rud/<int:pk>/', views.UserRUD.as_view())
]