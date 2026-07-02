from django.urls import path
from . import views

app_name = 'website'

urlpatterns = [
    path('', views.index, name='index'),
    path('service/', views.service, name='service'),
    path('contact/', views.contact, name='contact'),
]