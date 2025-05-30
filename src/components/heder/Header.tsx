"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Map from '../Map/Map';
import Modal from '../Modal/Modal';
import { AuthForms } from '../Auth/AuthForms';
import { getCurrentUser, logoutUser } from '@/utils/auth';

export default function Header() {
  const [mapState, setMapState] = useState<{ isOpen: boolean; type: 'buy' | 'rent' } | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'register' } | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleMapOpen = (type: 'buy' | 'rent') => {
    setMapState({ isOpen: true, type });
    setIsMobileMenuOpen(false);
  };

  const handleMapClose = () => {
    setMapState(null);
  };

  const handleAuthSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setAuthModal(null);
    setError(null);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsMobileMenuOpen(false);
  };

  const handleAuthError = (message: string) => {
    setError(message);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            RealEstate
          </Link>
          
          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
            <button className={styles.navLink} onClick={() => handleMapOpen('buy')}>
              Купить
            </button>
            <button className={styles.navLink} onClick={() => handleMapOpen('rent')}>
              Снять
            </button>
            <Link href="/sell" className={styles.navLink}>
              Продать
            </Link>
            
            <div className={styles.mobileAuthButtons}>
              {currentUser ? (
                <div className={styles.userMenuMobile}>
                  <Link href="/profile" className={styles.profileLink}>
                    <span className={styles.userNameMobile}>{currentUser.name}</span>
                  </Link>
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    className={styles.loginButton}
                    onClick={() => {
                      setAuthModal({ isOpen: true, type: 'login' });
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Войти
                  </button>
                  <button 
                    className={styles.registerButton}
                    onClick={() => {
                      setAuthModal({ isOpen: true, type: 'register' });
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>Регистрация</span>
                  </button>
                </>
              )}
            </div>
          </nav>

          <div className={styles.actions}>
            <button className={styles.favoriteButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className={styles.favoriteCount}>5</span>
            </button>
            
            <div className={styles.desktopAuthButtons}>
              {currentUser ? (
                <div className={styles.userMenu}>
                  <Link href="/profile" className={styles.profileLink}>
                    <span className={styles.userName}>{currentUser.name}</span>
                  </Link>
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              ) : (
                <div className={styles.authButtons}>
                  <button 
                    className={styles.loginButton}
                    onClick={() => setAuthModal({ isOpen: true, type: 'login' })}
                  >
                    Войти
                  </button>
                  <button 
                    className={styles.registerButton}
                    onClick={() => setAuthModal({ isOpen: true, type: 'register' })}
                  >
                    <span>Регистрация</span>
                  </button>
                </div>
              )}
            </div>

            <button 
              className={`${styles.burgerButton} ${isMobileMenuOpen ? styles.burgerOpen : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {mapState && (
        <Map
          isOpen={mapState.isOpen}
          type={mapState.type}
          onClose={handleMapClose}
        />
      )}

      {authModal && (
        <Modal
          isOpen={authModal.isOpen}
          onClose={() => setAuthModal(null)}
          title={authModal.type === 'login' ? 'Вход' : 'Регистрация'}
        >
          {error && <div className={styles.error}>{error}</div>}
          <AuthForms
            type={authModal.type}
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
          />
        </Modal>
      )}
    </>
  );
} 