from rest_framework import serializers
from .models import Equipment

class EquipmentSerializer(serializers.ModelSerializer): #to handle the json object
    class Meta:
        model = Equipment
        fields = '__all__'