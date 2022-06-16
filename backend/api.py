from flask import Flask
from flask import request, jsonify
import requests

API_KEY = 'UqQ3wRjDZAsNhKJlddxz2Fo5yLkieo9rtCtROeao'

app = Flask(__name__)


@app.route("/api/find")
def findAsteroids():
    try:
        args = request.args
        start = args.get('start', default='', type=str)
        end = args.get('end', default='', type=str)

        resp = requests.get(
            f'https://api.nasa.gov/neo/rest/v1/feed?start_date={start}&end_date={end}&api_key={API_KEY}')

        json = resp.json()
        days = json.get('near_earth_objects')

        res = []
        for day in days:
            items = days.get(day)
            for item in items:
                approachData = [
                    {
                        "time": x.get('epoch_date_close_approach'),
                        "distance": float(x.get('miss_distance').get('kilometers'))
                    } for x in item.get('close_approach_data')
                ]
                minimum = min(approachData, key = lambda x: x.get('distance'))

                res.append({
                    'name': item.get('name'),
                    "minDiametertMeters": item.get('estimated_diameter').get('meters').get('estimated_diameter_min'),
                    "maxDiametertMeters": item.get('estimated_diameter').get('meters').get('estimated_diameter_max'),
                    # item.get('close_approach_data').get('epoch_date_close_approach')
                    "time": minimum.get('time'),
                    "distance": minimum.get('distance'),
                })

        return jsonify(res)
    except:
        return jsonify({
            "status": "error"
        })


app.run(port=3000)
