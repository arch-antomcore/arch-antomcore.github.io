import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignalTicker from './components/SignalTicker';
import ProductProof from './components/ProductProof';
import WhatItIs from './components/WhatItIs';
import TheShift from './components/TheShift';
import Architecture from './components/Architecture';
import HowItWorks from './components/HowItWorks';
import Capabilities from './components/Capabilities';
import Audience from './components/Audience';
import Philosophy from './components/Philosophy';
import InterfaceDemo from './components/InterfaceDemo';
import Vision from './components/Vision';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    if ((window as any).__aetherRuntimeReady || (window as any).__aetherRuntimeLoading) return;
    (window as any).__aetherRuntimeLoading = true;

    // Existing main.js logic needs to be integrated here or imported
    const loadScripts = async () => {
      try {
        // @ts-ignore
        const { initIcons } = await import('../icons.js');
        initIcons();

        // The previous Three.js hero was visually subtle but cost a large async chunk.
        // Keep the mount for future experiments, but don't ship the heavy runtime by default.
        document.documentElement.classList.add('hero-3d-disabled');

        // @ts-ignore
        const { initMain } = await import('../main.js');
        initMain();
        (window as any).__aetherRuntimeReady = true;
      } catch (error) {
        console.error('Aether runtime failed to initialize', error);
        document.documentElement.classList.add('runtime-fallback');
      } finally {
        (window as any).__aetherRuntimeLoading = false;
      }
    };

    loadScripts();
  }, []);

  return (
    <>
      {/* ── PREMIUM BACKGROUND SCENE ── */}
      <div className="premium-bg-scene" aria-hidden="true">
        <div className="premium-bg-gradient"></div>
        <div className="premium-bg-noise"></div>
      </div>

      <div className="site-ambient" aria-hidden="true"></div>
      <div className="aether-progress" data-scroll-progress aria-hidden="true"></div>
      <a href="#main-content" className="skip-link" aria-label="Skip to main content">Skip to content</a>

      <Navbar />

      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <SignalTicker />
        <ProductProof />
        <WhatItIs />
        <TheShift />
        <Architecture />
        <HowItWorks />
        <Capabilities />
        <Audience />
        <Philosophy />
        <InterfaceDemo />
        <Vision />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
