import logging
from quart import Quart, jsonify, request
from quart_cors import cors
from playwright.async_api import async_playwright
from fake_useragent import UserAgent

# Configuration des logs
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

app = Quart(__name__)
app = cors(app, allow_origin="*")

# Initialisation de l'agent utilisateur pour simuler un navigateur
user_agent = UserAgent()

# Fonction pour scraper un profil Instagram avec Playwright
async def scrape_instagram_profile(profile_url):
    """
    Fonction pour scraper les données d'un profil Instagram public.
    Utilise Playwright pour rendre la page avec JavaScript.
    """
    headers = {
        "User-Agent": user_agent.random,  # Générer un User-Agent aléatoire
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        # Lancer Playwright et ouvrir le navigateur
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(extra_http_headers=headers)
            page = await context.new_page()

            logger.info(f"Scraping Instagram profile: {profile_url}")
            await page.goto(profile_url, timeout=30000)

            # Attendre que la page se charge complètement
            await page.wait_for_timeout(5000)

            # Extraire les données
            name = await page.query_selector('header h2')
            followers = await page.query_selector('header li:nth-child(2) span')
            posts = await page.query_selector('header li:nth-child(1) span')
            bio = await page.query_selector('div.-vDIg span')
            verified_badge = await page.query_selector('header span.coreSpriteVerifiedBadge')

            # Vérifier et récupérer les données
            name_text = await name.inner_text() if name else 'N/A'
            followers_text = await followers.get_attribute('title') if followers else 'N/A'
            posts_text = await posts.inner_text() if posts else 'N/A'
            bio_text = await bio.inner_text() if bio else 'N/A'
            is_verified = 'Vérifié' if verified_badge else 'Pas Vérifié'

            # Fermer le navigateur
            await browser.close()

            return {
                "name": name_text.strip(),
                "followers_count": followers_text.strip(),
                "posts_count": posts_text.strip(),
                "bio": bio_text.strip(),
                "is_verified": is_verified,
                "profile_url": profile_url,
            }

    except Exception as e:
        logger.error(f"Error scraping profile: {str(e)}")
        return {"error": f"Une erreur s'est produite : {str(e)}"}

@app.route('/profile', methods=['GET'])
async def get_profile_data():
    """
    Route pour récupérer les données d'un profil Instagram.
    """
    profile_url = request.args.get('profile_url')
    if not profile_url:
        return jsonify({"error": "Le lien du profil est requis"}), 400

    data = await scrape_instagram_profile(profile_url)
    return jsonify(data)

@app.route('/')
async def home():
    return "Bienvenue dans l'API Instagram Scraper. Utilisez /profile avec un lien Instagram pour récupérer les données."

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5002)


# import logging
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from playwright.sync_api import sync_playwright
# from fake_useragent import UserAgent
# import random
# import time

# # Configuration des logs
# logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
# logger = logging.getLogger()

# # Initialisation de Flask
# app = Flask(__name__)
# CORS(app)

# # Initialisation de l'agent utilisateur pour simuler un navigateur
# user_agent = UserAgent()

# class InstagramProfileScraper:
#     def __init__(self, profile_url):
#         self.profile_url = profile_url

#     def scrape(self):
#         try:
#             with sync_playwright() as p:
#                 # Lancement du navigateur
#                 browser = p.chromium.launch(headless=True)
#                 context = browser.new_context(
#                     user_agent=user_agent.random  # Générer un User-Agent aléatoire
#                 )
#                 page = context.new_page()

#                 logger.info(f"Accès à la page : {self.profile_url}")
#                 page.goto(self.profile_url, timeout=60000)

#                 # Défilement pour charger le contenu dynamique
#                 for _ in range(random.randint(1, 3)):
#                     page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
#                     time.sleep(random.uniform(1, 3))

#                 # Attendre un élément clé pour être sûr que la page est chargée
#                 page.wait_for_selector('header', timeout=80000)

#                 # Récupération du HTML brut
#                 html_content = page.content()
#                 logger.debug(f"HTML brut récupéré pour {self.profile_url}")

#                 # Récupération des données avec des sélecteurs
#                 name = page.query_selector("header h2")  # Nom d'utilisateur
#                 bio = page.query_selector("header section > div.-vDIg > span")  # Biographie
#                 stats = page.query_selector_all("header ul li span")  # Posts, followers, following
#                 verified_badge = page.query_selector('header span[title="Compte vérifié"]')  # Badge vérifié

#                 # Extraire les données
#                 data = {
#                     "name": name.inner_text().strip() if name else "N/A",
#                     "posts_count": stats[0].inner_text().strip() if stats and len(stats) > 0 else "N/A",
#                     "followers_count": stats[1].inner_text().strip() if stats and len(stats) > 1 else "N/A",
#                     "following_count": stats[2].inner_text().strip() if stats and len(stats) > 2 else "N/A",
#                     "bio": bio.inner_text().strip() if bio else "N/A",
#                     "is_verified": "Vérifié" if verified_badge else "Pas Vérifié",
#                     "profile_url": self.profile_url,
#                 }

#                 # Fermer le navigateur
#                 browser.close()
#                 return data

#         except Exception as e:
#             logger.error(f"Erreur lors du scraping : {str(e)}")
#             raise

# @app.route('/profile', methods=['GET'])
# def scrape_instagram_profile():
#     """
#     Endpoint pour scraper un profil Instagram public.
#     """
#     profile_url = request.args.get('url')
#     if not profile_url:
#         logger.error("Le paramètre 'url' est manquant.")
#         return jsonify({"error": "Le paramètre 'url' est requis"}), 400

#     try:
#         logger.info(f"Scraping du profil : {profile_url}")
#         scraper = InstagramProfileScraper(profile_url)
#         profile_data = scraper.scrape()

#         logger.info(f"Données récupérées : {profile_data}")
#         return jsonify(profile_data), 200

#     except Exception as e:
#         logger.error(f"Erreur lors du scraping : {str(e)}")
#         return jsonify({"error": f"Une erreur s'est produite : {str(e)}"}), 500


# if __name__ == '__main__':
#     logger.info("Démarrage de l'application Flask...")
#     app.run(host='0.0.0.0', port=5002)