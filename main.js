(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  function setNav(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      setNav(!nav.classList.contains("open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setNav(false);
        burger.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- WhatsApp enquiry forms ----------
     Nothing is sent to a server. The form builds a WhatsApp message from the
     fields and opens WhatsApp; the visitor must still press Send there. */
  var VISA_PARAM = { uk: "UK Visa", schengen: "Schengen Visa", dubai: "Dubai (UAE) Visa", china: "China Visa" };

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  document.querySelectorAll(".wa-form").forEach(function (form) {
    var wa = form.getAttribute("data-wa");
    var mail = form.getAttribute("data-email");
    var title = form.getAttribute("data-title") || "Enquiry";
    var status = form.querySelector(".status");
    var visa = form.elements["visa"];
    var schengenWrap = form.querySelector(".sc-wrap");
    var schengenInput = form.elements["schengen_country"];
    var date = form.elements["travel_date"];

    form.hidden = false; /* the form is hidden in the HTML so it never shows without JavaScript */

    if (date) {
      var d = new Date();
      date.min = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    }

    function syncSchengen() {
      if (!schengenWrap || !visa) return;
      var show = visa.value === "Schengen Visa";
      schengenWrap.hidden = !show;
      if (!show && schengenInput) schengenInput.value = "";
    }
    if (visa) {
      try {
        var q = new URLSearchParams(window.location.search).get("visa");
        if (q && VISA_PARAM[q.toLowerCase()]) visa.value = VISA_PARAM[q.toLowerCase()];
      } catch (err) { /* ignore */ }
      visa.addEventListener("change", syncSchengen);
      syncSchengen();
    }

    function show(msg, isError, links) {
      status.hidden = false;
      status.className = "status" + (isError ? " err" : "");
      status.textContent = "";
      var p = document.createElement("p");
      p.textContent = msg;
      status.appendChild(p);
      if (links && links.length) {
        var wrap = document.createElement("p");
        links.forEach(function (l, i) {
          if (i) wrap.appendChild(document.createTextNode(" · "));
          var a = document.createElement("a");
          a.href = l.href;
          a.textContent = l.text;
          if (l.external) { a.target = "_blank"; a.rel = "noopener"; }
          wrap.appendChild(a);
        });
        status.appendChild(wrap);
      }
    }

    function fail(msg, el) {
      show(msg, true);
      if (el && el.focus) el.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;

      var fields = form.querySelectorAll("input[data-label],select[data-label],textarea[data-label]");
      var lines = [];
      var i, el, v;

      /* Trimmed required-field checks (native "required" accepts spaces only). */
      for (i = 0; i < fields.length; i++) {
        el = fields[i];
        if (el.required && !el.value.trim()) {
          return fail("Please fill in: " + el.getAttribute("data-label") + ".", el);
        }
      }
      var email = form.elements["email"];
      if (email && email.value.trim() && !email.checkValidity()) {
        return fail("Please enter a valid email address, or leave it blank.", email);
      }
      var phone = form.elements["phone"];
      if (phone && phone.value.trim() && (!phone.checkValidity() || phone.value.replace(/\D/g, "").length < 7)) {
        return fail("Please enter a valid phone number, or leave it blank.", phone);
      }
      if (date && date.value && date.min && date.value < date.min) {
        return fail("The planned travel date is in the past. Please choose a later date.", date);
      }
      var consent = form.elements["consent"];
      if (consent && !consent.checked) {
        return fail("Please tick the consent box so we can use your details to respond.", consent);
      }

      lines.push("*New " + title + " - Facilis Travel*");
      for (i = 0; i < fields.length; i++) {
        el = fields[i];
        v = el.value.trim().replace(/\s*\n\s*/g, "\n");
        if (v) lines.push(el.getAttribute("data-label") + ": " + v);
      }
      lines.push("(Sent from the Facilis Travel website form)");
      var text = lines.join("\n");

      var waUrl = "https://wa.me/" + wa + "?text=" + encodeURIComponent(text);
      var mailUrl = mail ? "mailto:" + mail + "?subject=" + encodeURIComponent(title + " - Facilis Travel") + "&body=" + encodeURIComponent(text) : null;

      var w = null;
      try { w = window.open(waUrl, "_blank"); if (w) w.opener = null; } catch (err) { w = null; }

      var links = [{ text: "Open WhatsApp", href: waUrl, external: true }];
      if (mailUrl) links.push({ text: "Email us instead", href: mailUrl });
      links.push({ text: "Call us", href: "tel:+27635048891" });

      show(w
        ? "WhatsApp should now be open with your message ready. Nothing has been sent until you press Send in WhatsApp, and nothing has been submitted to any embassy or visa centre. If WhatsApp did not open, use a link below."
        : "Your browser did not open WhatsApp. Nothing has been sent. Please use one of the links below to contact us.",
        !w, links);
    });
  });
})();
