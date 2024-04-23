import model
from flask import Flask, request,jsonify

app = Flask(__name__)

@app.get("/api/v1/")
def greet():
    return jsonify({"data":"Hello world here"})

@app.post("/api/v1/threshold")
def threshold_placer():
    content = request.json
    data = content["data"]
    val = model.threshold_value_placer(data)
    return jsonify({"threshold":val})

app.run()