from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UsersManager(BaseUserManager):
    def create_user(self, email, name, role=None, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('A password is required')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, role=role, **extra_fields)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('A password is required')
        
        email = self.normalize_email(email)
        user = self.create_user(email, name, password, role="ADMIN")

        user.is_superuser = True
        user.save()

        return user


# Create your models here.
class Users(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=10)
    username = models.CharField(max_length=150,unique=True,blank=True,null=True,)
    is_active = models.BooleanField(default=True)

    objects = UsersManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email