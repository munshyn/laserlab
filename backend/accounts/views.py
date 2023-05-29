from .serializers import UserSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from django.contrib.auth import get_user_model
User = get_user_model()

class UserRUD(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self,request,*args,  **kwargs):
        return self.update(request, *args, **kwargs)  
    def delete(self,request,*args,  **kwargs):
        return self.destroy(request, *args, **kwargs)