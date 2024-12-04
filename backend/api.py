import logging
from quart import Quart, jsonify, request
from quart_cors import cors
from instagrapi import Client
from facebook_page_info_scraper import FacebookPageInfoScraper
from playwright.async_api import async_playwright
from fake_useragent import UserAgent

# Configuration des logs
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

# Initialisation de l'application Quart
app = Quart(__name__)
app = cors(app, allow_origin="*")

# Initialisation de l'agent utilisateur pour TikTok
user_agent = UserAgent()


# Classe pour le scraping d'Instagram
class InstagramProfileScraper:
    def __init__(self, username, password):
        self.client = Client()
        self.username = username
        self.password = password

    async def login(self):
        try:
            logger.info("Connexion au compte Instagram...")
            self.client.login(self.username, self.password)
            logger.info("Connexion réussie.")
        except Exception as e:
            logger.error(f"Erreur lors de la connexion : {e}")
            raise

    async def scrape(self, profile_username):
        try:
            logger.info(f"Récupération des données pour : {profile_username}")
            user_info = self.client.user_info_by_username(profile_username)
            data = {
                "name": user_info.full_name or "N/A",
                "username": user_info.username,
                "bio": user_info.biography or "N/A",
                "followers_count": user_info.follower_count,
                "following_count": user_info.following_count,
                "posts_count": user_info.media_count,
                "is_verified": "Vérifié" if user_info.is_verified else "Pas Vérifié",
                "profile_url": f"https://www.instagram.com/{user_info.username}/",
                # "profile_picture": user_info.profile_pic_url_hd,  # Ajout de l'URL de la photo de profil
                "platform": 'Instagram',
            }
            logger.info(f"Données récupérées : {data}")
            return data
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des données : {e}")
            raise


# Fonction pour le scraping de TikTok
async def scrape_tiktok_profile(profile_url):
    headers = {
        "User-Agent": user_agent.random,
        "Accept-Language": "en-US,en;q=0.9",
    }
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.set_extra_http_headers(headers)
            logger.info(f"Scraping TikTok profile: {profile_url}")
            await page.goto(profile_url, timeout=30000)
            await page.wait_for_timeout(5000)

            name = await page.query_selector('h1[data-e2e="user-title"]')
            followers = await page.query_selector('strong[data-e2e="followers-count"]')
            likes = await page.query_selector('strong[data-e2e="likes-count"]')
            following = await page.query_selector('strong[data-e2e="following-count"]')
            bio = await page.query_selector('h2[data-e2e="user-bio"]')
            verified_svg = await page.query_selector('svg[width="20"][height="20"]')
            profile_pic = await page.query_selector('img[data-e2e="user-avatar"]')  # Exemple de sélecteur


            data = {
                "name": await name.inner_text() if name else 'N/A',
                "followers_count": await followers.inner_text() if followers else 'N/A',
                "likes_count": await likes.inner_text() if likes else 'N/A',
                "following_count": await following.inner_text() if following else 'N/A',
                "bio": await bio.inner_text() if bio else 'N/A',
                "is_verified": "Vérifié" if verified_svg else "Pas Vérifié",
                "profile_url": profile_url,
                "platform": 'Tiktok',
                # "profile_picture": await profile_pic.get_attribute("src") if profile_pic else "N/A"  # Ajout de la photo
            }
            await browser.close()
            return data
    except Exception as e:
        return {"error": f"Une erreur s'est produite : {str(e)}"}


# Routes API
@app.route('/instagram', methods=['GET'])
async def scrape_instagram():
    profile_username = request.args.get('username')
    if not profile_username:
        return jsonify({"error": "Le paramètre 'username' est requis"}), 400
    try:
        instagram_username = "vianneyyovo"
        instagram_password = "041997"
        scraper = InstagramProfileScraper(instagram_username, instagram_password)
        await scraper.login()
        data = await scraper.scrape(profile_username)
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Erreur lors du scraping Instagram : {e}")
        return jsonify({"error": str(e)}), 500


# @app.route('/facebook', methods=['GET'])
# async def scrape_facebook():
#     page_url = request.args.get('url')
#     if not page_url:
#         return jsonify({"error": "Le paramètre 'url' est requis"}), 400
#     try:
#         scraper = FacebookPageInfoScraper(link=page_url)
#         data = scraper.get_page_info()
#         return jsonify(data), 200
#     except Exception as e:
#         logger.error(f"Erreur lors du scraping Facebook : {e}")
#         return jsonify({"error": str(e)}), 500
    
@app.route('/facebook', methods=['GET'])
async def scrape_facebook():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Le paramètre 'username' est requis"}), 400
    try:
        # Construire l'URL de la page Facebook à partir du nom d'utilisateur
        page_url = f"https://www.facebook.com/{username}"
        
        # Utiliser le scraper pour récupérer les informations de la page
        scraper = FacebookPageInfoScraper(link=page_url)
        data = scraper.get_page_info()
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Erreur lors du scraping Facebook : {e}")
        return jsonify({"error": str(e)}), 500



# @app.route('/tiktok', methods=['GET'])
# async def scrape_tiktok():
#     profile_url = request.args.get('profile_url')
#     if not profile_url:
#         return jsonify({"error": "Le paramètre 'profile_url' est requis"}), 400
#     data = await scrape_tiktok_profile(profile_url)
#     return jsonify(data), 200

@app.route('/tiktok', methods=['GET'])
async def scrape_tiktok():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Le paramètre 'username' est requis"}), 400
    try:
        # Construire l'URL du profil TikTok à partir du nom d'utilisateur
        profile_url = f"https://www.tiktok.com/@{username}"

        # Utiliser le scraper pour récupérer les informations du profil
        data = await scrape_tiktok_profile(profile_url)
        
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Erreur lors du scraping TikTok : {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/')
async def home():
    return "Bienvenue dans l'API de scraping unifiée. Utilisez /instagram, /facebook, ou /tiktok pour scraper des données."


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5000)
    
    
    # Flask
    
# import logging
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from instagrapi import Client
# from facebook_page_info_scraper import FacebookPageInfoScraper
# from playwright.sync_api import sync_playwright
# from fake_useragent import UserAgent

# # Configuration des logs
# logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
# logger = logging.getLogger()

# # Initialisation de l'application Flask
# app = Flask(__name__)
# CORS(app)

# # Initialisation de l'agent utilisateur pour TikTok
# user_agent = UserAgent()


# # Classe pour le scraping d'Instagram
# class InstagramProfileScraper:
#     def __init__(self, username, password):
#         self.client = Client()
#         self.username = username
#         self.password = password

#     def login(self):
#         try:
#             logger.info("Connexion au compte Instagram...")
#             self.client.login(self.username, self.password)
#             logger.info("Connexion réussie.")
#         except Exception as e:
#             logger.error(f"Erreur lors de la connexion : {e}")
#             raise

#     def scrape(self, profile_username):
#         try:
#             logger.info(f"Récupération des données pour : {profile_username}")
#             user_info = self.client.user_info_by_username(profile_username)
#             data = {
#                 "name": user_info.full_name or "N/A",
#                 "username": user_info.username,
#                 "bio": user_info.biography or "N/A",
#                 "followers_count": user_info.follower_count,
#                 "following_count": user_info.following_count,
#                 "posts_count": user_info.media_count,
#                 "is_verified": "Vérifié" if user_info.is_verified else "Pas Vérifié",
#                 "profile_url": f"https://www.instagram.com/{user_info.username}/",
#             }
#             logger.info(f"Données récupérées : {data}")
#             return data
#         except Exception as e:
#             logger.error(f"Erreur lors de la récupération des données : {e}")
#             raise


# # Fonction pour le scraping de TikTok
# def scrape_tiktok_profile(profile_url):
#     headers = {
#         "User-Agent": user_agent.random,
#         "Accept-Language": "en-US,en;q=0.9",
#     }
#     try:
#         with sync_playwright() as p:
#             browser = p.chromium.launch(headless=True)
#             page = browser.new_page()
#             page.set_extra_http_headers(headers)
#             logger.info(f"Scraping TikTok profile: {profile_url}")
#             page.goto(profile_url, timeout=30000)
#             page.wait_for_timeout(5000)

#             name = page.query_selector('h1[data-e2e="user-title"]')
#             followers = page.query_selector('strong[data-e2e="followers-count"]')
#             likes = page.query_selector('strong[data-e2e="likes-count"]')
#             following = page.query_selector('strong[data-e2e="following-count"]')
#             bio = page.query_selector('h2[data-e2e="user-bio"]')
#             verified_svg = page.query_selector('svg[width="20"][height="20"]')

#             data = {
#                 "name": name.inner_text() if name else 'N/A',
#                 "followers_count": followers.inner_text() if followers else 'N/A',
#                 "likes_count": likes.inner_text() if likes else 'N/A',
#                 "following_count": following.inner_text() if following else 'N/A',
#                 "bio": bio.inner_text() if bio else 'N/A',
#                 "is_verified": "Vérifié" if verified_svg else "Pas Vérifié",
#                 "profile_url": profile_url,
#             }
#             browser.close()
#             return data
#     except Exception as e:
#         return {"error": f"Une erreur s'est produite : {str(e)}"}


# # Routes API
# @app.route('/instagram', methods=['GET'])
# def scrape_instagram():
#     profile_username = request.args.get('username')
#     if not profile_username:
#         return jsonify({"error": "Le paramètre 'username' est requis"}), 400
#     try:
#         instagram_username = "vianneyyovo"
#         instagram_password = "041997"
#         scraper = InstagramProfileScraper(instagram_username, instagram_password)
#         scraper.login()
#         data = scraper.scrape(profile_username)
#         return jsonify(data), 200
#     except Exception as e:
#         logger.error(f"Erreur lors du scraping Instagram : {e}")
#         return jsonify({"error": str(e)}), 500


# @app.route('/facebook', methods=['GET'])
# def scrape_facebook():
#     page_url = request.args.get('url')
#     if not page_url:
#         return jsonify({"error": "Le paramètre 'url' est requis"}), 400
#     try:
#         scraper = FacebookPageInfoScraper(link=page_url)
#         data = scraper.get_page_info()
#         return jsonify(data), 200
#     except Exception as e:
#         logger.error(f"Erreur lors du scraping Facebook : {e}")
#         return jsonify({"error": str(e)}), 500


# @app.route('/tiktok', methods=['GET'])
# def scrape_tiktok():
#     profile_url = request.args.get('profile_url')
#     if not profile_url:
#         return jsonify({"error": "Le paramètre 'profile_url' est requis"}), 400
#     data = scrape_tiktok_profile(profile_url)
#     return jsonify(data), 200


# @app.route('/')
# def home():
#     return "Bienvenue dans l'API de scraping unifiée. Utilisez /instagram, /facebook, ou /tiktok pour scraper des données."


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
