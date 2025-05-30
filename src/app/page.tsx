import React from 'react';
import SearchBlock from '@/components/SearchBlock';
import Header from '@/components/heder/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  const categories = [
    'Все квартиры', 'Новостройки', 'Вторичка', 'Дома и участки', 
    'Коммерческая', 'Апартаменты', 'Таунхаусы'
  ];

  const properties = [
    {
      title: '3-комн. квартира, 85 м²',
      location: 'ЖК "Зеленый квартал"',
      price: '12 500 000 ₽',
      image: '/apartment1.jpg',
      tags: ['Новостройка', 'Сдача в 2024']
    },
    {
      title: '2-комн. квартира, 60 м²',
      location: 'ул. Ленина, 45',
      price: '8 900 000 ₽',
      image: '/apartment2.jpg',
      tags: ['Вторичка', 'Кирпичный дом']
    },
    {
      title: '1-комн. квартира, 42 м²',
      location: 'ЖК "Солнечный"',
      price: '5 600 000 ₽',
      image: '/apartment3.jpg',
      tags: ['Новостройка', 'Сдана']
    },
    {
      title: '4-комн. квартира, 120 м²',
      location: 'Центральный район',
      price: '15 800 000 ₽',
      image: '/apartment4.jpg',
      tags: ['Вторичка', 'С ремонтом']
    }
  ];

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Найдите дом своей мечты
              </h1>
              <p className={styles.heroSubtitle}>
                Более 10 000 проверенных вариантов жилья в вашем городе
              </p>
              <SearchBlock />
            </div>
          </div>
        </section>

        <section className={styles.categories}>
          <div className="container">
            <div className="scroll-container">
              {categories.map((category, index) => (
                <button key={index} className="category-pill">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.featured}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Рекомендуемые объекты</h2>
              <button className={styles.viewAllButton}>
                Смотреть все
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.propertyGrid}>
              {properties.map((property, index) => (
                <div key={index} className={styles.propertyCard}>
                  <div className={styles.propertyImage} style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05)), url(${property.image})`
                  }}>
                    <div className={styles.propertyTags}>
                      {property.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.propertyInfo}>
                    <h3 className={styles.propertyTitle}>{property.title}</h3>
                    <p className={styles.propertyLocation}>{property.location}</p>
                    <p className={styles.propertyPrice}>{property.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.advantages}>
          <div className="container">
            <div className={styles.advantagesGrid}>
              <div className={styles.advantageCard}>
                <div className={styles.advantageIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3>Проверенные объекты</h3>
                <p>Все объекты проходят тщательную проверку</p>
              </div>
              <div className={styles.advantageCard}>
                <div className={styles.advantageIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <line x1="10" y1="9" x2="8" y2="9"/>
                  </svg>
                </div>
                <h3>Безопасные сделки</h3>
                <p>Полное юридическое сопровождение</p>
              </div>
              <div className={styles.advantageCard}>
                <div className={styles.advantageIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </div>
                <h3>Быстрый переезд</h3>
                <p>Помощь с оформлением и переездом</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
