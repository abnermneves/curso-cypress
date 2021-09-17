const el = require('./elements').ELEMENTS

class Profile {
  clicarNoBotaoLogout() {
    cy.get(el.logoutButton).click()
  }

  clicarNoBotaoCadastrarNovosCasos() {
    cy.get('[data-cy=new-case-button]').click()
  }

  clicarNoBotaoDeletarPrimeiroCaso() {
    cy.route('DELETE', '**/incidents/*').as('deleteIncident')
    cy.get(el.deletarPrimeiroCasoButton).click()
  }

  validarExclusaoDeCaso() {
    cy.wait('@deleteIncident').then(xhr => {
      expect(xhr.status).to.equal(204)
      expect(xhr.response.body).to.be.empty
    })
  }
}

export default new Profile()