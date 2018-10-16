
export const getPuppeteerChromeUA = async browser => {
  const ua = await browser.userAgent()
  return ua
}
