import { useEffect, useRef } from "react";
import { VERT, FRAG_BLUR as FRAG } from "@/lib/shaders/greenShader";

const UNIFORMS = {
  colors: [[0.011764705882352941,0.07058823529411765,0.054901960784313725],[0.054901960784313725,0.48627450980392156,0.35294117647058826],[0.48627450980392156,0.8980392156862745,0.4666666666666667],[0.9568627450980393,1,0.7803921568627451],[0.9568627450980393,1,0.7803921568627451],[0.9568627450980393,1,0.7803921568627451],[0.9568627450980393,1,0.7803921568627451],[0.9568627450980393,1,0.7803921568627451]],
  colorCount: 4,
  scale: 1.160,
  intensity: 0.580,
  paramA: 0.500,
  warp: 0.420,
  detail: 2.400,
  contrast: 1.158,
  brightness: 0.000,
  saturation: 1.000,
  hue: 0.0000,
  vignette: 0.000,
  blur: 0.0000,
  grain: 0.091,
  seed: 1453.0,
  rotate: 0.0000,
  offsetX: 0.000,
  offsetY: 0.000,
  drift: 0.300,
  cursorEnabled: true,
  cursorEffect: 2.0,
  cursorStrength: 0.850,
  cursorRadius: 0.550,
  oklab: 0.0,
  timeScale: 1.350,
};

const pendingContextReleases = new WeakMap();

const getRenderBudget = () => {
  const tier = document.documentElement.dataset.motionTier || "medium";
  if (tier === "low") {
    return { maxPixels: 480_000, maxDpr: 1, fps: 24 };
  }
  if (tier === "high") {
    return { maxPixels: 1_250_000, maxDpr: 1.5, fps: 45 };
  }
  return { maxPixels: 780_000, maxDpr: 1.25, fps: 30 };
};

export function ShaderBackground({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pendingRelease = pendingContextReleases.get(canvas);
    if (pendingRelease !== undefined) window.clearTimeout(pendingRelease);
    pendingContextReleases.delete(canvas);
    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "high-performance",
      depth: false,
      stencil: false,
      alpha: true,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram();
    const vertexShader = compile(gl.VERTEX_SHADER, VERT);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uni = {
      colors: gl.getUniformLocation(program, "u_colors"),
      scene: gl.getUniformLocation(program, "u_scene"),
      shape: gl.getUniformLocation(program, "u_shape"),
      surface: gl.getUniformLocation(program, "u_surface"),
      finish: gl.getUniformLocation(program, "u_finish"),
      transform: gl.getUniformLocation(program, "u_transform"),
      space: gl.getUniformLocation(program, "u_space"),
      cursor: gl.getUniformLocation(program, "u_cursor"),
    };
    gl.uniform3fv(uni.colors, new Float32Array(UNIFORMS.colors.flat()));
    gl.uniform4f(
      uni.shape,
      UNIFORMS.scale,
      UNIFORMS.intensity,
      UNIFORMS.paramA,
      UNIFORMS.warp
    );
    gl.uniform4f(
      uni.surface,
      UNIFORMS.detail,
      UNIFORMS.contrast,
      UNIFORMS.brightness,
      UNIFORMS.saturation
    );
    gl.uniform4f(
      uni.finish,
      UNIFORMS.hue,
      UNIFORMS.vignette,
      UNIFORMS.blur,
      UNIFORMS.grain
    );
    gl.uniform4f(
      uni.transform,
      UNIFORMS.seed,
      UNIFORMS.rotate,
      UNIFORMS.drift,
      UNIFORMS.oklab
    );
    gl.uniform4f(
      uni.cursor,
      0,
      UNIFORMS.cursorEffect,
      UNIFORMS.cursorStrength,
      UNIFORMS.cursorRadius
    );

    let targetX = 0;
    let targetY = 0;
    let targetPresence = 0;
    let mouseX = 0;
    let mouseY = 0;
    let cursorPresence = 0;
    let pointerKnown = false;
    let pointerClientX = 0;
    let pointerClientY = 0;
    let bounds = canvas.getBoundingClientRect();
    let pageBounds = {
      left: bounds.left + window.scrollX,
      top: bounds.top + window.scrollY,
      width: bounds.width,
      height: bounds.height,
    };
    let renderBudget = getRenderBudget();
    let raf = 0;
    let lastNow = null;
    let lastDrawAt = 0;
    let visible = document.visibilityState === "visible";
    let inView = true;
    let disposed = false;
    const start = performance.now();
    const timeAnimated = Math.abs(UNIFORMS.timeScale) > 0.0001;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, renderBudget.maxDpr);
      const rawWidth = Math.max(1, Math.round(bounds.width * dpr));
      const rawHeight = Math.max(1, Math.round(bounds.height * dpr));
      const pixelScale = Math.min(
        1,
        Math.sqrt(renderBudget.maxPixels / Math.max(1, rawWidth * rawHeight))
      );
      const width = Math.max(1, Math.round(rawWidth * pixelScale));
      const height = Math.max(1, Math.round(rawHeight * pixelScale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    function requestRender() {
      if (!disposed && visible && inView && raf === 0) {
        raf = requestAnimationFrame(render);
      }
    }

    const updatePointerTarget = () => {
      if (!pointerKnown) return;
      if (pageBounds.width === 0 || pageBounds.height === 0) return;
      const pageX = pointerClientX + window.scrollX;
      const pageY = pointerClientY + window.scrollY;
      const inside =
        pageX >= pageBounds.left &&
        pageX <= pageBounds.left + pageBounds.width &&
        pageY >= pageBounds.top &&
        pageY <= pageBounds.top + pageBounds.height;
      if (!inside) {
        targetPresence = 0;
        requestRender();
        return;
      }
      const nextX = ((pageX - pageBounds.left) / pageBounds.width) * 2 - 1;
      const nextY = -(((pageY - pageBounds.top) / pageBounds.height) * 2 - 1);
      if (targetPresence === 0 && cursorPresence < 0.01) {
        mouseX = nextX;
        mouseY = nextY;
      }
      targetX = nextX;
      targetY = nextY;
      targetPresence = 1;
      requestRender();
    };
    const onPointerMove = (event) => {
      pointerKnown = true;
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      updatePointerTarget();
    };
    const onPointerLeave = () => {
      pointerKnown = false;
      targetPresence = 0;
      requestRender();
    };
    const updateLayout = () => {
      bounds = canvas.getBoundingClientRect();
      pageBounds = {
        left: bounds.left + window.scrollX,
        top: bounds.top + window.scrollY,
        width: bounds.width,
        height: bounds.height,
      };
      resizeCanvas();
      updatePointerTarget();
      requestRender();
    };
    const updateBudget = () => {
      renderBudget = getRenderBudget();
      lastDrawAt = 0;
      updateLayout();
    };
    window.addEventListener("resize", updateLayout);
    window.addEventListener("aether:motion-tier-change", updateBudget);
    if (UNIFORMS.cursorEnabled) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointercancel", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) requestRender();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    });
    intersectionObserver.observe(canvas);
    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      if (visible) requestRender();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    function render(now) {
      raf = 0;
      if (disposed || !visible || !inView) return;
      const frameInterval = 1000 / renderBudget.fps;
      if (lastDrawAt && now - lastDrawAt < frameInterval) {
        requestRender();
        return;
      }
      lastDrawAt = now;
      const dt = lastNow === null ? 0 : Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      const follow = 1 - Math.exp(-12 * dt);
      mouseX += (targetX - mouseX) * follow;
      mouseY += (targetY - mouseY) * follow;
      cursorPresence += (targetPresence - cursorPresence) * follow;
      const width = canvas.width;
      const height = canvas.height;
      gl.uniform4f(
        uni.scene,
        width,
        height,
        ((now - start) / 1000) * UNIFORMS.timeScale,
        UNIFORMS.colorCount
      );
      gl.uniform4f(
        uni.space,
        UNIFORMS.offsetX,
        UNIFORMS.offsetY,
        mouseX,
        mouseY
      );
      gl.uniform4f(
        uni.cursor,
        UNIFORMS.cursorEnabled ? cursorPresence : 0,
        UNIFORMS.cursorEffect,
        UNIFORMS.cursorStrength,
        UNIFORMS.cursorRadius
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      const pointerSettling =
        Math.abs(targetX - mouseX) > 0.001 ||
        Math.abs(targetY - mouseY) > 0.001 ||
        Math.abs(targetPresence - cursorPresence) > 0.001;
      if (timeAnimated || pointerSettling) requestRender();
      else lastNow = null;
    }
    requestRender();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("aether:motion-tier-change", updateBudget);
      if (UNIFORMS.cursorEnabled) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointercancel", onPointerLeave);
        window.removeEventListener("blur", onPointerLeave);
        document.documentElement.removeEventListener(
          "pointerleave",
          onPointerLeave
        );
      }
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      const releaseTimer = window.setTimeout(() => {
        if (pendingContextReleases.get(canvas) !== releaseTimer) return;
        pendingContextReleases.delete(canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.width = 1;
        canvas.height = 1;
      }, 0);
      pendingContextReleases.set(canvas, releaseTimer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={className} style={{ display: "block", width: "100%", height: "100%" }} />
  );
}
