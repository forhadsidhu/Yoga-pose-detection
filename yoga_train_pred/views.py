from django.shortcuts import render
import os


def training_view(request):
    return render(request, "Yoga_training/index.html")


def prediction_view(request):
    return render(request, "Yoga_prediction/index.html")
