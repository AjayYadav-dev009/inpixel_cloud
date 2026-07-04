from django.urls import path
from . import views

app_name = 'website'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('service/', views.service, name='service'),
    path('game-server/', views.game_server, name='game_server'),
    path('web-hosting/', views.web_hosting, name='web_hosting'),
    path('vps-hosting/', views.vps_hosting, name='vps_hosting'),
    path('bot-hosting/', views.bot_hosting, name='bot_hosting'),
    path('contact/', views.contact, name='contact'),
]