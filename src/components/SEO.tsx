/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    // Meta Title
    document.title = `${title} | QazCertificate`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || 'сертификат жасау, диплом дайындау, алғыс хат, онлайн конструктор, тегін шаблондар');

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', `${title} | QazCertificate`);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', window.location.href);

    // Schema.org Structured Data
    const schemaId = 'qazcertificate-jsonld';
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'QazCertificate',
      'description': 'Қазақ тіліндегі тегін онлайн сертификаттар мен дипломдар жасау конструкторы.',
      'url': window.location.origin,
      'applicationCategory': 'DesignApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires HTML5 support',
      'creator': {
        '@type': 'Organization',
        'name': 'QazCertificate',
        'logo': `${window.location.origin}/logo.png`
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'KZT'
      }
    };
    schemaScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords]);

  return null;
}
