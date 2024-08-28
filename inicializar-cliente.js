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