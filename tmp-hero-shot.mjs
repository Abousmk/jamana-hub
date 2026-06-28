import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(5000);
const info = await page.evaluate(() => {
  const hero = document.querySelector("#hero");
  const imgs = [...hero.querySelectorAll("img")].map((img) => ({
    alt: img.alt,
    w: Math.round(img.getBoundingClientRect().width),
  }));
  return { imgCount: imgs.length, imgs, hasCanvas: Boolean(hero.querySelector("canvas")) };
});
console.log(JSON.stringify(info));
await page.screenshot({ path: "hero-hills-screenshot.png", timeout: 30000 });
await browser.close();
