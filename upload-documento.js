const fs = require('fs');
const { parse } = require('csv-parse');
const Typesense = require('typesense');

// Configura el cliente de Typesense
const client = new Typesense.Client({
  'nodes': [{
    'host': 'typesense-uzmjk-u10617.vm.elestio.app', 
    'port': '443', 
    'protocol': 'https' 
  }],
  'apiKey': 'V3jRwnRK-6FTf-0vt9clbm',
  'connectionTimeoutSeconds': 2
});

// Función para importar documentos
async function importDocuments() {
  const parser = fs.createReadStream('D:\\typesense\\documentos.csv').pipe(parse({
    columns: true,
    skip_empty_lines: true
  }));

  for await (const record of parser) {
    try {
      await client.collections('documentos').documents().create(record);
      console.log('Documento importado:', record.titulo);
    } catch (error) {
      console.error('Error al importar documento:', error);
    }
  }

  console.log('Importación completada');
}

importDocuments();