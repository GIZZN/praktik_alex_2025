"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './Map.module.css';
import PropertyCard from '../PropertyCard/PropertyCard';

declare global {
  interface Window {
    ymaps: {
      ready: (callback: () => void) => void;
      Map: new (
        element: HTMLElement,
        options: {
          center: [number, number];
          zoom: number;
          controls: string[];
        }
      ) => YandexMap;
      Placemark: new (
        coordinates: [number, number],
        properties: {
          hintContent?: string;
          balloonContent?: string;
        },
        options: {
          preset: string;
          iconColor: string;
        }
      ) => YandexPlacemark;
    };
  }
}

interface YandexMap {
  geoObjects: {
    add: (placemark: YandexPlacemark) => void;
  };
  destroy: () => void;
}

interface YandexPlacemark {
  events: {
    add: (event: string, callback: () => void) => void;
  };
}

interface Property {
  id: number;
  lat: number;
  lng: number;
  price: string;
  title: string;
  address: string;
  area: string;
  rooms: string;
  image: string;
}

interface MapProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'buy' | 'rent';
}

const MOCK_PROPERTIES: Record<'buy' | 'rent', Property[]> = {
  buy: [
    {
      id: 1,
      lat: 55.751574,
      lng: 37.573856,
      price: '12 500 000 ₽',
      title: '3-комн. квартира',
      address: 'Москва, ул. Тверская, 15',
      area: '85 м²',
      rooms: '3 комнаты',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 2,
      lat: 55.755814,
      lng: 37.617635,
      price: '8 900 000 ₽',
      title: '2-комн. квартира',
      address: 'Москва, Кутузовский проспект, 25',
      area: '60 м²',
      rooms: '2 комнаты',
      image: 'https://images.unsplash.com/photo-1560449752-09cfb28378b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      lat: 55.758463,
      lng: 37.601079,
      price: '15 800 000 ₽',
      title: '4-комн. квартира',
      address: 'Москва, Ленинградский проспект, 45',
      area: '120 м²',
      rooms: '4 комнаты',
      image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ],
  rent: [
    {
      id: 4,
      lat: 55.753215,
      lng: 37.622504,
      price: '80 000 ₽/мес',
      title: '2-комн. квартира',
      address: 'Москва, Арбат, 10',
      area: '55 м²',
      rooms: '2 комнаты',
      image: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 5,
      lat: 55.746787,
      lng: 37.581557,
      price: '120 000 ₽/мес',
      title: '3-комн. квартира',
      address: 'Москва, Пресненская набережная, 8',
      area: '90 м²',
      rooms: '3 комнаты',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 6,
      lat: 55.757677,
      lng: 37.632131,
      price: '60 000 ₽/мес',
      title: '1-комн. квартира',
      address: 'Москва, Садовая-Кудринская улица, 20',
      area: '40 м²',
      rooms: '1 комната',
      image: 'https://images.unsplash.com/photo-1560185007-7dc7e45f51f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ]
};

const Map: React.FC<MapProps> = ({ isOpen, onClose, type }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YandexMap | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const loadYandexMaps = () => {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          if (!mapInstanceRef.current && mapRef.current) {
            mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
              center: [55.751574, 37.573856],
              zoom: 12,
              controls: ['zoomControl', 'fullscreenControl']
            });

            MOCK_PROPERTIES[type].forEach(property => {
              const placemark = new window.ymaps.Placemark(
                [property.lat, property.lng],
                {
                  hintContent: property.title
                },
                {
                  preset: 'islands#violetDotIconWithCaption',
                  iconColor: '#3a0f9c'
                }
              );

              placemark.events.add('click', () => {
                setSelectedProperty(property);
              });

              if (mapInstanceRef.current) {
                mapInstanceRef.current.geoObjects.add(placemark);
              }
            });
          }
        });
      }
    };

    if (isOpen) {
      loadYandexMaps();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      setSelectedProperty(null);
    };
  }, [isOpen, type]);

  if (!isOpen) return null;

  return (
    <div className={styles.mapOverlay}>
      <div className={styles.mapContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div ref={mapRef} className={styles.map}></div>
        {selectedProperty && (
          <PropertyCard
            title={selectedProperty.title}
            price={selectedProperty.price}
            address={selectedProperty.address}
            area={selectedProperty.area}
            rooms={selectedProperty.rooms}
            image={selectedProperty.image}
          />
        )}
      </div>
    </div>
  );
};

export default Map; 