import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BookOpen,
  Building2,
  Filter,
  GraduationCap,
  Landmark,
  Network,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const buildingBlocks = [
  "Vision & Objectives",
  "Scope of Activity",
  "Audience & Curricula",
  "Learning Environment",
  "Governance & Structure",
  "Brand & Alliances",
];

const options = [
  {
    id: "vin-style",
    name: "Premium Flagship Campus",
    short: "VinUniversity-style physical flagship",
    archetype: "Private premium university",
    intent: "Create the visible No.1 university brand with premium campus, international partners, and high perceived quality.",
    capex: 285,
    annualOpexAtSteady: 38,
    launchYears: 5,
    steadyStudents: 3500,
    tuition: 16000,
    scholarshipRate: 0.35,
    staffRatio: "1 faculty : 14 students",
    risk: "High",
    readiness: 62,
    payback: "8–12 yrs",
    phase: "Anchor campus first",
    bg: "from-amber-500/20 to-yellow-500/5",
    scores: [5, 4, 5, 5, 4, 5],
    studentGrowth: [300, 650, 1200, 2100, 3000, 3500],
    opexGrowth: [7, 12, 19, 28, 35, 38],
    notes: ["Highest brand signal", "Highest capital risk", "Best for CEO/investor optics"],
  },
  {
    id: "nus-style",
    name: "Research-Intensive National University",
    short: "NUS-style research and national talent engine",
    archetype: "Large comprehensive university",
    intent: "Build a research, innovation, postgraduate, and national talent institution over a long horizon.",
    capex: 900,
    annualOpexAtSteady: 850,
    launchYears: 10,
    steadyStudents: 30000,
    tuition: 13000,
    scholarshipRate: 0.45,
    staffRatio: "1 faculty : 10 students",
    risk: "Very High",
    readiness: 38,
    payback: "15+ yrs",
    phase: "Not first-mile friendly",
    bg: "from-blue-500/20 to-cyan-500/5",
    scores: [5, 5, 5, 5, 5, 5],
    studentGrowth: [800, 1600, 3200, 6000, 10000, 15000],
    opexGrowth: [40, 75, 130, 220, 360, 510],
    notes: ["Strong long-term prestige", "Requires research funding depth", "Too heavy as first execution"],
  },
  {
    id: "asu-style",
    name: "Scaled Public + Digital Hybrid",
    short: "ASU-style access, online scale, industry programs",
    archetype: "Mass access / digital hybrid",
    intent: "Scale student access through employability programs, online pathways, and industry-aligned credentials.",
    capex: 120,
    annualOpexAtSteady: 95,
    launchYears: 6,
    steadyStudents: 12000,
    tuition: 5500,
    scholarshipRate: 0.2,
    staffRatio: "1 faculty : 22 students",
    risk: "Medium",
    readiness: 78,
    payback: "5–8 yrs",
    phase: "Digital + campus blend",
    bg: "from-purple-500/20 to-fuchsia-500/5",
    scores: [4, 5, 4, 4, 4, 4],
    studentGrowth: [500, 1500, 3200, 5600, 8500, 12000],
    opexGrowth: [5, 12, 26, 44, 68, 95],
    notes: ["Better growth economics", "Needs strong systems", "Good for affordable premium"],
  },
  {
    id: "minerva-style",
    name: "Distributed Global University",
    short: "Minerva-style low-campus, city rotation, digital seminars",
    archetype: "Asset-light global university",
    intent: "Use cities, partners, and digital pedagogy instead of owning a large traditional campus from day one.",
    capex: 18,
    annualOpexAtSteady: 16,
    launchYears: 4,
    steadyStudents: 1000,
    tuition: 18000,
    scholarshipRate: 0.4,
    staffRatio: "1 faculty : 16 students",
    risk: "Medium",
    readiness: 70,
    payback: "4–7 yrs",
    phase: "Program and experience first",
    bg: "from-emerald-500/20 to-teal-500/5",
    scores: [5, 3, 5, 4, 3, 4],
    studentGrowth: [100, 220, 450, 750, 1000, 1200],
    opexGrowth: [2.5, 5, 8, 12, 16, 20],
    notes: ["Lowest physical CAPEX", "Requires strong academic design", "Harder to sell to parents visually"],
  },
  {
    id: "myanmar-affordable-premium",
    name: "Affordable Premium University",
    short: "Myanmar-first campus + guild + partner degrees",
    archetype: "Pragmatic first-mile option",
    intent: "Start with visible premium quality, employability, selected partners, and controlled CAPEX before expanding to full university scale.",
    capex: 38,
    annualOpexAtSteady: 22,
    launchYears: 5,
    steadyStudents: 5000,
    tuition: 3600,
    scholarshipRate: 0.15,
    staffRatio: "1 faculty : 20 students",
    risk: "Medium-Low",
    readiness: 84,
    payback: "4–6 yrs",
    phase: "Recommended first-mile",
    bg: "from-orange-500/25 to-amber-500/5",
    scores: [4, 4, 4, 4, 3, 4],
    studentGrowth: [350, 850, 1600, 2800, 4000, 5000],
    opexGrowth: [2.8, 5.5, 9, 14, 18, 22],
    notes: ["Best balance of optics and feasibility", "Can validate market before mega campus", "Fits BD + academic + facility workstreams"],
  },
];

const capexBreakdown = [
  { item: "Land & site works", percent: 18 },
  { item: "Academic buildings", percent: 24 },
  { item: "Labs & equipment", percent: 16 },
  { item: "Student services", percent: 10 },
  { item: "Digital infrastructure", percent: 8 },
  { item: "Brand launch & admissions", percent: 7 },
  { item: "Pre-opening team", percent: 7 },
  { item: "Contingency", percent: 10 },
];

const formatUsd = (value) => `$${value.toLocaleString()}M`;
const formatStudents = (value) => value.toLocaleString();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        <div className="rounded-xl bg-slate-950 p-2 text-white">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{note}</p>
    </div>
  );
}

function Pill({ children }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">{children}</span>;
}

function ScoreBar({ label, score }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{score}/5</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-950" style={{ width: `${score * 20}%` }} />
      </div>
    </div>
  );
}

export default function UniversityOptionsDashboard() {
  const [selectedId, setSelectedId] = useState("myanmar-affordable-premium");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const selected = options.find((option) => option.id === selectedId) ?? options[0];

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const matchesQuery = `${option.name} ${option.short} ${option.archetype}`.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || option.risk === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const growthData = selected.studentGrowth.map((students, index) => ({
    year: `Y${index}`,
    students,
    opex: selected.opexGrowth[index],
    revenue: Number(((students * selected.tuition * (1 - selected.scholarshipRate)) / 1_000_000).toFixed(1)),
  }));

  const capexData = capexBreakdown.map((item) => ({
    ...item,
    value: Number(((selected.capex * item.percent) / 100).toFixed(1)),
  }));

  const radarData = buildingBlocks.map((block, index) => ({
    block: block.replace(" & ", "\n& "),
    score: selected.scores[index],
  }));

  const totalSixYearRevenue = growthData.reduce((sum, point) => sum + point.revenue, 0);
  const totalSixYearOpex = growthData.reduce((sum, point) => sum + point.opex, 0);
  const sixYearGap = Number((totalSixYearRevenue - totalSixYearOpex - selected.capex).toFixed(1));

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>University Options Dashboard</Pill>
                <Pill>CAPEX / OPEX / Student Growth</Pill>
                <Pill>BCG Six Building Blocks</Pill>
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Compare university build options before committing to a campus-heavy strategy.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This dashboard turns global university archetypes into an investment view: brand ambition, academic model, facility load, operating economics, student growth, and first-mile feasibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm">
                  Recommended option <ArrowUpRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  Export board pack
                </button>
              </div>
            </div>
            <div className={classNames("bg-gradient-to-br p-6 md:p-8", selected.bg)}>
              <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-950 p-3 text-white">
                    <School className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Selected model</p>
                    <h2 className="text-xl font-semibold">{selected.name}</h2>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{selected.intent}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-slate-500">Readiness</p>
                    <p className="mt-1 text-2xl font-semibold">{selected.readiness}%</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-slate-500">Risk</p>
                    <p className="mt-1 text-2xl font-semibold">{selected.risk}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-slate-500">Payback</p>
                    <p className="mt-1 text-xl font-semibold">{selected.payback}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-slate-500">Phase logic</p>
                    <p className="mt-1 text-sm font-semibold">{selected.phase}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Building2} label="Initial CAPEX" value={formatUsd(selected.capex)} note="Estimated total pre-opening and facility investment." />
          <StatCard icon={BadgeDollarSign} label="Steady OPEX" value={formatUsd(selected.annualOpexAtSteady)} note="Approximate annual operating cost at target scale." />
          <StatCard icon={Users} label="Target students" value={formatStudents(selected.steadyStudents)} note={`Modelled over ${selected.launchYears} launch years.`} />
          <StatCard icon={GraduationCap} label="Net tuition yield" value={`$${Math.round(selected.tuition * (1 - selected.scholarshipRate)).toLocaleString()}`} note="Tuition after modelled scholarship/aid discount." />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Option selector</h2>
                <p className="text-sm text-slate-500">Choose the university model to stress-test.</p>
              </div>
              <Filter className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_120px]">
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Search model..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <select
                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option>All</option>
                <option>Medium-Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Very High</option>
              </select>
            </div>
            <div className="mt-4 space-y-3">
              {filteredOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedId(option.id)}
                  className={classNames(
                    "w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm",
                    selectedId === option.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{option.name}</p>
                      <p className={classNames("mt-1 text-sm", selectedId === option.id ? "text-slate-300" : "text-slate-500")}>{option.short}</p>
                    </div>
                    <span className={classNames("rounded-full px-2 py-1 text-xs", selectedId === option.id ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600")}>{option.risk}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Six building block strength</h2>
                <p className="text-sm text-slate-500">BCG-style operating model score, interpreted for university creation.</p>
              </div>
              <Sparkles className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-4 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="block" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar dataKey="score" fill="currentColor" fillOpacity={0.18} stroke="currentColor" className="text-slate-950" />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {buildingBlocks.map((block, index) => (
                  <ScoreBar key={block} label={block} score={selected.scores[index]} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Student growth, revenue, and OPEX</h2>
                <p className="text-sm text-slate-500">Six-year launch curve. Revenue uses net tuition yield after scholarship assumptions.</p>
              </div>
              <BookOpen className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-5 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => (name === "students" ? [value.toLocaleString(), "Students"] : [`$${value}M`, name === "revenue" ? "Revenue" : "OPEX"])} />
                  <Line yAxisId="left" type="monotone" dataKey="students" stroke="currentColor" strokeWidth={3} dot={{ r: 4 }} className="text-slate-950" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="currentColor" strokeWidth={2} strokeDasharray="5 5" className="text-slate-500" />
                  <Line yAxisId="right" type="monotone" dataKey="opex" stroke="currentColor" strokeWidth={2} className="text-slate-400" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Six-year cash view</h2>
                <p className="text-sm text-slate-500">Simple board-level scenario, not final finance model.</p>
              </div>
              <Landmark className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Cumulative net tuition revenue</p>
                <p className="mt-2 text-3xl font-semibold">${totalSixYearRevenue.toFixed(1)}M</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Cumulative OPEX</p>
                <p className="mt-2 text-3xl font-semibold">${totalSixYearOpex.toFixed(1)}M</p>
              </div>
              <div className="rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-xs uppercase tracking-wide text-slate-300">After CAPEX gap / surplus</p>
                <p className="mt-2 text-3xl font-semibold">{sixYearGap >= 0 ? "+" : ""}${sixYearGap}M</p>
                <p className="mt-2 text-sm text-slate-300">This is the simple investment gap before grants, debt, land appreciation, donations, and non-tuition income.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">CAPEX breakdown</h2>
                <p className="text-sm text-slate-500">Allocates the selected model’s total CAPEX into decision buckets.</p>
              </div>
              <Building2 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-5 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capexData} layout="vertical" margin={{ left: 40, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `$${value}M`} />
                  <YAxis type="category" dataKey="item" width={130} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`$${value}M`, "CAPEX"]} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="currentColor" className="text-slate-950" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Global archetype comparison</h2>
                <p className="text-sm text-slate-500">CAPEX intensity against target student scale.</p>
              </div>
              <Network className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-5 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={options} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={70} />
                  <YAxis tickFormatter={(value) => `$${value}M`} />
                  <Tooltip formatter={(value, name) => [name === "capex" ? `$${value}M` : value.toLocaleString(), name === "capex" ? "CAPEX" : "Students"]} />
                  <Bar dataKey="capex" radius={[10, 10, 0, 0]} fill="currentColor" className="text-slate-950">
                    {options.map((entry) => (
                      <Cell key={entry.id} opacity={entry.id === selected.id ? 1 : 0.35} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Board decision matrix</h2>
              <p className="text-sm text-slate-500">Use this to reconcile CEO vision, BD market evidence, academic design, facility plan, and investment committee questions.</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="border-b border-slate-200 py-3 pr-4">Option</th>
                  <th className="border-b border-slate-200 px-4 py-3">CAPEX</th>
                  <th className="border-b border-slate-200 px-4 py-3">Steady OPEX</th>
                  <th className="border-b border-slate-200 px-4 py-3">Students</th>
                  <th className="border-b border-slate-200 px-4 py-3">Tuition</th>
                  <th className="border-b border-slate-200 px-4 py-3">Risk</th>
                  <th className="border-b border-slate-200 px-4 py-3">First-mile judgment</th>
                </tr>
              </thead>
              <tbody>
                {options.map((option) => (
                  <tr key={option.id} className={option.id === selected.id ? "bg-slate-50" : ""}>
                    <td className="border-b border-slate-100 py-4 pr-4">
                      <div className="font-semibold text-slate-950">{option.name}</div>
                      <div className="text-xs text-slate-500">{option.archetype}</div>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 font-medium">{formatUsd(option.capex)}</td>
                    <td className="border-b border-slate-100 px-4 py-4">{formatUsd(option.annualOpexAtSteady)}</td>
                    <td className="border-b border-slate-100 px-4 py-4">{formatStudents(option.steadyStudents)}</td>
                    <td className="border-b border-slate-100 px-4 py-4">${option.tuition.toLocaleString()}</td>
                    <td className="border-b border-slate-100 px-4 py-4">{option.risk}</td>
                    <td className="border-b border-slate-100 px-4 py-4 text-slate-600">{option.notes[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold">What the BD team must now collect</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                ["Market proof", "Parent willingness-to-pay, competitor tuition, demand by program, scholarship sensitivity."],
                ["Academic proof", "Program portfolio, accreditation path, faculty supply, partner university conditions."],
                ["Facility proof", "Land plan, phased buildings, labs, dorms, library, student services, campus life."],
                ["Operating proof", "Faculty ratio, admin ratio, admissions cost, retention system, quality assurance."],
                ["Financial proof", "CAPEX quotes, OPEX budget, tuition model, break-even, funding sources."],
                ["Brand proof", "Why this can be No.1, how it looks premium, and how alliances support trust."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <h2 className="text-lg font-semibold">Recommended readout</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Do not force a full research university in the first move. Start with an affordable premium university option: visible campus quality, employability-led programs, selected international alliances, controlled CAPEX, and staged growth milestones.
            </p>
            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Decision rule</p>
              <p className="mt-2 text-xl font-semibold">Premium signal + manageable first-mile risk</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
