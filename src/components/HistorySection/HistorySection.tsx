import React from "react";
import "./HistorySection.sass";

type Item = { year: number; text: string };

const items: Item[] = [
  { year: 2015, text: "13 сентября — частное солнечное затмение, видимое в Южной \n\r Африке и части Антарктиды" },
  { year: 2016, text: "Телескоп «Хаббл» обнаружил самую \n\r удалённую из всех обнаруженных галактик, получившую обозначение GN-z11" },
  { year: 2017, text: "Компания Tesla официально \n\r представила первый в мире электрический грузовик Tesla Semi" },
];

export default function HistorySection() {
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
            <div className="circle">
              <span className="dot dot--1" />
              <span className="dot dot--2" />
              <span className="dot dot--3" />
              <span className="dot dot--4" />
              <span className="dot dot--5" />
              <span className="dot dot--6" />
              <div className="category">
                <span className="badge">6</span>
                <span className="category__label">Наука</span>
            </div>
            </div>

   

            <div className="years">
              <span className="year year--start">2015&nbsp;&nbsp;</span>
              <span className="year year--end">2022</span>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="controls">
            <span className="counter"><b>06</b>/<span className="total">06</span></span>
            <div className="nav">
              <button className="icon-btn" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <button className="icon-btn" type="button">
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
