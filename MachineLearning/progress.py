from flask import Flask, request, jsonify
from pymongo import MongoClient
import datetime

app = Flask(__name__)

# MongoDB connection with specified database name
client = MongoClient(
    "mongodb+srv://vamsikeshwaran:admin@cluster0.eeruw.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]  # Replace with the actual database name you want to use


@app.route('/sendProgress', methods=['POST'])
def send_progress():
    data = request.get_json()

    collection_name = data.get('collectionName')
    exercise_name = data.get('exerciseName')
    cal = data.get('cal')

    if not collection_name or not exercise_name:
        return jsonify({"error": "Collection name and exercise name are required"}), 400

    # Get or create the specified collection
    collection = db[collection_name]

    # Prepare the document to insert with current date and time
    document = {
        "identifier": "Progress",
        "exerciseName": exercise_name,
        "cal": cal,
        "count": 0,
        "date": datetime.datetime.now().strftime("%Y-%m-%d"),
        "time": datetime.datetime.now().strftime("%H:%M:%S")
    }

    # Insert the document into the collection
    result = collection.insert_one(document)

    if result.acknowledged:
        return jsonify({"message": "Progress data sent successfully."}), 201
    else:
        return jsonify({"error": "Failed to insert progress data"}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
