from django.shortcuts import render,redirect,get_object_or_404  
from django.http import HttpResponse,JsonResponse
from secret_key import pasword_decryt,pasword_encryt,time_ago
from .models import Users
from datetime import datetime
import time
from .decorators import login_required, admin_required, staff_required, customer_required



# Create your views here.

def index(request):

    login_status = False
    accountHold_Name = ""
    accountHold_Username = ""
    accountHold_Email = ""
    accountHold_Image = ""
    user_role_t_f = False
    user_role = ""
        
         # Login check
    if 'user_email' not in request.session:
        login_status = False
        # return redirect("/login_page?msg=*Please login to access your account 😐")

    else:
        login_status = True
        accountHold_Name = request.session.get("account_name")
        accountHold_Username = request.session.get("username")
        accountHold_Email = request.session.get("user_email")
        accountHold_Image = request.session.get("user_image")
        user_role = request.session.get("user_role")

         # Check admin role
        if user_role == "admin":
            user_role_t_f = True
        else:
            user_role_t_f = False
        
    return render(request, 'website/index.html',{'login_status':login_status,'accountHold_Name':accountHold_Name,'accountHold_Username':accountHold_Username,'accountHold_Email':accountHold_Email,'accountHold_Image':accountHold_Image,'user_role_t_f':user_role_t_f})

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



# 
def login_page(request):
    return render(request, 'website/login_page.html')

def registration(request):
    if request.method == "POST":

        user_name = request.POST.get("name")

        base_username = "@" + "_".join(user_name.strip().lower().split())

        username = base_username
        count = 1

        while Users.objects.filter(username=username).exists():
            username = f"{base_username}_{count}"
            count += 1


        email = request.POST.get("email")
        password = pasword_encryt(request.POST.get("password"))
        phone = request.POST.get("phone")
        create_at=str(time.time())

        # Email check
        if Users.objects.filter(user_email=email).exists():
            return redirect("/login_page?msg=email_exists")

        # Phone check
        if Users.objects.filter(contact_number=phone).exists():
            return redirect("/login_page?msg=phone_exists")

        # User save
        Users.objects.create(
            account_name=user_name,
            username=username,
            user_email=email,
            password=password,
            contact_number=phone,
            created_at=create_at,
            account_status="active"
        )

        return redirect("/login_page?msg=success")

    return render(request, "website/login_page.html")



def do_login(request):
    if request.method == "POST":

        email = request.POST.get("email")
        input_password = request.POST.get("password")

        # User find karo
        user = Users.objects.filter(user_email=email).first()

        if not user:
            return redirect("/login_page?msg=email_not_found")

        # Database password decrypt karo
        db_password = pasword_decryt(user.password)

        # Password check
        if input_password != db_password:
            return redirect("/login_page?msg=invalid_password")

        # ==========================
        # Login Success - Session
        # ==========================
        # # request.session["user_id"] = user.user_id
        request.session["user_role"] = user.user_role
        role = user.user_role
        request.session["account_name"] = user.account_name
        request.session["username"] = user.username
        request.session["user_email"] = user.user_email
        # # request.session["contact_number"] = user.contact_number
        # # request.session["account_status"] = user.account_status
        request.session["user_image"] = user.user_image

    if role == "user":
        return redirect("website/index.html")

    elif role in ["staff", "admin"]:
        return redirect("admin/dashboard")
    # return render(request,'website/index.html')


def logout(request):
    request.session.flush()
    return redirect("/?msg=Logout Successfully ✅")


@customer_required
def user_dashboard(request):

    return render(request,"website/dashboard.html")

@staff_required
def admin_dashboard(request):
    
    return render(request,"admin/dashboard.html")

