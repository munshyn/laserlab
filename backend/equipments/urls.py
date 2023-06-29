from . import views
from django.urls import path

urlpatterns = [
    path('lc/', views.EquipmentLC.as_view()),           #For get all and create new
    path('rud/<int:pk>/', views.EquipmentRUD.as_view()), #For get one, update and delete
    path('excel/', views.export_to_excel, name='export_excel'),
    path('pdf/', views.export_to_pdf, name='export_pdf')
]