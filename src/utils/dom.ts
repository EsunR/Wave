export function setThemeColorMeta(themeColor: string) {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", themeColor);
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      meta.setAttribute("content", themeColor);
      document.head.appendChild(meta);
    }
}
