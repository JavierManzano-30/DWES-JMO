function topNota(alumno) {
  return {
    name: alumno.name,
    topNote: Math.max(...alumno.notes)
  };
}

// Ejemplo:
console.log(topNota({ name: 'John', notes: [3, 5, 4] }));
// ➝ { name: "John", topNote: 5 }
