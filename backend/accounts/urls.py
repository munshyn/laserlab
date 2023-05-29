from django.urls import path
from . import views

urlpatterns = [
    path('rud/<int:pk>/', views.UserRUD.as_view())
]