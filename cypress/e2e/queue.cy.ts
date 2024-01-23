describe('Queue Page', () => {
  beforeEach(() => {
    cy.visit('/queue');
  });
  it('Проверка доступности кнопки добавления', () => {
    cy.get('input[name=value]').should('have.value', '');
    cy.get('.cy_test_button_add').should('be.disabled');
  });

  it('Правильность добавления элемента в очередь', () => {

    cy.get('input').type('00');
    cy.get('.cy_test_button_add').click();

    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('@firstElement').contains('00');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.wait(1000);
    cy.get('@firstElement').children('[class*=circle_default]');

    cy.get('input').type('11');
    cy.get('button').contains('Добавить').click();
    cy.wait(1000);

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('00');
        cy.wrap($el).contains('head');
      }
      if (index === 1) {
        cy.wrap($el).contains('11');
        cy.wrap($el).contains('tail');
      }
    });
  });

  it('Правильность удаления элемента из очереди', () => {

    cy.get('[name="value"]').type('00');
    cy.get('.cy_test_button_add').click();
    cy.wait(1000);
    cy.get('.cy_test_button_del').click();
    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.wait(1000);
    cy.get('@firstElement').children('[class*=circle_default]');
    cy.get('@firstElement').find('.text_type_circle').should('be.empty');


  });

})