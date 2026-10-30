"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Minus, Plus, Search, X } from "lucide-react";
import type { Country, MapBooth, MapFacility, MapFacilityType } from "@/types";
import { useT } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { cn, flagUrl } from "@/lib/utils";
import { MAP_HEIGHT, MAP_WIDTH } from "@/data/map";
import { Card, Pills } from "@/components/ui/primitives";
import { Flag } from "@/components/ui/Flag";

type Filter = "all" | "countries" | "stage" | "food" | "facilities";
type Selection = { kind: "booth"; id: string } | { kind: "facility"; id: string } | null;

const facilityStyle: Record<MapFacilityType, { bg: string; glyph: string; legend?: TranslationKey }> = {
  stage: { bg: "#ef476f", glyph: "♪", legend: "map.legendStage" },
  food: { bg: "#ff9f1c", glyph: "🍴", legend: "map.legendFood" },
  info: { bg: "#1d5bff", glyph: "i", legend: "map.legendInfo" },
  rest: { bg: "#5b7085", glyph: "◡", legend: "map.legendRest" },
  toilet: { bg: "#3a7bd5", glyph: "WC", legend: "map.legendToilet" },
  medical: { bg: "#e63946", glyph: "+", legend: "map.legendMedical" },
  entrance: { bg: "#0b1b3f", glyph: "↑" },
};

function facilityMatches(type: MapFacilityType, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "stage") return type === "stage";
  if (filter === "food") return type === "food";
  if (filter === "facilities") return ["info", "toilet", "medical", "rest", "entrance"].includes(type);
  return type === "entrance";
}

export function FestivalMap({
  countries,
  booths,
  facilities,
}: {
  countries: Country[];
  booths: MapBooth[];
  facilities: MapFacility[];
}) {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<Selection>(null);
  const [zoom, setZoom] = useState(1);

  const bySlug = useMemo(() => Object.fromEntries(countries.map((c) => [c.slug, c])), [countries]);
  const boothRows = useMemo(
    () =>
      booths
        .map((b) => ({ booth: b, country: bySlug[b.country] }))
        .filter((r): r is { booth: MapBooth; country: Country } => Boolean(r.country)),
    [booths, bySlug],
  );
  const results = boothRows.filter(({ country, booth }) =>
    `${country.name} ${booth.id}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const selectedBooth = selection?.kind === "booth" ? boothRows.find((r) => r.booth.id === selection.id) : undefined;
  const selectedFacility = selection?.kind === "facility" ? facilities.find((f) => f.id === selection.id) : undefined;
  const popupAt = selectedBooth?.booth ?? selectedFacility;

  const boothsVisible = filter === "all" || filter === "countries";

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t("map.filterAll") },
    { value: "countries", label: t("map.filterCountries") },
    { value: "stage", label: t("map.filterStage") },
    { value: "food", label: t("map.filterFood") },
    { value: "facilities", label: t("map.filterFacilities") },
  ];

  const selectBooth = (id: string) => {
    setSelection({ kind: "booth", id });
    if (!boothsVisible) setFilter("all");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div>
        <Pills options={filters} value={filter} onChange={setFilter} label={t("map.title")} className="mb-4" />

        <Card className="relative overflow-hidden p-0">
          {/* Map canvas */}
          <div className="max-h-[70vh] overflow-auto overscroll-contain">
            <div className="relative origin-top-left transition-[width] duration-300" style={{ width: `${zoom * 100}%` }}>
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="block h-auto w-full select-none"
                role="img"
                aria-label={t("map.title")}
                onClick={() => setSelection(null)}
              >
                <MapGround buildingLabel={t("map.mainBuilding")} />

                {/* Facilities */}
                {facilities.map((f) => {
                  const s = facilityStyle[f.type];
                  const visible = facilityMatches(f.type, filter);
                  const active = selection?.kind === "facility" && selection.id === f.id;
                  if (f.type === "stage" && f.id === "stage-main") {
                    return (
                      <g
                        key={f.id}
                        className="cursor-pointer"
                        opacity={visible ? 1 : 0.3}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelection({ kind: "facility", id: f.id });
                        }}
                      >
                        <rect x={f.x - 110} y={f.y - 52} width="220" height="96" rx="10" fill="#3b2a7a" stroke={active ? "#1d5bff" : "none"} strokeWidth="5" />
                        <rect x={f.x - 120} y={f.y - 62} width="240" height="26" rx="8" fill="#e63946" />
                        <rect x={f.x - 90} y={f.y - 30} width="180" height="58" rx="6" fill="#5b45b0" />
                        <circle cx={f.x} cy={f.y - 6} r="16" fill="#ef476f" />
                        <text x={f.x} y={f.y} textAnchor="middle" fontSize="18" fill="#fff" fontWeight="700">♪</text>
                        <text x={f.x} y={f.y + 26} textAnchor="middle" fontSize="16" fill="#fff" fontWeight="700">{f.label}</text>
                      </g>
                    );
                  }
                  if (f.type === "entrance") {
                    return (
                      <g key={f.id} opacity={visible || filter === "all" ? 1 : 0.4}>
                        <rect x={f.x - 50} y={f.y - 14} width="100" height="28" rx="6" fill="#0b1b3f" />
                        <text x={f.x} y={f.y + 5} textAnchor="middle" fontSize="14" fill="#fff" fontWeight="700">
                          {f.label}
                        </text>
                      </g>
                    );
                  }
                  return (
                    <g
                      key={f.id}
                      className="cursor-pointer"
                      opacity={visible ? 1 : 0.25}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelection({ kind: "facility", id: f.id });
                      }}
                    >
                      <title>{f.label}</title>
                      <circle cx={f.x} cy={f.y + 3} r={active ? 24 : 20} fill="#000" opacity="0.15" />
                      <circle cx={f.x} cy={f.y} r={active ? 24 : 20} fill={s.bg} stroke="#fff" strokeWidth="3" />
                      <text
                        x={f.x}
                        y={f.y + (s.glyph.length > 1 && s.glyph !== "🍴" ? 5 : 6)}
                        textAnchor="middle"
                        fontSize={s.glyph === "WC" ? 13 : 18}
                        fontWeight="800"
                        fill="#fff"
                      >
                        {s.glyph}
                      </text>
                    </g>
                  );
                })}

                {/* Booths */}
                {boothRows.map(({ booth, country }) => {
                  const active = selection?.kind === "booth" && selection.id === booth.id;
                  return (
                    <g
                      key={booth.id}
                      className="cursor-pointer"
                      opacity={boothsVisible ? 1 : 0.25}
                      transform={`translate(${booth.x} ${booth.y})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectBooth(booth.id);
                      }}
                    >
                      <title>{`${booth.id} ${country.name}`}</title>
                      <g transform={active ? "scale(1.18)" : undefined} style={{ transition: "transform .2s" }}>
                        <rect x="-36" y="-22" width="72" height="48" rx="7" fill="#000" opacity="0.12" transform="translate(0 3)" />
                        <rect x="-36" y="-22" width="72" height="48" rx="7" fill="#fff" stroke={active ? "#1d5bff" : "#d5dceb"} strokeWidth={active ? 4 : 1.5} />
                        <path d="M-36 -15 a7 7 0 0 1 7 -7 h58 a7 7 0 0 1 7 7 v3 h-72 Z" fill={country.theme.primary} />
                        <image href={flagUrl(country.flag, 80)} x="-15" y="-8" width="30" height="20" preserveAspectRatio="xMidYMid slice" />
                        <text y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0b1b3f">
                          {booth.id}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Popup card positioned over the map */}
              {popupAt && (
                <div
                  className="animate-pop pointer-events-none absolute z-10"
                  style={{
                    left: `${(popupAt.x / MAP_WIDTH) * 100}%`,
                    top: `${(popupAt.y / MAP_HEIGHT) * 100}%`,
                    transform: `translate(${popupAt.x > MAP_WIDTH * 0.6 ? "-100%" : "0"}, ${popupAt.y < 200 ? "40px" : "-115%"})`,
                  }}
                >
                  <div className="pointer-events-auto w-60 rounded-xl bg-white p-3 shadow-lift ring-1 ring-line">
                    <div className="flex items-start justify-between gap-2">
                      {selectedBooth ? (
                        <div className="flex items-center gap-2.5">
                          <Flag code={selectedBooth.country.flag} className="h-6" />
                          <div>
                            <p className="text-sm font-extrabold text-ink">
                              {selectedBooth.booth.id} {selectedBooth.country.name}
                            </p>
                            <p className="text-xs text-ink-soft">{selectedBooth.country.tags.join(" • ")}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-extrabold text-ink">{selectedFacility?.label}</p>
                      )}
                      <button
                        type="button"
                        aria-label={t("map.close")}
                        onClick={() => setSelection(null)}
                        className="rounded-full p-0.5 text-ink-faint hover:bg-mist hover:text-ink"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    {selectedBooth && (
                      <Link
                        href={`/country/${selectedBooth.country.slug}`}
                        className="mt-3 flex items-center justify-between rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                      >
                        {t("map.view", { country: selectedBooth.country.name })}
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-3 right-3 flex flex-col overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-line">
            <button
              type="button"
              aria-label={t("map.zoomIn")}
              onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
              className="grid size-9 place-items-center text-ink hover:bg-mist"
            >
              <Plus className="size-4" />
            </button>
            <span className="h-px bg-line" />
            <button
              type="button"
              aria-label={t("map.zoomOut")}
              onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
              className="grid size-9 place-items-center text-ink hover:bg-mist"
            >
              <Minus className="size-4" />
            </button>
          </div>
        </Card>
      </div>

      {/* Side panel */}
      <aside className="space-y-4 lg:pt-[52px]">
        <Card className="p-4">
          <h2 className="text-sm font-extrabold text-ink">{t("map.findCountry")}</h2>
          <label className="relative mt-3 block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("map.search")}
              className="w-full rounded-lg bg-mist py-2 pr-3 pl-9 text-sm text-ink ring-1 ring-line outline-none placeholder:text-ink-faint focus:ring-brand"
            />
          </label>
          <ul className="mt-2 max-h-72 overflow-y-auto lg:max-h-[340px]">
            {results.map(({ booth, country }) => {
              const active = selection?.kind === "booth" && selection.id === booth.id;
              return (
                <li key={booth.id}>
                  <button
                    type="button"
                    onClick={() => selectBooth(booth.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition",
                      active ? "bg-brand-soft text-brand" : "text-ink hover:bg-mist",
                    )}
                  >
                    <Flag code={country.flag} className="h-4" />
                    <span className="flex-1 font-medium">{country.name}</span>
                    <span className="text-xs text-ink-faint tabular-nums">{booth.id}</span>
                    <ChevronRight className="size-3.5 text-ink-faint" />
                  </button>
                </li>
              );
            })}
            {results.length === 0 && <li className="px-2 py-3 text-sm text-ink-faint">{t("map.noResults", { q: query })}</li>}
          </ul>
        </Card>

        <Card className="p-4">
          <h2 className="mb-2 text-sm font-extrabold text-ink">{t("map.legend")}</h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-ink-soft lg:grid-cols-1">
            <li className="flex items-center gap-2">
              <span className="h-3.5 w-5 rounded-[3px] border border-line bg-white shadow-[inset_0_3px_0_#e63946]" />
              {t("map.legendBooth")}
            </li>
            {(Object.keys(facilityStyle) as MapFacilityType[])
              .filter((k) => facilityStyle[k].legend)
              .map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span
                    className="grid size-5 place-items-center rounded-full text-[9px] font-extrabold text-white"
                    style={{ background: facilityStyle[k].bg }}
                  >
                    {facilityStyle[k].glyph}
                  </span>
                  {t(facilityStyle[k].legend!)}
                </li>
              ))}
          </ul>
        </Card>
      </aside>
    </div>
  );
}

/**
 * The festival ground, traced from the NSU courtyard (Pirogova St 1, Novosibirsk).
 * Final map is 1000 × 820 units. The top 140 units are the stage plaza north of the
 * courtyard; everything inside <g transform="translate(0 140)"> is the courtyard
 * itself, drawn in its own 1000 × 680 coordinates (add 140 to y for map.ts).
 */
const COURTYARD_Y = 140;

// Lawn triangle: right angle at the bottom-right, long edge running diagonally.
const LAWN = "380,580 800,160 800,580";

// Flower-bed strips, drawn as thick rounded lines. Gaps between them are walkways.
const DIAGONAL_BEDS: [number, number][] = [[0, 95], [115, 205], [225, 315], [335, 440]]; // distance along the diagonal
const EAST_BEDS: [number, number][] = [[110, 265], [290, 450], [475, 640]]; // y ranges at x = 905

const TREES: [number, number, number][] = [
  // east edge of the lawn
  [775, 230, 16], [775, 330, 18], [775, 430, 16],
  // south edge of the lawn
  [440, 560, 16], [510, 560, 18], [580, 560, 16], [650, 560, 18], [720, 560, 16],
  // inside the lawn
  [580, 450, 20], [700, 470, 18],
];

const FLOWER_COLORS = ["#e0a24a", "#f2c45a", "#d98b3a", "#c9d86a"];

function MapGround({ buildingLabel }: { buildingLabel: string }) {
  const diag = (d: number) => [155 + d, 510 - d] as const;
  return (
    <g>
      {/* Outside the courtyard */}
      <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#eef2f6" />

      {/* Stage plaza north of the courtyard */}
      <polygon points="630,0 1000,0 1000,168 462,168" fill="#ece3cf" />
      <g stroke="#e0d4b8" strokeWidth="1.5">
        {[40, 80, 120].map((y) => (
          <line key={y} x1={630 - y} y1={y} x2="1000" y2={y} />
        ))}
      </g>

      <g transform={`translate(0 ${COURTYARD_Y})`}>
        {/* Main building beyond the walkway (north-west) */}
        <polygon points="0,400 540,-140 630,-140 0,490" fill="#dce7f4" stroke="#c3d3e8" strokeWidth="2" />
        <g stroke="#c3d3e8" strokeWidth="1.5">
          {[40, 120, 200, 280, 360].map((d) => (
            <line key={d} x1={d} y1={445 - d} x2={d + 18} y2={427 - d} />
          ))}
        </g>
        <text
          transform="translate(200 245) rotate(-45)"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill="#7d93b5"
          letterSpacing="2"
        >
          {buildingLabel}
        </text>

        {/* Paved courtyard inside the ring walkway */}
        <path d="M110 690 V528 L568 70 H905 Q940 70 940 105 V690 Z" fill="#f3ecdc" />

        {/* Ring walkway */}
        <path
          d="M90 690 V520 L560 50 H905 Q960 50 960 105 V690"
          fill="none"
          stroke="#d5d9df"
          strokeWidth="40"
          strokeLinejoin="round"
        />

        {/* Lawn with its kerb */}
        <polygon points={LAWN} fill="none" stroke="#e2d5b6" strokeWidth="12" strokeLinejoin="round" />
        <polygon points={LAWN} fill="#cbe6a8" stroke="#b6d78f" strokeWidth="2" strokeLinejoin="round" />

        {/* Diagonal flower beds */}
        {DIAGONAL_BEDS.map(([a, b]) => {
          const [x1, y1] = diag(a);
          const [x2, y2] = diag(b);
          return (
            <g key={a}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d9e8bd" strokeWidth="30" strokeLinecap="round" />
              {Array.from({ length: Math.floor((b - a) / 14) }, (_, i) => {
                const [x, y] = diag(a + 7 + i * 14);
                const off = i % 2 === 0 ? -7 : 7;
                return <circle key={i} cx={x + off} cy={y + off} r="4.5" fill={FLOWER_COLORS[i % FLOWER_COLORS.length]} />;
              })}
            </g>
          );
        })}

        {/* East flower beds */}
        {EAST_BEDS.map(([y1, y2]) => (
          <g key={y1}>
            <line x1="905" y1={y1} x2="905" y2={y2} stroke="#d9e8bd" strokeWidth="30" strokeLinecap="round" />
            {Array.from({ length: Math.floor((y2 - y1) / 14) }, (_, i) => (
              <circle
                key={i}
                cx={905 + (i % 2 === 0 ? -7 : 7)}
                cy={y1 + 7 + i * 14}
                r="4.5"
                fill={FLOWER_COLORS[i % FLOWER_COLORS.length]}
              />
            ))}
          </g>
        ))}

        {/* Trees */}
        {TREES.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y + 3} r={r} fill="#000" opacity="0.08" />
            <circle cx={x} cy={y} r={r} fill={i % 3 === 0 ? "#5aa458" : i % 3 === 1 ? "#6cb764" : "#4f9a4e"} />
            <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.4} fill="#fff" opacity="0.12" />
          </g>
        ))}
      </g>
    </g>
  );
}
