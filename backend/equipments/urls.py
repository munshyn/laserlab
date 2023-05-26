from . import views
from django.urls import path

urlpatterns = [
    path('lc/', views.EquipmentLC.as_view()),
    path('rud/<int:pk>/', views.EquipmentRUD.as_view())
]