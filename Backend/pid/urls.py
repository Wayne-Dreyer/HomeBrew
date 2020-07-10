from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^getTemp/' views.getTemp, name='getTemp'),
]