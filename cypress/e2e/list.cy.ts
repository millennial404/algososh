describe('String Page', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('В input пусто, кнопка "Добавить в Head и Tail" недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже', () => {
    cy.get('input[name=value]').should('have.value', '');
    cy.get('input[name=index]').should('have.value', '');
    cy.get('[data-cy="addToHeadButton"]').should('be.disabled');
    cy.get('[data-cy="addToTailButton"]').should('be.disabled');
    cy.get('[data-cy="addByIndex"]').should('be.disabled');
    cy.get('[data-cy="removeByIndex"]').should('be.disabled');
  })

  it('Корректность отрисовки дефолтного списка', () => {
    cy.get('[class*=circle_content]').should('have.length', 5).each(($el) => {
      cy.wrap($el).children('[class*=circle_default]').children().should(($element) => {
        const text = $element.text();
        expect(text).to.match(/\b(?:[0-9]|[1-9][0-9]|100)\b/);
      });
    })
    cy.get('[class*=circle_content]').first().contains('head');
    cy.get('[class*=circle_content]').last().contains('tail');
  })

  it('Корректность добавления элемента в head', () => {
    cy.get('input[name=value]').type('78');
    cy.get('[data-cy="addToHeadButton"]').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]').first().contains('78');
    cy.get('[class*=circle_content]').first().children('[class*=circle_modified]');
    cy.wait(1000);
    cy.get('[class*=circle_content]').first().children('[class*=circle_default]');
    cy.get('[class*=circle_content]').should('have.length', 6)
  })

  it('Корректность добавления элемента в tail', () => {
    cy.get('input[name=value]').type('78');
    cy.get('[data-cy="addToTailButton"]').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]').last().contains('78');
    cy.get('[class*=circle_content]').last().children('[class*=circle_modified]');
    cy.wait(1000);
    cy.get('[class*=circle_content]').last().children('[class*=circle_default]');
    cy.get('[class*=circle_content]').should('have.length', 6)
  })

  it('Корректность добавления элемента по индексу', () => {
    cy.get('input[name=value]').type('78');
    cy.get('input[name=index]').type('2');
    cy.get('[data-cy="addByIndex"]').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(2).contains('78');
    cy.get('[class*=circle_content]').eq(2).children('[class*=circle_modified]');
    cy.wait(1000);
    cy.get('[class*=circle_content]').eq(2).children('[class*=circle_default]');
    cy.get('[class*=circle_content]').should('have.length', 6)
  })

  it('Корректность удаления элемента по индексу', () => {
    cy.get('input[name=index]').type('2');
    cy.get('[data-cy="removeByIndex"]').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]').eq(0).children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(1).children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').eq(2).children('[class*=circle_changing]');
    cy.get('[class*=circle_content]').should('have.length', 5)
  })

  it('Корректность удаления элемента из head', () => {
    cy.get('[data-cy="deleteFromHeadButton"]').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]').should('have.length', 4)
  })

  it('Корректность удаления элемента из tail', () => {
    cy.get('[data-cy="deleteFromTailButton"]').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]').should('have.length', 4)
  })

})