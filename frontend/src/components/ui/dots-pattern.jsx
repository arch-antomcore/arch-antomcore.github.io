import React, { useEffect, useRef, useCallback } from 'react';

const InteractiveDots = ({
  backgroundColor = '#f4f1e8',
  dotColor = '#a8a294',
  gridSpacing = 35,
  animationSpeed = 0.003,
  removeWaveLine = true
}) => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const ripples = useRef([]);
  const dotsRef = useRef([]);
  const dprRef = useRef(1);

  const getMouseInfluence = (x, y) => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 180;
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getRippleInfluence = (x, y, currentTime) => {
    let totalInfluence = 0;
    ripples.current.forEach((ripple) => {
      const age = currentTime - ripple.time;
      const maxAge = 2500;
      if (age < maxAge) {
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleRadius = (age / maxAge) * 350;
        const rippleWidth = 70;
        if (Math.abs(distance - rippleRadius) < rippleWidth) {
          const rippleStrength = (1 - age / maxAge) * ripple.intensity;
          const proximityToRipple =
            1 - Math.abs(distance - rippleRadius) / rippleWidth;
          totalInfluence += rippleStrength * proximityToRipple;
        }
      }
    });
    return Math.min(totalInfluence, 2);
  };

  const initializeDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const dots = [];

    for (let x = gridSpacing / 2; x < canvasWidth; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < canvasHeight; y += gridSpacing) {
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    dotsRef.current = dots;
  }, [gridSpacing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    dprRef.current = dpr;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    initializeDots();
  }, [initializeDots]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback((e) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripples.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2.2,
    });

    const now = Date.now();
    ripples.current = ripples.current.filter(
      (ripple) => now - ripple.time < 2500
    );
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += animationSpeed;
    const currentTime = Date.now();

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    dotsRef.current.forEach((dot) => {
      const mouseInfluence = getMouseInfluence(dot.originalX, dot.originalY);
      const rippleInfluence = getRippleInfluence(
        dot.originalX,
        dot.originalY,
        currentTime
      );
      const totalInfluence = mouseInfluence + rippleInfluence;

      dot.x = dot.originalX;
      dot.y = dot.originalY;

      const baseDotSize = 1.0;
      const dotSize =
        baseDotSize +
        totalInfluence * 4.5 +
        Math.sin(timeRef.current + dot.phase) * 0.25;
      const opacity = Math.max(
        0.05,
        0.18 +
          totalInfluence * 0.35 +
          Math.abs(Math.sin(timeRef.current * 0.5 + dot.phase)) * 0.04
      );

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);

      const red = parseInt(dotColor.slice(1, 3), 16);
      const green = parseInt(dotColor.slice(3, 5), 16);
      const blue = parseInt(dotColor.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      ctx.fill();
    });

    if (!removeWaveLine) {
      ripples.current.forEach((ripple) => {
        const age = currentTime - ripple.time;
        const maxAge = 2500;
        if (age < maxAge) {
          const progress = age / maxAge;
          const radius = progress * 350;
          const alpha = (1 - progress) * 0.3 * ripple.intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.arc(ripple.x, ripple.y, radius, 0, 2 * Math.PI);
          ctx.stroke();

          const innerRadius = progress * 175;
          const innerAlpha = (1 - progress) * 0.2 * ripple.intensity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(120, 120, 120, ${innerAlpha})`;
          ctx.lineWidth = 1;
          ctx.arc(ripple.x, ripple.y, innerRadius, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, dotColor, removeWaveLine, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden && !animationFrameId.current) {
          animate();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      ripples.current = [];
      dotsRef.current = [];
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <div
      className='fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none'
      style={{ backgroundColor, zIndex: 0 }}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default InteractiveDots;
