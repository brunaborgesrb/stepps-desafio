from django.urls import path
from .views import IndicatorView

urlpatterns = [
    path('indicators/', IndicatorView.as_view(), name='indicators'),
]