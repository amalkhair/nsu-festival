"use client";

import { mapIdentities } from "@/data/countries/map-identities";
import Link from "next/link";
import { getStandKind, standSlug } from "@/lib/stand";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Minus, Plus, Search, X } from "lucide-react";
import type {
  Country,
  MapBooth,
  MapFacility,
  MapFacilityType,
} from "@/types";
import { useT } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { cn } from "@/lib/utils";
import { MAP_HEIGHT, MAP_WIDTH } from "@/data/map";
import { STAGE, STAND_BY_ID } from "@/data/map/stand-positions";
import { Card, Pills } from "@/components/ui/primitives";
import { Flag } from "@/components/ui/Flag";

type Filter = "all" | "countries" | "stage" | "food" | "facilities";
type Selection =
  | { kind: "booth"; id: string }
  | { kind: "facility"; id: string }
  | null;

const facilityStyle: Record<
  MapFacilityType,
  { bg: string; glyph: string; legend?: TranslationKey }
> = {
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
  if (filter === "facilities") {
    return ["info", "toilet", "medical", "rest", "entrance"].includes(type);
  }
  return type === "entrance";
}

/** Return the short identifier configured for this country or organization. */
function getMapCode(country: Country): string {
  return mapIdentities[country.slug]?.code ?? country.name;
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

  const bySlug = useMemo(
    () => Object.fromEntries(countries.map((country) => [country.slug, country])),
    [countries],
  );

  const boothRows = useMemo(
    () =>
      booths
        .map((booth) => ({
          booth,
          country: bySlug[booth.country],
        }))
        .filter(
          (row): row is { booth: MapBooth; country: Country } =>
            Boolean(row.country),
        ),
    [booths, bySlug],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const results = boothRows.filter(({ country, booth }) =>
    `${country.name} ${getMapCode(country)} ${booth.id}`
      .toLowerCase()
      .includes(normalizedQuery),
  );

  const selectedBooth =
    selection?.kind === "booth"
      ? boothRows.find((row) => row.booth.id === selection.id)
      : undefined;

  const selectedFacility =
    selection?.kind === "facility"
      ? facilities.find((facility) => facility.id === selection.id)
      : undefined;

  const popupAt = selectedBooth?.booth ?? selectedFacility;
  const boothsVisible = filter === "all" || filter === "countries";

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t("map.filterAll") },
    { value: "countries", label: t("map.filterCountries") },
    { value: "stage", label: t("map.filterStage") },

    { value: "facilities", label: t("map.filterFacilities") },
  ];

  const selectBooth = (id: string) => {
    setSelection({ kind: "booth", id });
    if (!boothsVisible) setFilter("all");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div>
        <Pills
          options={filters}
          value={filter}
          onChange={setFilter}
          label={t("map.title")}
          className="mb-4"
        />

        <Card className="relative overflow-hidden p-0">
          {/* Map canvas */}
          <div className="max-h-[70vh] overflow-auto overscroll-contain">
            <div
              className="relative origin-top-left transition-[width] duration-300"
              style={{ width: `${zoom * 100}%` }}
            >
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="block h-auto w-full select-none"
                role="img"
                aria-label={t("map.title")}
                onClick={() => setSelection(null)}
              >
                <image href="/maps/nsu-courtyard.svg" x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} preserveAspectRatio="xMidYMid meet" pointerEvents="none" />

                {/* Facilities */}
                {facilities.map((facility) => {
                  const style = facilityStyle[facility.type];
                  const visible = facilityMatches(facility.type, filter);
                  const active =
                    selection?.kind === "facility" &&
                    selection.id === facility.id;

                  if (
                    facility.type === "stage" &&
                    facility.id === "stage-main"
                  ) {
                    return (
                      <g
                        key={facility.id}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={facility.label}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelection({ kind: "facility", id: facility.id });
                          }
                        }}
                        opacity={visible ? 1 : 0.3}
                        transform={`translate(${facility.x} ${facility.y}) rotate(${STAGE.angle})`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelection({
                            kind: "facility",
                            id: facility.id,
                          });
                        }}
                      >
                        <title>{facility.label}</title>
                        <rect
                          x={-STAGE.width / 2}
                          y={-STAGE.height / 2}
                          width={STAGE.width}
                          height={STAGE.height}
                          rx="3"
                          fill="#3b2a7a"
                          stroke={active ? "#1d5bff" : "none"}
                          strokeWidth="5"
                        />
                        <rect
                          x="-36"
                          y="-20"
                          width="72"
                          height="36"
                          rx="2"
                          fill="#5b45b0"
                        />
                        {/* Local +Y points to the final row 27–31. */}
                        <path d="M-44 18H44V27H-44Z" fill="#e63946" />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontSize="9"
                          fill="#fff"
                          fontWeight="700"
                        >
                          {facility.label}
                        </text>
                      </g>
                    );
                  }

                  if (facility.type === "entrance") {
                    return (
                      <g
                        key={facility.id}
                        opacity={visible || filter === "all" ? 1 : 0.4}
                      >
                        <title>{facility.label}</title>
                        <rect
                          x={facility.x - 50}
                          y={facility.y - 14}
                          width="100"
                          height="28"
                          rx="6"
                          fill="#0b1b3f"
                        />
                        <text
                          x={facility.x}
                          y={facility.y + 5}
                          textAnchor="middle"
                          fontSize="9"
                          fill="#fff"
                          fontWeight="700"
                        >
                          {facility.label}
                        </text>
                      </g>
                    );
                  }

                  return (
                    <g
                      key={facility.id}
                      className="cursor-pointer"
                      opacity={visible ? 1 : 0.25}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelection({
                          kind: "facility",
                          id: facility.id,
                        });
                      }}
                    >
                      <title>{facility.label}</title>
                      <circle
                        cx={facility.x}
                        cy={facility.y + 3}
                        r={active ? 24 : 20}
                        fill="#000"
                        opacity="0.15"
                      />
                      <circle
                        cx={facility.x}
                        cy={facility.y}
                        r={active ? 24 : 20}
                        fill={style.bg}
                        stroke="#fff"
                        strokeWidth="3"
                      />
                      <text
                        x={facility.x}
                        y={
                          facility.y +
                          (style.glyph.length > 1 && style.glyph !== "🍴"
                            ? 5
                            : 6)
                        }
                        textAnchor="middle"
                        fontSize={style.glyph === "WC" ? 13 : 18}
                        fontWeight="800"
                        fill="#fff"
                      >
                        {style.glyph}
                      </text>
                    </g>
                  );
                })}

                {/* Country and organization booths */}
                {boothRows.map(({ booth, country }) => {
                  const active =
                    selection?.kind === "booth" &&
                    selection.id === booth.id;
                  const placement = STAND_BY_ID[booth.id];
                  const width = placement?.width ?? 20;
                  const height = placement?.height ?? 25;
                  const angle = placement?.angle ?? -16;

                  return (
                    <g
                      key={booth.id}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`#${booth.id} · ${country.name}`}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectBooth(booth.id);
                        }
                      }}
                      opacity={boothsVisible ? 1 : 0.25}
                      transform={`translate(${booth.x} ${booth.y}) rotate(${angle})`}
                      onClick={(event) => {
                        event.stopPropagation();
                        selectBooth(booth.id);
                      }}
                    >
                      <title>{`#${booth.id} · ${country.name}`}</title>

                      <g
                        transform={active ? "scale(1.12)" : undefined}
                        style={{ transition: "transform .2s" }}
                      >
                        {/* Individual numbered stands; the card lives inside the original map UI. */}
                        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx="0.8"
                          fill="#fff" stroke={active ? "#1d5bff" : "#485662"} strokeWidth={active ? 2.2 : 1.1} />
                        <text x="0" y={Number(booth.id) >= 27 ? 2.6 : 3.4} textAnchor="middle"
                          fontSize={Number(booth.id) >= 27 ? 7 : Number(booth.id) >= 20 ? 9 : 10}
                          fontWeight="800" fill="#12263f">
                          {booth.id}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Popup card */}
              {popupAt && (
                <div
                  className="animate-pop pointer-events-none absolute z-10"
                  style={{
                    left: `${(popupAt.x / MAP_WIDTH) * 100}%`,
                    top: `${(popupAt.y / MAP_HEIGHT) * 100}%`,
                    transform: `translate(${
                      popupAt.x > MAP_WIDTH * 0.6 ? "-100%" : "0"
                    }, ${popupAt.y < 125 ? "40px" : "-115%"})`,
                  }}
                >
                  <div className="pointer-events-auto w-60 rounded-xl bg-white p-3 shadow-lift ring-1 ring-line">
                    <div className="flex items-start justify-between gap-2">
                      {selectedBooth ? (
                        <div className="flex items-center gap-2.5">
                          {getStandKind(selectedBooth.country.slug) === "country" && <Flag code={selectedBooth.country.flag} className="h-6" />}
                          <div>
                            <p className="text-sm font-extrabold text-ink">
                              #{selectedBooth.booth.id}{" "}
                              {selectedBooth.country.name}
                            </p>
                            <p className="text-xs text-ink-soft">
                              {selectedBooth.country.tags.join(" • ")}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-extrabold text-ink">
                          {selectedFacility?.label}
                        </p>
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
                        href={`/stand/${standSlug(selectedBooth.country.slug, selectedBooth.booth.id)}`}
                        className="mt-3 flex items-center justify-between rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                      >
                        {t("map.view", {
                          country: selectedBooth.country.name,
                        })}
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-line">
            <button
              type="button"
              aria-label={t("map.zoomIn")}
              onClick={() => setZoom((value) => Math.min(4, value + 0.5))}
              className="grid size-9 place-items-center text-ink hover:bg-mist"
            >
              <Plus className="size-4" />
            </button>

            <span className="h-px bg-line" />

            <button
              type="button"
              aria-label={t("map.zoomOut")}
              onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
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
          <h2 className="text-sm font-extrabold text-ink">
            {t("map.findCountry")}
          </h2>

          <label className="relative mt-3 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("map.search")}
              className="w-full rounded-lg bg-mist py-2 pl-9 pr-3 text-sm text-ink ring-1 ring-line outline-none placeholder:text-ink-faint focus:ring-brand"
            />
          </label>

          <ul className="mt-2 max-h-72 overflow-y-auto lg:max-h-[340px]">
            {results.map(({ booth, country }) => {
              const active =
                selection?.kind === "booth" &&
                selection.id === booth.id;

              return (
                <li key={booth.id}>
                  <button
                    type="button"
                    onClick={() => selectBooth(booth.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition",
                      active
                        ? "bg-brand-soft text-brand"
                        : "text-ink hover:bg-mist",
                    )}
                  >
                    {getStandKind(country.slug) === "country" && <Flag code={country.flag} className="h-4" />}

                    <span className="flex-1 font-medium">
                      {country.name}
                    </span>

                    <span className="text-xs font-bold text-ink-faint">
                      #{booth.id}
                    </span>

                    <ChevronRight className="size-3.5 text-ink-faint" />
                  </button>
                </li>
              );
            })}

            {results.length === 0 && (
              <li className="px-2 py-3 text-sm text-ink-faint">
                {t("map.noResults", { q: query })}
              </li>
            )}
          </ul>
        </Card>

        <Card className="p-4">
          <h2 className="mb-2 text-sm font-extrabold text-ink">
            {t("map.legend")}
          </h2>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-ink-soft lg:grid-cols-1">
            <li className="flex items-center gap-2">
              <span className="h-3.5 w-5 rounded-[3px] border border-line bg-white shadow-[inset_0_3px_0_#e63946]" />
              {t("map.legendBooth")}
            </li>

            {(Object.keys(facilityStyle) as MapFacilityType[])
              .filter((key) => facilityStyle[key].legend && facilities.some(f => f.type === key))
              .map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <span
                    className="grid size-5 place-items-center rounded-full text-[9px] font-extrabold text-white"
                    style={{ background: facilityStyle[key].bg }}
                  >
                    {facilityStyle[key].glyph}
                  </span>
                  {t(facilityStyle[key].legend!)}
                </li>
              ))}
          </ul>
        </Card>
      </aside>
    </div>
  );
}
