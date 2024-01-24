describe('Fibonacci Page', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  })

  it('В input пусто, кнопки недоступна', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');
  })

})