from . import views
from django.urls import path

urlpatterns = [
    path('rental/lc/', views.RentalLC.as_view()),
    path('rental/rud/<int:pk>/', views.RentalRUD.as_view()),
    path('sample/lc/', views.SampleLC.as_view()),
    path('sample/rud/<int:pk>/', views.SampleRUD.as_view())
]