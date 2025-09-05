import React, { useState } from "react";
import "./HistorySection.sass";

type Item = { year: number; text: string };
type Category = { id: number; badge: string; label: string };

const items: Item[] = [
  { year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной \n\r Африке и части Антарктиды" },
  { year: 2016, text: "Телескоп «Хаббл» обнаружил самую \n\r удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
  { year: 2017, text: "Компания Tesla официально \n\r представила первый в мире электрический грузовик Tesla Semi" },
];

const TOTAL_DOTS = 6;
const DEGREES_PER_DOT = 360 / TOTAL_DOTS; 

const categories: Category[] = [
  { id: 1, badge: "1", label: "Наука" },
  { id: 2, badge: "2", label: "Технологии" },
  { id: 3, badge: "3", label: "Космос" },
  { id: 4, badge: "4", label: "Медицина" },
  { id: 5, badge: "5", label: "Экология" },
  { id: 6, badge: "6", label: "Искусство" }
];

export default function HistorySection() {
  const [rotation, setRotation] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const currentCategory = categories[currentIndex];
  const prevCategory = categories[prevIndex];

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
            <div className="circle" style={{ transform: `rotate(${rotation+30}deg)` }}>
                          <span className="dot dot--1" />
              <span className="dot dot--2" />
              <span className="dot dot--3" />
              <span className="dot dot--4" />
              <span className="dot dot--5" />
              <span className="dot dot--6" />
              {categories.map((category, index) => (
              <div
                key={category.id}
                className={`category category--${index + 1} ${
                  index === currentIndex ? 'category--active' : 
                  index === prevIndex ? 'category--leaving' : 'category--hidden'
                }`}
              >
                <span className="badge">{category.badge}</span>
                <span className="category__label">{category.label}</span>
              </div>
            ))}
              {/* <div className="category">
                <span className="badge">6</span>
                <span className="category__label">Наука</span> */}
            {/* </div> */}
            </div>

   

            <div className="years">
              <span className="year year--start">2015&nbsp;&nbsp;</span>
              <span className="year year--end">2022</span>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="controls">
             <span className="counter">
            <b>{(currentIndex + 1).toString().padStart(2, '0')}</b>
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

          <div className="grid">
            {items.map((it, i) => (
              <article key={it.year} className="card">
                <h3 className="card__year">{it.year}</h3>
                <p className={`card__text ${i === 1 ? 'card--second' : ''}`}>{it.text}</p>
                {i === items.length - 1 && (
                  <button className="small-next">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
  );
}
