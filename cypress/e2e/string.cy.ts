describe('String Page', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('В input пусто, кнопка "Развернуть" недоступна', () => {
    cy.get('[data-cy="input"]').should('have.value', '');
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Cтрока разворачивается корректно', () => {
    const testString = 'qwer';
    const reverseString = testString.split('').reverse().join('');
    cy.get('[data-cy="input"]').type('qwer');
    cy.get('[data-cy="submit"]').click();
    cy.get('[class*=circle_circle]').should('have.length', testString.length).each(($el, index) => {
      if (index === 0 || index === testString.length - 1) {
        cy.wrap($el).should('have.attr', 'class').and('match', /circle_changing/);
      }
    })
    cy.get('[class*=circle_circle]').should('have.length', testString.length).each(($el, index) => {
      if (index === 0 || index === testString.length - 1) {
        cy.wrap($el).should('have.attr', 'class').and('match', /circle_modified/);
      }
      if (index === 1 || index === testString.length - 2) {
        cy.wrap($el).should('have.attr', 'class').and('match', /circle_changing/);
      }
    })
    cy.get('[class*=circle_circle]').should('have.length', testString.length).each(($el, index) => {
      if (index === 1 || index === testString.length - 2) {
        cy.wrap($el).should('have.attr', 'class').and('match', /circle_modified/);
      }
    })
    cy.contains(reverseString);
  });
})