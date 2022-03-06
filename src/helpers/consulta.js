exports.consulta = (query) => {
  const consultas = {
    categoria: {
      categoria: {
        nombre: {
          equals: query.categoria,
        },
      },
    },
    nombre: {
      nombre: {
        contains: query.nombre,
      },
    },
  };

  return consultas[Object.keys(query)[0]];
};
