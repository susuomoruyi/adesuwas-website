/* Private analytics via GoatCounter (free, no cookies, no consent banner).
 *
 * 1. Sign up at https://www.goatcounter.com and pick a code, e.g. "adesuwa".
 * 2. Put that code below. Until you do, this file does nothing.
 * 3. Your dashboard is https://<code>.goatcounter.com, visible only when you log in.
 *
 * What it records (all anonymous):
 *   - page views (GoatCounter does this by itself)
 *   - read-50/<slug>   reader got halfway through an essay
 *   - read-end/<slug>  reader reached the end after a plausible reading time
 *   - click/<page>/<url>  a link was clicked (outbound links, and any link inside an essay)
 * In the dashboard, events show up in the page list; filter by "read-end" or "click".
 *
 * To stop counting your own visits: open any page of the site with #toggle-goatcounter
 * on the end of the address, once per browser.
 */
(function () {
  var GC = ""; // <- your GoatCounter code goes here

  if (!GC && !window.goatcounter) return;

  if (GC) {
    window.goatcounter = window.goatcounter || {};
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + GC + ".goatcounter.com/count");
    document.head.appendChild(s);
  }

  function count(path, title) {
    // count.js may still be loading; retry briefly
    var tries = 0;
    (function go() {
      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({ path: path, title: title || document.title, event: true });
      } else if (tries++ < 20) {
        setTimeout(go, 250);
      }
    })();
  }

  var m = location.pathname.match(/\/blog\/([^/]+)\/(?:index\.html)?$/);
  var slug = m && m[1] !== "index.html" ? m[1] : null;
  var body = document.querySelector(".post-body");
  var where = slug || (location.pathname.replace(/\/(index\.html)?$/, "").split("/").pop() || "home");

  // ---- Clicks ----
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    var outbound = url.host !== location.host && /^https?:|^mailto:/.test(url.protocol + "");
    var inPost = body && body.contains(a);
    if (!outbound && !inPost) return;
    var target = url.protocol === "mailto:" ? "mailto" : url.host + url.pathname.replace(/\/$/, "");
    count("click/" + where + "/" + target, "Click: " + target);
  });

  // ---- Reading depth (essays only) ----
  if (!slug || !body) return;
  var words = (body.textContent || "").trim().split(/\s+/).length;
  var minSeconds = Math.max(8, Math.round((words / 230) * 60 * 0.3)); // at least ~30% of the read time
  var start = Date.now();
  var sent50 = false, sentEnd = false, reachedEnd = false;

  function check() {
    var r = body.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var scrolled = (vh - r.top) / r.height; // 0 at the top edge, 1 when the bottom edge enters view
    if (!sent50 && scrolled >= 0.5) { sent50 = true; count("read-50/" + slug, document.title); }
    if (scrolled >= 1) reachedEnd = true;
    if (reachedEnd && !sentEnd && (Date.now() - start) / 1000 >= minSeconds) {
      sentEnd = true;
      count("read-end/" + slug, document.title);
    }
  }
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check);
  setInterval(check, 1500); // catches "reached the end earlier, but waited to finish reading"
  check();
})();
