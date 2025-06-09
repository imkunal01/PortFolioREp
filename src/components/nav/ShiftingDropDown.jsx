import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
  FiPieChart,
} from "react-icons/fi";

export const ShiftingDropDown = () => {
  return (
    <div className="fixed top-3 right-20 z-50 bg-transparent text-neutral-200 p-3 rounded">
      <div className="text-lg bg-gradient-to-r from-blue-500 via-white to-blue-500 text-transparent bg-clip-text">
        <Tabs />
      </div>
    </div>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => (
        <Tab
          key={t.id}
          selected={selected}
          handleSetSelected={handleSetSelected}
          tab={t.id}
        >
          {t.title}
        </Tab>
      ))}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab
          ? " bg-neutral-800 text-neutral-100"
          : "text-neutral-400"
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
    >
      <Bridge />
      <Nub selected={selected} />
      {TABS.map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;
      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

// === Tabs Content ===

const Services = () => {
  return (
    <div className="flex gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Web Development</h3>
        <a href="/services/web-development/frontend" className="mb-1 block text-sm text-neutral-400">
          Frontend Development
        </a>
        <a href="/services/web-development/backend" className="block text-sm text-neutral-400">
          Backend & API
        </a>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Graphic Design</h3>
        <a href="/services/graphic-design/logos" className="mb-1 block text-sm text-neutral-400">
          Logo & Branding
        </a>
        <a href="/services/graphic-design/uiux" className="block text-sm text-neutral-400">
          UI/UX Design
        </a>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Video Editing</h3>
        <a href="/services/video-editing/promos" className="mb-1 block text-sm text-neutral-400">
          Promo Videos
        </a>
        <a href="/services/video-editing/social-media" className="block text-sm text-neutral-400">
          Reels & Shorts
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>Explore Services</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
      <a
        href="/portfolio/web-projects"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiHome className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Web Projects</span>
      </a>
      <a
        href="/portfolio/designs"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiBarChart2 className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Designs</span>
      </a>
      <a
        href="/portfolio/videos"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiPieChart className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Video Edits</span>
      </a>
    </div>
  );
};

const Insights = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <a href="/insights/why-your-brand-needs-video">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src="/imgs/blog/4.png"
            alt="Brand Video Importance"
          />
          <h4 className="mb-0.5 text-sm font-medium">Why Your Brand Needs Video</h4>
          <p className="text-xs text-neutral-400">
            Discover how strategic video content can boost your business.
          </p>
        </a>
        <a href="/insights/modern-ui-principles">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src="/imgs/blog/5.png"
            alt="UI Design"
          />
          <h4 className="mb-0.5 text-sm font-medium">Modern UI Principles</h4>
          <p className="text-xs text-neutral-400">
            A quick guide to clean, user-friendly interface design in 2025.
          </p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>Read more insights</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

// === Tabs Definition ===

const TABS = [
  {
    title: "Services",
    Component: Services,
  },
  {
    title: "Portfolio",
    Component: Portfolio,
  },
  {
    title: "Insights",
    Component: Insights,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));

export default ShiftingDropDown;
