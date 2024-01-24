describe('Fibonacci Page', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('В input пусто, кнопка "Рассчитать" недоступна', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('Число Фибоначчи рассчитывается корректно', () => {
    cy.get('input').type('13');
    cy.get('button').contains('Рассчитать').click();
    cy.get('[class*=circle_content]', {timeout: 10000}).should('have.length', 14).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('1');
      }
      if (index === 5) {
        cy.wrap($el).contains('8');
      }
      if (index === 13) {
        cy.wrap($el).contains('377');
      }
    })
  });
})