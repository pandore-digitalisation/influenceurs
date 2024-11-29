from quart import Quart, jsonify, request
from playwright.async_api import async_playwright
from fake_useragent import UserAgent

app = Quart(__name__)

# Initialisation de l'agent utilisateur pour simuler un navigateur
user_agent = UserAgent()

# Fonction pour scraper un profil TikTok avec Playwright
async def scrape_tiktok_profile(profile_url):
    """
    Fonction pour scraper les données d'un profil TikTok public.
    Utilise Playwright pour rendre la page avec JavaScript.
    """
    headers = {
        "User-Agent": user_agent.random,  # Générer un User-Agent aléatoire pour éviter les blocages
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        # Lancer Playwright et ouvrir le navigateur
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)  # Lance Chromium en mode headless
            page = await browser.new_page()
            await page.goto(profile_url, timeout=30000)  # Timeout à 30 secondes pour charger la page

            # Attendre un moment pour que la page soit complètement rendue
            await page.wait_for_timeout(5000)  # Attendre 5 secondes supplémentaires si nécessaire

            # Extraire les informations du profil TikTok
            # username = await page.query_selector('h1.share-sub-title')
            username = await page.query_selector('h1[data-e2e="user-title"]')  # Sélecteur pour le nom d'utilisateur
            followers = await page.query_selector('strong[data-e2e="followers-count"]')
            likes = await page.query_selector('strong[data-e2e="likes-count"]')
            following = await page.query_selector('strong[data-e2e="following-count"]')  # Sélecteur pour les abonnements

            # Si les éléments sont trouvés, extraire leur texte
            username_text = await username.inner_text() if username else 'N/A'
            followers_text = await followers.inner_text() if followers else 'N/A'
            likes_text = await likes.inner_text() if likes else 'N/A'
            following_text = await following.inner_text() if following else 'N/A'

            # Fermer le navigateur après extraction
            await browser.close()

            return {
                "username": username_text.strip(),
                "followers_count": followers_text.strip(),
                "likes_count": likes_text.strip(),
                "profile_url": profile_url,
                "following_count": following_text.strip()
            }

    except Exception as e:
        return {"error": f"Une erreur s'est produite : {str(e)}"}

@app.route('/profile', methods=['GET'])
async def get_profile_data():
    """
    Route pour récupérer les données d'un profil TikTok.
    """
    profile_url = request.args.get('profile_url')
    if not profile_url:
        return jsonify({"error": "Le lien du profil est requis"}), 400

    # Scraper les données du profil
    data = await scrape_tiktok_profile(profile_url)
    return jsonify(data)

@app.route('/')
async def home():
    return "Bienvenue dans l'API TikTok Scraper. Utilisez /profile avec un lien TikTok pour récupérer les données."

if __name__ == '__main__':
    # Lancer l'application Quart sur le port 5001 avec Uvicorn
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5001)