import "./TypeWriter.css";
import {
    FC, 
    HTMLAttributes,
    useState, 
    useEffect
} from "react";

type TypeWriterProps = {
    terms: string[];
    speed?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
    delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    loop?: boolean;
    cursor?: boolean;
    className?: string;
    containerAttributes?: HTMLAttributes<HTMLDivElement>;
};

export const TypeWriter: FC<TypeWriterProps> = ({
    terms, 
    speed = 10, 
    delay = 2, 
    loop = true,
    cursor = true,
    className,
    containerAttributes
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleText, setVisibleText] = useState("");
    const [displayCursor, setDisplayCursor] = useState(cursor);

    useEffect(() => {
        if (terms.length === 0) {
            return;
        }
        if (activeIndex >= terms.length) {
            setActiveIndex(0);
            return;
        }
        if (terms[activeIndex].length === 0) {
            setActiveIndex(activeIndex + 1);
            return;
        }

        let stringIndex = 0;
        const intervalLength = 1000 / speed;
        const activeTerm = terms[activeIndex];
        const writeInterval = setInterval(() => {
            // write text
            setVisibleText(activeTerm.slice(0, stringIndex + 1));
            stringIndex++;

            if (stringIndex >= activeTerm.length) {
                clearInterval(writeInterval); 

                // text has been written, now pause
                setTimeout(() => {
                    // now delete the text, if looping
                    if (loop) {
                        const eraseInterval = setInterval(() => {
                            setVisibleText(activeTerm.slice(0, stringIndex + 1));
                            stringIndex--;

                            if (stringIndex === 0) {
                                clearInterval(eraseInterval);

                                // set activeIndex to index of next term
                                setActiveIndex(activeIndex + 1);
                            }
                        }, intervalLength);
                    } else {
                        setDisplayCursor(false);
                    }
                }, delay * 1000);
            }
        }, intervalLength);
    }, [activeIndex, delay, loop, speed, terms]);

    return (
        <div
            className={
                className
                    ? `tsx-cmpnt-typewriter-container ${className}`
                    : "tsx-cmpnt-typewriter-container"}
            {...containerAttributes}>
            <span className="tsx-cmpnt-typewriter-text">{visibleText}</span>
            {displayCursor && <span className="tsx-cmpnt-typewriter-cursor"></span>}
        </div>
    );
};