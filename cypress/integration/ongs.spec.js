/// <reference types="cypress" />

import Logon from '../support/pages/Logon'
import Register from '../support/pages/Register'
import Profile from '../support/pages/Profile'
import NewIncident from '../support/pages/NewIncident'

describe('Ongs', () => {
  it('devem poder realizar um cadastro', () => {
    // cy.get - busca um elemento
    // .type - insere um texto

    // routing -- escuta onde a aplicação está se conectando
    // 1. start server com cy.server() (passo feito no beforeEach)
    // 2. criar uma rota com cy.route()
    // 3. atribuir rota a um alias
    // 4. esperar com cy.wait e fazer uma validação

    // acessar cadastro
    // preencher cadastro
    // validar cadastro

    Register.acessarCadastro()
    Register.preencherCadastro()
    Register.validarCadastro()
  })

  it('devem poder realizar um login no sistema', () => {
    // ações:
    // acessar login
    // preencher login

    // elementos:
    // id
    // button-login

    Logon.acessarLogin()
    Logon.preencherLogin()

  });

  it('devem poder fazer logout', () => {
    cy.login()
    Profile.clicarNoBotaoLogout()
  })

  it('devem poder cadastrar novos casos', () => {
    cy.login()
    Profile.clicarNoBotaoCadastrarNovosCasos()
    NewIncident.preencherNovoCaso()
    NewIncident.validarCadastroNovoCaso()
  })

  it('devem poder excluir um caso', () => {
    cy.createNewIncident()
    cy.createNewIncident()
    cy.login()

    Profile.clicarNoBotaoDeletarPrimeiroCaso()
    Profile.validarExclusaoDeCaso()
  })
})

// page objects
// cada página vai ter duas coisas:
// 1. ações
// 2. elementos