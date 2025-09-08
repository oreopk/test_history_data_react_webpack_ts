import React, { useState, useEffect, useRef } from "react";
import "./HistorySection.sass";
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

SwiperCore.use([Navigation, Pagination]);

type Item = { year: number; text: string };
type Category = { id: number; badge: string; label: string };
type DateRange = { start: number; end: number };

const categoryItems: Item[][] = [
  [
    { year: 2005, text: "Открытие новой планеты в солнечной системе" },
    { year: 2006, text: "Открытие новой планеты в солнечной системе2" },
    { year: 2007, text: "Прорыв в исследовании стволовых клеток" },
    { year: 2008, text: "Прорыв в исследовании стволовых клеток" },
    { year: 2009, text: "Запуск большого адронного коллайдера" }
  ],
  [
    { year: 2011, text: "Презентация первого смартфона с голосовым помощником" },
    { year: 2012, text: "Запуск облачного хранилища Google Drive" },
    { year: 2013, text: "Появление носимых технологий: умные часы" }
  ],
  [
    { year: 2014, text: "Посадка зонда на комету Чурюмова-Герасименко" },
    { year: 2015, text: "13 сентября — частное солнечное затмение" },
    { year: 2016, text: "Обнаружение гравитационных волн" }
  ],
  [
    { year: 2017, text: "Первая успешная редактирование генома человека" },
    { year: 2018, text: "Разработка искусственной поджелудочной железы" },
    { year: 2019, text: "Создание вакцины от Эболы" }
  ],
  [
    { year: 2020, text: "Рекордное снижение выбросов CO2 из-за пандемии" },
    { year: 2021, text: "Запуск мирового альянса по защите океанов" }
  ],
  [
    { year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды" },
    { year: 2016, text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
    { year: 2017, text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi" }

  ]
];

const TOTAL_DOTS = 6;
const DEGREES_PER_DOT = 360 / TOTAL_DOTS; 

const categories: Category[] = [
  { id: 1, badge: "1", label: "Искусство" },
  { id: 2, badge: "2", label: "Технологии" },
  { id: 3, badge: "3", label: "Космос" },
  { id: 4, badge: "4", label: "Медицина" },
  { id: 5, badge: "5", label: "Экология" },
  { id: 6, badge: "6", label: "Наука" }
];

const dateRanges: DateRange[] = [
  { start: 2005, end: 2010 },
  { start: 2011, end: 2013 },
  { start: 2014, end: 2016 },
  { start: 2017, end: 2019 },
  { start: 2015, end: 2022 },
  { start: 2015, end: 2022 }
];

export default function HistorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(30);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [displayDates, setDisplayDates] = useState<DateRange>(dateRanges[0]);
  const [currentItems, setCurrentItems] = useState<Item[]>(categoryItems[0]);
  const HOLD_DELAY = 400;
  const FADE_DURATION = 350;
  const [isFading, setIsFading] = useState(false);
  const [labelIndex, setLabelIndex] = useState(0);

  const animationRef = useRef<{ start: NodeJS.Timeout | null; end: NodeJS.Timeout | null }>({
    start: null,
    end: null
  });

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const t = setTimeout(() => setLabelIndex(currentIndex), HOLD_DELAY);
    return () => clearTimeout(t);
  }, [currentIndex]);


  useEffect(() => {
    if (animationRef.current.start) clearInterval(animationRef.current.start);
    if (animationRef.current.end) clearInterval(animationRef.current.end);
    
    const targetDates = dateRanges[currentIndex];
    
    animationRef.current.start = setInterval(() => {
      setDisplayDates(prev => {
        if (prev.start === targetDates.start) {
          if (animationRef.current.start) clearInterval(animationRef.current.start);
          return prev;
        }
        
        const newStart = prev.start < targetDates.start 
          ? prev.start + 1 
          : prev.start - 1;
        
        return { ...prev, start: newStart };
      });
    }, 80);

    animationRef.current.end = setInterval(() => {
      setDisplayDates(prev => {
        if (prev.end === targetDates.end) {
          if (animationRef.current.end) clearInterval(animationRef.current.end);
          return prev;
        }
        
        const newEnd = prev.end < targetDates.end 
          ? prev.end + 1 
          : prev.end - 1;
        
        return { ...prev, end: newEnd };
      });
    }, 80);

    return () => {
      if (animationRef.current.start) clearInterval(animationRef.current.start);
      if (animationRef.current.end) clearInterval(animationRef.current.end);
    };
  }, [currentIndex]);
  useEffect(() => {
    let swapTimer: NodeJS.Timeout | null = null;

    const holdTimer = setTimeout(() => {
      setIsFading(true);
      swapTimer = setTimeout(() => {
        setCurrentItems(categoryItems[currentIndex]);
        setIsFading(false);
      }, FADE_DURATION);
    }, HOLD_DELAY);

    return () => {
      clearTimeout(holdTimer);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPrevIndex(currentIndex);
    setRotation(prev => prev - DEGREES_PER_DOT);
    setCurrentIndex(prev => (prev + 1) % TOTAL_DOTS);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPrevIndex(currentIndex);
    setRotation(prev => prev + DEGREES_PER_DOT);
    setCurrentIndex(prev => (prev - 1 + TOTAL_DOTS) % TOTAL_DOTS);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setPrevIndex(currentIndex);
    
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);
    const shortestPath = absDiff > TOTAL_DOTS / 2 
      ? (TOTAL_DOTS - absDiff) * (diff > 0 ? -1 : 1) 
      : diff;
    
    setRotation(prev => prev - (shortestPath * DEGREES_PER_DOT));
    setCurrentIndex(index);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
      <div className="container">
        <div className="title-wrap">
          <span className="title-bar" />
          <h2 className="title">
            Исторические<br/>даты
          </h2>
        </div>
        <div className="top">
          <div className="stage">
            <div className="circle_visible" style={{ ['--rot' as string]: `${rotation}deg`, transform: `rotate(${rotation}deg)` }}></div>
            <div className="circle" style={{ ['--rot' as string]: `${rotation}deg`, transform: `rotate(${rotation}deg)` }}>
              {categories.map((_, index) => (
                <span 
                  key={`dot-${index}`} 
                  className={`dot dot--${index + 1}`}
                  onMouseEnter={() => setHoveredDot(index)}
                  onMouseLeave={() => setHoveredDot(null)}
                  onClick={() => handleDotClick(index)}
                />
              ))}

             {categories.map((category, index) => {
                const isActive = index === currentIndex;
                const isHovered = index === hoveredDot;
                const isLeaving = isAnimating && index === prevIndex;
                
                let className = `category category--${index + 1}`;
                if (isActive) className += ' category--active';
                if (isLeaving) className += ' category--leaving';
                if (isHovered && !isActive) className += ' category--hover';
                
                return (
                  <div key={category.id} className={className}>
                    <span className={`badge badge--${category.id}`}>{category.badge}</span>
                    <span
                      className={`category__label ${index === labelIndex ? 'category__label--visible' : ''}`}>
                        {category.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="years">
              <span className="year year--start">{displayDates.start}</span>
              <span className="year year--end">{displayDates.end}</span>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="controls">
             <span className="counter">
            <span>{(currentIndex + 1).toString().padStart(2, '0')}</span>
            /<span className="total">{TOTAL_DOTS.toString().padStart(2, '0')}</span>
          </span>
            <div className="nav">
               <button className="icon-btn" type="button" onClick={handlePrev}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <button className="icon-btn" type="button" onClick={handleNext}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          <div className={`cards-container ${isFading ? 'cards-container--fade' : ''}`}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1.5}
              pagination={{ enabled: true, clickable: true, el: '.mobile-pagination',  }}
              navigation={{
                enabled: false,
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              breakpoints={{
              321: {
                slidesPerView: 3,
                spaceBetween: 80,
                pagination: { enabled: false },
                navigation: { enabled: true},
              },
            }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {currentItems.map((it, i) => (
                <SwiperSlide key={`${it.year}-${i}`}>
                  <article className={`card ${i === 1 ? 'card--second' : ''}`}>
                    <h3 className="card__year">{it.year}</h3>
                    <p className="card__text">{it.text}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          <div className="mobile-pagination"></div>
          <button className="btn_swiper swiper-button-prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#3877EE" strokeWidth="2"/>
            </svg>
          </button>
          <button className="btn_swiper swiper-button-next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="#3877EE" strokeWidth="2"/>
            </svg>
          </button>
          </div>
        </div>
      </div>
  );
}