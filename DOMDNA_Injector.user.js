
// ==UserScript==
// @name         DOMDNA Injector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Injects DOMDNA optimiser into ChatGPT for DOM trimming, diagnostics, and visual node tracking
// @author       DrDom
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/DrDomDNA/DOMDNA-Injection/gpt_optimiser_final.js';
    script.onload = () => {
        const waitForDNA = setInterval(() => {
            if (window.__DOMDNA?.init) {
                clearInterval(waitForDNA);
                window.__DOMDNA.init({ annotate: true });
            }
        }, 100);
        setTimeout(() => clearInterval(waitForDNA), 5000);
    };
    script.onerror = (e) => {
        console.error('[DOMDNA] Failed to load optimiser script:', script.src, e);
    };
    document.body.appendChild(script);
})();
