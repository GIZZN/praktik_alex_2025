"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './Profile.module.css';
import { getCurrentUser, logoutUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import Header from '@/components/heder/Header';
import Footer from '@/components/Footer/Footer';
import classNames from 'classnames';

export default function Profile() {
  const router = useRouter();
  const user = getCurrentUser();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLogout = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      logoutUser();
      router.push('/');
    }, 600); // Время анимации
  }, [router]);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const gradients = [
    'linear-gradient(135deg, #6366F1, #A855F7)',
    'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    'linear-gradient(135deg, #14B8A6, #6366F1)',
    'linear-gradient(135deg, #F59E0B, #EF4444)',
    'linear-gradient(135deg, #8B5CF6, #EC4899)'
  ];
  
  const gradientIndex = user.name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  
  const avatarGradient = gradients[gradientIndex];

  const recentActivity = [
    { id: 1, action: 'Добавил объект в избранное', date: '2 часа назад', property: 'ЖК Солнечный' },
    { id: 2, action: 'Просмотрел объект', date: '1 день назад', property: 'Квартира на Ленина' },
    { id: 3, action: 'Оставил заявку', date: '3 дня назад', property: 'Дом в пригороде' },
  ];

  const savedProperties = [
    {
      id: 1,
      title: 'Современная квартира в центре',
      price: '12 500 000 ₽',
      location: 'Центральный район',
      image: '/placeholder1.jpg'
    },
    {
      id: 2,
      title: 'Просторный дом с участком',
      price: '18 900 000 ₽',
      location: 'Пригород',
      image: '/placeholder2.jpg'
    },
  ];

  return (
    <div className={classNames(styles.profileContainer, {
      [styles.leaving]: isLeaving
    })}>
      <Header />
      <div className={styles.profileHeader}>
        <div 
          className={styles.avatar}
          style={{ background: avatarGradient }}
        >
          {initials}
        </div>
        
        <div className={styles.userInfoSection}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
          <p className={styles.userBio}>
            Активный пользователь с февраля 2024. Интересуюсь недвижимостью в центральных районах города.
          </p>
          
          <div className={styles.actions}>
            <button className={styles.editButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Редактировать профиль
            </button>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Избранное</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Просмотрено</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>5</span>
          <span className={styles.statLabel}>Подборки</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>Заявки</span>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.mainContent}>
          <h3 className={styles.sectionTitle}>Избранные объекты</h3>
          <div className={styles.propertyGrid}>
            {savedProperties.map(property => (
              <div key={property.id} className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <Image
                    src={property.image}
                    alt={property.title}
                    width={300}
                    height={200}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                <div className={styles.propertyInfo}>
                  <h4 className={styles.propertyTitle}>{property.title}</h4>
                  <p className={styles.propertyPrice}>{property.price}</p>
                  <p className={styles.propertyLocation}>{property.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sideContent}>
          <h3 className={styles.sectionTitle}>Недавняя активность</h3>
          <ul className={styles.activityList}>
            {recentActivity.map(activity => (
              <li key={activity.id} className={styles.activityItem}>
                <p>{activity.action}</p>
                <p className={styles.activityDate}>{activity.date}</p>
                <p>{activity.property}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
} 