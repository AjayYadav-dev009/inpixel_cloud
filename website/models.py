from django.db import models


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_role = models.CharField(max_length=5,default='user', blank=True, null=True)
    account_name = models.CharField(max_length=255)
    username = models.CharField(unique=True, max_length=255)
    user_email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    contact_number = models.CharField(unique=True, max_length=15, blank=True, null=True)
    account_status = models.CharField(max_length=9,default='active' ,blank=True, null=True)
    user_image = models.CharField(max_length=255,default='default_image.jpg', blank=True, null=True)
    created_at = models.CharField(max_length=255, blank=True, null=True)
    updated_at = models.CharField(max_length=255, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "users"