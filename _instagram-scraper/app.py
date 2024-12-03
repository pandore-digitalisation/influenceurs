

from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
from instagrapi import Client
import pandas as pd
import json
import logging

app = Flask(__name__)
CORS(app, 
     resources={
         r"/*": {
             "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
             "methods": ["GET", "POST", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization"],
             "supports_credentials": True,
             "max_age": 3600
         }
     })

logging.basicConfig(level=logging.INFO)

# Global variable to store scraped data
SCRAPED_DATA = []

def remove_duplicates(data):
    unique_data = {}
    for item in data:
        username = item['username']
        if username not in unique_data or (item['location'] != "Unknown" and unique_data[username]['location'] == "Unknown"):
            unique_data[username] = item
    return list(unique_data.values())

def load_existing_data():
    try:
        with open("scraped_data.json", "r") as json_file:
            return json.load(json_file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000, http://localhost:3003')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/scrape', methods=['POST', 'OPTIONS'])
def scrape():
    if request.method == 'OPTIONS':
        response = make_response('', 200)
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        hashtag = data.get('hashtag')
        max_posts = int(data.get('max_posts', 10))
        target_location = data.get('location', '').strip()

        if not all([username, password, hashtag]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Load existing data
        existing_data = load_existing_data()
        existing_usernames = {item['username'] for item in existing_data}
        
        cl = Client()
        try:
            cl.login(username, password)
        except Exception as e:
            return jsonify({'error': f'Login failed: {str(e)}'}), 400

        medias = cl.hashtag_medias_recent(hashtag, amount=max_posts)
        
        new_profiles = []
        skipped_profiles = []
        
        for media in medias:
            user_id = media.user.pk
            user_info = cl.user_info(user_id)
            
            if user_info.username in existing_usernames:
                skipped_profiles.append(user_info.username)
                continue
                
            user_location = user_info.location if hasattr(user_info, 'location') else 'Unknown'
            
            # Skip if location doesn't match (if target location is specified)
            if target_location and not (user_location and target_location.lower() in user_location.lower()):
                skipped_profiles.append(user_info.username)
                continue

            profile_data = {
                'username': user_info.username,
                'followers': user_info.follower_count,
                'location': user_location,
                'is_private': user_info.is_private,
                'is_verified': user_info.is_verified,
                'full_name': user_info.full_name,
                'biography': user_info.biography
            }
            
            new_profiles.append(profile_data)
            existing_usernames.add(user_info.username)

        # Combine existing and new data
        all_data = existing_data + new_profiles

        # Save to JSON file
        with open('scraped_data.json', 'w') as f:
            json.dump(all_data, f, indent=2)

        return jsonify({
            'message': f'Successfully scraped {len(new_profiles)} new profiles. {len(skipped_profiles)} profiles were skipped.',
            'new_profiles': len(new_profiles),
            'skipped_profiles': len(skipped_profiles),
            'data': all_data
        })

    except Exception as e:
        logging.error(f'Error during scraping: {str(e)}')
        return jsonify({'error': f'Scraping failed: {str(e)}'}), 500

@app.route('/data', methods=['GET', 'OPTIONS'])
def get_data():
    if request.method == 'OPTIONS':
        return make_response('', 200)

    global SCRAPED_DATA
    try:
        if not SCRAPED_DATA:
            try:
                with open("scraped_data.json", "r") as json_file:
                    SCRAPED_DATA = json.load(json_file)
                SCRAPED_DATA = remove_duplicates(SCRAPED_DATA)
            except (FileNotFoundError, json.JSONDecodeError):
                return jsonify({"message": "No data available"}), 200
        
        sorted_data = sorted(SCRAPED_DATA, key=lambda x: x['followers'], reverse=True)
        return jsonify(sorted_data)
    except Exception as e:
        logging.error(f"Error in /data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/export', methods=['GET', 'OPTIONS'])
def export_csv():
    if request.method == 'OPTIONS':
        return make_response('', 200)

    try:
        if not SCRAPED_DATA:
            return jsonify({"error": "No data to export"}), 400

        df = pd.DataFrame(SCRAPED_DATA)
        csv_file = "scraped_data.csv"
        df.to_csv(csv_file, index=False)

        response = send_file(
            csv_file,
            mimetype='text/csv',
            as_attachment=True,
            download_name='scraped_data.csv'
        )
        
        # Add CORS headers
        response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin', '*')
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        
        return response
    except Exception as e:
        logging.error(f"Error in export: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
