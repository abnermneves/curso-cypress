const el = require('./elements').ELEMENTS

// acessar cadastro
// preencher cadastro
// validar cadastro

class Register {
  acessarCadastro() {
    cy.visit('http://localhost:3000/register')
  }

  preencherCadastro() {
    cy.get(el.nameInput).type('anticabaré dos gatos')
    cy.get(el.emailInput).type('gatos@anticabare.com')
    cy.get(el.whatsappInput).type('31999999999');
    cy.get(el.cityInput).type('Belo Horizonte');
    cy.get(el.ufInput).type('MG');

    cy.route('POST', '**/ongs').as('postOng')

    cy.get(el.submitButton).click()
  }

  validarCadastro() {
    cy.wait('@postOng').then(xhr => {
      expect(xhr.status).be.equal(200)
      expect(xhr.response.body).has.property('id')
      expect(xhr.response.body.id).is.not.null
    })
  }
}

export default new Register()
