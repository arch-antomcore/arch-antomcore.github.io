import React, { useEffect, useRef, useState } from "react";
import { VERT, FRAG } from "@/lib/shaders/greenShader";


const DEFAULT_UNIFORMS = {
  colors: [
    [0.0117, 0.0705, 0.0549],
    [0.0549, 0.4862, 0.3529],
    [0.4862, 0.8980, 0.4666],
    [0.9568, 1.0000, 0.7803],
    [0.9568, 1.0000, 0.7803],
    [0.9568, 1.0000, 0.7803],
    [0.9568, 1.0000, 0.7803],
    [0.9568, 1.0000, 0.7803],
  ],
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

const pendingReleases = new WeakMap();
const EMPTY_UNIFORMS = Object.freeze({});

export function AetherGreenShaderCanvas({ className = "h-full w-full", customUniforms = EMPTY_UNIFORMS }) {
  const canvasRef = useRef(null);
  const [contextVersion, setContextVersion] = useState(0);
  const uniformsRef = useRef(customUniforms);
  const syncUniformsRef = useRef(null);
  uniformsRef.current = customUniforms;

  useEffect(() => {
    syncUniformsRef.current?.();
  }, [customUniforms]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let UNIFORMS = { ...DEFAULT_UNIFORMS, ...uniformsRef.current };
    const pendingRelease = pendingReleases.get(canvas);
    if (pendingRelease !== undefined) window.clearTimeout(pendingRelease);
    pendingReleases.delete(canvas);

    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const program = gl.createProgram();
    const vertexShader = compile(gl.VERTEX_SHADER, VERT);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!program || !vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    if (!buf) {
      gl.deleteProgram(program);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    if (loc < 0) {
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      return;
    }
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
    gl.uniform4f(uni.shape, UNIFORMS.scale, UNIFORMS.intensity, UNIFORMS.paramA, UNIFORMS.warp);
    gl.uniform4f(uni.surface, UNIFORMS.detail, UNIFORMS.contrast, UNIFORMS.brightness, UNIFORMS.saturation);
    gl.uniform4f(uni.finish, UNIFORMS.hue, UNIFORMS.vignette, UNIFORMS.blur, UNIFORMS.grain);
    gl.uniform4f(uni.transform, UNIFORMS.seed, UNIFORMS.rotate, UNIFORMS.drift, UNIFORMS.oklab);
    gl.uniform4f(uni.cursor, 0, UNIFORMS.cursorEffect, UNIFORMS.cursorStrength, UNIFORMS.cursorRadius);

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
    let layoutDirty = true;
    let raf = 0;
    let lastNow = null;
    let visible = document.visibilityState === "visible";
    let inView = true;
    let disposed = false;
    let contextLost = false;
    const start = performance.now();

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rawWidth = Math.max(1, Math.round(bounds.width * dpr));
      const rawHeight = Math.max(1, Math.round(bounds.height * dpr));
      const pixelScale = Math.min(1, Math.sqrt(2_000_000 / Math.max(1, rawWidth * rawHeight)));
      const width = Math.max(1, Math.round(rawWidth * pixelScale));
      const height = Math.max(1, Math.round(rawHeight * pixelScale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    function requestRender() {
      if (!disposed && !contextLost && visible && inView && raf === 0) {
        raf = requestAnimationFrame(render);
      }
    }

    const updatePointerTarget = () => {
      if (!UNIFORMS.cursorEnabled) {
        targetPresence = 0;
        return;
      }
      if (!pointerKnown) return;
      if (bounds.width === 0 || bounds.height === 0) return;
      const inside =
        pointerClientX >= bounds.left &&
        pointerClientX <= bounds.right &&
        pointerClientY >= bounds.top &&
        pointerClientY <= bounds.bottom;
      if (!inside) {
        targetPresence = 0;
        requestRender();
        return;
      }
      const nextX = ((pointerClientX - bounds.left) / bounds.width) * 2 - 1;
      const nextY = -(((pointerClientY - bounds.top) / bounds.height) * 2 - 1);
      if (targetPresence === 0 && cursorPresence < 0.01) {
        mouseX = nextX;
        mouseY = nextY;
      }
      targetX = nextX;
      targetY = nextY;
      targetPresence = 1;
      requestRender();
    };

    const onPointerMove = (e) => {
      if (!UNIFORMS.cursorEnabled) return;
      pointerKnown = true;
      pointerClientX = e.clientX;
      pointerClientY = e.clientY;
      updatePointerTarget();
    };

    const onPointerLeave = () => {
      pointerKnown = false;
      targetPresence = 0;
      requestRender();
    };

    const updateLayout = () => {
      // Scroll and ResizeObserver can fire several times before a paint.
      // Read geometry and resize the buffer once, in the render callback.
      layoutDirty = true;
      requestRender();
    };

    const syncUniforms = () => {
      UNIFORMS = { ...DEFAULT_UNIFORMS, ...uniformsRef.current };
      if (contextLost) return;
      gl.uniform3fv(uni.colors, new Float32Array(UNIFORMS.colors.flat()));
      gl.uniform4f(uni.shape, UNIFORMS.scale, UNIFORMS.intensity, UNIFORMS.paramA, UNIFORMS.warp);
      gl.uniform4f(uni.surface, UNIFORMS.detail, UNIFORMS.contrast, UNIFORMS.brightness, UNIFORMS.saturation);
      gl.uniform4f(uni.finish, UNIFORMS.hue, UNIFORMS.vignette, UNIFORMS.blur, UNIFORMS.grain);
      gl.uniform4f(uni.transform, UNIFORMS.seed, UNIFORMS.rotate, UNIFORMS.drift, UNIFORMS.oklab);
      updatePointerTarget();
      requestRender();
    };
    syncUniformsRef.current = syncUniforms;

    window.addEventListener("resize", updateLayout);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointercancel", onPointerLeave);
    window.addEventListener("scroll", updateLayout, { capture: true, passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) updateLayout();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    });
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      if (visible) updateLayout();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const onContextLost = (event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(raf);
      raf = 0;
      lastNow = null;
    };
    const onContextRestored = () => setContextVersion((version) => version + 1);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    function render(now) {
      raf = 0;
      if (disposed || contextLost || !visible || !inView) return;
      if (layoutDirty) {
        layoutDirty = false;
        bounds = canvas.getBoundingClientRect();
        resizeCanvas();
        updatePointerTarget();
      }
      const dt = lastNow === null ? 0 : Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      const follow = 1 - Math.exp(-12 * dt);
      mouseX += (targetX - mouseX) * follow;
      mouseY += (targetY - mouseY) * follow;
      cursorPresence += (targetPresence - cursorPresence) * follow;

      gl.uniform4f(uni.scene, canvas.width, canvas.height, ((now - start) / 1000) * UNIFORMS.timeScale, UNIFORMS.colorCount);
      gl.uniform4f(uni.space, UNIFORMS.offsetX, UNIFORMS.offsetY, mouseX, mouseY);
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

      if (Math.abs(UNIFORMS.timeScale) > 0.0001 || pointerSettling) {
        requestRender();
      } else {
        lastNow = null;
      }
    }

    requestRender();

    return () => {
      disposed = true;
      syncUniformsRef.current = null;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointercancel", onPointerLeave);
      window.removeEventListener("scroll", updateLayout, true);
      window.removeEventListener("blur", onPointerLeave);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      const releaseTimer = window.setTimeout(() => {
        if (pendingReleases.get(canvas) !== releaseTimer) return;
        pendingReleases.delete(canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.width = 1;
        canvas.height = 1;
      }, 0);
      pendingReleases.set(canvas, releaseTimer);
    };
  }, [contextVersion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
