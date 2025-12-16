const config = require('../config');

const initialNotes = [
  {
    id: 1,
    title: 'Plan de viaje',
    content: 'Reservar vuelos, hotel y planificar visitas.',
    category: 'personal',
    createdAt: '2024-01-02T09:00:00Z',
    updatedAt: '2024-01-05T11:30:00Z',
  },
  {
    id: 2,
    title: 'Reunion equipo',
    content: 'Agenda: metricas Q1, roadmap y asignacion de tareas.',
    category: 'work',
    createdAt: '2024-02-12T10:00:00Z',
    updatedAt: '2024-02-12T10:30:00Z',
  },
  {
    id: 3,
    title: 'Ideas de producto',
    content: 'Lista de ideas para la proxima iteracion del bloc de notas.',
    category: 'ideas',
    createdAt: '2024-02-25T16:00:00Z',
    updatedAt: '2024-03-01T09:15:00Z',
  },
  {
    id: 4,
    title: 'Recetas rapidas',
    content: 'Pasta con pesto, ensalada Cesar, tortilla de patatas.',
    category: 'personal',
    createdAt: '2024-01-20T19:00:00Z',
    updatedAt: '2024-01-22T08:00:00Z',
  },
  {
    id: 5,
    title: 'Backlog tecnico',
    content: 'Refactor de middleware, anadir paginacion, mejorar logs.',
    category: 'work',
    createdAt: '2024-03-05T13:00:00Z',
    updatedAt: '2024-03-06T12:45:00Z',
  },
  {
    id: 6,
    title: 'Libros pendientes',
    content: 'Clean Architecture, The Phoenix Project, Accelerate.',
    category: 'personal',
    createdAt: '2024-02-02T14:00:00Z',
    updatedAt: '2024-02-10T09:00:00Z',
  },
  {
    id: 7,
    title: 'Nota corta',
    content: 'Algo breve.',
    category: 'ideas',
    createdAt: '2024-03-10T09:00:00Z',
    updatedAt: '2024-03-10T09:00:00Z',
  },
  {
    id: 8,
    title: 'Checklist despliegue',
    content: 'Tests, build, migraciones, backup, monitoreo.',
    category: 'work',
    createdAt: '2024-03-08T08:30:00Z',
    updatedAt: '2024-03-09T18:00:00Z',
  },
];

const notes = [];
let nextId = Math.max(...initialNotes.map((n) => n.id)) + 1;

const seedNotes = () => {
  notes.splice(0, notes.length, ...initialNotes.map((note) => ({ ...note })));
  nextId = Math.max(...notes.map((n) => n.id)) + 1;
};

seedNotes();

const DEFAULT_SORT_BY = 'updatedAt';
const DEFAULT_SORT_DIR = 'desc';

const withSize = (item) => ({ ...item, size: item.content.length });

const parseDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const applyFilters = (items, filters) => {
  const {
    titleContains,
    contentContains,
    category,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
  } = filters;

  const createdFromDate = createdFrom ? parseDate(createdFrom) : null;
  const createdToDate = createdTo ? parseDate(createdTo) : null;
  const updatedFromDate = updatedFrom ? parseDate(updatedFrom) : null;
  const updatedToDate = updatedTo ? parseDate(updatedTo) : null;

  return items.filter((note) => {
    if (titleContains && !note.title.toLowerCase().includes(String(titleContains).toLowerCase())) {
      return false;
    }
    if (contentContains && !note.content.toLowerCase().includes(String(contentContains).toLowerCase())) {
      return false;
    }
    if (category && note.category.toLowerCase() !== String(category).toLowerCase()) {
      return false;
    }

    if (createdFromDate && new Date(note.createdAt) < createdFromDate) {
      return false;
    }
    if (createdToDate && new Date(note.createdAt) > createdToDate) {
      return false;
    }
    if (updatedFromDate && new Date(note.updatedAt) < updatedFromDate) {
      return false;
    }
    if (updatedToDate && new Date(note.updatedAt) > updatedToDate) {
      return false;
    }

    return true;
  });
};

const SORT_FIELDS = ['title', 'createdAt', 'updatedAt', 'size'];

const applySort = (items, sortBy, sortDir) => {
  const dir = sortDir === 'asc' ? 1 : -1;
  const key = SORT_FIELDS.includes(sortBy) ? sortBy : DEFAULT_SORT_BY;

  return [...items].sort((a, b) => {
    const aVal = key === 'size' ? a.size : a[key];
    const bVal = key === 'size' ? b.size : b[key];

    if (aVal === undefined || bVal === undefined) return 0;

    if (key === 'createdAt' || key === 'updatedAt') {
      const aDate = new Date(aVal);
      const bDate = new Date(bVal);
      if (aDate.getTime() === bDate.getTime()) return 0;
      return aDate > bDate ? dir : -dir;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      if (aVal === bVal) return 0;
      return aVal > bVal ? dir : -dir;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    if (aStr === bStr) return 0;
    return aStr > bStr ? dir : -dir;
  });
};

const applyPagination = (items, page, pageSize) => {
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;
  const safePageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : config.app.pageSize;
  const start = (safePage - 1) * safePageSize;
  const paged = items.slice(start, start + safePageSize);
  const totalItems = items.length;
  const totalPages = totalItems ? Math.ceil(totalItems / safePageSize) : 0;

  return {
    value: paged,
    page: safePage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
  };
};

/**
 * @typedef {Object} NoteFilters
 * @property {string} [titleContains]
 * @property {string} [contentContains]
 * @property {string} [category]
 * @property {string|number|Date} [createdFrom]
 * @property {string|number|Date} [createdTo]
 * @property {string|number|Date} [updatedFrom]
 * @property {string|number|Date} [updatedTo]
 *
 * @typedef {Object} SortOptions
 * @property {string} [by]
 * @property {string} [dir]
 *
 * @typedef {Object} PaginationOptions
 * @property {number} [page]
 * @property {number} [pageSize]
 *
 * @param {{filters?: NoteFilters, sort?: SortOptions, pagination?: PaginationOptions}} [params]
 */
function listNotes({ filters = {}, sort = {}, pagination = {} } = {}) {
  const enriched = notes.map(withSize);
  const filtered = applyFilters(enriched, filters);
  const safeSortBy = SORT_FIELDS.includes(sort.by) ? sort.by : DEFAULT_SORT_BY;
  const safeSortDir = sort.dir === 'asc' ? 'asc' : DEFAULT_SORT_DIR;
  const sorted = applySort(filtered, safeSortBy, safeSortDir);

  const page = Number(pagination.page);
  const pageSize = Number(pagination.pageSize);
  const paginated = applyPagination(sorted, page, pageSize);

  return {
    ...paginated,
    applied: {
      filters: {
        titleContains: filters.titleContains || undefined,
        contentContains: filters.contentContains || undefined,
        category: filters.category || undefined,
        createdFrom: filters.createdFrom || undefined,
        createdTo: filters.createdTo || undefined,
        updatedFrom: filters.updatedFrom || undefined,
        updatedTo: filters.updatedTo || undefined,
      },
      sort: {
        by: safeSortBy,
        dir: safeSortDir,
      },
      pagination: {
        page: Number.isInteger(page) && page > 0 ? page : 1,
        pageSize: Number.isInteger(pageSize) && pageSize > 0 ? pageSize : config.app.pageSize,
      },
    },
  };
}

function getNote(id) {
  return notes.find((note) => note.id === Number(id)) || null;
}

/**
 * Crea una nota; title y content son requeridos, category opcional.
 * @param {{ title: string, content: string, category?: string }} params
 * @returns {{ id: number, title: string, content: string, category: string, createdAt: string, updatedAt: string }}
 */
function createNote({ title, content, category = 'general' }) {
  const now = new Date().toISOString();
  const id = nextId++;
  const newNote = {
    id,
    title,
    content,
    category,
    createdAt: now,
    updatedAt: now,
  };
  notes.push(newNote);
  return newNote;
}

function updateNote(id, payload) {
  const idx = notes.findIndex((note) => note.id === Number(id));
  if (idx === -1) return null;

  const previousUpdatedAt = new Date(notes[idx].updatedAt || 0).getTime();
  const now = Date.now();
  const nextUpdatedAt =
    Number.isFinite(previousUpdatedAt) && now <= previousUpdatedAt
      ? new Date(previousUpdatedAt + 1).toISOString()
      : new Date(now).toISOString();

  const updates = Object.entries(payload || {}).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const updated = {
    ...notes[idx],
    ...updates,
    updatedAt: nextUpdatedAt,
  };
  notes[idx] = updated;
  return updated;
}

function deleteNote(id) {
  const idx = notes.findIndex((note) => note.id === Number(id));
  if (idx === -1) return false;
  notes.splice(idx, 1);
  return true;
}

function resetNotes() {
  seedNotes();
}

module.exports = {
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  resetNotes,
  notes,
};
