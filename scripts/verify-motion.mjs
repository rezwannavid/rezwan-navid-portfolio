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

const evaluate = async (expression) => {
  const response = await command("Runtime.evaluate", { expression, returnByValue: true });
  return response.result.result.value;
};

await command("Runtime.enable");
await command("Page.enable");
await command("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await command("Page.navigate", { url: "http://localhost:3000" });
await new Promise((resolve) => setTimeout(resolve, 1300));

const center = await evaluate(`(() => { const r = document.querySelector('.product').getBoundingClientRect(); return { x: r.left + r.width / 2 + 34, y: r.top + r.height / 2 + 18 }; })()`);
const resting = await evaluate(`getComputedStyle(document.querySelector('.product .magnetic-word-inner')).transform`);
await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: center.x, y: center.y });
await new Promise((resolve) => setTimeout(resolve, 260));
const engaged = await evaluate(`getComputedStyle(document.querySelector('.product .magnetic-word-inner')).transform`);
await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1260, y: 880 });
await new Promise((resolve) => setTimeout(resolve, 1200));
const settled = await evaluate(`getComputedStyle(document.querySelector('.product .magnetic-word-inner')).transform`);
const reducedMotionRule = await evaluate(`matchMedia('(prefers-reduced-motion: reduce)').media`);

await command("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 1 });
await command("Emulation.setDeviceMetricsOverride", { width: 393, height: 900, deviceScaleFactor: 1, mobile: true });
await command("Page.reload", { ignoreCache: true });
await new Promise((resolve) => setTimeout(resolve, 1000));
const touchMedia = await evaluate(`({ hover: matchMedia('(hover: hover)').matches, fine: matchMedia('(pointer: fine)').matches })`);
await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: 80, y: 120 });
await new Promise((resolve) => setTimeout(resolve, 300));
const touchInlineTransform = await evaluate(`document.querySelector('.product .magnetic-word-inner').style.transform`);

console.log(JSON.stringify({
  resting,
  engaged,
  settled,
  moved: engaged !== resting,
  returned: settled !== engaged,
  reducedMotionRule,
  touchMedia,
  touchInteractionDisabled: touchInlineTransform === "",
}, null, 2));
socket.close();
