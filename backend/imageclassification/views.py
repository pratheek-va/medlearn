from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from PIL import Image
import numpy as np
import base64
import io
import json
import tensorflow as tf
import os

def load_model():
    dirname = os.path.dirname(__file__)
    return tf.keras.models.load_model(dirname + "\\model\\model.h5")

def convertToTensor(base64_encoded_data):
    base64_decoded = base64.b64decode(base64_encoded_data)
    image = Image.open(io.BytesIO(base64_decoded))
    image_np = np.array(image, dtype=np.dtype(float))
    image_np = np.expand_dims(image_np, axis=0)
    image_np /= 255
    return image_np

@csrf_exempt
def predict_image(request):
    if request.method == "GET":
        return HttpResponse("hello world")
    if request.method == "POST":
        request_body = request.body.decode("utf-8")
        data = json.loads(request_body)
        base64_encoded_data = data["base64"]
        image_tensor = convertToTensor(base64_encoded_data)
        cnn = load_model()
        predictions = cnn.predict(image_tensor)
        class_index = np.argmax(predictions[0])
        return HttpResponse(class_index)