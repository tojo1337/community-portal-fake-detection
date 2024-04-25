"""
This function will return the real threshold value of the machine learning model
The only work needed to be done is to place the model in here
The's all and the application will run smoothly
"""
from detection_model import detecting_fake_news as fake_detector

def threshold_value_placer(data):
    dictX = fake_detector(data)
    return dictX