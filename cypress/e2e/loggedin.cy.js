
describe('test that require login', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    });

    beforeEach(() => {
        cy.login();
    });

    it('edit profile', () => {
        cy.visit('http://localhost:5173/profile');
        cy.url().should('contain', '/profile');
        cy.get('button[id=settings]').should('exist').click();
        cy.contains('Username:');
        cy.get('input[id=username]').should('exist').clear().type(`user${Date.now()}`);
        cy.get('input[id=email]').should('exist').clear().type(`user${Date.now()}@gmail.com`);
        cy.get('input[id=bio]').should('exist').clear().type(`user${Date.now()}'s bio`);
        cy.get('button[id=update]').should('exist').click();
        cy.url().should('eq', 'http://localhost:5173/')
    });

    it('make post', () => {
        cy.visit('http://localhost:5173/post');
        cy.url().should('contain', '/post');

        let post_title = `post${Date.now()} title`;

        cy.get('input[id=posttitle]').should('exist').clear().type(post_title);
        cy.get('input[id=postdesc]').should('exist').clear().type(`post${Date.now()}'s description`);
        cy.get('input[id=upload]').should('exist').selectFile('src/assets/comment.png');
        cy.get('button[type=submit]').should('exist').click();

        cy.intercept('POST', 'https://tckczlvseixgtchgbttz.supabase.co/rest/v1/posts?*').as('posted');

        cy.wait('@posted').then((intercept) => {
            cy.visit('http://localhost:5173/')
            cy.url().should('eq', 'http://localhost:5173/')
            cy.contains(post_title);
        });
    });

    it('like a post', () => {
        cy.url().should('eq', 'http://localhost:5173/');
        cy.get('button[id=likebtn1]').should('exist').click()
    });

    it('comment on a post', () => {
        cy.url().should('eq', 'http://localhost:5173/');
        cy.get('button[id=commentbtn1]').should('exist').click();

        let comment = `test comment ${Date.now()}`;

        cy.get('input[id=comment1]').should('exist').type(comment);
        cy.get('button[id=commentsub1]').should('exist').click();

        cy.visit('http://localhost:5173/')
        cy.url().should('eq', 'http://localhost:5173/')

        cy.intercept('GET', "https://tckczlvseixgtchgbttz.supabase.co/rest/v1/comments?select=comment%2CUsers%28username%29&post_id=eq.17").as("commentLoaded")
        cy.wait("@commentLoaded").then((intercept) => {
            cy.get('button[id=commentbtn1]').should('exist').click();
            cy.contains(comment);
        });
    });
})