import './TypeWriter.css';
import { useState, useEffect, useRef, useCallback } from 'react';

export type TypeWriterProps = {
  terms: string[];
  speed?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  loop?: boolean;
  cursor?: boolean;
  color?: string;
  className?: string;
  [key: string]: unknown;
};

/**
 * Renders a TypeWriter animation for the provided terms array.
 *
 * @param props - The properties for the component.
 * @param props.terms - An array of strings to be displayed sequentially via type animation.
 * @param props.speed - The speed at which the animation plays. Range [10, 100] in intervals of 10
 * The higher the speed, the faster the animation plays.
 * @param props.delay - The delay between animating different terms in the provided terms array.
 * Range [1, 10] in intervals of 1.
 * @param props.loop - A boolean specifying whether or not to restart the animation after it completes
 * for all items in the terms array.
 * @param props.cursor - A boolean specifying whether or not to display a typing cursor along with the
 * animation
 * @param props.className - Additional className(s) prescribed to the component.
 * @param props... (key: string) attributes associated with the specified "as" tag.
 *
 * @returns An HTML tag.
 */
export const TypeWriter = ({
  terms,
  speed = 10,
  delay = 2,
  loop = true,
  cursor = true,
  color,
  className,
  ...attributes
}: TypeWriterProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleText, setVisibleText] = useState('');
  const [displayCursor, setDisplayCursor] = useState(cursor);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const eraseIntervalRef = useRef<number | null>(null);

  const cleanupTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (eraseIntervalRef.current) {
      clearInterval(eraseIntervalRef.current);
      eraseIntervalRef.current = null;
    }
  }, []);

  const nextTerm = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex + 1 >= terms.length) {
        return loop ? 0 : prevIndex;
      }
      return prevIndex + 1;
    });
  }, [terms.length, loop]);

  useEffect(() => {
    cleanupTimers();

    if (terms.length === 0) {
      return;
    }

    if (activeIndex >= terms.length) {
      if (loop) {
        setActiveIndex(0);
      }
      return;
    }

    const activeTerm = terms[activeIndex];
    if (activeTerm.length === 0) {
      nextTerm();
      return;
    }

    let stringIndex = 0;
    const intervalLength = 1000 / speed;
    let isMounted = true; // Track if component is mounted

    intervalRef.current = window.setInterval(() => {
      if (!isMounted) return; // Prevent state updates if unmounted

      stringIndex++;
      setVisibleText(activeTerm.slice(0, stringIndex));

      if (stringIndex >= activeTerm.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        timeoutRef.current = window.setTimeout(() => {
          if (!isMounted) return; // Prevent state updates if unmounted

          if (loop) {
            let eraseIndex = activeTerm.length;
            eraseIntervalRef.current = window.setInterval(() => {
              if (!isMounted) return; // Prevent state updates if unmounted

              eraseIndex--;
              setVisibleText(activeTerm.slice(0, eraseIndex));

              if (eraseIndex <= 0) {
                if (eraseIntervalRef.current) {
                  clearInterval(eraseIntervalRef.current);
                  eraseIntervalRef.current = null;
                }
                if (isMounted) {
                  nextTerm();
                }
              }
            }, intervalLength);
          } else {
            setDisplayCursor(false);
          }
        }, delay * 1000);
      }
    }, intervalLength);

    return () => {
      isMounted = false;
      cleanupTimers();
    };
  }, [activeIndex, delay, loop, speed, terms, cleanupTimers, nextTerm]);

  return (
    <div
      {...attributes}
      className={
        className ? `tsx-cmpnt-typewriter-container ${className}` : 'tsx-cmpnt-typewriter-container'
      }
    >
      <span className="tsx-cmpnt-typewriter-text" style={{ color }}>
        {visibleText}
      </span>
      {displayCursor && <span className="tsx-cmpnt-typewriter-cursor"></span>}
    </div>
  );
};
