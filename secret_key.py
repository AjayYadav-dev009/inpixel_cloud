from datetime import datetime
import time

def date_and_month(date_month):
    a = datetime.fromtimestamp(date_month)
    return a
        
def time_ago(timestamp):

    now = int(time.time())
    diff = now - int(float(timestamp))

    if diff < 60:
        return f"{diff}s"

    if diff < 3600:
        return f"{diff//60}m"

    if diff < 86400:
        return f"{diff//3600}h"

    if diff < 604800:
        return f"{diff//86400}d"

    if diff < 2629800:
        return f"{diff//604800}w"

    if diff < 31557600:
        return f"{diff//2629800}mo"

    return f"{diff//31557600}y`"



def pasword_decryt(password):
    temp_pass =""
    ans=""
    for r in password:
        ch = ord(r)
        ch = ch-8
        od = chr(ch)
        ans = ans + od
    return ans

def pasword_encryt(password):
    temp_pass =""
    ans=""
    for r in password:
        ch = ord(r)
        ch = ch+8
        od = chr(ch)
        ans = ans + od
    return ans

        