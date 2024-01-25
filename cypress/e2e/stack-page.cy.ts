describe('Stack Page', () => {
  beforeEach(() => {
    cy.visit('/stack');
  })

  it('В input пусто, кнопки недоступна', () => {
    cy.get('[data-cy="input"]').should('have.value', '');
    cy.get('[data-cy="addButton"]').should('be.disabled');
    cy.get('[data-cy="delButton"]').should('be.disabled');
    cy.get('[data-cy="clearButton"]').should('be.disabled');
  })

  it('Правильность добавления элемента в стек', () => {
    cy.get('[data-cy="input"]').type('a');
    cy.get('[data-cy="addButton"]').click();
    cy.get('[class*=circle_content]').should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wait(1000);
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).contains('top');
        cy.wrap($el).contains('0');
      }
    })
  })

  it('Правильность удаления элемента из стека', () => {
    cy.get('[data-cy="input"]').type('a');
    cy.get('[data-cy="addButton"]').click();
    cy.wait(1000);
    cy.get('[data-cy="delButton"]').click();
    cy.get('[class*=circle_content]').first().children('[class*=circle_changing]');
    cy.wait(1000);
    cy.get('[class*=circle_content]').should('have.length', 0)
  })

  it('Правильность очистки стека', () => {
    cy.get('[data-cy="input"]').type('a');
    cy.get('[data-cy="addButton"]').click();
    cy.wait(1000);
    cy.get('[data-cy="input"]').type('b');
    cy.get('[data-cy="addButton"]').click();
    cy.wait(1000);
    cy.get('[data-cy="input"]').type('c');
    cy.get('[data-cy="addButton"]').click();
    cy.wait(1000);
    cy.get('[data-cy="clearButton"]').click();
    cy.get('[class*=circle_content]').should('have.length', 0)
  })

})