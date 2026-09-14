import { writeFile } from "node:fs/promises";

const targets = await fetch("http://127.0.0.1:9222/json").then((response) => response.json());
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("No browser page target found");

const socket = new WebSocket(target.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

function command(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve) => pending.set(id, resolve));
}

await command("Runtime.enable");
await command("Page.enable");

const widths = process.env.WIDTHS ? process.env.WIDTHS.split(",").map(Number) : [320, 360, 375, 390, 393, 430, 768, 820, 834, 1024, 1180, 1280];
const results = [];

for (const width of widths) {
  await command("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: false });
  await command("Page.reload", { ignoreCache: true });
  await new Promise((resolve) => setTimeout(resolve, 1100));
  await command("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto'; scrollTo(0, 0)" });
  await new Promise((resolve) => setTimeout(resolve, 40));
  const evaluation = await command("Runtime.evaluate", {
    expression: `(() => {
      const rect = selector => {
        const r = document.querySelector(selector)?.getBoundingClientRect();
        return r ? { x: +r.x.toFixed(2), y: +r.y.toFixed(2), width: +r.width.toFixed(2), height: +r.height.toFixed(2), right: +r.right.toFixed(2) } : null;
      };
      const words = ['.product', '.brain', '.design', '.heart'].map(rect);
      const links = [...document.querySelectorAll('.footer-left nav a')].map(a => +a.getBoundingClientRect().height.toFixed(2));
      const header = document.querySelector('.site-header');
      const intro = document.querySelector('.intro');
      const impact = [...document.querySelectorAll('.impact span')];
      return {
        viewport: innerWidth,
        horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
        overflowElements: [...document.querySelectorAll('body *')].map(element => ({ element, rect: element.getBoundingClientRect() })).filter(({ rect }) => rect.width > 0 && (rect.left < -0.5 || rect.right > innerWidth + .5)).slice(0, 12).map(({ element, rect }) => ({ tag: element.tagName, className: String(element.className), left: +rect.left.toFixed(2), right: +rect.right.toFixed(2), width: +rect.width.toFixed(2) })),
        fontFamily: getComputedStyle(document.body).fontFamily,
        fontLoaded: document.fonts.status,
        stickyPosition: getComputedStyle(header).position,
        headerTop: rect('.site-header').y,
        container: rect('.hero-inner'),
        work: rect('.selected-work'),
        orbit: rect('.orbit'),
        footer: rect('.site-footer'),
        footerInner: rect('.footer-inner'),
        footerLeft: rect('.footer-left'),
        footerLogo: rect('.footer-logo'),
        footerImpact: rect('.impact-wrap'),
        footerBrain: rect('.brain-art'),
        wordsInsideViewport: words.every(r => r.x >= -.5 && r.right <= innerWidth + .5),
        introFontSize: getComputedStyle(intro).fontSize,
        socialLinkHeights: links,
        impactLines: impact.map(span => ({ text: span.textContent, writingMode: getComputedStyle(span).writingMode, fontSize: getComputedStyle(span).fontSize })),
        missingImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).length,
      };
    })()`,
    returnByValue: true,
  });
  const value = evaluation.result.result.value;
  await command("Runtime.evaluate", { expression: "scrollTo(0, 600)" });
  await new Promise((resolve) => setTimeout(resolve, 60));
  const sticky = await command("Runtime.evaluate", { expression: "document.querySelector('.site-header').getBoundingClientRect().top", returnByValue: true });
  value.headerTopAfterScroll = sticky.result.result.value;
  results.push(value);

  if ([393, 834, 1280].includes(width)) {
    await command("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto'; scrollTo(0, 0)" });
    await new Promise((resolve) => setTimeout(resolve, 80));
    const capture = await command("Page.captureScreenshot", { format: "png", fromSurface: true });
    await writeFile(`/tmp/portfolio-${width}.png`, Buffer.from(capture.result.data, "base64"));
    await command("Runtime.evaluate", { expression: "scrollTo(0, document.documentElement.scrollHeight)" });
    await new Promise((resolve) => setTimeout(resolve, 250));
    const footerAtBottom = await command("Runtime.evaluate", { expression: `(() => { const box = selector => { const r = document.querySelector(selector)?.getBoundingClientRect(); return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null }; return { left: box('.footer-left'), logo: box('.footer-logo'), nav: box('.footer-left nav'), impact: box('.impact-wrap'), brain: box('.brain-art') }; })()`, returnByValue: true });
    value.footerAtBottom = footerAtBottom.result.result.value;
    const footerCapture = await command("Page.captureScreenshot", { format: "png", fromSurface: true });
    await writeFile(`/tmp/portfolio-${width}-footer.png`, Buffer.from(footerCapture.result.data, "base64"));
  }
}

console.log(JSON.stringify(results, null, 2));
socket.close();
