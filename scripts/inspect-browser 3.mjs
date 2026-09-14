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
await command("Emulation.setDeviceMetricsOverride", { width: 393, height: 900, deviceScaleFactor: 1, mobile: false });
await command("Page.enable");
await command("Page.reload", { ignoreCache: true });
await new Promise((resolve) => setTimeout(resolve, 800));
const expression = `(() => {
  const selectors = ['.orbit', '.portrait', '.product', '.brain', '.design', '.heart', '.intro', '.roles', '.selected-work', '.philosophy', '.connect', '.site-footer'];
  const boxes = Object.fromEntries(selectors.map(selector => {
    const element = document.querySelector(selector);
    const rect = element?.getBoundingClientRect();
    const style = element ? getComputedStyle(element) : null;
    return [selector, rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height, left: style.left, right: style.right, transform: style.transform } : null];
  }));
  return {
    innerWidth,
    innerHeight,
    devicePixelRatio,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    bodyScrollWidth: document.body.scrollWidth,
    boxes,
    missingImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
  };
})()`;
const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
console.log(JSON.stringify(result.result.result.value, null, 2));

const capture = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, fromSurface: true });
const { writeFile } = await import("node:fs/promises");
await writeFile("/tmp/portfolio-figma/actual-mobile-emulated.png", Buffer.from(capture.result.data, "base64"));

const openMenu = await command("Runtime.evaluate", {
  expression: `(() => { document.querySelector('.mobile-menu-trigger').click(); return new Promise(resolve => requestAnimationFrame(() => resolve({ expanded: document.querySelector('.mobile-menu-trigger').getAttribute('aria-expanded'), bodyOverflow: document.body.style.overflow, focused: document.activeElement?.textContent?.trim(), drawerOpen: document.querySelector('.drawer-backdrop').dataset.open }))); })()`,
  returnByValue: true,
  awaitPromise: true,
});
await command("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
await command("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
await new Promise((resolve) => setTimeout(resolve, 100));
const closedMenu = await command("Runtime.evaluate", { expression: `({ expanded: document.querySelector('.mobile-menu-trigger').getAttribute('aria-expanded'), bodyOverflow: document.body.style.overflow, focusedLabel: document.activeElement?.getAttribute('aria-label'), drawerOpen: document.querySelector('.drawer-backdrop').dataset.open })`, returnByValue: true });
console.log(JSON.stringify({ menuOpened: openMenu.result.result.value, menuAfterEscape: closedMenu.result.result.value }, null, 2));
socket.close();
