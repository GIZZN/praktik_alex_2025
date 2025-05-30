import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              RealEstate
            </Link>
            <p className={styles.footerDescription}>
              Ваш надежный партнер в поиске недвижимости. Находите лучшие предложения для жизни и инвестиций.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Telegram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.633 3.373l-3.375 16.873c-.255 1.12-.92 1.397-1.865.87l-5.145-3.795-2.483 2.385c-.275.275-.505.505-1.035.505l.37-5.235 9.533-8.618c.415-.37-.09-.575-.644-.205L7.366 12.558l-5.085-1.59c-1.105-.345-1.125-1.105.23-1.635L20.186 1.77c.92-.345 1.727.205 1.447 1.603z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="VK">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h3>Покупателям</h3>
              <Link href="/buy">Купить квартиру</Link>
              <Link href="/rent">Снять квартиру</Link>
              <Link href="/new">Новостройки</Link>
              <Link href="/map">Поиск по карте</Link>
            </div>
            
            <div className={styles.linkGroup}>
              <h3>Профессионалам</h3>
              <Link href="/sell">Продать объект</Link>
              <Link href="/advertise">Разместить объявление</Link>
              <Link href="/pro">Профессионалам</Link>
              <Link href="/partners">Партнерская программа</Link>
            </div>
            
            <div className={styles.linkGroup}>
              <h3>О компании</h3>
              <Link href="/about">О нас</Link>
              <Link href="/contacts">Контакты</Link>
              <Link href="/career">Вакансии</Link>
              <Link href="/help">Помощь</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.legal}>
            <p>© 2024 RealEstate. Все права защищены</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Конфиденциальность</Link>
              <Link href="/terms">Условия использования</Link>
            </div>
          </div>
          <div className={styles.apps}>
            <button className={styles.appButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 18.178l-4.62-1.256-.328-.047V6.025h9.896v10.85l-.328.047L12 18.178z"/>
                <path d="M12 22l-8.4-2.89A2.25 2.25 0 012 16.97V7.03a2.25 2.25 0 011.6-2.14L12 2l8.4 2.89A2.25 2.25 0 0122 7.03v9.94a2.25 2.25 0 01-1.6 2.14L12 22z"/>
              </svg>
              App Store
            </button>
            <button className={styles.appButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 12.32l-2.82 2.82-2.83-2.82 2.83-2.82 2.82 2.82z"/>
                <path d="M15.19 15.14L9.12 21.2l-2.83-2.83 6.07-6.07 2.83 2.84z"/>
                <path d="M6.29 18.37L3.46 21.2.63 18.37l2.83-2.83 2.83 2.83z"/>
                <path d="M15.19 9.5L9.12 3.43 6.29 6.26l6.07 6.07 2.83-2.83z"/>
                <path d="M6.29 6.26L3.46 3.43.63 6.26l2.83 2.83 2.83-2.83z"/>
              </svg>
              Google Play
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
} 