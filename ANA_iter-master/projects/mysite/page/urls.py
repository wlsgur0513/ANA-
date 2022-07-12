from django.urls import path
from . import views

app_name = 'page'

urlpatterns = [
    path('plan', views.plan, name='plan'),
    path('dev', views.dev, name='dev'),
    path('sour', views.sour, name='sour'),
]