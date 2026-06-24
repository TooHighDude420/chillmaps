describe('login / register functionalities', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    });

    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('login with email / password', () => {
        cy.get('input[id=email]').should('exist').type("test@gmail.com");
        cy.get('input[id=password]').should('exist').type("test123");
        cy.get('button[id=login]').should('exist').click();
        cy.url().should('eq', 'http://localhost:5173/');
    });

    it('register with email / password', () => {
        cy.get('button[id=register]').should('exist').click()
        cy.get('input[id=email]').should('exist').type(`user${Date.now()}@gmail.com`);
        cy.get('input[id=username]').should('exist').type(`user${Date.now()}`);
        cy.get('input[id=password]').should('exist').type('test1234');
        cy.get('input[id=passwordre]').should('exist').type('test1234');
        cy.get('button[id=login]').should('exist').click()
    });

    it('login with github', () => {
        cy.get('button[id=github]').should('exist').click()
        cy.url().should('contain', 'github');
    })
})