import React, { useEffect, useRef } from "react";

export function ShaderAnimation() {
  const containerRef = useRef(null);
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    // Load Three.js dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS();
      }
    };
    document.head.appendChild(script);

    let onWindowResizeRef = null;

    const initThreeJS = () => {
      if (!containerRef.current || !window.THREE) return;

      const THREE = window.THREE;
      const container = containerRef.current;

      // Clear any existing content
      container.innerHTML = "";

      // Initialize camera
      const camera = new THREE.Camera();
      camera.position.z = 1;

      // Initialize scene
      const scene = new THREE.Scene();

      // Create geometry
      const geometry = new THREE.PlaneBufferGeometry(2, 2);

      // Define uniforms
      const uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
      };

      // Vertex shader
      const vertexShader = `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }
      `;

      // Fragment shader
      const fragmentShader = `
        #define TWO_PI 6.2831853072
        #define PI 3.14159265359

        precision highp float;
        uniform vec2 resolution;
        uniform float time;
          
        float random (in float x) {
            return fract(sin(x)*1e4);
        }
        float random (vec2 st) {
            return fract(sin(dot(st.xy,
                                 vec2(12.9898,78.233)))*
                43758.5453123);
        }
        
        varying vec2 vUv;

        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
          
          vec2 fMosaicScal = vec2(4.0, 2.0);
          vec2 vScreenSize = vec2(256,256);
          uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
          uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
            
          float t = time*0.06+random(uv.x)*0.4;
          float lineWidth = 0.0008;

          vec3 color = vec3(0.0);
          for(int j = 0; j < 3; j++){
            for(int i=0; i < 5; i++){
              color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));        
            }
          }

          gl_FragColor = vec4(color[2],color[1],color[0],1.0);
        }
      `;

      // Create material
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      // Create mesh and add to scene
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Initialize renderer
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      container.appendChild(renderer.domElement);

      // Store references
      sceneRef.current = {
        camera,
        scene,
        renderer,
        uniforms,
        animationId: null,
      };

      // Handle resize
      const onWindowResize = () => {
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
      };

      onWindowResize();
      window.addEventListener("resize", onWindowResize, false);
      onWindowResizeRef = onWindowResize;

      let isVisible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !document.hidden && !sceneRef.current.animationId) {
            animate();
          }
        },
        { threshold: 0.02 }
      );
      observer.observe(container);

      // Animation loop
      const animate = () => {
        if (!isVisible || document.hidden) {
          sceneRef.current.animationId = null;
          return;
        }
        sceneRef.current.animationId = requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        observer.disconnect();
        if (sceneRef.current.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        if (sceneRef.current.renderer) {
          sceneRef.current.renderer.dispose();
        }
        if (onWindowResizeRef) {
          window.removeEventListener("resize", onWindowResizeRef);
        }
      };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0"
    />
  );
}
