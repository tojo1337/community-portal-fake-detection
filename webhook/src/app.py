import model
from flask import Flask, request,jsonify
from waitress import serve

app = Flask(__name__)

@app.get("/api/v1/")
def greet():
    return jsonify({"data":"Hello world here"})

@app.post("/api/v1/threshold")
def threshold_placer():
    content = request.json
    data = content["data"]
    val = model.threshold_value_placer(data)
    return jsonify(val)

if __name__=="__main__":
    serve(app,host="0.0.0.0",port=5000)