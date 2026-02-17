import { useState, useEffect } from "react";

const C = {
  bg: "#0C0C12", card: "#16161F", card2: "#1E1E2A", border: "#252535",
  accent: "#7C6EFF", accentDim: "#7C6EFF18", accentGlow: "#7C6EFF35",
  green: "#2DD4A0", greenDim: "#2DD4A018",
  orange: "#F59E0B", orangeDim: "#F59E0B18",
  red: "#F87171", blue: "#60A5FA", blueDim: "#60A5FA18",
  pink: "#F472B6", pinkDim: "#F472B618",
  yellow: "#FBBF24", yellowDim: "#FBBF2418",
  t1: "#EEEEF8", t2: "#9090B0", t3: "#44445A",
};

const SUBJECTS = {
  "Türkçe": {
    icon: "📖", color: C.blue, colorDim: C.blueDim, soruSayisi: 20,
    topics: [
      { ad: "Ses Bilgisi (Ses Özellikleri & Ses Olayları)", sure: 60 },
      { ad: "Hece & Sözcük Yapısı (Kök, Ek, Türeme)", sure: 75 },
      { ad: "Sözcük Türleri – İsim & Zamir", sure: 60 },
      { ad: "Sözcük Türleri – Sıfat & Zarf", sure: 60 },
      { ad: "Sözcük Türleri – Fiil (Çekim, Kip, Kişi)", sure: 90 },
      { ad: "Sözcük Türleri – Bağlaç, Edat, Ünlem", sure: 45 },
      { ad: "Cümle Bilgisi – Öge Dizilimi", sure: 75 },
      { ad: "Cümle Bilgisi – Yüklem Türleri", sure: 60 },
      { ad: "Anlam Bilgisi – Sözcükte & Cümlede Anlam", sure: 90 },
      { ad: "Paragraf – Ana Fikir, Başlık, Boşluk Doldurma", sure: 90 },
      { ad: "Yazım Kuralları – Büyük/Küçük Harf, Birleşik", sure: 60 },
      { ad: "Noktalama İşaretleri", sure: 45 },
      { ad: "Anlatım Bozuklukları", sure: 90 },
      { ad: "Karma Türkçe Soru Çözümü", sure: 90 },
    ],
  },
  "Matematik": {
    icon: "🔢", color: C.green, colorDim: C.greenDim, soruSayisi: 20,
    topics: [
      { ad: "Sayı Sistemleri & Temel Kavramlar", sure: 45 },
      { ad: "Bölünebilme Kuralları & EBOB-EKOK", sure: 60 },
      { ad: "Kesirler & Ondalık Sayılar", sure: 45 },
      { ad: "Oran-Orantı & Yüzde", sure: 60 },
      { ad: "Temel Cebir (Denklem & Eşitsizlik)", sure: 75 },
      { ad: "Kümeler & Mantık", sure: 75 },
      { ad: "Fonksiyonlar & Grafik Yorumlama", sure: 60 },
      { ad: "Sayma (Permütasyon & Kombinasyon)", sure: 75 },
      { ad: "Olasılık", sure: 60 },
      { ad: "İstatistik (Ortalama, Mod, Medyan)", sure: 60 },
      { ad: "Geometri – Açılar & Üçgenler", sure: 75 },
      { ad: "Geometri – Dörtgen & Çember", sure: 75 },
      { ad: "Problem – Yaş & Hız", sure: 60 },
      { ad: "Problem – İş, Havuz & Karışım", sure: 60 },
      { ad: "Karma Matematik Soru Çözümü", sure: 75 },
    ],
  },
  "Tarih": {
    icon: "🏛", color: C.orange, colorDim: C.orangeDim, soruSayisi: 19,
    topics: [
      { ad: "İlk Türk Devletleri (Hunlar, Göktürkler, Uygurlar)", sure: 60 },
      { ad: "İslamiyet Öncesi & Sonrası Türk Toplumu", sure: 60 },
      { ad: "Selçuklular (Büyük Selçuklu & Anadolu)", sure: 60 },
      { ad: "Osmanlı Kuruluş & Yükselme Dönemi", sure: 75 },
      { ad: "Osmanlı Duraklama & Gerileme", sure: 60 },
      { ad: "Osmanlı Dağılma & Islahat Hareketleri", sure: 75 },
      { ad: "Birinci Dünya Savaşı & Mondros", sure: 60 },
      { ad: "Kurtuluş Savaşı (Kongreler & TBMM)", sure: 90 },
      { ad: "Kurtuluş Savaşı (Cepheler & Zafer)", sure: 90 },
      { ad: "Lozan & Cumhuriyetin İlanı", sure: 60 },
      { ad: "Atatürk İnkılapları – Siyasi", sure: 90 },
      { ad: "Atatürk İnkılapları – Sosyal, Kültürel, Ekonomik", sure: 90 },
      { ad: "İnönü Dönemi & Çok Partili Hayat", sure: 60 },
      { ad: "1960 Sonrası Türkiye", sure: 45 },
      { ad: "Karma Tarih Soru Çözümü", sure: 75 },
    ],
  },
  "Coğrafya": {
    icon: "🌍", color: C.green, colorDim: "#2DD4A018", soruSayisi: 6,
    topics: [
      { ad: "Dünya'nın Şekli, Hareketleri & Koordinatlar", sure: 45 },
      { ad: "İklim Bilgisi (İklim Türleri & Faktörler)", sure: 60 },
      { ad: "Türkiye'nin Coğrafi Konumu & Bölgeler", sure: 60 },
      { ad: "Türkiye'de Nüfus, Yerleşme & Göç", sure: 45 },
      { ad: "Harita Bilgisi & Beşeri Coğrafya", sure: 45 },
      { ad: "Karma Coğrafya Soru Çözümü", sure: 45 },
    ],
  },
  "Vatandaşlık": {
    icon: "⚖️", color: C.pink, colorDim: C.pinkDim, soruSayisi: 8,
    topics: [
      { ad: "Devlet & Hukuk Temel Kavramlar", sure: 45 },
      { ad: "T.C. Anayasası – Temel Hak & Ödevler", sure: 60 },
      { ad: "T.C. Anayasası – Devletin Temel İlkeleri", sure: 60 },
      { ad: "Yasama – TBMM Yapısı & İşleyişi", sure: 45 },
      { ad: "Yürütme – Cumhurbaşkanı & Yürütme Organları", sure: 45 },
      { ad: "Yargı Organları & Anayasa Mahkemesi", sure: 45 },
      { ad: "Seçim Sistemi & Siyasi Partiler", sure: 30 },
      { ad: "Karma Vatandaşlık Soru Çözümü", sure: 45 },
    ],
  },
  "Güncel Bilgiler": {
    icon: "📰", color: C.yellow, colorDim: C.yellowDim, soruSayisi: 7,
    topics: [
      { ad: "Türkiye Güncel Olaylar (Siyaset & Ekonomi)", sure: 45 },
      { ad: "Türkiye Büyük Projeleri & Kalkınma Planları", sure: 45 },
      { ad: "Dünya Güncel & Uluslararası İlişkiler", sure: 45 },
      { ad: "Bilim, Teknoloji & Çevre Haberleri", sure: 30 },
      { ad: "Kültür, Sanat & Spor Güncel", sure: 30 },
    ],
  },
};

const SINAV_TARIHI = new Date("2026-09-06T09:00:00");

const SCHEDULE = {
  0: { label: "Pazartesi", work: true, sport: true, yl: false, mins: 90 },
  1: { label: "Salı", work: true, sport: true, yl: false, mins: 90 },
  2: { label: "Çarşamba", work: true, sport: false, yl: true, mins: 60 },
  3: { label: "Perşembe", work: true, sport: true, yl: true, mins: 60 },
  4: { label: "Cuma", work: true, sport: true, yl: true, mins: 90 },
  5: { label: "Cumartesi", work: false, sport: false, yl: false, mins: 480 },
  6: { label: "Pazar", work: false, sport: false, yl: false, mins: 420 },
};

// Hafta içi konu ataması
const DAY_SUBS = {
  0: ["Türkçe", "Matematik"],
  1: ["Tarih", "Vatandaşlık"],
  2: ["Türkçe", "Güncel Bilgiler"],
  3: ["Matematik", "Coğrafya"],
  4: ["Tarih", "Güncel Bilgiler"],
  5: ["Türkçe", "Matematik", "Tarih", "Vatandaşlık", "Coğrafya"],
  6: null, // Deneme günü
};

function getDow(date) { return date.getDay(); }
function jsDowToIdx(jsDay) { return jsDay === 0 ? 6 : jsDay - 1; }

function getMondayDate(date, offset = 0) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff + offset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDates(monday) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function daysLeft() {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const exam = new Date(SINAV_TARIHI); exam.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((exam - now) / 86400000));
}

function generateTasks(schedIdx, weekNum) {
  if (schedIdx === 6) {
    return [
      { id: "deneme", subject: "Deneme Sınavı", topic: `Mini Deneme #${weekNum} – GY/GK (80 Soru, 60 Soru/oturum)`, sure: 120, type: "deneme", icon: "📊", color: C.accent },
      { id: "tekrar1", subject: "Tekrar", topic: "Haftalık Özet – Türkçe & Tarih Notları", sure: 60, type: "tekrar", icon: "🔄", color: C.blue },
      { id: "tekrar2", subject: "Tekrar", topic: "Haftalık Özet – Matematik & Coğrafya", sure: 60, type: "tekrar", icon: "🔄", color: C.green },
      { id: "analiz", subject: "Hata Analizi", topic: "Deneme Hata Defteri & Zayıf Konu Tespiti", sure: 60, type: "analiz", icon: "📋", color: C.orange },
      { id: "guncel", subject: "Güncel", topic: "Haftalık Haber Taraması & Not Alma", sure: 30, type: "guncel", icon: "📰", color: C.yellow },
    ];
  }
  const subs = DAY_SUBS[schedIdx] || [];
  const totalMins = SCHEDULE[schedIdx].mins;
  const perSub = Math.floor(totalMins / subs.length);
  const tasks = [];
  subs.forEach((subName, si) => {
    const sub = SUBJECTS[subName];
    const topicIdx = ((weekNum - 1) * (subs.length) + si) % sub.topics.length;
    const topic = sub.topics[topicIdx];
    const dur = Math.min(perSub - (perSub >= 70 ? 25 : 0), topic.sure);
    tasks.push({
      id: `${subName}-${topicIdx}`,
      subject: subName, topic: topic.ad,
      sure: Math.max(30, dur), type: "konu",
      icon: sub.icon, color: sub.color,
    });
    if (perSub >= 70) {
      tasks.push({
        id: `soru-${subName}-${topicIdx}`,
        subject: `${subName} Pratik`,
        topic: `${topic.ad} – Soru Çözümü (15-20 Soru)`,
        sure: 25, type: "soru",
        icon: "📝", color: sub.color,
      });
    }
  });
  return tasks;
}

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + "20", color,
      border: `1px solid ${color}40`,
      borderRadius: 7, padding: "2px 8px",
      fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
    }}>{label}</span>
  );
}

function Ring({ pct, size = 70, stroke = 6, color = C.accent, label, sub }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeDasharray={circ}
          strokeDashoffset={circ * (1 - Math.min(100, pct) / 100)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s ease" }}
        />
      </svg>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: size > 65 ? 15 : 11, fontWeight: 900, color: C.t1 }}>{label}</div>
        {sub && <div style={{ fontSize: 9, color: C.t2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, SINAV_TARIHI - new Date());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { v: String(t.d).padStart(3, "0"), l: "Gün" },
    { v: String(t.h).padStart(2, "0"), l: "Saat" },
    { v: String(t.m).padStart(2, "0"), l: "Dak" },
    { v: String(t.s).padStart(2, "0"), l: "San" },
  ];

  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.accent}22 0%, ${C.card2} 100%)`,
      border: `1px solid ${C.accent}40`, borderRadius: 22, padding: "16px 18px",
      marginBottom: 14, boxShadow: `0 0 40px ${C.accent}12`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: C.t2, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>KPSS Lisans – GY/GK</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.t1, marginTop: 2 }}>6 Eylül 2026 · Pazar</div>
        </div>
        <div style={{ background: C.accentDim, border: `1px solid ${C.accent}40`, borderRadius: 10, padding: "4px 12px" }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: C.accent }}>⏰ GERİ SAYIM</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {boxes.map(({ v, l }) => (
          <div key={l} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "8px 2px", marginBottom: 5 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.accent, fontVariantNumeric: "tabular-nums", letterSpacing: -0.5 }}>{v}</div>
            </div>
            <div style={{ fontSize: 9, color: C.t2, fontWeight: 700 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, done, onToggle }) {
  const labels = { konu: "Konu", soru: "Pratik", tekrar: "Tekrar", deneme: "Deneme", analiz: "Analiz", guncel: "Güncel" };
  return (
    <div onClick={onToggle} style={{
      background: done ? C.greenDim : C.card,
      border: `1px solid ${done ? C.green + "50" : C.border}`,
      borderRadius: 16, padding: "13px 14px", marginBottom: 9,
      display: "flex", alignItems: "center", gap: 12,
      cursor: "pointer", opacity: done ? 0.7 : 1,
      transition: "all 0.2s",
      boxShadow: done ? `0 0 14px ${C.green}18` : "none",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 13, flexShrink: 0,
        background: done ? C.greenDim : task.color + "20",
        border: `1px solid ${done ? C.green + "40" : task.color + "30"}`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      }}>
        {done ? "✅" : task.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, fontSize: 13, color: done ? C.green : C.t1 }}>{task.subject}</span>
          <Badge label={labels[task.type] || task.type} color={done ? C.green : task.color} />
        </div>
        <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.4 }}>{task.topic}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: done ? C.green : task.color }}>{task.sure}dk</div>
      </div>
    </div>
  );
}

export default function App() {
  const today = new Date();
  const [tab, setTab] = useState("today");
  const [weekOffset, setWeekOffset] = useState(0);
  const monday = getMondayDate(today, weekOffset);
  const weekDates = getWeekDates(monday);

  const todayWeekIdx = jsDowToIdx(getDow(today));
  const [selIdx, setSelIdx] = useState(todayWeekIdx);

  const selDate = weekDates[selIdx];
  const selSchedIdx = jsDowToIdx(getDow(selDate));
  const weekNum = Math.max(1, weekOffset + 1);
  const tasks = generateTasks(selSchedIdx, weekNum);

  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kpss_checked') || '{}'); } catch { return {}; }
  });
  const [progress, setProgress] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kpss_progress'));
      if (saved) return saved;
    } catch { }
    return Object.fromEntries(
      Object.keys(SUBJECTS).flatMap(k => [[k, 0], [k + "_done", 0]])
    );
  });

  useEffect(() => { localStorage.setItem('kpss_checked', JSON.stringify(checked)); }, [checked]);
  useEffect(() => { localStorage.setItem('kpss_progress', JSON.stringify(progress)); }, [progress]);

  const tk = (id) => selDate.toDateString() + id;
  const dayDone = tasks.filter(t => checked[tk(t.id)]).length;
  const dayPct = tasks.length > 0 ? Math.round(dayDone / tasks.length * 100) : 0;

  function toggleTask(task) {
    const k = tk(task.id);
    const wasDone = !!checked[k];
    setChecked(prev => ({ ...prev, [k]: !wasDone }));
    if (!wasDone && task.type === "konu") {
      const sub = task.subject.replace(" Pratik", "");
      if (SUBJECTS[sub]) {
        setProgress(prev => {
          const newDone = Math.min((prev[sub + "_done"] || 0) + 1, SUBJECTS[sub].topics.length);
          return { ...prev, [sub + "_done"]: newDone, [sub]: Math.round(newDone / SUBJECTS[sub].topics.length * 100) };
        });
      }
    }
  }

  const sched = SCHEDULE[selSchedIdx];
  const dl = daysLeft();
  const weekMins = Object.values(SCHEDULE).reduce((a, s) => a + s.mins, 0);
  const subNames = Object.keys(SUBJECTS);
  const avgPct = Math.round(subNames.reduce((a, k) => a + (progress[k] || 0), 0) / subNames.length);

  const TABS = [
    { id: "today", label: "Bugün", icon: "📅" },
    { id: "week", label: "Hafta", icon: "🗓" },
    { id: "topics", label: "Konular", icon: "📚" },
    { id: "stats", label: "Analiz", icon: "📊" },
  ];

  return (
    <div style={{
      background: C.bg, minHeight: "100vh",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      color: C.t1, maxWidth: 430, margin: "0 auto",
      paddingTop: "env(safe-area-inset-top)",
    }}>
      <div style={{
        position: "fixed", top: -80, left: "50%", transform: "translateX(-50%)",
        width: 350, height: 350,
        background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 65%)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: C.bg + "EE", backdropFilter: "blur(20px)",
        padding: "18px 18px 0",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: C.t2, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
              👷 Mühendis · KPSS GY/GK
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.5, marginTop: 1 }}>Çalışma Planım</div>
          </div>
          <Ring pct={avgPct} size={58} color={C.accent} label={`${avgPct}%`} sub="genel" />
        </div>
        <div style={{ display: "flex", background: C.card, borderRadius: 13, padding: 4, marginBottom: 14, border: `1px solid ${C.border}` }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "7px 2px", borderRadius: 9, border: "none",
              background: tab === t.id ? C.accent : "transparent",
              color: tab === t.id ? "#fff" : C.t2,
              fontWeight: 700, fontSize: 11, cursor: "pointer", transition: "all 0.2s",
              boxShadow: tab === t.id ? `0 2px 14px ${C.accentGlow}` : "none",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 18px calc(110px + env(safe-area-inset-bottom))", position: "relative", zIndex: 1 }}>

        {/* ─── BUGÜN ─── */}
        {tab === "today" && (
          <>
            <Countdown />

            {/* Hafta nav */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <button onClick={() => { setWeekOffset(w => w - 1); setSelIdx(0); }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, padding: "5px 12px", color: C.t1, cursor: "pointer", fontSize: 18 }}>‹</button>
              <span style={{ fontSize: 12, color: C.t2, fontWeight: 700 }}>
                {weekDates[0].toLocaleDateString("tr-TR", { day: "numeric", month: "short" })} – {weekDates[6].toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
              </span>
              <button onClick={() => { setWeekOffset(w => w + 1); setSelIdx(0); }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, padding: "5px 12px", color: C.t1, cursor: "pointer", fontSize: 18 }}>›</button>
            </div>

            {/* Hafta şeridi */}
            <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
              {weekDates.map((d, i) => {
                const isToday = sameDay(d, today) && weekOffset === 0;
                const isSel = i === selIdx;
                const si = jsDowToIdx(getDow(d));
                const s = SCHEDULE[si];
                const ts = generateTasks(si, weekNum);
                const allDone = ts.length > 0 && ts.every(t => checked[d.toDateString() + t.id]);
                return (
                  <div key={i} onClick={() => setSelIdx(i)} style={{
                    flex: 1, borderRadius: 14, padding: "9px 4px", textAlign: "center",
                    background: isSel ? C.accent : isToday ? C.accentDim : C.card,
                    border: `1px solid ${isSel ? C.accent : isToday ? C.accent + "55" : C.border}`,
                    cursor: "pointer", transition: "all 0.2s",
                    boxShadow: isSel ? `0 4px 20px ${C.accentGlow}` : "none",
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: isSel ? "#fff8" : C.t3, marginBottom: 3 }}>
                      {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"][i]}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 900, color: isSel ? "#fff" : C.t1, marginBottom: 3 }}>{d.getDate()}</div>
                    {!s.work
                      ? <div style={{ fontSize: 7, color: isSel ? "#fff" : C.green, fontWeight: 800 }}>TAT</div>
                      : <div style={{ width: 5, height: 5, borderRadius: "50%", background: allDone ? C.green : C.t3, margin: "0 auto" }} />}
                  </div>
                );
              })}
            </div>

            {/* Gün kartı */}
            <div style={{
              background: `linear-gradient(135deg, ${C.accentDim}, ${C.card})`,
              border: `1px solid ${C.accent}30`,
              borderRadius: 20, padding: "16px", marginBottom: 14,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{sched.label}</div>
                <div style={{ fontSize: 12, color: C.t2, marginTop: 3 }}>
                  {selDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {sched.work && <Badge label="🏢 İş" color={C.blue} />}
                  {sched.sport && <Badge label="🏃 Spor" color={C.orange} />}
                  {sched.yl && <Badge label="🎓 YL" color={C.pink} />}
                  {!sched.work && <Badge label="🌴 Serbest" color={C.green} />}
                  <Badge label={`${sched.mins}dk çalışma`} color={C.accent} />
                </div>
              </div>
              <Ring pct={dayPct} size={72} color={dayPct === 100 ? C.green : C.accent} label={`${dayPct}%`} sub="bugün" />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: C.t2, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Günlük Görevler</div>
              <span style={{ fontSize: 12, color: C.t2 }}>{dayDone}/{tasks.length} tamamlandı</span>
            </div>

            {tasks.map(task => (
              <TaskCard key={task.id} task={task} done={!!checked[tk(task.id)]} onToggle={() => toggleTask(task)} />
            ))}

            {dayPct === 100 && tasks.length > 0 && (
              <div style={{
                background: C.greenDim, border: `1px solid ${C.green}50`,
                borderRadius: 18, padding: 20, textAlign: "center", marginTop: 8,
                boxShadow: `0 0 30px ${C.green}18`,
              }}>
                <div style={{ fontSize: 38 }}>🎉</div>
                <div style={{ fontWeight: 900, color: C.green, fontSize: 16, marginTop: 6 }}>Günü Tamamladın!</div>
                <div style={{ fontSize: 13, color: C.t2, marginTop: 4 }}>Harika bir gün! {dl} gün kaldı, devam et 💪</div>
              </div>
            )}
          </>
        )}

        {/* ─── HAFTA ─── */}
        {tab === "week" && (
          <>
            <Countdown />
            <div style={{ display: "flex", gap: 9, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { l: "Haftalık Süre", v: `${Math.floor(weekMins / 60)}s ${weekMins % 60}dk`, c: C.accent },
                { l: "Serbest Gün", v: "Cmt + Paz", c: C.green },
                { l: "Sınava Kalan", v: `${dl} gün`, c: C.orange },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, minWidth: 90, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: C.t2, fontWeight: 700, marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            {weekDates.map((d, i) => {
              const si = jsDowToIdx(getDow(d));
              const s = SCHEDULE[si];
              const ts = generateTasks(si, weekNum);
              const isToday = sameDay(d, today) && weekOffset === 0;
              return (
                <div key={i} onClick={() => { setSelIdx(i); setTab("today"); }} style={{
                  background: isToday ? C.accentDim : C.card,
                  border: `1px solid ${isToday ? C.accent + "55" : C.border}`,
                  borderRadius: 16, padding: "14px 16px", marginBottom: 9,
                  display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 13,
                    background: !s.work ? C.greenDim : C.accentDim,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.t2 }}>{["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"][i]}</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: isToday ? C.accent : C.t1 }}>{d.getDate()}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 5 }}>{s.label}</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {s.work && <Badge label="İş" color={C.blue} />}
                      {s.sport && <Badge label="Spor" color={C.orange} />}
                      {s.yl && <Badge label="YL" color={C.pink} />}
                      {!s.work && <Badge label="Serbest" color={C.green} />}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 17, fontWeight: 900, color: !s.work ? C.green : C.accent }}>
                      {Math.floor(s.mins / 60)}s{s.mins % 60 > 0 ? `${s.mins % 60}dk` : ""}
                    </div>
                    <div style={{ fontSize: 11, color: C.t2 }}>{ts.length} görev</div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ─── KONULAR ─── */}
        {tab === "topics" && (
          <>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "16px", marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>📋 KPSS GY/GK – 120 Soru Toplam</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {Object.entries(SUBJECTS).map(([name, s]) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 6, background: s.colorDim, border: `1px solid ${s.color}30`, borderRadius: 10, padding: "5px 10px" }}>
                    <span>{s.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{name}</span>
                    <span style={{ fontSize: 10, color: C.t2 }}>{s.soruSayisi} soru</span>
                  </div>
                ))}
              </div>
            </div>

            {Object.entries(SUBJECTS).map(([name, sub]) => {
              const pct = progress[name] || 0;
              const done = progress[name + "_done"] || 0;
              return (
                <div key={name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "16px", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 13, background: sub.colorDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: `1px solid ${sub.color}30` }}>{sub.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: C.t1 }}>{name}</div>
                      <div style={{ fontSize: 12, color: C.t2 }}>{sub.soruSayisi} soru · {sub.topics.length} konu</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 21, fontWeight: 900, color: sub.color }}>{pct}%</div>
                      <div style={{ fontSize: 10, color: C.t2 }}>{done}/{sub.topics.length}</div>
                    </div>
                  </div>
                  <div style={{ background: C.border, borderRadius: 5, height: 5, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${sub.color}70, ${sub.color})`, borderRadius: 5, transition: "width 0.6s" }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {sub.topics.map((t, i) => (
                      <span key={i} style={{
                        background: i < done ? sub.color + "22" : C.card2,
                        color: i < done ? sub.color : C.t3,
                        border: `1px solid ${i < done ? sub.color + "40" : C.border}`,
                        borderRadius: 7, padding: "3px 8px", fontSize: 10, fontWeight: 600,
                      }}>
                        {i < done ? "✓ " : ""}{t.ad.length > 35 ? t.ad.slice(0, 35) + "…" : t.ad}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ─── ANALİZ ─── */}
        {tab === "stats" && (
          <>
            <Countdown />

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 22, marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 16, textAlign: "center" }}>Genel İlerleme</div>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Ring pct={avgPct} size={98} color={C.accent} label={`${avgPct}%`} sub="Genel" />
                <Ring pct={progress["Türkçe"] || 0} size={74} color={C.blue} label={`${progress["Türkçe"] || 0}%`} sub="Türkçe" />
                <Ring pct={progress["Matematik"] || 0} size={74} color={C.green} label={`${progress["Matematik"] || 0}%`} sub="Matematik" />
              </div>
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "18px", marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>Ders Bazlı İlerleme</div>
              {Object.entries(SUBJECTS).map(([name, sub]) => {
                const pct = progress[name] || 0;
                return (
                  <div key={name} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{sub.icon} {name}</span>
                      <span style={{ fontSize: 13, fontWeight: 900, color: sub.color }}>{pct}%</span>
                    </div>
                    <div style={{ background: C.border, borderRadius: 5, height: 6 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${sub.color}70, ${sub.color})`, borderRadius: 5, transition: "width 0.6s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "18px", marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>⏱ Çalışma Süresi</div>
              {[
                { l: "Hafta içi toplam", v: `${Math.floor((90 + 90 + 60 + 60 + 90) / 60)}s ${(90 + 90 + 60 + 60 + 90) % 60}dk`, c: C.blue },
                { l: "Cumartesi", v: "8 saat yoğun", c: C.green },
                { l: "Pazar", v: "7 saat (deneme+tekrar)", c: C.green },
                { l: "Haftalık toplam", v: `${Math.floor(weekMins / 60)} saat ${weekMins % 60}dk`, c: C.accent },
                { l: "Kalan gün", v: `${dl} gün`, c: C.orange },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.t2 }}>{item.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: item.c }}>{item.v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${C.accentDim}, ${C.card})`, border: `1px solid ${C.accent}35`, borderRadius: 20, padding: "18px" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: C.accent, marginBottom: 14 }}>📋 Sınav Bilgileri</div>
              {[
                { k: "Sınav Türü", v: "KPSS Lisans GY/GK" },
                { k: "Sınav Tarihi", v: "6 Eylül 2026, Pazar" },
                { k: "GY Soru", v: "60 soru / 90 dakika" },
                { k: "GK Soru", v: "60 soru / 90 dakika" },
                { k: "Toplam", v: "120 soru · 3 saat" },
                { k: "Başvuru", v: "1–13 Temmuz 2026" },
                { k: "Sonuçlar", v: "7 Ekim 2026" },
                { k: "Profil", v: "Mühendis (Alan Sınavı YOK)" },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: C.t2 }}>{item.k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{item.v}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: C.bg + "F0", backdropFilter: "blur(24px)",
        borderTop: `1px solid ${C.border}`,
        padding: "10px 10px calc(24px + env(safe-area-inset-bottom))",
        display: "flex", justifyContent: "space-around", zIndex: 100,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            cursor: "pointer", padding: "4px 14px",
          }}>
            <div style={{ fontSize: 21 }}>{t.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: tab === t.id ? C.accent : C.t3, transition: "color 0.2s" }}>{t.label}</div>
            {tab === t.id && <div style={{ width: 4, height: 4, borderRadius: 2, background: C.accent }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
