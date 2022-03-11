const FormatoFecha = (fecha) => {
  const nuevaFecha = new Date(fecha)
  return `${nuevaFecha.getFullYear()}-${nuevaFecha.getMonth()}-${nuevaFecha.getDate() + 1}`;
};

export default FormatoFecha;
