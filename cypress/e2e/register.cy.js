/**
 * skenario testing
 *
 * - RegisterPage
 *   - should display register page correctly
 *   - should allow user to fill register form
 *   - should register successfully and redirect to login page
 *   - should display error message when register fails
 *   - should not submit form when fields are empty
 *   - should validate minimum password length
 *   - should navigate to login page when Login link is clicked
 */

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should display register page correctly', () => {
    cy.contains('h1', 'Buat Akun').should('be.visible')

    cy.contains(
      'Daftar untuk mulai bergabung dalam diskusi.'
    ).should('be.visible')

    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')

    cy.contains('button', 'Daftar').should('be.visible')
    cy.contains('Sudah punya akun?').should('be.visible')
    cy.contains('Login').should('be.visible')
  })

  it('should allow user to fill register form', () => {
    cy.get('input[name="name"]').type('Luky Ana')
    cy.get('input[name="name"]').should('have.value', 'Luky Ana')

    cy.get('input[name="email"]').type('luky@gmail.com')
    cy.get('input[name="email"]').should('have.value', 'luky@gmail.com')

    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="password"]').should('have.value', 'password123')
  })

  it('should register successfully and redirect to login page', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 201,
      body: {
        status: 'success',
        message: 'Register berhasil',
        data: {
          user: {
            id: 'user-1',
            name: 'Budi Santoso',
            email: 'budi@gmail.com'
          }
        }
      }
    }).as('register')

    cy.get('input[name="name"]')
      .type('Budi Santoso')

    cy.get('input[name="email"]')
      .type('budi@gmail.com')

    cy.get('input[name="password"]')
      .type('password123')

    cy.contains('button', 'Daftar').click()

    cy.wait('@register')

    cy.url().should('include', '/login')
  })

  it('should display error message when register fails', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email sudah terdaftar'
      }
    }).as('registerFailed')

    cy.get('input[name="name"]')
      .type('Budi Santoso')

    cy.get('input[name="email"]')
      .type('budi@gmail.com')

    cy.get('input[name="password"]')
      .type('password123')

    cy.contains('button', 'Daftar').click()

    cy.wait('@registerFailed')

    cy.get('body').should(
      'contain',
      'Email sudah terdaftar'
    )
  })

  it('should not submit form when fields are empty', () => {
    cy.contains('button', 'Daftar').click()

    cy.get('input[name="name"]')
      .should('have.attr', 'required')

    cy.get('input[name="email"]')
      .should('have.attr', 'required')

    cy.get('input[name="password"]')
      .should('have.attr', 'required')

    cy.url().should('include', '/register')
  })

  it('should validate minimum password length', () => {
    cy.get('input[name="name"]')
      .type('Budi Santoso')

    cy.get('input[name="email"]')
      .type('budi@gmail.com')

    cy.get('input[name="password"]')
      .type('123')

    cy.get('input[name="password"]')
      .should('have.attr', 'minlength', '6')
      .and('have.value', '123')

    cy.get('input[name="password"]').then(($input) => {
      expect($input.val().length).to.be.lessThan(6)
    })
  })

  it('should navigate to login page when Login link is clicked', () => {
    cy.contains('a', 'Login').click()

    cy.url().should('include', '/login')
  })
})
