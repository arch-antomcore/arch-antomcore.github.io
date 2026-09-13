import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { ExpandableTabs } from "./expandable-tabs";

jest.mock("@/lib/utils", () => ({
  cn: (...values) => values.filter(Boolean).join(" "),
}), { virtual: true });

jest.mock("usehooks-ts", () => {
  const ReactModule = jest.requireActual("react");

  return {
    useOnClickOutside: (ref, handler) => {
      ReactModule.useEffect(() => {
        const onMouseDown = (event) => {
          if (ref.current && !ref.current.contains(event.target)) handler(event);
        };
        globalThis.document.addEventListener("mousedown", onMouseDown);
        return () => globalThis.document.removeEventListener("mousedown", onMouseDown);
      }, [ref, handler]);
    },
  };
});

jest.mock("framer-motion", () => {
  const ReactModule = jest.requireActual("react");
  const cache = {};
  const motion = new Proxy({}, {
    get: (_target, tag) => {
      if (!cache[tag]) {
        const MockMotion = ReactModule.forwardRef(({
          animate,
          children,
          custom,
          exit,
          initial,
          layout,
          layoutId,
          transition,
          variants,
          ...domProps
        }, ref) => ReactModule.createElement(tag, { ...domProps, ref }, children));
        MockMotion.displayName = `MockMotion(${String(tag)})`;
        cache[tag] = MockMotion;
      }
      return cache[tag];
    },
  });

  return {
    AnimatePresence: ({ children }) => children,
    motion,
    useReducedMotion: () => true,
  };
});

const Icon = (props) => <svg {...props} aria-hidden="true" />;
const titles = [
  "Home", "Ecosystem", "About", "Validation", "Product", "Sustainability",
  "Blog", "Pricing", "Architecture", "Plugins", "Cases", "Principles", "FAQ",
];
const tabs = titles.map((title) => ({ title, icon: Icon }));

describe("ExpandableTabs navbar behavior", () => {
  let container;
  let root;

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("keeps exactly one label expanded through hover and restores the active route", () => {
    act(() => {
      root.render(<ExpandableTabs tabs={tabs} activeTab={3} onChange={jest.fn()} />);
    });

    const tabList = container.firstElementChild;
    const buttons = [...container.querySelectorAll("button")];
    const expanded = () => buttons.filter((button) => button.dataset.navExpanded === "true");

    expect(tabList.classList.contains("flex-nowrap")).toBe(true);
    expect(tabList.classList.contains("flex-wrap")).toBe(false);
    expect(buttons).toHaveLength(13);
    expect(buttons.every((button, index) => button.getAttribute("aria-label") === titles[index])).toBe(true);
    expect(expanded()).toEqual([buttons[3]]);
    expect(buttons[3].getAttribute("aria-current")).toBe("page");

    act(() => {
      buttons[12].dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    expect(expanded()).toEqual([buttons[12]]);
    expect(buttons[3].getAttribute("aria-current")).toBe("page");

    act(() => {
      buttons[12].dispatchEvent(new MouseEvent("mouseout", {
        bubbles: true,
        relatedTarget: document.body,
      }));
    });

    expect(expanded()).toEqual([buttons[3]]);

    act(() => buttons[8].focus());
    expect(expanded()).toEqual([buttons[8]]);

    act(() => buttons[8].blur());
    expect(expanded()).toEqual([buttons[3]]);
  });

  it("does not erase a controlled active route when clicking outside", () => {
    act(() => {
      root.render(<ExpandableTabs tabs={tabs} activeTab={3} onChange={jest.fn()} />);
    });

    act(() => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    const active = container.querySelector('[aria-current="page"]');
    expect(active.textContent).toContain("Validation");
    expect(active.getAttribute("data-nav-expanded")).toBe("true");
  });
});
