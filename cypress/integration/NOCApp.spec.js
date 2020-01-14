const baseURL = `http://localhost:3000`;
context('Tests siging up a new user', () => {
  it('Test home page', () => {
    cy.visit(`${baseURL}/`);
    cy.contains('NOC TeamApp');
    cy.contains('Register').click();
    cy.url().should('include', '/register');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('Test signup page with blank input', () => {
    cy.visit(`${baseURL}/register`);
    cy.get('input[type="submit"]').click();
    cy.contains(`Name is required`);
    cy.contains(`Please use a valid email`);
    cy.contains(`Please enter a valid password`);
  });

  it('Test signup with blank passwords', () => {
    cy.visit(`${baseURL}/register`);
    cy.get('input[name="name"]').type('Dawit');
    cy.get('input[name="email"]').type('Dawit@noc.com');
    cy.get('input[name="password"]').type('supersecure');
    cy.get('input[name="confirmPassword"]').type('superwrong');
    cy.get('input[type="submit"]').click();
    cy.contains(`Passwords do not match`);
  });

  it('Test signup with nonmatching passwords', () => {
    cy.visit(`${baseURL}/register`);
    cy.get('input[name="name"]').type('Dawit');
    cy.get('input[name="email"]').type('Dawit@noc.com');
    cy.get('input[name="password"]').type('mygoodsecurepassword');
    cy.get('input[name="confirmPassword"]').type('mywrongsecurepassword');
    cy.get('input[type="submit"]').click();
    cy.contains(`Passwords do not match`);
  });

  it(`Register with current user if it doesn't exist already`, () => {
    cy.visit(`${baseURL}/register`);
    cy.get('input[name="name"]').type('Dawit Abera');
    cy.get('input[name="email"]').type('Dawit@noc.com');
    cy.get('input[name="password"]').type('password$1');
    cy.get('input[name="confirmPassword"]').type('password$1');
    cy.get('input[type="submit"]').click();

    // only after user created
    cy.contains('User Already Exists');
  });
});
context('Tests signing in a user', () => {
  it(`Signs in user with if they exist in the DB`, () => {
    cy.visit(`${baseURL}/login`);
    cy.get('input[name="email"]').type('Dawit@noc.com');
    cy.get('input[name="password"]').type('password$1');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard');
  });
});
context('Tests signing out a user', () => {
  it(`Signs out user if they are logged in`, () => {
    cy.visit(`${baseURL}/logout`);
    cy.url().should('include', '/logout');
  });

  // continue
});
/**
 * Test profile route
 */
context('Tests Teams profile route', () => {
  it(`Signs in user with if they exist in the DB`, () => {
    cy.visit(`${baseURL}/profiles`);
    cy.contains('NOC DevOps Teams');
    cy.contains(' Browse and connect with NOC Teammates');
    cy.contains('View Profile');
  });

  // continue
});
// Profile creation
context('Test successful profile creation', () => {
  beforeEach(() => {
    cy.visit(`${baseURL}/login`);
    cy.get("input[name='email']").type('Dawit@noc.com');
    cy.get("input[name='password']").type('password$1');
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard');
  });

  it('Test blank profile', () => {
    cy.contains('Create Profile').click();
    cy.url().should('include', '/create-profile');
    cy.contains('Add Social Network Links').click();
    cy.get("input[type='submit']").click();
    cy.contains(`Status is required`);
    cy.contains(`Skills is required`);
  });

  it('Successfully creates new profile', () => {
    if (cy.contains('Create Profile')) {
      cy.contains('Create Profile').click();
      cy.url().should('include', '/create-profile');
      cy.get("select[name='status']").select('Developer');
      cy.get("select[name='nocstatus']").select('Engineer1');
      cy.get("input[name='company']").type('Nordstrom');
      cy.get("input[name='website']").type('https://nordstrom.io/');
      cy.get("input[name='location']").type('Seattle, WA');
      cy.get("input[name='skills']").type(
        'JAVA, GO, JS,     python,              docker'
      );
      cy.get("textarea[name='bio']").type(
        'NOC devops doing automated testing.'
      );

      cy.contains('Add Social Network Links').click();
      cy.get("div[class='form-group social-input']");
      cy.get("input[name='github']").type('https://www.github.com');
      cy.get("input[name='linkedin']").type('https://linkedin.com');
      cy.get("input[name='twitter']").type('https://twitter.com');
      cy.get("input[type='submit']").click();
      cy.url().should('include', '/dashboard');
    } else {
      cy.contains('Edit Profile').click();
      cy.url().should('include', '/create-profile');
      cy.get("select[name='status']").select('Manager');
      cy.get("select[name='nocstatus']").select('Ninja');
      cy.get("input[name='company']").type('Nordstrom');
      cy.get("input[name='website']").type('https://nordstrom.io/');
      cy.get("input[name='location']").type('Seattle, WA');
      cy.get("input[name='skills']").type(
        'JAVA, GO, JS,     , python,              docker'
      );
      cy.get("textarea[name='bio']").type(
        'NOC devops doing automated testing.'
      );

      cy.contains('Add Social Network Links').click();
      cy.get("div[class='form-group social-input']");
      cy.get("input[name='github']").type('https://www.github.com');
      cy.get("input[name='linkedin']").type('https://linkedin.com');
      cy.get("input[name='twitter']").type('https://twitter.com');
      cy.get("input[type='submit']").click();
      cy.url().should('include', '/dashboard');
    }
  });

  it('Successfully adds an experience', () => {
    cy.contains('Add Experience').click();
    cy.url().should('include', '/add-experience');
    cy.get("input[name='title']").type('QA Engineer');
    cy.get("input[name='company']").type('Boieng');
    cy.get("input[name='location']").type('Seattle, WA');
    cy.get("input[name='from']").type('2017-07-30');
    cy.get("input[name='to']").type('2019-08-22');
    cy.get("textarea[name='description']").type(
      ' Write test scripts, Debugged backend, integrated SSO for frontend, updated documentation.'
    );
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/dashboard');
  });

  it('Successfully adds an education', () => {
    cy.contains('Add Education').click();
    cy.url().should('include', '/add-education');
    cy.get("input[name='school']").type('Univeristy of Washington');
    cy.get("input[name='degree']").type('BSCS');
    cy.get("input[name='fieldofstudy']").type('Computer Science');
    cy.get("input[name='from']").type('2016-09-10');
    cy.get("input[name='to']").type('2019-01-16');
    cy.get("textarea[name='description']").type(
      `Learned fundamentals of programming and cried at the computer labs`
    );
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/dashboard');
  });
});
