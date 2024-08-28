const Typesense = require('typesense')

let client = new Typesense.Client({
  'nodes': [{
    'host': 'typesense-uzmjk-u10617.vm.elestio.app', 
    'port': '443', 
    'protocol': 'https' 
  }],
  'apiKey': 'V3jRwnRK-6FTf-0vt9clbm',
  'connectionTimeoutSeconds': 2
})

console.log('Cliente inicializado:', client)

// Definir el schema de la colección
const schema = {
  'name': 'documentos',
  'fields': [
    {'name': 'titulo', 'type': 'string' },
    {'name': 'contenido', 'type': 'string' },
    {'name': 'fecha', 'type': 'string', 'sort': true },
    {'name': 'boletin', 'type': 'string', 'facet': true },
    {'name': 'subvencion', 'type': 'string', 'facet': true }
  ],
  'default_sorting_field': 'fecha'
}

// Crear la colección
client.collections().create(schema)
  .then(function (data) {
    console.log('Colección creada:', data)
  })
  .catch(function (error) {
    console.error('Error al crear la colección:', error)
  })