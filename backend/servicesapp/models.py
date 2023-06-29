from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from equipments.models import Equipment
from storages.backends.s3boto3 import S3Boto3Storage

# Create your models here.
class ServiceApplication(models.Model):
    appId = models.AutoField(primary_key=True, serialize=True)
    appType = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    svName = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=50)
    isApproved = models.IntegerField(blank=True, null=True)
    charges = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    userId  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="student")
    staffInCharged  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="staff", blank=True, null=True)
    equipmentId  = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="equipment", null=True, blank=True)
    equipmentName = models.CharField(max_length=100, null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    useDate = models.DateTimeField()
    sampleNum = models.IntegerField()
    sampleType = models.CharField(max_length=100)
    projectType = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    analysisReport = models.FileField(storage=S3Boto3Storage(),blank=True, null=True)

    def __str__(self):
        return self.appType
