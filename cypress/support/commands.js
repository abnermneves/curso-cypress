// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createOng', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/ongs',
    body: {
      city: 'Belo Horizonte',
      email: 'gatos@anticabare.com',
      name: 'anticabaré dos gatos',
      uf: 'MG',
      whatsapp: '31999999999',
      }
    }).then(response => {
      expect(response.body).has.property('id')
      expect(response.body.id).is.not.null
      cy.log(response.body.id)

      // cypress não recomenda que utilizemos let, const nem return
      // recomenda que usemos aliases numa variável de ambiente
      Cypress.env('createdOngId', response.body.id)

    })
})

Cypress.Commands.add('login', () => {
  // para acessar a página profile, precisa ter feito login
  // o login, nessa aplicação, consiste nas proporiedades ongId e ongName na local storage
  // então, antes de acessar profile (onBeforeLoad), é só setar essas duas propriedades
  // assim, o login fica mais rápido e é feito por baixo dos panos
  // não precisa fazer igual no caso de teste anterior
  cy.visit('http://localhost:3000/profile', {
    onBeforeLoad: (browser) => {
      browser.localStorage.setItem('ongId', Cypress.env('createdOngId'))
      browser.localStorage.setItem('ongName', 'anticabaré dos gatos')
    }
  })
})

Cypress.Commands.add('createNewIncident', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/incidents',
    headers: { 'Authorization': `${ Cypress.env('createdOngId') }`},
    body: {
      title: "gato folgado por demais",
      description: "ele deita em cima de você e dorme por horas, achando que você é a cama dele. então preciso comprar uma cama pra ele",
      value: "50000"
    }
  }).then(response => {
    expect(response.body).has.property('id')
    expect(response.body.id).is.not.null
    cy.log(response.body.id)

    Cypress.env('createdIncidentId', response.body.id)
  })
})