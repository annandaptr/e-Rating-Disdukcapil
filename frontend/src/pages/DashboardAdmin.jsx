import React, { useEffect, useState, useRef } from "react";
import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Users, Star, ClipboardList, TrendingUp, RefreshCw } from "lucide-react";
import logoDisdukcapil from "../assets/logo-disdukcapil.png";

/* =========================================================
   E-RATING DISDUKCAPIL — Dashboard Admin
   Gaya: "rapor resmi" — kertas krem, serif Fraunces,
   mono IBM Plex Mono, aksen stempel (ref: rapor-dukcapil.html)
   Endpoint:
     GET /api/dashboard  -> kartu statistik
     GET /api/grafik     -> data grafik rating / bulanan / tahunan
   Halaman: /dashboard
   ========================================================= */

const PAPER = "#F1F3EC";
const PAPER_2 = "#E4E9DA";
const PAPER_LINE = "#CBD4BE";
const INK = "#1B2418";
const INK_SOFT = "#54604C";

const GOLD = "#B8923F";
const GREEN = "#3D7A5C";
const GREEN_SOFT = "#E4EEE8";
const STAMP_RED = "#B23A2E";
const RED_SOFT = "#F6E7E4";
const GOLD_SOFT = "#F3EAD6";

// ---------- Dummy data ----------
const DUMMY_DASHBOARD = {
  total_layanan: 24,
  total_petugas: 58,
  total_rating_masuk: 3210,
  rata_rata_rating: 4.3,
};

const DUMMY_GRAFIK = {
  distribusi_rating: [
    { bintang: "1", jumlah: 42 },
    { bintang: "2", jumlah: 78 },
    { bintang: "3", jumlah: 310 },
    { bintang: "4", jumlah: 1120 },
    { bintang: "5", jumlah: 1660 },
  ],
  bulanan: [
    { bulan: "Jan", rating: 260 },
    { bulan: "Feb", rating: 300 },
    { bulan: "Mar", rating: 280 },
    { bulan: "Apr", rating: 340 },
    { bulan: "Mei", rating: 310 },
    { bulan: "Jun", rating: 360 },
    { bulan: "Jul", rating: 400 },
  ],
  tahunan: [
    { tahun: "2022", rating: 2100 },
    { tahun: "2023", rating: 2680 },
    { tahun: "2024", rating: 2950 },
    { tahun: "2025", rating: 3120 },
    { tahun: "2026", rating: 3210 },
  ],
};

function useApi(url, fallback) {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState("loading");

  const load = () => {
    setStatus("loading");
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setStatus("live");
      })
      .catch(() => {
        setData(fallback);
        setStatus("fallback");
      });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, status, reload: load };
}

function useCountUp(target, duration = 1000, decimals = 0) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    const t = Number(target) || 0;
    startRef.current = null;
    let raf;
    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(t * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("id-ID");
}

// Kartu statistik gaya "tiket" — ada notch lingkaran di sisi kiri-kanan
function StatCard({ icon: Icon, label, value, accent, tint, delay = 0 }) {
  const animated = useCountUp(value, 900);
  return (
    <div
      className="relative rounded-[10px] p-6 animate-rise"
      style={{ background: PAPER_2, border: `1px solid ${PAPER_LINE}`, animationDelay: `${delay}ms` }}
    >
      <span
        className="absolute top-1/2 -left-[10px] -translate-y-1/2 w-5 h-5 rounded-full"
        style={{ background: PAPER }}
      />
      <span
        className="absolute top-1/2 -right-[10px] -translate-y-1/2 w-5 h-5 rounded-full"
        style={{ background: PAPER }}
      />
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: tint }}>
          <Icon size={14} strokeWidth={2.25} style={{ color: accent }} />
        </div>
      </div>
      <p className="font-mono text-[30px] font-semibold tabular-nums leading-none" style={{ color: INK }}>
        {animated}
      </p>
      <p className="text-[12.5px] mt-2" style={{ color: INK_SOFT }}>
        {label}
      </p>
    </div>
  );
}

function Panel({ eyebrow, title, subtitle, right, children, className = "", delay = 0 }) {
  return (
    <div
      className={`rounded-[10px] p-6 animate-rise ${className}`}
      style={{ background: "#fff", border: `1px solid ${PAPER_LINE}`, animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          {eyebrow && (
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase mb-1.5 flex items-center gap-2" style={{ color: STAMP_RED }}>
              <span className="w-4 h-px" style={{ background: STAMP_RED }} />
              {eyebrow}
            </p>
          )}
          <h3 className="font-serif text-[19px] font-semibold tracking-tight" style={{ color: INK }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-[12.5px] mt-1" style={{ color: INK_SOFT }}>
              {subtitle}
            </p>
          )}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function SourceBadge({ status }) {
  const map = {
    loading: { text: "Memuat…", color: INK_SOFT, bg: PAPER_2 },
    live: { text: "Data API", color: GREEN, bg: GREEN_SOFT },
    fallback: { text: "Contoh data", color: "#8A6A1E", bg: GOLD_SOFT },
  };
  const s = map[status] || map.loading;
  return (
    <span
      className="font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-[4px] tracking-wide uppercase"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}33` }}
    >
      {s.text}
    </span>
  );
}

export default function DashboardAdmin() {
  const { data: dashboard, status: statusDashboard, reload: reloadDashboard } =
    useApi("/api/dashboard", DUMMY_DASHBOARD);
  const { data: grafik, status: statusGrafik, reload: reloadGrafik } = useApi(
    "/api/grafik",
    DUMMY_GRAFIK
  );
  const [spinning, setSpinning] = useState(false);

  const rataRata = dashboard?.rata_rata_rating ?? 0;
  const animatedRata = useCountUp(rataRata, 1200, 1);
  const gaugeData = [{ name: "rating", value: (rataRata / 5) * 100, fill: GOLD }];
  const barShades = ["#E4EEE8", "#C4DBCE", "#9CC2AE", "#6AA383", GREEN];
  const fullStars = Math.round(rataRata);
  const starString = "★★★★★☆☆☆☆☆".slice(5 - fullStars, 10 - fullStars);

  const handleReload = () => {
    setSpinning(true);
    reloadDashboard();
    reloadGrafik();
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <div className="min-h-screen w-full" style={{ background: PAPER }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }
        .font-serif { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-rise { opacity: 0; animation: rise 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes stampIn {
          0% { transform: rotate(-14deg) scale(0.4); opacity: 0; }
          60% { transform: rotate(-14deg) scale(1.12); opacity: 1; }
          100% { transform: rotate(-14deg) scale(1); opacity: 1; }
        }
        .animate-stamp { animation: stampIn 0.6s cubic-bezier(0.2,1.4,0.4,1) 0.4s backwards; }
      `}</style>

      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b backdrop-blur" style={{ borderColor: PAPER_LINE, background: "#F1F3ECEE" }}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center p-1 bg-white" style={{ border: `2px solid ${STAMP_RED}` }}>
              <img src={logoDisdukcapil} alt="Logo Disdukcapil" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-serif text-[17px] font-semibold leading-tight tracking-tight" style={{ color: INK }}>
                E-Rating Disdukcapil
              </p>
              <p className="font-mono text-[10.5px] leading-tight tracking-wide uppercase" style={{ color: INK_SOFT }}>
                Dashboard Admin
              </p>
            </div>
          </div>
          <button
            onClick={handleReload}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-[4px] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: STAMP_RED }}
          >
            <RefreshCw size={13} className={spinning ? "animate-spin" : ""} />
            Muat ulang
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8 space-y-6">
        {/* Hero — kartu rapor */}
        <div
          className="relative rounded-[10px] p-6 md:p-8 animate-rise"
          style={{ background: PAPER_2, border: `1px solid ${PAPER_LINE}` }}
        >
          <div
            className="pointer-events-none absolute inset-2.5 rounded-[6px]"
            style={{ border: `1px dashed ${PAPER_LINE}` }}
          />
          <div className="relative flex items-start justify-between pb-3.5 mb-5" style={{ borderBottom: `2px solid ${INK}` }}>
            <div>
              <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase" style={{ color: INK_SOFT }}>
                Rapor Kepuasan Layanan
              </p>
              <h2 className="font-serif text-[20px] font-semibold mt-1" style={{ color: INK }}>
                Skor Bulan Berjalan
              </h2>
            </div>
            <p className="font-mono text-[10.5px] text-right" style={{ color: INK_SOFT }}>
              ID: ER-{new Date().getFullYear()}<br />
              {(dashboard?.total_rating_masuk ?? 0).toLocaleString("id-ID")} responden
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="76%" outerRadius="100%" data={gaugeData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "#D3DCC5" }} isAnimationActive animationDuration={1200} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-[26px] font-semibold tabular-nums" style={{ color: INK }}>
                    {animatedRata}
                  </span>
                  <span className="text-[10px]" style={{ color: INK_SOFT }}>
                    / 5.0
                  </span>
                </div>
              </div>
              <div>
                <p className="tracking-widest mb-2" style={{ color: GOLD, fontSize: 15, letterSpacing: 2 }}>
                  {starString}
                </p>
                <p className="text-[13.5px] max-w-xs" style={{ color: INK }}>
                  Rata-rata skor kepuasan masyarakat terhadap layanan Disdukcapil bulan ini.
                </p>
              </div>
            </div>
            <div className="md:ml-auto flex items-center gap-3">
              <SourceBadge status={statusDashboard} />
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-center shrink-0 animate-stamp"
                style={{ border: `2px solid ${GREEN}`, color: GREEN }}
              >
                <span className="font-mono text-[9px] font-bold tracking-wide leading-tight">TERVERIFIKASI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kartu statistik */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-2">
          <StatCard icon={ClipboardList} label="Total Layanan" value={dashboard?.total_layanan ?? 0} accent={GREEN} tint={GREEN_SOFT} delay={60} />
          <StatCard icon={Users} label="Total Petugas" value={dashboard?.total_petugas ?? 0} accent={INK_SOFT} tint={PAPER} delay={110} />
          <StatCard icon={Star} label="Rating Masuk" value={dashboard?.total_rating_masuk ?? 0} accent={GOLD} tint={GOLD_SOFT} delay={160} />
          <StatCard icon={TrendingUp} label="Rata-rata Rating" value={rataRata} accent={STAMP_RED} tint={RED_SOFT} delay={210} />
        </section>

        {/* Grafik rating */}
        <Panel eyebrow="Distribusi" title="Grafik Rating" subtitle="Jumlah rating per bintang" right={<SourceBadge status={statusGrafik} />} delay={260}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={grafik?.distribusi_rating ?? []} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke={PAPER_LINE} />
              <XAxis dataKey="bintang" tickFormatter={(v) => `${v}★`} tick={{ fontSize: 12, fill: INK_SOFT }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: INK_SOFT }} axisLine={false} tickLine={false} width={34} />
              <Tooltip cursor={{ fill: PAPER }} contentStyle={{ borderRadius: 8, border: `1px solid ${PAPER_LINE}`, fontSize: 12 }} />
              <Bar dataKey="jumlah" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={900}>
                {(grafik?.distribusi_rating ?? []).map((_, i) => (
                  <Cell key={i} fill={barShades[i % barShades.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        {/* Grafik bulanan & tahunan */}
        <section className="grid md:grid-cols-2 gap-5">
          <Panel eyebrow="Tren" title="Grafik Bulanan" subtitle="Jumlah rating per bulan" delay={310}>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={grafik?.bulanan ?? []}>
                <defs>
                  <linearGradient id="fillBulanan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={PAPER_LINE} />
                <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: INK_SOFT }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: INK_SOFT }} axisLine={false} tickLine={false} width={34} />
                <Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${PAPER_LINE}`, fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="rating"
                  stroke={GREEN}
                  strokeWidth={2.5}
                  fill="url(#fillBulanan)"
                  dot={{ r: 3, fill: GREEN, strokeWidth: 2, stroke: "#fff" }}
                  isAnimationActive
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel eyebrow="Rekap" title="Grafik Tahunan" subtitle="Total rating per tahun" delay={360}>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={grafik?.tahunan ?? []} barCategoryGap="35%">
                <CartesianGrid vertical={false} stroke={PAPER_LINE} />
                <XAxis dataKey="tahun" tick={{ fontSize: 12, fill: INK_SOFT }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: INK_SOFT }} axisLine={false} tickLine={false} width={38} />
                <Tooltip cursor={{ fill: PAPER }} contentStyle={{ borderRadius: 8, border: `1px solid ${PAPER_LINE}`, fontSize: 12 }} />
                <Bar dataKey="rating" radius={[4, 4, 0, 0]} fill={GOLD} isAnimationActive animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </section>
      </main>
    </div>
  );
}
