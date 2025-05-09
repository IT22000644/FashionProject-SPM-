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

    cy.visit('http://localhost:5173/shop/profile');

    //Optional : Check if the user name exists in the user profile page
    cy.contains('pevinya99', { timeout: 10000 }).should('be.visible');
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


  it('shows an error when entering special characters to the username', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');


    cy.get('input[name="username"]').should('be.visible').type('pevinya99##');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('pevinya@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmPassword"]').type('Test@1234');

    // Step 2: Submit the form
    cy.get('form').submit();

    // Step 3: Check for error message
    cy.contains('Username should not contain special characters.', { timeout: 10000 }).should('be.visible');
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
  it('shows an error when an unsafe password is used', () => {
    cy.contains('Sign Up', { timeout: 10000 }).should('be.visible');

    // Step 1: Fill the registration form with an invalid email
    cy.get('input[name="username"]').should('be.visible').type('invaliduser');
    cy.get('input[name="firstname"]').type('Pevinya');
    cy.get('input[name="lastname"]').type('Peiris');
    cy.get('input[name="email"]').type('invalidemail.com'); // Missing '@'
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="confirmPassword"]').type('123');

    // Step 2: Try to submit the form
    cy.get('form').submit();

    cy.contains('Password must be at least 8 characters long and contain at least one number and one special character.', { timeout: 10000 }).should('be.visible');
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


  

  

  

 