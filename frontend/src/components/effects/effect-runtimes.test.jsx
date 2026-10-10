import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { AetherGreenShaderCanvas } from "./AetherGreenShader/AetherGreenShader";
import { RetroGrid } from "../ui/retro-grid";

jest.mock("@/lib/shaders/greenShader", () => ({ VERT: "vertex", FRAG: "fragment" }), { virtual: true });
jest.mock("@/lib/utils", () => ({ cn: (...classes) => classes.filter(Boolean).join(" ") }), { virtual: true });

describe("WebGL effect lifecycle", () => {
  let root;
  let container;
  let gl;
  let frames;
  let nextFrame;
  let intersection;
  let previousMatchMedia;
  let previousResizeObserver;
  let previousIntersectionObserver;
  let hiddenDescriptor;
  let visibilityDescriptor;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    jest.useFakeTimers();
    frames = new Map();
    nextFrame = 0;
    previousMatchMedia = window.matchMedia;
    previousResizeObserver = global.ResizeObserver;
    previousIntersectionObserver = global.IntersectionObserver;
    hiddenDescriptor = Object.getOwnPropertyDescriptor(document, "hidden");
    visibilityDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    window.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    global.ResizeObserver = class { observe() {} disconnect() {} };
    global.IntersectionObserver = class {
      constructor(callback) { intersection = callback; }
      observe() {} disconnect() {}
    };
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrame;
      frames.set(id, callback);
      return id;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => frames.delete(id));
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, right: 500, bottom: 300, width: 500, height: 300 });
    jest.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
    jest.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
    gl = {
      COMPILE_STATUS: 1, LINK_STATUS: 2, VERTEX_SHADER: 3, FRAGMENT_SHADER: 4,
      ARRAY_BUFFER: 5, STATIC_DRAW: 6, FLOAT: 7, TRIANGLES: 8, COLOR_BUFFER_BIT: 9,
      createShader: jest.fn(() => ({})), getShaderParameter: jest.fn(() => true),
      createProgram: jest.fn(() => ({})), getProgramParameter: jest.fn(() => true),
      createBuffer: jest.fn(() => ({})), getAttribLocation: jest.fn(() => 0),
      getUniformLocation: jest.fn((_program, name) => name),
      getExtension: jest.fn(() => ({ loseContext: jest.fn() })),
    };
    ["shaderSource", "compileShader", "deleteShader", "attachShader", "linkProgram", "useProgram", "bindBuffer", "bufferData", "enableVertexAttribArray", "vertexAttribPointer", "uniform3fv", "uniform4f", "uniform1f", "uniform2f", "uniform4fv", "viewport", "drawArrays", "clearColor", "clear", "deleteBuffer", "deleteProgram"].forEach((method) => { gl[method] = jest.fn(); });
    jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation((type) => type === "webgl" ? gl : null);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) act(() => root.unmount());
    container.remove();
    act(() => jest.runOnlyPendingTimers());
    window.matchMedia = previousMatchMedia;
    global.ResizeObserver = previousResizeObserver;
    global.IntersectionObserver = previousIntersectionObserver;
    if (hiddenDescriptor) Object.defineProperty(document, "hidden", hiddenDescriptor); else delete document.hidden;
    if (visibilityDescriptor) Object.defineProperty(document, "visibilityState", visibilityDescriptor); else delete document.visibilityState;
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const flushFrame = () => act(() => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => callback(32));
  });
  const setVisibility = (visible) => act(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: !visible });
    Object.defineProperty(document, "visibilityState", { configurable: true, value: visible ? "visible" : "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
  });

  it("keeps one shader pipeline when uniforms change and coalesces layout reads", () => {
    act(() => root.render(<AetherGreenShaderCanvas customUniforms={{ scale: 1 }} />));
    flushFrame();
    act(() => root.render(<AetherGreenShaderCanvas customUniforms={{ scale: 2 }} />));
    expect(gl.createProgram).toHaveBeenCalledTimes(1);
    expect(gl.uniform4f).toHaveBeenCalledWith("u_shape", 2, expect.any(Number), expect.any(Number), expect.any(Number));
    const reads = HTMLElement.prototype.getBoundingClientRect.mock.calls.length;
    act(() => {
      for (let i = 0; i < 20; i += 1) window.dispatchEvent(new MouseEvent("pointermove", { clientX: 100, clientY: 100 }));
      for (let i = 0; i < 10; i += 1) window.dispatchEvent(new Event("scroll"));
    });
    expect(HTMLElement.prototype.getBoundingClientRect).toHaveBeenCalledTimes(reads);
    expect(frames.size).toBe(1);
    flushFrame();
    expect(HTMLElement.prototype.getBoundingClientRect).toHaveBeenCalledTimes(reads + 1);
    expect(frames.size).toBe(1);
  });

  it("pauses the shader only while hidden or offscreen and recovers a lost WebGL context", () => {
    act(() => root.render(<AetherGreenShaderCanvas />));
    expect(frames.size).toBe(1);
    setVisibility(false);
    expect(frames.size).toBe(0);
    setVisibility(true);
    expect(frames.size).toBe(1);
    act(() => intersection([{ isIntersecting: false }]));
    expect(frames.size).toBe(0);
    act(() => intersection([{ isIntersecting: true }]));
    expect(frames.size).toBe(1);
    const canvas = container.querySelector("canvas");
    const lost = new Event("webglcontextlost", { cancelable: true });
    act(() => canvas.dispatchEvent(lost));
    expect(lost.defaultPrevented).toBe(true);
    expect(frames.size).toBe(0);
    act(() => canvas.dispatchEvent(new Event("webglcontextrestored")));
    expect(gl.createProgram).toHaveBeenCalledTimes(2);
    expect(frames.size).toBe(1);
    act(() => root.unmount());
    root = null;
    expect(frames.size).toBe(0);
  });

  it("releases a failed shader compilation without starting a render loop", () => {
    gl.getShaderParameter.mockReturnValue(false);
    act(() => root.render(<AetherGreenShaderCanvas />));
    expect(gl.deleteShader).toHaveBeenCalledTimes(2);
    expect(gl.deleteProgram).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(0);
  });

  it("animates the retro grid regardless of system reduction without reallocating unchanged buffers", () => {
    const widthSetter = jest.spyOn(HTMLCanvasElement.prototype, "width", "set");
    act(() => root.render(<RetroGrid />));
    const resizes = widthSetter.mock.calls.length;
    expect(window.matchMedia).not.toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    expect(frames.size).toBe(1);
    flushFrame();
    expect(gl.uniform1f).toHaveBeenCalledWith("u_time", 0.032);
    act(() => window.dispatchEvent(new Event("resize")));
    expect(widthSetter).toHaveBeenCalledTimes(resizes);
    expect(frames.size).toBe(1);
    setVisibility(false);
    expect(frames.size).toBe(0);
    expect(container.firstElementChild.dataset.retroGridActive).toBe("false");
    setVisibility(true);
    expect(frames.size).toBe(1);
    act(() => intersection([{ isIntersecting: false }]));
    expect(frames.size).toBe(0);
    act(() => intersection([{ isIntersecting: true }]));
    expect(frames.size).toBe(1);
  });
});
