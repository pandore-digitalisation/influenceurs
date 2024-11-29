import logging
from flask_cors import CORS
from flask import Flask, jsonify, request
from facebook_page_info_scraper import FacebookPageInfoScraper

# Configuration des logs
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

app = Flask(__name__)
CORS(app)

@app.route('/scrape_facebook_page', methods=['GET'])
def scrape_facebook_page():
    # Récupération de l'URL de la page Facebook depuis les paramètres de requête
    page_url = request.args.get('url')
    if not page_url:
        logger.error("URL parameter is missing")
        return jsonify({"error": "url parameter is required"}), 400

    logger.info(f"Scraping page information for: {page_url}")

    try:
        # Créer une instance du scraper avec l'URL de la page Facebook
        scraper = FacebookPageInfoScraper(link=page_url)
        
        # Obtenir les informations de la page
        page_info = scraper.get_page_info()
        
        logger.info(f"Successfully retrieved data for: {page_url}")
        
        # Afficher les données récupérées dans la console
        logger.info(f"Scraped data: {page_info}")
        
        # Retourner les informations de la page Facebook sous forme de JSON
        return jsonify(page_info), 200

    except Exception as e:
        logger.error(f"Error occurred while scraping page {page_url}: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    logger.info("Starting Flask app...")
    app.run(host='0.0.0.0', port=5000)