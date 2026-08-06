"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 100,
    repeat = true,
    repeatDelay = 8000 // default to 8 seconds delay before repeating
}) => {
    const [letters, setLetters] = useState(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        })));
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const timeoutsRef = useRef([]);

    const scheduleTimeout = useCallback((fn, delay) => {
        const timer = setTimeout(fn, delay);
        timeoutsRef.current.push(timer);
        return timer;
    }, []);

    const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

    const animateLetter = useCallback((index) => {
        if (index >= text.length) return;

        requestAnimationFrame(() => {
            setLetters((prev) => {
                const newLetters = [...prev];
                if (!newLetters[index].isSpace) {
                    newLetters[index] = {
                        ...newLetters[index],
                        char: getRandomChar(),
                        isMatrix: true,
                    };
                }
                return newLetters;
            });

            scheduleTimeout(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    newLetters[index] = {
                        ...newLetters[index],
                        char: text[index],
                        isMatrix: false,
                    };
                    return newLetters;
                });
            }, letterAnimationDuration);
        });
    }, [getRandomChar, text, letterAnimationDuration, scheduleTimeout]);

    const startAnimation = useCallback(() => {
        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                if (repeat) {
                    scheduleTimeout(() => {
                        setAnimationKey((prev) => prev + 1);
                    }, repeatDelay);
                }
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            scheduleTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, letterInterval, repeat, repeatDelay, scheduleTimeout]);

    useEffect(() => {
        // Clear any previous timeouts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Reset letters to their original clean state before starting the new animation loop
        setLetters(
            text.split("").map((char) => ({
                char,
                isMatrix: false,
                isSpace: char === " ",
            }))
        );

        const timer = setTimeout(startAnimation, animationKey === 0 ? initialDelay : 0);
        timeoutsRef.current.push(timer);

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, [animationKey, text, initialDelay, startAnimation]);

    const motionVariants = useMemo(() => ({
        matrix: {
            color: "#A34A33",
            textShadow: "0 2px 4px rgba(163, 74, 51, 0.35)",
        },
    }), []);

    return (
        <span
            className={cn(
                "inline-flex items-center justify-center font-mono",
                className
            )}
            aria-label="Matrix text animation">
            <span className="flex flex-wrap items-center justify-center">
                {letters.map((letter, index) => (
                    <motion.span
                        key={`${index}-${letter.char}`}
                        className="w-[1ch] text-center overflow-hidden"
                        initial="initial"
                        animate={letter.isMatrix ? "matrix" : "normal"}
                        variants={motionVariants}
                        transition={{
                            duration: 0.1,
                            ease: "easeInOut",
                        }}
                        style={{
                            display: "inline-block",
                            fontVariantNumeric: "tabular-nums",
                        }}>
                        {letter.isSpace ? "\u00A0" : letter.char}
                    </motion.span>
                ))}
            </span>
        </span>
    );
};
