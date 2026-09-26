import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import messages from "./messages.json";
import { HEART_PATH, HEART_COLORS, CAKE_COLORS, BALLOON_COLORS } from "./BirthdayDecor";
import "./MessageCard.css";

const ICON_COUNT = 9;

export default function MessageCard() {
  const [index, setIndex] = useState(0);

  const showPrev = () => setIndex((i) => Math.max(0, i - 1));
  const showNext = () => setIndex((i) => Math.min(messages.length - 1, i + 1));

  const current = messages[index];
  const isFirst = index === 0;
  const isLast = index === messages.length - 1;

  return (
    <div className="message-card-page">
      {/* decorative floating hearts, cakes, and balloons */}
      <div className="icon-layer" aria-hidden="true">
        {Array.from({ length: ICON_COUNT }).map((_, i) => {
          const kind = i % 3; // 0 = heart, 1 = cake, 2 = balloon
          const size = 30 + (i % 3) * 10;
          return (
            <span
              key={i}
              className="float-icon"
              style={{
                left: `${(i * 11 + 6) % 100}%`,
                width: `${size}px`,
                animationDuration: `${14 + (i % 4) * 3}s`,
                animationDelay: `${i * 1.1}s`,
              }}
            >
              {kind === 0 && (
                <svg viewBox="0 0 100 100">
                  <path
                    d={HEART_PATH}
                    fill={HEART_COLORS[i % HEART_COLORS.length]}
                  />
                </svg>
              )}

              {kind === 1 &&
                (() => {
                  const { body, frosting, candle } =
                    CAKE_COLORS[i % CAKE_COLORS.length];
                  return (
                    <svg viewBox="0 0 100 100">
                      {/* candle */}
                      <rect x="46" y="6" width="4" height="16" fill={candle} />
                      <circle cx="48" cy="4" r="4" fill="#f5a623" />
                      {/* frosting drip */}
                      <path
                        d="M20 34 Q26 24 32 34 Q38 24 44 34 Q50 24 56 34 Q62 24 68 34 Q74 24 80 34 L80 44 L20 44 Z"
                        fill={frosting}
                      />
                      {/* cake body */}
                      <rect x="18" y="44" width="64" height="38" rx="4" fill={body} />
                      {/* base plate */}
                      <rect x="10" y="82" width="80" height="8" rx="4" fill={frosting} />
                    </svg>
                  );
                })()}

              {kind === 2 &&
                (() => {
                  const { main, shade } = BALLOON_COLORS[i % BALLOON_COLORS.length];
                  return (
                    <svg viewBox="0 0 60 100">
                      <ellipse cx="30" cy="34" rx="26" ry="32" fill={main} />
                      <ellipse cx="20" cy="20" rx="8" ry="12" fill={shade} opacity="0.35" />
                      <path d="M26 65 L30 74 L34 65 Z" fill={shade} />
                      <line x1="30" y1="74" x2="30" y2="98" stroke="#b9a99a" strokeWidth="1.5" />
                    </svg>
                  );
                })()}
            </span>
          );
        })}
      </div>

      <div className="message-card-wrapper">
        <div className="message-card">
          {!isFirst && (
            <button
              className="arrow arrow-left"
              onClick={showPrev}
              aria-label="Previous message"
            >
              <ChevronLeft size={30} />
            </button>
          )}

          <div className="message-content">
            <p className="message-text">"{current.text}"</p>
            {current.author && (
              <span className="message-author">— {current.author}</span>
            )}
          </div>

          {!isLast && (
            <button
              className="arrow arrow-right"
              onClick={showNext}
              aria-label="Next message"
            >
              <ChevronRight size={30} />
            </button>
          )}
        </div>

        <div className="dots">
          {messages.map((_, i) => (
            <span key={i} className={`dot ${i === index ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
