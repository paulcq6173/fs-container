// Using cypress for e2e testing with proxy server docker
// Mocha recommends that arrow functions are not used,
// because they might cause some issues in certain situations.
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user1 = {
      name: 'Spencer',
      username: 'Oswell Spencer',
      password: '1111',
    };
    const user2 = {
      name: 'Albert',
      username: 'Albert Wesker',
      password: '4444',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);
    cy.visit('http://localhost:8000');
  });

  it('Login form should be shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Oswell Spencer');
      cy.get('#password').type('1111');
      cy.get('#login-button').click();

      cy.contains('Oswell Spencer logged in');
    });

    it('fails with wrong credentials and display red error message', function () {
      cy.contains('login').click();
      cy.get('#username').type('Oswell Spencer');
      cy.get('#password').type('1133');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Oswell Spencer logged in');
    });

    describe('When logged in', function () {
      // Set browser login status
      beforeEach(function () {
        cy.login({ username: 'Oswell Spencer', password: '1111' });
      });

      it('A blog can be created', function () {
        cy.wait(500);
        cy.contains('create new blog').click();
        cy.get('#input-title').type('I want to be the god');
        cy.get('#input-author').type('Oswell Spencer');
        cy.get('#input-url').type(
          'https://residentevil.fandom.com/wiki/Oswell_E._Spencer,_Earl_Spencer'
        );
        cy.get('form').submit();
        cy.contains('I want to be the god');
      });

      describe('When a blog exists', function () {
        beforeEach(function () {
          cy.login({ username: 'Oswell Spencer', password: '1111' });
          cy.createBlog({
            title: 'I want to be the God',
            author: 'Oswell Spencer',
            url: 'https://residentevil.fandom.com/wiki/Oswell_E._Spencer,_Earl_Spencer',
          });
          cy.createBlog({
            title: 'I have that right to be the God',
            author: 'Oswell Spencer',
            url: 'https://residentevil.fandom.com/wiki/Oswell_E._Spencer,_Earl_Spencer',
          });
        });

        it('one of those can add likes', function () {
          cy.contains('I want to be the God')
            .parent()
            .find('button')
            .as('theButton');
          cy.get('@theButton').click();
          cy.get('@theButton').should('contain', 'hide');

          cy.contains('like').click();
          cy.wait(500);
          cy.contains('likes 1');
        });

        describe('Make sure that delete operation need auth', function () {
          it('only the user that created blog can delete it', function () {
            cy.contains('I want to be the God')
              .parent()
              .find('button')
              .as('theButton');
            cy.get('@theButton').click();
            cy.get('@theButton').should('contain', 'hide');

            cy.contains('delete').click();
            cy.wait(1000);
            cy.get('html').should('not.contain', 'I want to be the God');
          });

          it('other user should not be able to delete it', function () {
            cy.contains('log out').click();
            cy.wait(500);
            cy.login({ username: 'Albert Wesker', password: '4444' });
            cy.contains('I want to be the God')
              .parent()
              .find('button')
              .as('theButton');
            cy.get('@theButton').click();
            cy.get('@theButton').should('contain', 'hide');

            cy.get('html').should('not.contain', 'delete');
          });
        });

        describe('When blogs greater than one', function () {
          it('should ordered by decreasing likes', function () {
            cy.contains('I have that right to be the God')
              .parent()
              .find('button')
              .as('theButton');
            cy.get('@theButton').click();
            cy.get('@theButton').should('contain', 'hide');

            cy.contains('like').click();
            cy.wait(500);
            cy.contains('like').click();
            cy.wait(500);
            cy.contains('likes 2');

            cy.get('[data-testid="blogContent"]')
              .eq(0)
              .should('contain', 'I have that right to be the God');
            cy.get('[data-testid="blogContent"]')
              .eq(1)
              .should('contain', 'I want to be the God');
          });
        });
      });
    });
  });
});
