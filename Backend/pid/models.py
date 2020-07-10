from django.db import models
from . import consumers

# Create your models here.
class pidModel():
    currentTemp = 26
    tempSetting = 60
    timeLeft = 3542

    def getTemp(self):
        return self.currentTemp

    def getTime(self):
        return self.timeLeft

    def getTempSetting(self):
        return self.tempSetting

    def setTemp(self, inTemp):
        self.tempSetting = inTemp
        consumers.pidConsumer.updateConsumers(consumers.pidConsumer)