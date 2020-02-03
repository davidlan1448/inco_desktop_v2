export function Debug(
    nombreArchivo: string,
    nombreMetodo: string,
    mensaje: any,
    descripcion: string = null,
    type: 'SUCCESS' | 'ERROR' | 'INFO'  | 'WARNING' = 'INFO'
  ) {
    console.log(`
    
    ---- [${type}] --------- ${nombreArchivo} ---------------------
  
      - ${new Date().toTimeString()}
      - METODO: ${nombreMetodo}
      - DESCRIPCION: ${descripcion != null ? descripcion : "No hay descripcion"}.
      - MENSAJE:`, mensaje);
  }