
from django.http import HttpResponse

# Create your views here.
def getTemp(request):
    return HttpResponse('13c')