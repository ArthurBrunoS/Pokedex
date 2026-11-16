const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const source = fs.readFileSync(path.join(__dirname, "../src/js/source.js"), "utf8");
class Node {
  constructor() { this.children = []; this.dataset = {}; this.attributes = {}; this.listeners = {}; this.value = ""; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes.flatMap(node => node.fragment ? node.children : [node]); }
  setAttribute(key, value) { this.attributes[key] = value; }
  addEventListener(key, callback) { this.listeners[key] = callback; }
  showModal() { this.open = true; }
  close() { this.open = false; this.listeners.close?.(); }
  focus() { this.focused = true; }
}
function pokemon(id = 25, name = "pikachu") {
  return { id, name, sprites: { front_default: "https://example.com/pokemon.png" }, height: 4, weight: 60,
    types: [{ type: { name: "electric" } }], abilities: [{ ability: { name: "static" } }] };
}
function response(data, status = 200) { return { ok: status === 200, status, json: async () => data }; }
function setup() {
  const nodes = new Map();
  const get = id => { if (!nodes.has(id)) nodes.set(id, new Node()); return nodes.get(id); };
  const document = {
    getElementById: get, querySelector: get,
    createElement: () => new Node(),
    createDocumentFragment: () => Object.assign(new Node(), { fragment: true })
  };
  let handler = async url => response(url.includes("?limit=")
    ? { count: 48, results: [{ url: "https://example.com/detail" }] } : pokemon());
  const context = { document, fetch: (...args) => handler(...args), AbortController, Map, console };
  vm.createContext(context);
  vm.runInContext(source, context);
  return { context, get, setFetch: value => { handler = value; } };
}
test("listagem renderiza card e libera estado de carregamento", async () => {
  const { context, get } = setup();
  await context.loadPokemon("", 0);
  assert.equal(get("listPokemon").children.length, 1);
  assert.equal(get("listPokemon").attributes["aria-busy"], "false");
  assert.equal(get("previous").disabled, true);
  assert.equal(get("next").disabled, false);
});
test("404 e falha de rede exibem mensagens recuperáveis", async () => {
  const { context, get, setFetch } = setup();
  setFetch(async () => response({}, 404));
  await context.loadPokemon("inexistente");
  assert.match(get("status").textContent, /não encontrado/);
  setFetch(async () => { throw new TypeError("network"); });
  await context.loadPokemon("pikachu");
  assert.match(get("status").textContent, /conexão/);
  assert.equal(get("listPokemon").attributes["aria-busy"], "false");
});
test("resposta antiga não substitui a busca mais recente", async () => {
  const { context, get, setFetch } = setup();
  let release;
  setFetch(url => url.endsWith("/slow") ? new Promise(resolve => { release = resolve; })
    : Promise.resolve(response(pokemon(1, "bulbasaur"))));
  const slow = context.loadPokemon("slow");
  await context.loadPokemon("bulbasaur");
  release(response(pokemon()));
  await slow;
  assert.equal(get("listPokemon").children[0].dataset.id, "1");
});
test("card de resultado abre detalhes depois de uma busca", async () => {
  const { context, get } = setup();
  await context.loadPokemon("pikachu");
  const card = get("listPokemon").children[0];
  get("listPokemon").listeners.click({ target: { closest: () => card } });
  assert.equal(get("pokemon-dialog").open, true);
  assert.equal(get("pokemon-details").children[0].textContent, "pikachu");
});
