describe('Registration Form Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/auth/signup');
  });

  it('should successfully sign up and redirect to the home page', () => {
    // Step 1: Wait for the "Sign Up" heading
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');

    

    // Step 3: Fill the registration form
    cy.get('input[name="username"]').type('pevinya99');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('pevinya@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmPassword"]').type('Test@1234');

    // Step 4: Submit the form
    cy.get('form').submit();

    //Step 5: Check for redirect to the home page
    cy.location('pathname', { timeout: 10000 }).should('eq', '/shop/home');

    // Additional check: Verify that the URL contains the correct path
    cy.url().should('include', '/shop/home');

    //Optional : Check for user-specific content on the home page
    cy.contains('Discover Your Style', { timeout: 10000 }).should('be.visible');
  });

  // // ✅ Error: Signing up with an existing username
  it('shows error when signing up with an existing username', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');

    // Step 1: Fill the registration form with an existing username
    cy.get('input[name="username"]').should('be.visible').type('pevinya99');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('newemail@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmPassword"]').type('Test@1234');

    // Step 2: Submit the form
    cy.get('form').submit();

    // Step 3: Check for error message
    cy.contains('Username or email already exists', { timeout: 10000 }).should('be.visible');
    cy.url().should('not.include', '/shop/home');
  });

  // ✅ Error: Signing up with an existing email
  it('shows error when signing up with an existing email', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');

    // Step 1: Fill the registration form with an existing email
    cy.get('input[name="username"]').should('be.visible').type('newuser123');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('pevinya@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmPassword"]').type('Test@1234');

    // Step 2: Submit the form
    cy.get('form').submit();

    // Step 3: Check for error message
    cy.contains('Username or email already exists', { timeout: 10000 }).should('be.visible');
    cy.url().should('not.include', '/shop/home');
  });

  // ✅ Error: Mismatched passwords
  it('shows an error when passwords do not match', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');


    cy.get('input[name="username"]').should('be.visible').type('pevinya99');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('pevinya@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmPassword"]').type('Mismatch123');

    // Step 2: Submit the form
    cy.get('form').submit();

    // Step 3: Check for error message
    cy.contains('Passwords do not match', { timeout: 10000 }).should('be.visible');
    cy.url().should('not.include', '/shop/home');
  });

   // ✅ Error: Invalid email format
  it('shows an error when email format is invalid', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');

    // Step 1: Fill the registration form with an invalid email
    cy.get('input[name="username"]').should('be.visible').type('invaliduser');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('invalidemail.com'); // Missing '@'
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmPassword"]').type('Test@1234');

    // Step 2: Try to submit the form
    cy.get('form').submit();

    // Step 3: Check for the built-in browser email validation message
    cy.get('input[name="email"]:invalid').should('have.length', 1);
  });

  // ✅ Error: Mismatched passwords
  it('Shows an error when submitting the form with empty fields', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');


    cy.get('input[name="username"]').should('be.visible').type('pevinya99');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('pevinya@example.com');
    cy.get('input[name="password"]').type('Test@1234');
  

    // Step 2: Submit the form
    cy.get('form').submit();

    // Step 3: Check for error message
    cy.contains('Please fill in all the fields.', { timeout: 10000 }).should('be.visible');
  });

});


  

  

  

 