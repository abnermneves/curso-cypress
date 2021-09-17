const el = require('./elements').ELEMENTS

class NewIncident {
  preencherNovoCaso() {
    cy.get(el.titleInput).type('gato folgado demais')
    cy.get(el.descriptionInput).type('ele deita em cima de você e dorme por horas, achando que você é a cama dele. então preciso comprar uma cama pra ele')
    cy.get(el.valueInput).type('50000')

    cy.route('POST', '**/incidents').as('newIncident')

    cy.get(el.createNewCaseButton).click()
  }

  validarCadastroNovoCaso() {
    cy.wait('@newIncident').then(xhr => {
      expect(xhr.status).be.equal(200)
      expect(xhr.response.body).has.property('id')
      expect(xhr.response.body.id).is.not.null
    })
  }
}

export default new NewIncident()