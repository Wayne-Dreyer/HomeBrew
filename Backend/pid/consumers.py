from channels.generic.websocket import WebsocketConsumer
import json
from . import models

class pidConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(json.dumps({"Temp": models.pidModel.getTemp(models.pidModel), "Time": models.pidModel.getTime(models.pidModel)}))

    def disconnect(self, close_code):
        pass
    
    def receive(self, text_data):
        print (text_data)
        y = json.loads(text_data)
        if(y['mode'] == 1):
            models.pidModel.setTemp(models.pidModel, y["setTemp"])
            print(models.pidModel.getTempSetting(models.pidModel))
            
        

        self.send(json.dumps({"Temp": models.pidModel.getTemp(models.pidModel), "Time": models.pidModel.getTime(models.pidModel)}))

    def updateConsumers(self):
        print("hello")