from django.shortcuts import render

from .models import Rental, Sample
from .serializers import RentalSerializer, SampleSerializer
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin

# Create your views here.

class RentalLC(ListCreateAPIView, ListModelMixin, CreateModelMixin):
    serializer_class = RentalSerializer

    def get_queryset(self):
        userId = self.request.query_params.get('userId')
        approved = self.request.query_params.get('isApproved')
        queryset = Rental.objects.all()

        if userId:
            queryset = queryset.filter(userId=userId)

        if approved:
            queryset = queryset.filter(isApproved=True)

        return queryset


    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
        
    def post(self,request,*args,  **kwargs):
        return self.create(request, *args, **kwargs)

class RentalRUD(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self,request,*args,  **kwargs):
        return self.update(request, *args, **kwargs)  
    def delete(self,request,*args,  **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class SampleLC(ListCreateAPIView, ListModelMixin, CreateModelMixin):
    serializer_class = SampleSerializer

    def get_queryset(self):
        userId = self.request.query_params.get('userId')
        approved = self.request.query_params.get('isApproved')
        queryset = Sample.objects.all()

        if userId:
            queryset = queryset.filter(userId=userId)

        if approved:
            queryset = queryset.filter(isApproved=True)

        return queryset

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
       
    def post(self,request,*args,  **kwargs):
        return self.create(request, *args, **kwargs)

class SampleRUD(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self,request,*args,  **kwargs):
        return self.update(request, *args, **kwargs)  
    def delete(self,request,*args,  **kwargs):
        return self.destroy(request, *args, **kwargs)