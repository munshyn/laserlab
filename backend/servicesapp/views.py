from rest_framework.response import Response
from .models import ServiceApplication
from .serializers import ServiceAppSerializer
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class ServicesAppLC(ListCreateAPIView, ListModelMixin, CreateModelMixin):
    serializer_class = ServiceAppSerializer

    def get_queryset(self):
        userId = self.request.query_params.get('userId')
        staff = self.request.query_params.get('staffId')
        queryset = ServiceApplication.objects.all()

        if userId:
            queryset = queryset.filter(userId=userId)

        if staff:
            queryset = queryset.filter(staffInCharged=staff)

        return queryset

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
        
    def post(self,request,*args,  **kwargs):
        return self.create(request, *args, **kwargs)

class ServicesAppRUD(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = ServiceApplication.objects.all()
    serializer_class = ServiceAppSerializer
    parser_classes = [MultiPartParser, FormParser]  # Add these parser classes

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)