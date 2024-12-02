import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from instagrapi import Client

# Configuration des logs
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

# Initialisation de Flask
app = Flask(__name__)
CORS(app)

class InstagramProfileScraper:
    def __init__(self, username, password):
        """
        Initialiser le scraper avec les identifiants Instagram.
        """
        self.client = Client()
        self.username = username
        self.password = password

    def login(self):
        """
        Se connecter au compte Instagram.
        """
        try:
            logger.info("Connexion au compte Instagram...")
            self.client.login(self.username, self.password)
            logger.info("Connexion réussie.")
        except Exception as e:
            logger.error(f"Erreur lors de la connexion : {e}")
            raise

    def scrape(self, profile_username):
        """
        Scraper les informations d'un profil Instagram public.
        """
        try:
            # Récupérer les informations du profil
            logger.info(f"Récupération des données pour : {profile_username}")
            user_info = self.client.user_info_by_username(profile_username)

            # Extraire les données pertinentes
            data = {
                "name": user_info.full_name or "N/A",
                "username": user_info.username,
                "bio": user_info.biography or "N/A",
                "followers_count": user_info.follower_count,
                "following_count": user_info.following_count,
                "posts_count": user_info.media_count,
                "is_verified": "Vérifié" if user_info.is_verified else "Pas Vérifié",
                "profile_url": f"https://www.instagram.com/{user_info.username}/",
            }

            logger.info(f"Données récupérées : {data}")
            return data

        except Exception as e:
            logger.error(f"Erreur lors de la récupération des données : {e}")
            raise


@app.route('/profile', methods=['GET'])
def scrape_instagram_profile():
    """
    Endpoint pour scraper un profil Instagram public.
    """
    profile_username = request.args.get('username')
    if not profile_username:
        logger.error("Le paramètre 'username' est manquant.")
        return jsonify({"error": "Le paramètre 'username' est requis"}), 400

    try:
        # Identifiants Instagram
        instagram_username = "vianneyyovo"
        instagram_password = "041997"

        scraper = InstagramProfileScraper(instagram_username, instagram_password)
        scraper.login()
        profile_data = scraper.scrape(profile_username)

        return jsonify(profile_data), 200

    except Exception as e:
        logger.error(f"Erreur lors du scraping : {str(e)}")
        return jsonify({"error": f"Une erreur s'est produite : {str(e)}"}), 500


if __name__ == '__main__':
    logger.info("Démarrage de l'application Flask...")
    app.run(host='0.0.0.0', port=5002)