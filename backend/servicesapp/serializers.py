from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import ServiceApplication
from equipments.models import Equipment

class ServiceAppSerializer(serializers.ModelSerializer):
    userId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    staffInCharged = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    equipmentId = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all(), required=False)
    analysisReport = serializers.FileField(required=False)

    class Meta:
        model = ServiceApplication
        fields = '__all__'