import React, { useState, useRef, useEffect, useMemo } from 'react';
import { House as Home, Briefcase, Calendar, Shield, Gear as Settings } from "@phosphor-icons/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const defaultItems = [
    { label: 'home', title: 'Início', icon: Home, to: "/" },
    { label: 'strategy', title: 'Produto', icon: Briefcase, to: "/produto" },
    { label: 'period', title: 'Preços', icon: Calendar, to: "/precos" },
    { label: 'security', title: 'Casos', icon: Shield, to: "/casos-de-uso" },
    { label: 'settings', title: 'FAQ', icon: Settings, to: "/faq" },
];

const defaultAccentColor = 'var(--component-active-color-default, #A34A33)';

const InteractiveMenu = ({ items, accentColor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useTranslation();

  const finalItems = useMemo(() => {
     const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
     if (!isValid) {
        return defaultItems;
     }
     return items;
  }, [items]);

  // Determine active index from current route
  const activeRouteIndex = useMemo(() => {
    const index = finalItems.findIndex(item => {
      if (item.to === "/") {
        return location.pathname === "/";
      }
      return item.to && location.pathname.startsWith(item.to);
    });
    return index !== -1 ? index : 0;
  }, [location.pathname, finalItems]);

  const [activeIndex, setActiveIndex] = useState(activeRouteIndex);

  useEffect(() => {
    setActiveIndex(activeRouteIndex);
  }, [activeRouteIndex]);

  useEffect(() => {
      if (activeIndex >= finalItems.length) {
          setActiveIndex(0);
      }
  }, [finalItems, activeIndex]);

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];

      if (activeItemElement && activeTextElement) {
        // Temporarily reset width to get natural width
        const originalWidth = activeTextElement.style.width;
        activeTextElement.style.width = 'auto';
        activeTextElement.style.opacity = '0';
        activeTextElement.style.display = 'inline-block';
        
        const textWidth = activeTextElement.scrollWidth;
        
        // Restore properties
        activeTextElement.style.display = '';
        activeTextElement.style.opacity = '';
        activeTextElement.style.width = originalWidth;
        
        activeItemElement.style.setProperty('--lineWidth', `${textWidth}px`);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(setLineWidth, 10);

    window.addEventListener('resize', setLineWidth);
    return () => {
      window.removeEventListener('resize', setLineWidth);
    };
  }, [activeIndex, finalItems, language]);

  const handleItemClick = (index, to) => {
    setActiveIndex(index);
    if (to) {
      navigate(to);
    }
  };

  const navStyle = useMemo(() => {
      const activeColor = accentColor || defaultAccentColor;
      return { '--component-active-color': activeColor };
  }, [accentColor]); 

  return (
    <nav
      className="modern-mobile-menu"
      role="navigation"
      style={navStyle}
    >
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const isTextActive = isActive;
        const IconComponent = item.icon;

        // Try to get translated label from NAV_LINKS, otherwise use title
        const navLink = t.NAV_LINKS?.find(l => l.to === item.to);
        const displayLabel = navLink ? navLink.label : item.title;

        return (
          <button
            key={item.label}
            className={`menu__item ${isActive ? 'active' : ''}`}
            onClick={() => handleItemClick(index, item.to)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ '--lineWidth': '0px' }} 
            aria-label={displayLabel}
          >
            <div className="menu__icon">
              <IconComponent className="icon w-5 h-5" strokeWidth={isActive ? 2.5 : 1.75} />
            </div>
            <strong
              className={`menu__text ${isTextActive ? 'active' : ''}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              {displayLabel}
            </strong>
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
