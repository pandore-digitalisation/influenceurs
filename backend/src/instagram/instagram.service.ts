import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IgApiClient } from 'instagram-private-api';

@Injectable()
export class InstagramService {
  private ig: IgApiClient;

  constructor() {
    this.ig = new IgApiClient();
    this.ig.request.defaults.timeout = 60000; // 60 secondes
  }

  async getFollowings(username: string, password: string): Promise<any[]> {
    try {
      // Authentifier l'utilisateur
      this.ig.state.generateDevice(username);
      await this.ig.account.login(username, password);

      // Obtenir les ID de l'utilisateur
      const userId = await this.ig.user.getIdByUsername(username);

      // Récupérer la liste des followings
      const followingFeed = this.ig.feed.accountFollowing(userId);

      let followings = [];
      let moreAvailable = true;

      // Récupérer les informations de chaque following
      while (moreAvailable) {
        const items = await followingFeed.items();
        followings = [...followings, ...items];

        // Si plus de données sont disponibles
        moreAvailable = followingFeed.isMoreAvailable();
        if (moreAvailable) {
          await followingFeed.request();
        }
      }

      // Déboguer pour voir la structure complète des données de chaque following
      console.log(followings); // Afficher la structure complète des données pour chaque following

      // Extraire les informations pertinentes pour chaque following
      const followingDetails = followings.map((user) => {
        // Affichage des données récupérées de l'utilisateur suivi
        console.log(user); // Affiche l'objet complet de l'utilisateur

        return {
          id: user.pk.toString(), // Utilisation de l'ID utilisateur comme id
          name: user.full_name || 'Not available', // Nom complet de l'utilisateur
          username: user.username || 'Not available', // Nom d'utilisateur
          profileImage: user.profile_pic_url || 'Not available', // Image de profil
          bio: user.biography || 'No bio available', // Biographie
          location: user.city_name || 'Not available', // Lieu de l'utilisateur (si disponible)
          category: user.category || ['Not available'], // Catégories de l'utilisateur (si disponible)
          metrics: {
            followers: user.followers_count || 0, // Nombre de followers
            engagement: user.engagement_rate || 0, // Taux d'engagement (s'il est disponible, sinon mettez 0)
            posts: user.media_count || 0, // Nombre de publications
            averageLikes: user.average_like_count || 0, // Moyenne de likes (si disponible)
            averageComments: user.average_comment_count || 0, // Moyenne de commentaires (si disponible)
          },
          platform: 'instagram', // Plateforme Instagram
          verified: user.is_verified || false, // Vérification du compte
          lastUpdated: new Date().toISOString(), // Date de la dernière mise à jour
        };
      });

      return followingDetails;
    } catch (error) {
      if (error instanceof AggregateError) {
        console.error('AggregateError:', error.errors); // Affiche toutes les erreurs contenues
      } else {
        console.error('Error:', error.message || error);
      }

      console.error('Error fetching followings:', error); // Affichage des erreurs pour débogage
      throw new HttpException(
        error.message || 'Failed to fetch followings',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { IgApiClient } from 'instagram-private-api';

// @Injectable()
// export class InstagramService {
//   private ig: IgApiClient;

//   constructor() {
//     this.ig = new IgApiClient();
//   }

//   async getFollowings(username: string, password: string): Promise<any[]> {
//     try {
//       // Authentifier l'utilisateur
//       this.ig.state.generateDevice(username);
//       await this.ig.account.login(username, password);

//       // Obtenir les ID de l'utilisateur
//       const userId = await this.ig.user.getIdByUsername(username);

//       // Récupérer la liste des followings
//       const followingFeed = this.ig.feed.accountFollowing(userId);

//       let followings = [];
//       let moreAvailable = true;

//       // Récupérer les informations de chaque following
//       while (moreAvailable) {
//         const items = await followingFeed.items();
//         followings = [...followings, ...items];

//         // Si plus de données sont disponibles
//         moreAvailable = followingFeed.isMoreAvailable();
//         if (moreAvailable) {
//           await followingFeed.request();
//         }
//       }

//       // Déboguer pour voir la structure complète des données de chaque following
//       console.log(followings); // Afficher la structure complète des données pour chaque following

//       // Extraire les informations pertinentes pour chaque following
//       const followingDetails = followings.map((user) => {
//         // Affichage des données récupérées de l'utilisateur suivi
//         console.log(user); // Affiche l'objet complet de l'utilisateur

//         return {
//           name: user.full_name,
//           username: user.username,
//           followers: user.followed_by_count
//             ? user.followed_by_count
//             : 'Not available', // Assurez-vous que la clé est correcte
//           following: user.follows_count ? user.follows_count : 'Not available', // Assurez-vous que la clé est correcte
//           bio: user.biography ? user.biography : 'No bio available',
//           profileImage: user.profile_pic_url,
//           isVerified: user.is_verified,
//         };
//       });

//       return followingDetails;
//     } catch (error) {
//       console.error('Error fetching followings:', error); // Affichage des erreurs pour débogage
//       throw new HttpException(
//         error.message || 'Failed to fetch followings',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }
// }

// // src/instagram/instagram.service.ts

// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { IgApiClient } from 'instagram-private-api';

// @Injectable()
// export class InstagramService {
//   private ig: IgApiClient;

//   constructor() {
//     this.ig = new IgApiClient(); // Initialisation de l'API Instagram
//   }

//   // Fonction pour récupérer les utilisateurs suivis
//   async getFollowings(username: string, password: string): Promise<string[]> {
//     try {
//       // Génération de l'appareil et connexion à Instagram
//       this.ig.state.generateDevice(username);
//       await this.ig.account.login(username, password);

//       // Récupérer l'utilisateur via le nom d'utilisateur
//       const user = await this.ig.user.searchExact(username);
//       const userId = user.pk;

//       // Récupérer les utilisateurs suivis
//       let followingList: string[] = [];
//       let nextMaxId;

//       do {
//         // Récupérer une page de suivis
//         const { users, next_max_id } = await this.ig.feed
//           .accountFollowing(userId)
//           .request();

//         // Ajouter les utilisateurs récupérés à la liste
//         followingList = followingList.concat(
//           users.map((following) => following.username),
//         );
//         nextMaxId = next_max_id; // Mettre à jour pour la pagination
//       } while (nextMaxId);

//       console.log(followingList);

//       return followingList;
//     } catch (error) {
//       // Gestion des erreurs
//       throw new HttpException(
//         error.message || 'Failed to fetch followings',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }
// }

// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import puppeteer, { Browser, Page } from 'puppeteer';

// @Injectable()
// export class InstagramService {
//   /**
//    * Récupère toutes les informations disponibles sur les profils suivis.
//    * @param username Nom d'utilisateur Instagram.
//    * @param password Mot de passe Instagram.
//    * @returns Liste des profils suivis avec leurs informations complètes.
//    */
//   async getFollowedPagesDetails(
//     username: string,
//     password: string,
//   ): Promise<any[]> {
//     let browser: Browser;
//     let page: Page;

//     try {
//       browser = await puppeteer.launch({ headless: true });
//       page = await browser.newPage();
//       await page.setDefaultNavigationTimeout(60000); // Timeout pour éviter les blocages

//       // Connexion à Instagram
//       await page.goto('https://www.instagram.com/accounts/login/', {
//         waitUntil: 'networkidle2',
//       });
//       await page.waitForSelector('input[name="username"]');
//       await page.type('input[name="username"]', username, { delay: 50 });
//       await page.type('input[name="password"]', password, { delay: 50 });
//       await page.click('button[type="submit"]');
//       await page.waitForNavigation({ waitUntil: 'networkidle2' });

//       // Accéder à la page des abonnements
//       await page.goto(`https://www.instagram.com/${username}/following/`, {
//         waitUntil: 'networkidle2',
//       });
//       await page.waitForSelector('ul');

//       // Charger tous les profils suivis via défilement
//       let previousHeight = 0;
//       let currentHeight = 0;

//       do {
//         previousHeight = await page.evaluate(
//           () => document.body.scrollHeight as number,
//         );
//         await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
//         await new Promise((r) => setTimeout(r, 2000)); // Pause pour charger les nouveaux profils
//         currentHeight = await page.evaluate(
//           () => document.body.scrollHeight as number,
//         );
//       } while (currentHeight > previousHeight);

//       // Extraction des URLs des profils suivis
//       const profileUrls = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('a[href^="/"]'))
//           .map((link) => link.getAttribute('href'))
//           .filter(
//             (href) =>
//               href &&
//               href.startsWith('/') &&
//               !href.includes('direct') &&
//               !href.includes('explore') &&
//               !href.includes('/followers/') &&
//               !href.includes('/following/'),
//           )
//           .map((href) => `https://www.instagram.com${href}`);
//       });

//       // Suppression des doublons
//       const uniqueProfileUrls = [...new Set(profileUrls)];

//       // Récupération des détails de chaque profil
//       const profileDetails = [];
//       for (const url of uniqueProfileUrls) {
//         await page.goto(url, { waitUntil: 'networkidle2' });
//         const profileData = await page.evaluate(() => {
//           const name =
//             document.querySelector('header section h1')?.textContent?.trim() ||
//             null;
//           const username =
//             document.querySelector('header section h2')?.textContent?.trim() ||
//             null;
//           const profileImage =
//             document.querySelector('header img')?.getAttribute('src') || null;
//           const bio =
//             document.querySelector('header section div[role="dialog"] p')
//               ?.textContent || null;
//           const followersText =
//             document.querySelector('a[href*="/followers"] span')?.textContent ||
//             null;
//           const followingText =
//             document.querySelector('a[href*="/following"] span')?.textContent ||
//             null;
//           const postsText =
//             document.querySelector('header section ul li span span')
//               ?.textContent || null;
//           const verified = !!document.querySelector(
//             'header svg[aria-label="Verified"]',
//           );
//           const website =
//             document
//               .querySelector('header section a[href^="http"]')
//               ?.getAttribute('href') || null;
//           const isPrivate = !!document.querySelector(
//             'header section h2 ~ div svg[aria-label="Private"]',
//           );

//           const followers = followersText
//             ? parseInt(followersText.replace(/,/g, ''))
//             : 0;
//           const following = followingText
//             ? parseInt(followingText.replace(/,/g, ''))
//             : 0;
//           const posts = postsText ? parseInt(postsText.replace(/,/g, '')) : 0;

//           return {
//             name,
//             username,
//             profileImage,
//             bio,
//             followers,
//             following,
//             posts,
//             verified,
//             website,
//             isPrivate,
//           };
//         });
//         profileDetails.push(profileData);
//         // Pause pour éviter d'être détecté
//         await new Promise((r) => setTimeout(r, 1000));
//       }

//       return profileDetails;
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Error while fetching profile details',
//         HttpStatus.BAD_REQUEST,
//       );
//     } finally {
//       if (browser) await browser.close(); // Assurer la fermeture du navigateur
//     }
//   }
// }
