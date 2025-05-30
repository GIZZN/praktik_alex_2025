"use client";

import React, { useState } from 'react';
import styles from './AuthForms.module.css';
import { loginUser, registerUser } from '@/utils/auth';

interface AuthFormsProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  type: 'login' | 'register';
}

export const AuthForms: React.FC<AuthFormsProps> = ({ onSuccess, onError, type }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'register') {
      if (!formData.name || !formData.email || !formData.password) {
        onError('Пожалуйста, заполните все поля');
        return;
      }
      
      const success = registerUser(formData.email, formData.password, formData.name);
      if (success) {
        onSuccess();
      } else {
        onError('Пользователь с таким email уже существует');
      }
    } else {
      if (!formData.email || !formData.password) {
        onError('Пожалуйста, заполните все поля');
        return;
      }
      
      const user = loginUser(formData.email, formData.password);
      if (user) {
        onSuccess();
      } else {
        onError('Неверный email или пароль');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {type === 'register' && (
        <div className={styles.formGroup}>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите ваше имя"
            className={styles.input}
          />
        </div>
      )}
      
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите ваш email"
          className={styles.input}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          className={styles.input}
        />
      </div>
      
      <button type="submit" className={styles.submitButton}>
        {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}; 