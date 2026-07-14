from functools import wraps
from django.shortcuts import redirect


def login_required(view_func):

    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        if "user_email" not in request.session:
            return redirect("/login_page")

        return view_func(request, *args, **kwargs)

    return wrapper



def admin_required(view_func):

    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        if "user_email" not in request.session:
            return redirect("/login_page")

        if request.session.get("user_role") != "admin":
            return redirect("/")

        return view_func(request, *args, **kwargs)

    return wrapper



def staff_required(view_func):

    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        if "user_email" not in request.session:
            return redirect("/login_page")

        if request.session.get("user_role") not in ["staff", "admin"]:
            return redirect("/")

        return view_func(request, *args, **kwargs)

    return wrapper