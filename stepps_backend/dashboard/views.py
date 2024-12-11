from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Indicator
from .serializers import IndicatorSerializer

class IndicatorView(APIView):
    def get(self, request):
        indicators = Indicator.objects.all()
        serializer = IndicatorSerializer(indicators, many=True)
        print("Serialized data:", serializer.data)
        return Response(serializer.data)
