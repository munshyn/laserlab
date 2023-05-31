from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from equipments.models import Equipment

# Create your models here.
class Application(models.Model):
    appId = models.AutoField(primary_key=True, serialize=True)
    appType = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    svName = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    isApproved = models.IntegerField(blank=True, null=True)
    charges = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    userId  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="student")
    staffInCharged  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="staff", blank=True, null=True)

    def __str__(self):
        return self.appType
    
class Rental(Application):
    equipmentId  = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    equipmentName = models.CharField(max_length=100)
    duration = models.DurationField()
    rentDate = models.DateTimeField()

class Sample(Application):
    quantity = models.IntegerField()
    type = models.CharField(max_length=100)