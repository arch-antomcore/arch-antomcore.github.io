import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "@/components/site/Layout";

const Home = React.lazy(() => import("@/pages/Home"));
const Produto = React.lazy(() => import("@/pages/Produto"));
const Precos = React.lazy(() => import("@/pages/Precos"));
const Arquitetura = React.lazy(() => import("@/pages/Arquitetura"));
const Casos = React.lazy(() => import("@/pages/Casos"));
const Principios = React.lazy(() => import("@/pages/Principios"));
const Faq = React.lazy(() => import("@/pages/Faq"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const Sustentabilidade = React.lazy(() => import("@/pages/Sustentabilidade"));
const Sobre = React.lazy(() => import("@/pages/Sobre"));
const Dossie = React.lazy(() => import("@/pages/Dossie"));
const Roadmap = React.lazy(() => import("@/pages/Roadmap"));
const Referencias = React.lazy(() => import("@/pages/Referencias"));
const Privacidade = React.lazy(() => import("@/pages/Privacidade"));
const DemoGlass = React.lazy(() => import("@/pages/DemoGlass"));
const Plugins = React.lazy(() => import("@/pages/Plugins"));
const GreenShaderPreview = React.lazy(() => import("@/pages/GreenShaderPreview"));

function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/produto" element={<Produto />} />
            <Route path="/precos" element={<Precos />} />
            <Route path="/arquitetura" element={<Arquitetura />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/casos-de-uso" element={<Casos />} />
            <Route path="/principios" element={<Principios />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/sustentabilidade" element={<Sustentabilidade />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/dossie" element={<Dossie />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/referencias" element={<Referencias />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/demo-glass" element={<DemoGlass />} />
            <Route path="/preview-shader" element={<GreenShaderPreview />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
