"use client";

import React from "react";
// import { useState, useEffect } from 'react';

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://influenceurs.onrender.com";

export default function Privacy() {
  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <main className="container mx-auto px-4 py-2">
  <div className="flex flex-col items-center">
    <a href="/" className="text-2xl font-bold">Logo</a>
    <div className="flex flex-col items-center my-5 text-justify">
      <h2 className="text-xl font-semibold mb-2">Règles de Confidentialité</h2>
      <p><strong>Dernière mise à jour :</strong> 23 - 01 - 2025</p>
      <p>La confidentialité de vos données personnelles est une priorité pour nous. Cette politique de confidentialité décrit les informations que nous collectons, comment nous les utilisons, et comment nous protégeons votre vie privée lorsque vous utilisez notre extension "Pandore Influencer". En utilisant notre extension, vous acceptez les pratiques décrites dans cette politique de confidentialité.</p>

      <h3 className="text-lg font-semibold mt-4">1. Collecte des données</h3>
      <p>Notre extension ne collecte aucune donnée personnelle sans votre consentement explicite. Lors de l'utilisation de l'extension, les types de données suivants peuvent être collectés :</p>
      <ul className="list-disc ml-5">
        <li><strong>Données de page web :</strong> Nous extrayons des informations publiques à partir des pages de réseaux sociaux telles que Facebook, Instagram, X, LinkedIn, et TikTok uniquement lorsque vous interagissez avec l'extension et visitez ces pages. Ces informations peuvent inclure des statistiques publiques sur les pages, telles que le nombre d'abonnés, les publications récentes, et d'autres informations accessibles publiquement.</li>
        <li><strong>Données stockées localement :</strong> Certaines informations peuvent être stockées localement sur votre appareil afin de faciliter l’utilisation de l'extension, telles que vos paramètres et les actions récentes effectuées avec l'extension. Ces données sont utilisées uniquement pour améliorer votre expérience utilisateur.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">2. Utilisation des données</h3>
      <p>Les données collectées sont utilisées uniquement dans le but d'améliorer votre expérience avec l'extension :</p>
      <ul className="list-disc ml-5">
        <li><strong>Extraction et exportation de données :</strong> L'extension permet de récupérer des informations depuis des profils publics sur des réseaux sociaux (comme Facebook, X, Instagram, LinkedIn, TikTok) à votre demande, et vous permet ensuite d'exporter ces données sous forme de fichier CSV.</li>
        <li><strong>Amélioration de l'extension :</strong> Nous pouvons utiliser des informations non personnelles et agrégées pour améliorer l'extension, corriger des bugs et offrir de nouvelles fonctionnalités.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">3. Partage des données</h3>
      <p>Nous ne partageons aucune donnée personnelle collectée avec des tiers, sauf dans les cas suivants :</p>
      <ul className="list-disc ml-5">
        <li>Si vous avez donné votre consentement explicite pour partager certaines informations.</li>
        <li>Si nous sommes légalement contraints de divulguer des informations dans le cadre d'une enquête légale ou judiciaire.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">4. Sécurité des données</h3>
      <p>Nous mettons en œuvre des mesures de sécurité pour protéger vos données personnelles et éviter tout accès non autorisé. Toutes les informations collectées sont stockées de manière sécurisée et utilisées uniquement pour les objectifs décrits dans cette politique. Nous utilisons des protocoles de sécurité pour protéger vos données pendant la transmission et le stockage.</p>

      <h3 className="text-lg font-semibold mt-4">5. Cookies et stockage local</h3>
      <p>L'extension peut utiliser des cookies et des mécanismes de stockage local pour mémoriser certains paramètres de votre expérience utilisateur, tels que les préférences de configuration ou des actions effectuées dans l'extension. Ces données sont stockées localement et ne sont pas utilisées pour suivre votre activité en dehors de l'extension.</p>

      <h3 className="text-lg font-semibold mt-4">6. Droits de l'utilisateur</h3>
      <p>Vous avez le droit de :</p>
      <ul className="list-disc ml-5">
        <li>Accéder à vos données personnelles collectées par l'extension.</li>
        <li>Rectifier ou supprimer les données personnelles que vous avez fournies.</li>
        <li>Retirer votre consentement à tout moment, sans que cela n'affecte la légalité du traitement basé sur le consentement avant son retrait.</li>
      </ul>
      <p>Si vous souhaitez exercer ces droits ou obtenir plus d'informations sur la manière dont nous traitons vos données, veuillez nous contacter à l'adresse fournie dans l'extension.</p>

      <h3 className="text-lg font-semibold mt-4">7. Modifications de cette politique</h3>
      <p>Nous nous réservons le droit de mettre à jour cette politique de confidentialité à tout moment. En cas de modification, la version mise à jour sera publiée sur cette page, avec la date de la dernière mise à jour. Nous vous encourageons à consulter régulièrement cette politique pour être informé des éventuels changements.</p>

      <h3 className="text-lg font-semibold mt-4">8. Contact</h3>
      <p>Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou l'utilisation de l'extension, veuillez nous contacter à l'adresse email suivante : <strong>vianney@pandore.co</strong>.</p>
    </div>
  </div>
</main>

  );
}
