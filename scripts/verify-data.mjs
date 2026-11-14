import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const root = process.cwd();
const cache = new Map();
// Execute real data modules after TS transpilation, including path aliases.
function load(relative) {
  let filename = path.resolve(root, relative);
  if (!path.extname(filename)) filename += '.ts';
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} }; cache.set(filename, module);
  const code = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const localRequire = name => name.startsWith('@/') ? load('src/' + name.slice(2)) :
    name.startsWith('.') ? load(path.resolve(path.dirname(filename), name)) : require(name);
  new Function('require', 'module', 'exports', code)(localRequire, module, module.exports);
  return module.exports;
}
const { booths, facilities, MAP_WIDTH, MAP_HEIGHT } = load('src/data/map.ts');
const { stands, resolveStand, getStand } = load('src/data/stands.ts');
const { countries } = load('src/data/countries/list.ts');
const { mapIdentities } = load('src/data/countries/map-identities.ts');
const { getSiteOrigin } = load('src/lib/site.ts');
assert.equal(MAP_WIDTH,1000); assert.equal(MAP_HEIGHT,680);
assert.equal(booths.length,36); assert.equal(stands.length,36);
for (const key of ['id','slug','boothCode']) assert.equal(new Set(stands.map(s=>s[key])).size,36, key);
assert.deepEqual(booths.map(b=>Number(b.id)),Array.from({length:36},(_,i)=>i+1));
for (const booth of booths) {
  assert.ok(Number.isFinite(booth.x) && Number.isFinite(booth.y));
  assert.ok(booth.x>=0 && booth.x<=1000 && booth.y>=0 && booth.y<=680);
  assert.ok(mapIdentities[booth.country]);
  const stand=stands.find(s=>s.boothCode===booth.id);
  assert.ok(stand); assert.equal(getStand(stand.slug),stand);
  for (const locale of ['en','ru']) {
    const translated=resolveStand(stand,locale);
    assert.ok(translated.name); assert.equal(translated.translationFallback,false);
  }
}
assert.deepEqual(booths.filter(b=>b.country==='china').map(b=>b.id),['15','16']);
assert.equal(getStand('china-15').countrySlug,'china');
assert.equal(getStand('china-16').countrySlug,'china');
assert.equal(getStand('indonesia').boothCode,'17');
assert.equal(getStand('tea-pavilion').boothCode,'36');
assert.equal(getStand('engineering').flagCode,undefined);
assert.equal(getStand('missing'),undefined);
assert.equal(countries.length,35);
assert.equal(countries.find(c=>c.slug==='china').booth,'15, 16');
// Independent anchor expectations from approved 1480x1200 plan.
assert.ok(Math.abs(booths[0].x-127.13333333333333)<1e-8);
assert.ok(Math.abs(booths[16].y-141.66666666666666)<1e-8);
assert.ok(Math.abs(facilities[0].x-715.3333333333333)<1e-8);
assert.deepEqual(facilities.map(f=>f.id),['stage-main','entrance']);
assert.ok(existsSync('public/maps/nsu-courtyard.svg'));
const old=process.env.SITE_URL;
try {
  process.env.SITE_URL='https://festival.example.edu';
  assert.equal(getSiteOrigin().origin,'https://festival.example.edu');
  process.env.SITE_URL='https://other.example.edu';
  assert.equal(getSiteOrigin().origin,'https://other.example.edu');
  process.env.SITE_URL='https://example.edu/subpath'; assert.throws(getSiteOrigin);
} finally { if(old===undefined) delete process.env.SITE_URL; else process.env.SITE_URL=old; }
console.log('OK: 36 unique stand routes, 35 profiles, A geometry, EN/RU, runtime domain configuration.');
