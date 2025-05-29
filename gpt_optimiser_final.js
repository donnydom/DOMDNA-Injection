(() => {
  console.log('[DOMDNA] gpt_optimiser_final.js loaded');

  const MAX_NODES = 80;
  const DEBUG = true;
  let lastGC = Date.now();

  const safeLog = (...args) => DEBUG && console.log("[DOMDNA]", ...args);

  const getMemoryUsage = () => {
    if (performance.memory) {
      const mb = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
      return `${mb} MB`;
    }
    return "Unavailable";
  };

  const trimNodes = () => {
    const nodes = [...document.querySelectorAll('article')].filter(
  el => el.innerText?.trim()?.length > 0
);
    const beforeCount = nodes.length;
    if (beforeCount > MAX_NODES) {
      const removed = nodes.slice(0, beforeCount - MAX_NODES);
      removed.forEach(el => el.remove());
      safeLog(`Trimmed ${removed.length} nodes. Now ${MAX_NODES} visible.`);
    }
  };

const watchDOM = () => {
  const conv = document.querySelector('main'); // more reliable root anchor

  if (!conv) {
    safeLog('Waiting for conversation container...');
    setTimeout(watchDOM, 1000);
    return;
  }

  safeLog('Found conversation container, starting observer');

  const mo = new MutationObserver(() => trimNodes());
  mo.observe(conv, { childList: true, subtree: true });
};


  window.__DOMDNA = {
    diag: () => {
      const msg = {
        "Nodes Visible": document.querySelectorAll('[data-testid="conversation-turn"]').length,
        "Web Heap Used": getMemoryUsage(),
        "Last GC": new Date(lastGC).toLocaleTimeString()
      };
      console.table(msg);
      return msg;
    },
    gc: () => {
      if (window.gc) {
        window.gc();
        lastGC = Date.now();
        safeLog('Manual GC invoked');
      }
    }
  };

  console.log('[DOMDNA] Optimizer initialized, watching DOM...');
  watchDOM();
})();
