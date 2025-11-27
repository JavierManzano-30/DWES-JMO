const http = require("http");
const { URL } = require("url");

// Dataset en memoria para la demo
const books = [
  { id: 1, title: "Foundation", author: "Asimov", pages: 255, rating: 4.6, tags: ["sci-fi", "classic"] },
  { id: 2, title: "Dune", author: "Herbert", pages: 412, rating: 4.8, tags: ["sci-fi"] },
  { id: 3, title: "Clean Code", author: "Martin", pages: 464, rating: 4.7, tags: ["tech", "software"] },
  { id: 4, title: "The Pragmatic Programmer", author: "Hunt", pages: 352, rating: 4.5, tags: ["tech", "software"] },
  { id: 5, title: "Hyperion", author: "Simmons", pages: 482, rating: 4.4, tags: ["sci-fi"] },
  { id: 6, title: "Neuromancer", author: "Gibson", pages: 271, rating: 4.2, tags: ["cyberpunk", "sci-fi"] },
  { id: 7, title: "The Name of the Wind", author: "Rothfuss", pages: 662, rating: 4.7, tags: ["fantasy"] },
  { id: 8, title: "Mistborn", author: "Sanderson", pages: 541, rating: 4.6, tags: ["fantasy"] },
  { id: 9, title: "The Hobbit", author: "Tolkien", pages: 310, rating: 4.7, tags: ["fantasy", "classic"] },
  { id: 10, title: "Contact", author: "Sagan", pages: 430, rating: 4.3, tags: ["sci-fi"] },
];

const DEFAULT_TOP = 10;

const parseSimpleFilter = (expr) => {
  if (!expr) return null;
  const parts = expr.split(" ").filter(Boolean);
  if (parts.length < 3) return null;
  const [field, op, ...valueParts] = parts;
  const rawValue = valueParts.join(" ");
  const trimmed = rawValue.replace(/^['"]|['"]$/g, "");
  return { field, op: op.toLowerCase(), value: trimmed };
};

const applyFilter = (items, expr) => {
  const parsed = parseSimpleFilter(expr);
  if (!parsed) return items;
  const { field, op, value } = parsed;
  return items.filter((item) => {
    if (!(field in item)) return false;
    const target = item[field];
    if (op === "contains") {
      return String(target).toLowerCase().includes(String(value).toLowerCase());
    }
    if (typeof target === "number") {
      const num = Number(value);
      if (Number.isNaN(num)) return false;
      if (op === "eq") return target === num;
      if (op === "gt") return target > num;
      if (op === "lt") return target < num;
      return false;
    }
    const targetStr = String(target).toLowerCase();
    const valueStr = String(value).toLowerCase();
    if (op === "eq") return targetStr === valueStr;
    return false;
  });
};

const applySelect = (items, select) => {
  if (!select) return items;
  const fields = select
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);
  if (!fields.length) return items;
  return items.map((item) => {
    const projected = {};
    fields.forEach((field) => {
      if (field in item) {
        projected[field] = item[field];
      }
    });
    return projected;
  });
};

const applyOrder = (items, orderby) => {
  if (!orderby) return items;
  const [field, direction = "asc"] = orderby.split(" ").map((p) => p.trim()).filter(Boolean);
  if (!field) return items;
  const dir = direction.toLowerCase() === "desc" ? -1 : 1;
  return [...items].sort((a, b) => {
    if (!(field in a) || !(field in b)) return 0;
    if (a[field] === b[field]) return 0;
    return a[field] > b[field] ? dir : -dir;
  });
};

const applyPagination = (items, top, skip) => {
  const safeSkip = Number.isInteger(skip) && skip > 0 ? skip : 0;
  const safeTop = Number.isInteger(top) && top > 0 ? Math.min(top, items.length) : DEFAULT_TOP;
  return items.slice(safeSkip, safeSkip + safeTop);
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/odata/books") {
    const filter = url.searchParams.get("$filter");
    const select = url.searchParams.get("$select");
    const orderby = url.searchParams.get("$orderby");
    const top = url.searchParams.get("$top");
    const skip = url.searchParams.get("$skip");

    const filtered = applyFilter(books, filter);
    const ordered = applyOrder(filtered, orderby);
    const paged = applyPagination(ordered, top ? Number(top) : undefined, skip ? Number(skip) : undefined);
    const projected = applySelect(paged, select);

    return sendJson(res, 200, {
      value: projected,
      count: filtered.length,
      applied: { filter, select, orderby, top: top ? Number(top) : undefined, skip: skip ? Number(skip) : undefined },
    });
  }

  if (req.method === "GET" && url.pathname === "/") {
    return sendJson(res, 200, {
      message: "Mini API OData-like. Usa /odata/books con $filter, $select, $orderby, $top, $skip.",
      example: "/odata/books?$filter=rating gt 4.5&$select=title,rating",
    });
  }

  sendJson(res, 404, { error: "Not found" });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Servidor OData-like escuchando en http://localhost:${PORT}`);
  });
}

module.exports = { server };
