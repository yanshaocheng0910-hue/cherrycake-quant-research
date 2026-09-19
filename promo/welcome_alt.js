(() => {
  "use strict";

  const DEMO_DURATION = 1800;
  const CANDLE_COLORS = Object.freeze({ rising: "#C43152", falling: "#19705D" });
  const FRACTAL_PULLBACKS = Object.freeze([22, 26, 30, 34]);
  const ACCELERATION_START = 36;
  const CLOUD_TRANSITION_START = 0.81;
  const REVEAL_SCHEDULE = Object.freeze([
    0, 0, 0, 0, 0, 0, 0, 0,
    0.055, 0.085, 0.115, 0.145, 0.175, 0.205, 0.235, 0.265, 0.295, 0.325,
    0.36, 0.395, 0.43, 0.465, 0.50, 0.535, 0.57, 0.605, 0.64, 0.675, 0.71,
    0.745, 0.775, 0.802, 0.827,
    0.85, 0.871, 0.89, 0.907, 0.923, 0.938, 0.952, 0.965, 0.976
  ]);
  const CLOSE_SERIES = Object.freeze([
    0.64, 0.60, 0.615, 0.565, 0.525, 0.545, 0.49, 0.455, 0.47, 0.415,
    0.38, 0.397, 0.345, 0.30, 0.262, 0.235, 0.214, 0.217,
    0.224, 0.242, 0.276, 0.318, 0.296, 0.354, 0.41, 0.468, 0.432, 0.505,
    0.568, 0.628, 0.582, 0.65, 0.718, 0.79, 0.728, 0.812,
    0.92, 1.075, 1.275, 1.535, 1.855, 2.235
  ]);

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const easeOut = (value) => 1 - Math.pow(1 - clamp01(value), 4);

  const buildCandles = () => {
    let seed = 0x23cc2026;
    const seeded = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const gaps = [-0.003, 0.0025, -0.002, 0.0035, -0.0025, 0.002];
    const result = [];
    let previousClose = CLOSE_SERIES[0] - 0.008;

    CLOSE_SERIES.forEach((close, index) => {
      let open;
      const isFractal = FRACTAL_PULLBACKS.includes(index);
      const isAcceleration = index >= ACCELERATION_START;
      if (index === 0) open = close - 0.01;
      else if (isAcceleration) open = previousClose - (0.012 + (index - ACCELERATION_START) * 0.0015);
      else open = previousClose + gaps[index % gaps.length];

      if (index === 17) {
        open = close + 0.0015;
      } else if (close >= open && close - open < 0.009) {
        open = close - 0.009;
      } else if (close < open && open - close < 0.009) {
        open = close + 0.009;
      }

      const body = Math.max(0.004, Math.abs(close - open));
      const isDoji = index === 17;
      const wickBase = isAcceleration ? 0.055 : 0.15;
      const wickNoise = isAcceleration ? 0.035 : 0.10;
      const wickCap = isAcceleration ? 0.016 : 0.017;
      const upperWick = isDoji ? 0.0045 : Math.min(wickCap, Math.max(0.003, body * (wickBase + seeded() * wickNoise)));
      const lowerWick = isDoji ? 0.0045 : Math.min(wickCap, Math.max(0.003, body * (wickBase + seeded() * wickNoise)));
      const x = 0.035 + index * 0.0228;
      result.push({
        x,
        open,
        close,
        high: Math.max(open, close) + upperWick,
        low: Math.min(open, close) - lowerWick,
        upperWick,
        lowerWick,
        isDoji,
        isFractal,
        isAcceleration
      });
      previousClose = close;
    });
    return result;
  };

  const candleColor = (item) => item.close >= item.open ? CANDLE_COLORS.rising : CANDLE_COLORS.falling;
  const animationProgressAt = (timestamp, origin, paused = 0, duration = DEMO_DURATION) => {
    const startedAt = Number.isFinite(origin) ? origin : timestamp - paused;
    return {
      startedAt,
      progress: Math.max(0, Math.min(1, (timestamp - startedAt) / Math.max(1, duration)))
    };
  };
  const demoModel = Object.freeze({
    duration: DEMO_DURATION,
    colors: CANDLE_COLORS,
    fractalPullbacks: FRACTAL_PULLBACKS,
    accelerationStart: ACCELERATION_START,
    cloudTransitionStart: CLOUD_TRANSITION_START,
    revealSchedule: REVEAL_SCHEDULE,
    buildCandles,
    candleColor,
    animationProgressAt
  });

  if (typeof globalThis !== "undefined") globalThis.__CC_ALT_DEMO_MODEL__ = demoModel;
  if (typeof module !== "undefined" && module.exports) module.exports = demoModel;
  if (typeof document === "undefined") return;

  const canvas = document.getElementById("altKlineCanvas");
  const hero = document.querySelector(".alt-hero");
  const animationStatus = document.querySelector("[data-alt-animation-status]");
  const trialRail = document.querySelector("[data-alt-trial-rail]");
  const forceDemo = new URLSearchParams(window.location.search).get("demo") === "play";

  const setAnimationStatus = (text) => {
    if (animationStatus && animationStatus.textContent !== text) animationStatus.textContent = text;
  };

  const revealTrialRail = () => {
    if (!trialRail || trialRail.classList.contains("alt-trial-rail-live")) return;
    trialRail.classList.add("alt-trial-rail-live");
    trialRail.dataset.state = "visible";
    trialRail.setAttribute("aria-hidden", "false");
  };

  if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { alpha: false });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduceHeroMotion = () => reducedMotion.matches && !forceDemo;
    const heroDuration = () => shouldReduceHeroMotion() ? 1500 : DEMO_DURATION;
    const frameInterval = 1000 / 30;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let candles = buildCandles();
    let progress = 0;
    let startedAt = null;
    let pausedAt = 0;
    let lastFrameAt = 0;
    let animationFrame = 0;
    let runToken = 0;
    let hasStartedOnce = false;
    let pendingHeroStart = Boolean(window.location.hash);
    const backgroundLayer = document.createElement("canvas");
    const farCloudLayer = document.createElement("canvas");
    const nearCloudLayer = document.createElement("canvas");
    const transitionCloudLayer = document.createElement("canvas");
    const backgroundCtx = backgroundLayer.getContext("2d", { alpha: false });
    const farCloudCtx = farCloudLayer.getContext("2d");
    const nearCloudCtx = nearCloudLayer.getContext("2d");
    const transitionCloudCtx = transitionCloudLayer.getContext("2d");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderBackgroundLayers();
      draw(progress);
    };

    const fitLayer = (layer, layerCtx) => {
      if (!layerCtx) return;
      layer.width = Math.round(width * dpr);
      layer.height = Math.round(height * dpr);
      layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layerCtx.clearRect(0, 0, width, height);
    };

    const paintCloudBank = (target, initialSeed, baseY, rise, tone, opacity, count) => {
      let seed = initialSeed >>> 0;
      const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      const scale = Math.min(width, height);
      for (let index = 0; index < count; index += 1) {
        const lane = count === 1 ? 0.5 : index / (count - 1);
        const x = (-0.08 + lane * 1.16) * width + (random() - 0.5) * width * 0.075;
        const y = (baseY - lane * rise + Math.sin(index * 1.47) * 0.025 + (random() - 0.5) * 0.06) * height;
        const radius = scale * (0.095 + random() * 0.105);
        const cloud = target.createRadialGradient(x, y, radius * 0.08, x, y, radius);
        cloud.addColorStop(0, `rgba(${tone},${opacity})`);
        cloud.addColorStop(0.56, `rgba(${tone},${opacity * 0.56})`);
        cloud.addColorStop(1, `rgba(${tone},0)`);
        target.fillStyle = cloud;
        target.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
    };

    const renderBackgroundLayers = () => {
      if (!backgroundCtx || !farCloudCtx || !nearCloudCtx || !transitionCloudCtx) return;
      fitLayer(backgroundLayer, backgroundCtx);
      fitLayer(farCloudLayer, farCloudCtx);
      fitLayer(nearCloudLayer, nearCloudCtx);
      fitLayer(transitionCloudLayer, transitionCloudCtx);

      const gradient = backgroundCtx.createLinearGradient(0, height, width, 0);
      gradient.addColorStop(0, "#e4eef3");
      gradient.addColorStop(0.52, "#edf3f6");
      gradient.addColorStop(1, "#f7f6f1");
      backgroundCtx.fillStyle = gradient;
      backgroundCtx.fillRect(0, 0, width, height);

      const haze = backgroundCtx.createRadialGradient(width * 0.82, height * 0.2, 20, width * 0.82, height * 0.2, width * 0.46);
      haze.addColorStop(0, "rgba(255,255,255,.82)");
      haze.addColorStop(1, "rgba(255,255,255,0)");
      backgroundCtx.fillStyle = haze;
      backgroundCtx.fillRect(0, 0, width, height);

      backgroundCtx.strokeStyle = "rgba(18,32,51,.095)";
      backgroundCtx.lineWidth = 1;
      for (let column = 1; column < 12; column += 1) {
        const x = (width / 12) * column;
        backgroundCtx.beginPath();
        backgroundCtx.moveTo(x, 0);
        backgroundCtx.lineTo(x, height);
        backgroundCtx.stroke();
      }
      for (let row = 1; row < 8; row += 1) {
        const y = (height / 8) * row;
        backgroundCtx.beginPath();
        backgroundCtx.moveTo(0, y);
        backgroundCtx.lineTo(width, y);
        backgroundCtx.stroke();
      }

      paintCloudBank(farCloudCtx, 0x91cc2026, 0.58, 0.12, "117,145,164", 0.22, 18);
      paintCloudBank(farCloudCtx, 0x71cc2026, 0.51, 0.09, "255,255,255", 0.5, 15);
      paintCloudBank(nearCloudCtx, 0x51cc2026, 0.76, 0.17, "91,121,142", 0.24, 16);
      paintCloudBank(nearCloudCtx, 0x31cc2026, 0.72, 0.14, "248,251,252", 0.82, 17);
      paintCloudBank(transitionCloudCtx, 0x29cc2026, 0.48, 0.055, "62,88,108", 0.52, 21);
      paintCloudBank(transitionCloudCtx, 0x19cc2026, 0.43, 0.045, "145,174,191", 0.7, 23);
      paintCloudBank(transitionCloudCtx, 0x09cc2026, 0.37, 0.03, "255,255,255", 0.96, 24);
    };

    const drawBackground = (rawProgress) => {
      if (!ctx) return;
      if (backgroundCtx) ctx.drawImage(backgroundLayer, 0, 0, width, height);
      else {
        ctx.fillStyle = "#E7EDF0";
        ctx.fillRect(0, 0, width, height);
      }
      const drift = shouldReduceHeroMotion() ? 0 : easeOut(rawProgress);
      ctx.globalAlpha = 0.76;
      if (farCloudCtx) ctx.drawImage(farCloudLayer, -6 * drift, -4 * drift, width, height);
      ctx.globalAlpha = 1;

      if (rawProgress > 0.62) {
        const opening = easeOut((rawProgress - 0.62) / 0.22);
        const burstX = width * 0.7;
        const burstY = height * (width <= 820 ? 0.24 : 0.38);
        const clearing = ctx.createRadialGradient(burstX, burstY, 0, burstX, burstY, Math.min(width, height) * 0.34);
        clearing.addColorStop(0, `rgba(255,255,255,${0.7 * opening})`);
        clearing.addColorStop(0.44, `rgba(226,239,246,${0.28 * opening})`);
        clearing.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = clearing;
        ctx.fillRect(0, 0, width, height);

        const beam = ctx.createLinearGradient(burstX, burstY, width, 0);
        beam.addColorStop(0, `rgba(255,255,255,${0.16 * opening})`);
        beam.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(burstX, burstY);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height * 0.2);
        ctx.closePath();
        ctx.fill();
      }
    };

    const drawForegroundMist = (rawProgress) => {
      if (!ctx || !nearCloudCtx) return;
      const opening = shouldReduceHeroMotion() ? 1 : easeOut((rawProgress - 0.62) / 0.2);
      ctx.globalAlpha = 0.48 - opening * 0.39;
      ctx.drawImage(nearCloudLayer, 28 * opening, -10 * opening, width, height);
      ctx.globalAlpha = 1;

      if (!shouldReduceHeroMotion() && transitionCloudCtx && rawProgress > CLOUD_TRANSITION_START) {
        const entry = easeOut((rawProgress - CLOUD_TRANSITION_START) / 0.15);
        const handoff = easeOut((rawProgress - 0.91) / 0.09);
        ctx.globalAlpha = 0.08 + entry * 0.84;
        ctx.drawImage(transitionCloudLayer, -42 * entry, 16 * (1 - entry), width + 68, height);
        if (handoff > 0) {
          const veil = ctx.createLinearGradient(width * 0.48, 0, width, 0);
          veil.addColorStop(0, "rgba(244,248,250,0)");
          veil.addColorStop(0.58, `rgba(244,248,250,${0.18 * handoff})`);
          veil.addColorStop(1, `rgba(255,255,255,${0.5 * handoff})`);
          ctx.fillStyle = veil;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.globalAlpha = 1;
      }
    };

    const plotBounds = () => width <= 820
      ? { left: width * 0.02, right: width * 1.02, top: height * 0.035, bottom: height * 0.4 }
      : { left: width * 0.04, right: width * 1.015, top: height * 0.08, bottom: height * 0.88 };
    const valueToY = (value, bounds) => bounds.bottom - clamp01((value - 0.17) / 2.32) * (bounds.bottom - bounds.top);
    const point = (item, value = item.close) => {
      const bounds = plotBounds();
      return {
        x: bounds.left + item.x * (bounds.right - bounds.left),
        y: valueToY(value, bounds)
      };
    };

    const phaseFor = (rawProgress) => {
      if (rawProgress < 0.16) return "observe";
      if (rawProgress < 0.38) return "base";
      if (rawProgress < 0.74) return "lift";
      if (rawProgress < 0.91) return "accelerate";
      return "handoff";
    };

    const phaseLabel = (phase) => ({
      observe: "回撤识别中",
      base: "圆弧筑底中",
      lift: "分型回踩后抬升",
      accelerate: "大阳柱加速入云",
      handoff: "穿云转入研究链"
    }[phase] || "演示中");

    const draw = (rawProgress) => {
      if (!ctx) return;
      progress = clamp01(rawProgress);
      drawBackground(progress);
      const visibleCount = candles.reduce((count, _item, index) => progress >= REVEAL_SCHEDULE[index] ? count + 1 : count, 0);
      const candleWidth = width <= 560 ? 7 : Math.max(10, Math.min(15, width * 0.0105));
      const bounds = plotBounds();

      for (let index = 0; index < visibleCount; index += 1) {
        const item = candles[index];
        const alpha = REVEAL_SCHEDULE[index] === 0 ? 1 : easeOut((progress - REVEAL_SCHEDULE[index]) / 0.022);
        const color = candleColor(item);
        const x = point(item).x;
        const openY = point(item, item.open).y;
        const closeY = point(item, item.close).y;
        const highY = point(item, item.high).y;
        const lowY = point(item, item.low).y;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = width <= 560 ? 1 : 1.5;
        if (item.isAcceleration && item.close >= item.open) {
          ctx.shadowColor = "rgba(196,49,82,.36)";
          ctx.shadowBlur = Math.min(14, candleWidth * 0.8);
        }
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        ctx.fillRect(x - candleWidth / 2, Math.min(openY, closeY), candleWidth, Math.max(4, Math.abs(closeY - openY)));
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      drawForegroundMist(progress);

      const phase = phaseFor(progress);
      if (hero) hero.dataset.scene = phase;
      canvas.dataset.animationState = progress >= 1 ? "complete" : "running";
      canvas.dataset.animationPhase = phase;
      setAnimationStatus(progress >= 1 ? "演示完成" : phaseLabel(phase));
      if (progress >= 1) revealTrialRail();
    };

    const tick = (timestamp, token) => {
      if (token !== runToken) return;
      const frame = animationProgressAt(timestamp, startedAt, pausedAt, heroDuration());
      startedAt = frame.startedAt;
      if (timestamp - lastFrameAt >= frameInterval) {
        lastFrameAt = timestamp;
        draw(frame.progress);
      }
      if (progress < 1 && !document.hidden) animationFrame = requestAnimationFrame((nextTimestamp) => tick(nextTimestamp, token));
    };

    const cancelCurrent = () => {
      runToken += 1;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const resumeAnimation = () => {
      cancelCurrent();
      startedAt = null;
      lastFrameAt = 0;
      const token = runToken;
      animationFrame = requestAnimationFrame((timestamp) => tick(timestamp, token));
    };

    const startAnimationOnce = () => {
      if (hasStartedOnce) return;
      hasStartedOnce = true;
      cancelCurrent();
      progress = 0;
      pausedAt = 0;
      startedAt = null;
      lastFrameAt = 0;
      draw(0);
      const token = runToken;
      // Paint the opening frame before the clock starts.  On a cold browser
      // load the cloud layers are expensive enough that starting immediately
      // can make the first visible frame look like the finished chart.
      animationFrame = requestAnimationFrame(() => {
        if (token !== runToken) return;
        animationFrame = requestAnimationFrame((timestamp) => tick(timestamp, token));
      });
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pausedAt = progress * heroDuration();
        cancelCurrent();
        if (progress < 1) {
          canvas.dataset.animationState = "paused";
          setAnimationStatus("演示已暂停");
        }
      } else if (progress < 1) {
        resumeAnimation();
      }
    });

    const handleMotionChange = () => {
      // Keep the one-shot K-line reveal visible. Reduced-motion mode only
      // removes cloud drift/transition and shortens the reveal slightly.
      renderBackgroundLayers();
      draw(progress);
    };
    if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", handleMotionChange);
    else if (typeof reducedMotion.addListener === "function") reducedMotion.addListener(handleMotionChange);

    if (!ctx) {
      canvas.dataset.animationState = "unavailable";
      setAnimationStatus("当前浏览器无法播放 Canvas 演示");
    } else {
      if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
      } else {
        window.addEventListener("resize", resize, { passive: true });
      }
      resize();

      if ("scrollRestoration" in history && (forceDemo || !window.location.hash)) history.scrollRestoration = "manual";
      if (forceDemo && window.location.hash) history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);

      if (forceDemo || !window.location.hash) {
        window.scrollTo(0, 0);
        pendingHeroStart = false;
        startAnimationOnce();
      } else {
        draw(0);
        canvas.dataset.animationState = "waiting";
        setAnimationStatus("返回首屏后开始演示");
      }

      if (hero && "IntersectionObserver" in window) {
        const heroObserver = new IntersectionObserver((entries) => {
          const entry = entries[0];
          const heroInView = Boolean(entry && entry.intersectionRatio >= 0.45);
          if (heroInView && pendingHeroStart && !hasStartedOnce) {
            pendingHeroStart = false;
            startAnimationOnce();
          }
        }, { threshold: [0.45, 0.7] });
        heroObserver.observe(hero);
      }

      window.addEventListener("pageshow", (event) => {
        if (!event.persisted || hasStartedOnce) return;
        if (!window.location.hash && window.scrollY < height * 0.6) startAnimationOnce();
        else pendingHeroStart = true;
      });

    }
  } else {
    setAnimationStatus("当前浏览器无法播放 Canvas 演示");
    revealTrialRail();
  }

  const switcher = document.querySelector("[data-alt-mode-switcher]");
  if (switcher) {
    const tabs = Array.from(switcher.querySelectorAll("[data-alt-mode-tab]"));
    const panels = Array.from(switcher.querySelectorAll("[data-alt-mode-panel]"));

    const activate = (name, focusTab = false) => {
      tabs.forEach((tab) => {
        const selected = tab.dataset.altModeTab === name;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focusTab) tab.focus();
      });
      panels.forEach((panel) => {
        const selected = panel.dataset.altModePanel === name;
        panel.setAttribute("aria-hidden", selected ? "false" : "true");
        if (selected) panel.removeAttribute("inert");
        else panel.setAttribute("inert", "");
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab.dataset.altModeTab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[nextIndex].dataset.altModeTab, true);
      });
    });
  }

  const showcase = document.querySelector("[data-alt-showcase]");
  if (showcase) {
    const tabs = Array.from(showcase.querySelectorAll("[data-alt-showcase-tab]"));
    const slides = Array.from(showcase.querySelectorAll("[data-alt-showcase-slide]"));
    const stage = showcase.querySelector("[data-alt-showcase-stage]");
    const track = showcase.querySelector("[data-alt-showcase-track]");
    const previous = showcase.querySelector("[data-alt-showcase-prev]");
    const next = showcase.querySelector("[data-alt-showcase-next]");
    const progressBar = showcase.querySelector("[data-alt-showcase-progress]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cycleDuration = 2000;
    let activeIndex = 0;
    let cycleTimer = 0;
    let cycleStartedAt = 0;
    let remaining = cycleDuration;
    let pointerPaused = false;
    let focusPaused = false;
    let inView = !("IntersectionObserver" in window);

    const clearCycleTimer = () => {
      clearTimeout(cycleTimer);
      cycleTimer = 0;
    };

    const restartProgress = () => {
      if (!progressBar) return;
      progressBar.classList.remove("alt-showcase-progress-live");
      void progressBar.offsetWidth;
      progressBar.classList.add("alt-showcase-progress-live");
    };

    const canAutoplay = () => inView && !pointerPaused && !focusPaused && !document.hidden;

    const pauseCycle = () => {
      if (cycleTimer) {
        remaining = Math.max(300, remaining - (performance.now() - cycleStartedAt));
        clearCycleTimer();
      }
      if (stage) stage.dataset.autoplay = "paused";
    };

    const scheduleCycle = (reset = false) => {
      clearCycleTimer();
      if (reset) {
        remaining = cycleDuration;
        restartProgress();
      }
      if (!canAutoplay()) {
        pauseCycle();
        return;
      }
      if (stage) stage.dataset.autoplay = "running";
      cycleStartedAt = performance.now();
      cycleTimer = window.setTimeout(() => {
        cycleTimer = 0;
        activateSlide(activeIndex + 1, { automatic: true });
      }, remaining);
    };

    const activateSlide = (nextIndex, options = {}) => {
      if (!tabs.length || !slides.length || !track) return;
      activeIndex = (nextIndex + slides.length) % slides.length;
      const slideOffset = activeIndex * 100;
      track.style.transform = `translate3d(-${slideOffset}%, 0, 0)`;
      tabs.forEach((tab, index) => {
        const selected = index === activeIndex;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (selected && options.focus) {
          tab.focus();
          tab.scrollIntoView({ block: "nearest", inline: "center", behavior: reducedMotion.matches ? "auto" : "smooth" });
        }
      });
      slides.forEach((slide, index) => {
        const selected = index === activeIndex;
        slide.setAttribute("aria-hidden", selected ? "false" : "true");
        if (selected) slide.removeAttribute("inert");
        else slide.setAttribute("inert", "");
      });
      scheduleCycle(true);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateSlide(index));
      tab.addEventListener("keydown", (event) => {
        let target = index;
        if (event.key === "ArrowRight") target = index + 1;
        else if (event.key === "ArrowLeft") target = index - 1;
        else if (event.key === "Home") target = 0;
        else if (event.key === "End") target = tabs.length - 1;
        else return;
        event.preventDefault();
        activateSlide(target, { focus: true });
      });
    });
    if (previous) previous.addEventListener("click", () => activateSlide(activeIndex - 1));
    if (next) next.addEventListener("click", () => activateSlide(activeIndex + 1));

    showcase.querySelectorAll(".alt-showcase-visual").forEach((visual) => {
      visual.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "touch") return;
        pointerPaused = true;
        pauseCycle();
      });
      visual.addEventListener("pointerleave", () => {
        pointerPaused = false;
        scheduleCycle(false);
      });
    });
    showcase.addEventListener("focusin", () => {
      focusPaused = true;
      pauseCycle();
    });
    showcase.addEventListener("focusout", () => {
      window.setTimeout(() => {
        focusPaused = showcase.contains(document.activeElement);
        if (!focusPaused) scheduleCycle(false);
      }, 0);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pauseCycle();
      else scheduleCycle(false);
    });
    const handleShowcaseMotion = () => scheduleCycle(false);
    if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", handleShowcaseMotion);
    else if (typeof reducedMotion.addListener === "function") reducedMotion.addListener(handleShowcaseMotion);

    restartProgress();
    if ("IntersectionObserver" in window) {
      const showcaseObserver = new IntersectionObserver((entries) => {
        inView = Boolean(entries[0] && entries[0].intersectionRatio >= 0.3);
        if (inView) scheduleCycle(false);
        else pauseCycle();
      }, { threshold: [0.05, 0.3, 0.6] });
      showcaseObserver.observe(showcase);
    } else {
      scheduleCycle(false);
    }
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".alt-nav-list a[href^='#']"));
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (!active) return;
      navLinks.forEach((link) => {
        const selected = link.getAttribute("href") === `#${active.target.id}`;
        if (selected) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-22% 0px -56% 0px", threshold: [0.08, 0.3, 0.55] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealTargets = Array.from(document.querySelectorAll(
    ".alt-section-intro, .alt-showcase-heading, .alt-showcase-tabs, .alt-showcase-stage, .alt-signal-ad-copy, .alt-media:not(.alt-product-visual), .alt-four-notes, .alt-flow-list, .alt-boundary-note, .alt-evidence-copy, .alt-validation-path, .alt-validation-actions, .alt-ai-proof, .alt-ai-roadmap, .alt-now-next-later"
  )).filter((el) => !el.closest("[data-alt-flipdeck],[data-alt-slidedown]"));  // 翻转/滑下段落由各自逻辑接管,排除出通用 reveal
  const pageReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!pageReducedMotion.matches && "IntersectionObserver" in window) {
    revealTargets.forEach((target) => target.classList.add("alt-reveal"));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("alt-reveal-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  const productVisuals = Array.from(document.querySelectorAll(".alt-product-visual"));
  if (pageReducedMotion.matches || !("IntersectionObserver" in window)) {
    productVisuals.forEach((visual) => visual.classList.add("alt-visual-live"));
  } else {
    const visualObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("alt-visual-live");
        visualObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.18 });
    productVisuals.forEach((visual) => visualObserver.observe(visual));
  }

  // 共享缓动 / 裁剪 / 插值 helpers(供效果A等复用)
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  void ease; void lerp;  // 暂保留,供后续动画复用

  // ===== 效果A:多图翻转展示(Flip Deck)=====
  // 滚动离散驱动:整段钉住,按滚动进度切到某个视图 index,给它 .is-active(其余默认/.is-past),
  // 由 CSS 完成快速 3D 翻页(rotateY+translateX+blur)与激活视图内文字分级跳出。不是计时器。
  Array.from(document.querySelectorAll("[data-alt-flipdeck]")).forEach((track, deckIndex) => {
    const pin = track.querySelector(".alt-flipdeck-pin");
    const slides = Array.from(track.querySelectorAll("[data-alt-flipdeck-slide]"));
    const dotsWrap = track.querySelector("[data-alt-flipdeck-dots]");
    if (!pin || slides.length < 2) return;
    const N = slides.length;
    const PER_VH = 0.9;                 // 每个视图占的滚动量(视口高度倍数)
    let scrollable = 0;
    let cur = -1;
    const isNarrow = () => window.matchMedia("(max-width:560px)").matches;
    // 强制播放:即使系统开了「减少动态」,滚动翻页也照常工作(只在窄屏关闭)。
    // CSS 的 reduced-motion 段已强制保留 .62s 过渡时长,所以翻页依旧可见。
    const fdEnabled = () => !isNarrow();

    const dots = slides.map((slide, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "第 " + (i + 1) + " 个视图");
      slide.id = slide.id || "alt-flipdeck-" + (deckIndex + 1) + "-slide-" + (i + 1);
      b.setAttribute("aria-controls", slide.id);
      b.addEventListener("click", () => activateIndex(i));
      b.addEventListener("keydown", (event) => {
        let next = i;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % N;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i - 1 + N) % N;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = N - 1;
        else return;
        event.preventDefault();
        activateIndex(next);
        dots[next].focus();
      });
      dotsWrap && dotsWrap.appendChild(b);
      return b;
    });
    const setActive = (idx) => {
      if (idx === cur) return;
      cur = idx;
      slides.forEach((s, i) => {
        s.classList.toggle("is-active", i === idx);
        s.classList.toggle("is-past", i < idx);
        s.setAttribute("aria-hidden", i === idx ? "false" : "true");
        if (i === idx) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      });
      dots.forEach((d, i) => {
        d.setAttribute("aria-selected", i === idx ? "true" : "false");
        d.tabIndex = i === idx ? 0 : -1;
      });
    };
    const activateIndex = (idx) => {
      if (fdEnabled() && scrollable > 0) {
        const rect = track.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + rect.top + (idx + 0.5) / N * scrollable, behavior: "smooth" });
      } else if (isNarrow()) {
        slides[idx].scrollIntoView({ behavior: pageReducedMotion.matches ? "auto" : "smooth", block: "center" });
      } else {
        track.classList.add("is-armed");
        setActive(idx);
      }
    };

    const setGeom = () => {
      if (!fdEnabled()) { track.style.height = ""; scrollable = 0; return; }
      scrollable = Math.round(N * PER_VH * window.innerHeight);
      track.style.height = pin.offsetHeight + scrollable + "px";
    };

    let ticking = false;
    const render = () => {
      ticking = false;
      if (isNarrow()) {                          // 窄屏:全部展开,清晰常显
        track.classList.remove("is-armed");
        slides.forEach((s, i) => { s.classList.remove("is-past"); s.classList.toggle("is-active", i === 0); s.removeAttribute("aria-hidden"); s.removeAttribute("inert"); });
        dots.forEach((d, i) => { d.setAttribute("aria-selected", i === 0 ? "true" : "false"); d.tabIndex = i === 0 ? 0 : -1; });
        cur = 0;
        return;
      }
      if (!fdEnabled()) {                        // 减少动态:不钉住，只保留无动画的点选切换
        track.classList.add("is-armed");
        if (cur < 0) setActive(0);
        return;
      }
      const rect = track.getBoundingClientRect();
      // 段落进入视口才「上膛」,让第一个视图的文字也能分级跳出
      const armed = rect.top <= window.innerHeight * 0.5 && rect.bottom > 0;
      track.classList.toggle("is-armed", armed);
      const p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      setActive(clamp(Math.floor(p * N), 0, N - 1));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };

    setGeom();
    setActive(0);
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { setGeom(); render(); });
    if (pageReducedMotion.addEventListener) pageReducedMotion.addEventListener("change", () => { setGeom(); render(); });
  });

  // ===== 效果A-对比版:自动播放(Auto Deck)=====
  // 计时器自动翻页:每张停留 CYCLE 毫秒。切到某张时给它 .is-active(其余淡出),
  // 由 CSS 分级 delay 完成「字先播完(0.05~0.78s) → 图再滑上来(1.4s)」。悬停图片/聚焦/离开视口即暂停。
  Array.from(document.querySelectorAll("[data-alt-autodeck]")).forEach((deck) => {
    const stage = deck.querySelector("[data-alt-autodeck-stage]");
    const slides = Array.from(deck.querySelectorAll("[data-alt-autodeck-slide]"));
    const dotsWrap = deck.querySelector("[data-alt-autodeck-dots]");
    const prevBtn = deck.querySelector("[data-alt-autodeck-prev]");
    const nextBtn = deck.querySelector("[data-alt-autodeck-next]");
    if (!stage || slides.length < 2) return;
    const N = slides.length;
    const CYCLE = 3800;                 // 每张停留:字~0.78s 播完 + 图 1.4s delay 后约 2.3s 落位 + 停留 1.5s 即翻,让「自动播放」更明显
    let cur = 0, timer = 0, pointerPaused = false, focusPaused = false, inView = false;

    const dots = slides.map((slide, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "第 " + (i + 1) + " 个视图");
      slide.id = slide.id || "alt-autodeck-slide-" + (i + 1);
      b.setAttribute("aria-controls", slide.id);
      b.addEventListener("click", () => { go(i); schedule(); });
      b.addEventListener("keydown", (e) => {
        let n = i;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % N;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + N) % N;
        else if (e.key === "Home") n = 0; else if (e.key === "End") n = N - 1; else return;
        e.preventDefault(); go(n); dots[n].focus(); schedule();
      });
      dotsWrap && dotsWrap.appendChild(b);
      return b;
    });

    const go = (idx) => {
      cur = (idx + N) % N;
      slides.forEach((s, i) => {
        s.classList.toggle("is-active", i === cur);
        s.setAttribute("aria-hidden", i === cur ? "false" : "true");
        if (i === cur) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      });
      dots.forEach((d, i) => { d.setAttribute("aria-selected", i === cur ? "true" : "false"); d.tabIndex = i === cur ? 0 : -1; });
    };

    const isNarrow = () => window.matchMedia("(max-width:560px)").matches;
    const canPlay = () => inView && !isNarrow() && !pointerPaused && !focusPaused && !document.hidden;
    const stop = () => { if (timer) { clearTimeout(timer); timer = 0; } };
    const schedule = () => {
      stop();
      if (!canPlay()) return;
      timer = window.setTimeout(() => { timer = 0; go(cur + 1); schedule(); }, CYCLE);
    };

    // 悬停在图片上/聚焦控件时暂停(遵循此前「只锁图片」的约定:hover 目标限定 figure)
    const media = () => slides.map((s) => s.querySelector(".alt-flipdeck-media")).filter(Boolean);
    media().forEach((m) => {
      m.addEventListener("mouseenter", () => { pointerPaused = true; deck.classList.add("alt-autodeck-arrow-pause"); stop(); });
      m.addEventListener("mouseleave", () => { pointerPaused = false; deck.classList.remove("alt-autodeck-arrow-pause"); schedule(); });
    });
    deck.addEventListener("focusin", () => { focusPaused = true; stop(); });
    deck.addEventListener("focusout", () => { focusPaused = false; schedule(); });
    prevBtn && prevBtn.addEventListener("click", () => { go(cur - 1); schedule(); });
    nextBtn && nextBtn.addEventListener("click", () => { go(cur + 1); schedule(); });
    document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else schedule(); });

    // 强制重放当前视图的分级动画:先加复位类把子元素「无过渡」打回 opacity:0(回流提交),
    // 再去掉复位类,分级 delay 才会从头重跑 —— 字先播完(0.78s)图才滑上来(1.4s)。离开再回来也能重播。
    const replay = () => {
      const active = slides[cur];
      if (!active || isNarrow()) return;
      active.classList.add("is-reveal-reset");
      void active.offsetWidth;              // 提交 opacity:0 起点
      active.classList.remove("is-reveal-reset");
    };
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const nowIn = e.isIntersecting;
          if (nowIn && !inView) { inView = true; replay(); schedule(); }
          else if (!nowIn && inView) { inView = false; stop(); }
        });
      }, { threshold: 0.3 });
      obs.observe(deck);
    } else { inView = true; schedule(); }

    // 初态:只设置 is-active/aria(让首屏内容就位),分级动画交给进视口时的 replay() 触发,
    // 避免第一张在屏幕外就把级联播完 —— 那正是「第一页直接蹦出来没动画」的根因。
    go(0);
  });

  // ===== 效果B:单图从上滑下展示(Slide-down)=====
  // 进入视口一次性触发:文字分级跳出 → 单图从上方滑落到位(CSS 处理),由 IntersectionObserver 只跑一次。
  Array.from(document.querySelectorAll("[data-alt-slidedown]")).forEach((sec) => {
    // 产品方明确要求宣传动效强制播放；只有浏览器缺少观察器时才直接落位。
    if (!("IntersectionObserver" in window)) { sec.classList.add("is-in"); return; }
    // 每次进入视口都重播:进入加 is-in、离开去掉;滚上去再滚回来能再次触发(不 unobserve)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-in", entry.isIntersecting);
      });
    }, { rootMargin: "0px 0px -18% 0px", threshold: 0.2 });
    obs.observe(sec);
  });
})();
