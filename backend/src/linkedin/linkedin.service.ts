import { Injectable } from '@nestjs/common';
import { Builder, By, until } from 'selenium-webdriver';

@Injectable()
export class LinkedInService {
  async scrapeFollowings(email: string, password: string): Promise<any[]> {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      // Connectez-vous à LinkedIn
      await driver.get('https://www.linkedin.com/login');
      await driver.findElement(By.id('username')).sendKeys(email);
      await driver.findElement(By.id('password')).sendKeys(password);
      await driver
        .findElement(By.css('[data-litms-control-urn="login-submit"]'))
        .click();
      await driver.wait(until.urlContains('feed'), 10000);

      // Accédez à la page des "Followings"
      await driver.get('https://www.linkedin.com/feed/following/');
      await driver.sleep(5000);

      const elements = await driver.findElements(
        By.css('.reusable-search__result-container'),
      );
      if (!elements.length) {
        console.error(
          'Aucun élément trouvé ! Vérifiez le sélecteur CSS ou les restrictions de LinkedIn.',
        );
        return [];
      }
      await driver.wait(
        until.elementLocated(By.css('.reusable-search__result-container')),
        10000,
      );

      const followings = [];

      for (const el of elements) {
        const name = await el
          .findElement(By.css('.entity-result__title-text a'))
          .getText();
        const profileImage = await el
          .findElement(By.css('img'))
          .getAttribute('src');
        const bio = await el
          .findElement(By.css('.entity-result__primary-subtitle'))
          .getText();
        const location = await el
          .findElement(By.css('.entity-result__secondary-subtitle'))
          .getText();

        followings.push({
          id: Math.random().toString(36).substr(2, 9), // Générer un ID aléatoire
          name,
          username: name.toLowerCase().replace(/\s+/g, ''),
          profileImage,
          bio,
          location,
          category: ['Technology', 'Programming'], // Catégories statiques (à personnaliser)
          metrics: {
            followers: Math.floor(Math.random() * 100000), // Exemple de métrique aléatoire
            engagement: (Math.random() * 5).toFixed(1),
            posts: Math.floor(Math.random() * 500),
            averageLikes: Math.floor(Math.random() * 5000),
            averageComments: Math.floor(Math.random() * 500),
          },
          platform: 'linkedin',
          verified: true,
          lastUpdated: new Date().toISOString().split('T')[0],
        });
      }

      return followings;
    } catch (error) {
      console.error('Error during scraping:', error);
      return [];
    } finally {
      await driver.quit();
    }
  }
}
