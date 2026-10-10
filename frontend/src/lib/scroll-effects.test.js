import { initGsapReveals, gsap } from "./gsap";
import { initScrollAnimations } from "./scrollAnimations";

jest.mock("gsap", () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(), defaults: jest.fn(), set: jest.fn(),
    fromTo: jest.fn(),
  },
}));
jest.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { refresh: jest.fn() } }));
jest.mock("@gsap/react", () => ({ useGSAP: jest.fn() }));
jest.mock("./motionPreference", () => ({ prefersReducedMotion: () => false }));

describe("scroll effect route cleanup", () => {
  let cleanup;
  let previousResizeObserver;
  let previousIntersectionObserver;
  let previousCSS;
  let observer;

  beforeEach(() => {
    jest.clearAllMocks();
    gsap.fromTo.mockImplementation((element, from, to) => ({
      complete: to.onComplete, targets: () => [element],
      kill: jest.fn(), scrollTrigger: { kill: jest.fn() },
    }));
    previousResizeObserver = global.ResizeObserver;
    previousIntersectionObserver = global.IntersectionObserver;
    previousCSS = global.CSS;
    global.CSS = { supports: () => false };
    global.ResizeObserver = class { observe() {} disconnect() {} };
    global.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback;
        this.observe = jest.fn();
        this.unobserve = jest.fn();
        this.disconnect = jest.fn();
        observer = this;
      }
    };
  });
  afterEach(() => {
    cleanup?.();
    cleanup = null;
    document.body.replaceChildren();
    global.ResizeObserver = previousResizeObserver;
    global.IntersectionObserver = previousIntersectionObserver;
    global.CSS = previousCSS;
  });

  it("releases completed reveals and kills pending triggers when their route unmounts", async () => {
    const completed = document.createElement("section");
    const pending = document.createElement("section");
    completed.dataset.reveal = "rise";
    pending.dataset.reveal = "rise";
    document.body.append(completed, pending);
    cleanup = initGsapReveals();
    const [first, second] = gsap.fromTo.mock.results.map((result) => result.value);
    first.complete();
    pending.remove();
    await Promise.resolve();
    expect(second.kill).toHaveBeenCalledTimes(1);
    expect(second.scrollTrigger.kill).toHaveBeenCalledTimes(1);
    cleanup();
    cleanup = null;
    expect(first.kill).not.toHaveBeenCalled();
    expect(second.kill).toHaveBeenCalledTimes(1);
  });

  it("unobserves removed fallback reveals and handles newly mounted routes once", async () => {
    const element = document.createElement("section");
    element.className = "sda-rise";
    document.body.append(element);
    cleanup = initScrollAnimations();
    expect(observer.observe).toHaveBeenCalledTimes(1);
    element.remove();
    await Promise.resolve();
    expect(observer.unobserve).toHaveBeenCalledWith(element);
    document.body.append(element);
    await Promise.resolve();
    expect(observer.observe).toHaveBeenCalledTimes(2);
    observer.callback([{ target: element, isIntersecting: true }]);
    expect(element.classList.contains("sda-in")).toBe(true);
    element.remove();
    document.body.append(element);
    await Promise.resolve();
    expect(observer.observe).toHaveBeenCalledTimes(2);
  });
});
