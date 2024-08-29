const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: "V3jRwnRK-6FTf-0vt9clbm", // Usa tu API key de solo búsqueda
      nodes: [
        {
          host: "typesense-uzmjk-u10617.vm.elestio.app",
          port: "443",
          protocol: "https"
        }
      ]
    },
    additionalSearchParameters: {
      query_by: "titulo,contenido",
      facet_by: "subvencion,boletin"  // Añadimos facetas para subvención y boletín
    }
  });
  
  const searchClient = typesenseInstantsearchAdapter.searchClient;
  
  const search = instantsearch({
    searchClient,
    indexName: "diario"
  });
  
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: `
          <div>
            <div class="hit-name">
              {{#helpers.highlight}}{ "attribute": "titulo" }{{/helpers.highlight}}
            </div>
            <div class="hit-description">
              {{#helpers.highlight}}{ "attribute": "contenido" }{{/helpers.highlight}}
            </div>
            <div>Fecha: {{fecha}}</div>
            <div>Boletín: {{boletin}}</div>
            <div>Subvención: {{subvencion}}</div>
          </div>
        `,
      },
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
    }),
    // Añadimos un refinamiento de lista para subvención
    instantsearch.widgets.refinementList({
      container: '#subvencion-list',
      attribute: 'subvencion',
      operator: 'or',
      limit: 5,
      showMore: true,
      searchable: true,
      searchablePlaceholder: 'Buscar subvenciones',
      cssClasses: {
        searchableInput: 'form-control',
        searchableSubmit: 'btn btn-primary',
        searchableReset: 'btn btn-secondary',
      },
    }),
    // Añadimos un refinamiento de lista para boletín
    instantsearch.widgets.refinementList({
      container: '#boletin-list',
      attribute: 'boletin',
      operator: 'or',
      limit: 10,
      showMore: true,
      searchable: true,
      searchablePlaceholder: 'Buscar boletines',
      cssClasses: {
        searchableInput: 'form-control',
        searchableSubmit: 'btn btn-primary',
        searchableReset: 'btn btn-secondary',
      },
    }),
  ]);
  
  search.start();
