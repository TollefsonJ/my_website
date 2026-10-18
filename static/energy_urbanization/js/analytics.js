/* ==========================================================
   GOOGLE ANALYTICS
   Loaded from the <head> of every page.

   This copy of the atlas lives inside the personal Hugo site,
   so it reports to that site's property. Files under Hugo's
   static/ folder are copied out verbatim and never pass
   through Hugo's templates, which is why the theme's own
   analytics partial does not reach these pages and the tag
   has to be loaded here instead.

   GA_ID is the Measurement ID from Google Analytics
   (Admin > Data streams > your web stream). Set it to ""
   to switch tracking off everywhere.

   Visits from a local test server are ignored, so neither
   run_local_server.bat nor `hugo server` shows up in the
   statistics.
   ========================================================== */
const GA_ID = "G-LET2FCN9RR";

(function () {
  if (!GA_ID || GA_ID.indexOf("G-") !== 0) return;

  var h = location.hostname;
  if (h === "localhost" || h === "127.0.0.1" || h === "" || h.endsWith(".local")) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_ID);
})();
