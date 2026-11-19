/* 《雾汀塔罗》H5 抽牌页
   今日一抽：同一天、同一种子抽到同一张（localStorage 按日期 + 种子记）。
   雾 / 灯 / 信三张牌阵：一次抽 3 张不重复的牌（同一种子同一组）。
   求援提示词只含已抽到的牌和牌意，不含牌面之外的“真相”（这副牌没有隐藏答案）。 */
(function () {
  "use strict";
  var C = (typeof window !== "undefined" && window.FogCommon) || null;
  var T = (typeof window !== "undefined" && window.FogTarot) || null;
  var CARDS = T ? T.cards : [];
  var KEY = "fog-h5-tarot";
  var POSITIONS = [
    { key: "fog", name: "雾", note: "面对什么" },
    { key: "lamp", name: "灯", note: "该怎么做" },
    { key: "letter", name: "信", note: "会收到什么" }
  ];

  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function todayStr(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }
  function imgFor(i) {
    return "../assets/tarot/" + pad2(i) + "-" + CARDS[i].id + ".webp";
  }
  function allIndices() {
    var out = [];
    for (var i = 0; i < CARDS.length; i++) out.push(i);
    return out;
  }

  /* ---------------- 逻辑（可测） ---------------- */
  function drawDailyIndex(rng) { return rng.randint(0, CARDS.length - 1); }
  function drawSpreadIndices(rng) { return rng.sample(allIndices(), 3); }
  function helpPrompt(items) {
    // items: [{ index, where }]，只写已抽到的牌
    var lines = ["我在雾汀塔罗抽到了这几张牌，帮我读读："];
    for (var i = 0; i < items.length; i++) {
      var c = CARDS[items[i].index];
      lines.push("【" + c.numeral + " " + c.name + "】" +
        (items[i].where ? "（" + items[i].where + "）" : "") +
        " 画面：" + c.figure + " 关键词：" + c.keywords + " 牌意：" + c.meaning);
    }
    lines.push("只按这几张牌的牌面读，不要编造牌面之外的真相。");
    return lines.join("\n");
  }

  /* ---------------- 暴露给测试（Node） ---------------- */
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      KEY: KEY, POSITIONS: POSITIONS,
      todayStr: todayStr, pad2: pad2, imgFor: imgFor,
      drawDailyIndex: drawDailyIndex, drawSpreadIndices: drawSpreadIndices,
      helpPrompt: helpPrompt
    };
  }
  if (typeof window !== "undefined") {
    window.FogTarotPage = {
      KEY: KEY, POSITIONS: POSITIONS,
      todayStr: todayStr, pad2: pad2, imgFor: imgFor,
      drawDailyIndex: drawDailyIndex, drawSpreadIndices: drawSpreadIndices,
      helpPrompt: helpPrompt
    };
  }

  /* ---------------- 浏览器 UI ---------------- */
  if (typeof document === "undefined") return;
  var seed = C.seedFromURL();
  var today = todayStr();
  var dailyDrawn = -1;
  var spreadDrawn = null;

  function cardBackHTML() {
    return '<div class="tarot-back" role="img" aria-label="牌背：雾纹与封蜡"><div class="wax"></div></div>';
  }
  function cardInfoHTML(i) {
    var c = CARDS[i];
    return '<p class="tarot-name">' + C.esc(c.numeral) + " · " + C.esc(c.name) + "</p>" +
      '<p class="tarot-info">' + C.esc(c.figure) + '<br><span class="k">关键词：' + C.esc(c.keywords) + "</span><br>" + C.esc(c.meaning) + "</p>";
  }
  function renderDaily() {
    var slot = document.getElementById("daily-slot");
    var btn = document.getElementById("btn-daily");
    if (dailyDrawn >= 0) {
      var c = CARDS[dailyDrawn];
      slot.innerHTML = '<div class="tarot-single" data-card-id="' + C.esc(c.id) + '">' +
        '<img class="tarot-img" src="' + imgFor(dailyDrawn) + '" alt="' + C.esc(c.numeral + " " + c.name) + '">' +
        cardInfoHTML(dailyDrawn) + "</div>";
      btn.disabled = true;
      btn.textContent = "今日已抽 · " + today;
    } else {
      slot.innerHTML = '<div class="tarot-single">' + cardBackHTML() + "</div>";
      btn.disabled = false;
      btn.textContent = "抽今日一牌";
    }
  }
  function renderSpread() {
    var wrap = document.getElementById("spread-slots");
    var html = [];
    for (var p = 0; p < 3; p++) {
      var pos = POSITIONS[p];
      html.push('<div class="tarot-cell">');
      html.push('<p class="tarot-pos">' + C.esc(pos.name) + " · " + C.esc(pos.note) + "</p>");
      if (spreadDrawn) {
        var i = spreadDrawn[p];
        var c = CARDS[i];
        html.push('<div data-card-id="' + C.esc(c.id) + '">' +
          '<img class="tarot-img" src="' + imgFor(i) + '" alt="' + C.esc(c.numeral + " " + c.name) + '">' +
          cardInfoHTML(i) + "</div>");
      } else {
        html.push(cardBackHTML());
      }
      html.push("</div>");
    }
    wrap.innerHTML = html.join("");
    document.getElementById("btn-spread").textContent =
      spreadDrawn ? "已抽出三张牌（换一局可再抽）" : "抽雾 / 灯 / 信三张牌阵";
  }
  function collectDrawn() {
    var out = [];
    if (dailyDrawn >= 0) out.push({ index: dailyDrawn, where: "今日一抽" });
    if (spreadDrawn) {
      for (var p = 0; p < 3; p++) out.push({ index: spreadDrawn[p], where: POSITIONS[p].name });
    }
    return out;
  }
  function saveDaily() {
    C.saveState(KEY, { date: today, seed: seed, daily: dailyDrawn });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("seed-tag").textContent = "种子 #" + seed;
    document.getElementById("daily-date").textContent = today;
    var saved = C.loadState(KEY);
    if (saved && saved.date === today && saved.seed === seed && typeof saved.daily === "number") {
      dailyDrawn = saved.daily;
    }
    document.getElementById("btn-daily").addEventListener("click", function () {
      if (dailyDrawn >= 0) return;
      dailyDrawn = drawDailyIndex(C.RNG(seed));
      saveDaily();
      renderDaily();
    });
    document.getElementById("btn-spread").addEventListener("click", function () {
      if (spreadDrawn) return;
      spreadDrawn = drawSpreadIndices(C.RNG(seed));
      renderSpread();
    });
    document.getElementById("btn-new").addEventListener("click", function () {
      C.clearState(KEY);
      location.href = C.seedURL(C.randomSeed());
    });
    document.getElementById("btn-restart").addEventListener("click", function () {
      C.clearState(KEY);
      location.href = C.seedURL(seed);
    });
    document.getElementById("btn-help").addEventListener("click", function () {
      var items = collectDrawn();
      if (!items.length) { C.toast("先抽一张牌。"); return; }
      C.copyText(helpPrompt(items), "求援提示词已复制，去问你的 AI 吧。");
    });
    renderDaily();
    renderSpread();
  });
})();
