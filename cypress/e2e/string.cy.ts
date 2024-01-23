describe('String Page', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('Проверка доступности кнопки добавления', () => {
    cy.get('input[name=string]').should('have.value', '');
    cy.get('.cy_test_button_reverse').should('be.disabled');
  });

  it('Cтрока разворачивается корректно', () => {
    const testString = 'qwer';
    cy.get('input').type(testString);
    cy.get('.cy_test_button_reverse').click();

  });

})