# from django.contrib import admin
# from django.urls import path, include
# from rest_framework_simplejwt import views as jwt_views

# urlpatterns = [
#         # path('admin/', admin.site.urls),
#         path('', include('accounts.urls')),
#         # path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
#         # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
# ]

from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('equipment/', include('equipments.urls')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]