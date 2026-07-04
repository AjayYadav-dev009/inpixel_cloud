from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'website/index.html')

def service(request):
    return render(request, 'website/service.html')

def game_server(request):
    return render(request, 'website/game-server.html')

def contact(request):
    return render(request, 'website/contact.html')

def about(request):
    return render(request, 'website/about.html')

def web_hosting(request):
    return render(request, 'website/web-hosting.html')

def vps_hosting(request):
    return render(request, 'website/vps-hosting.html')

def bot_hosting(request):
    return render(request, 'website/bot-hosting.html')
