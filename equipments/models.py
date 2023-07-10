from django.db import models

# Create your models here.
class Equipment(models.Model):
    equipmentId = models.AutoField(primary_key=True, serialize=True)
    regNum = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    quantity = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=50)
    availability = models.BooleanField(blank=True, null=True)
    status = models.CharField(max_length=50)
    registered = models.BooleanField(blank=True, null=True)
    hasService = models.BooleanField(blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name