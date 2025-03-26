describe('Register flow', () => {
  it('Should create account with proper credentials', () => {
    cy.visit('http://localhost:4200/register')

    cy.get('*[id^="name"]').click().type("cypress")

    cy.get('*[id^="email"]').click().type("cypress@gmail.com")

    cy.get('*[id^="password"]').click().type("cypressPassword")

    cy.get('*[id^="confirmPassword"]').click().type("cypressPassword")

    cy.get('button').contains("Register").click()

    cy.get('*[class^="success-message"]').should('contain', 'Account created successfully!')

  })
})
