describe('Проверка работы роутинга', () => {

  const routes = ['/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list']

  routes.forEach(route => {
    it(`Страница ${route} доступна`, () => {
      cy.visit(route)
      cy.url().should('include', route)
    })
  })
})