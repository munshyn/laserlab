from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Rental, Sample
from equipments.models import Equipment

class RentalSerializer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    staffInCharged = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    equipmentId = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all())
    
    class Meta:
        model = Rental
        fields = '__all__'

class SampleSerializer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    staffInCharged = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    
    class Meta:
        model = Sample
        fields = '__all__'