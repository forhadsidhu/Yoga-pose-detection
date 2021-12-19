from django.urls import path

from . import views

urlpatterns = [

    path('train', views.training_view),
    path('prediction', views.prediction_view,name = 'prod'),
]

