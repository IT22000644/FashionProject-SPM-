describe('Address Form Test', () => {
    it('logs in and submits the address form', () => {
      cy.viewport(1280, 800);
      
      // Step 1: Visit login page
      cy.visit('http://localhost:5173/auth/login');
  
      // Step 2: Log in
      cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Anne');
      cy.get('input[name="password"]').type('anne');
      cy.contains('Log In').click();
  
      // Step 3: Confirm redirect
      cy.url({ timeout: 10000 }).should('include', '/shop');
  
      // Step 4: Navigate to user profile page
      cy.visit('http://localhost:5173/shop/profile');
  
      // Step 5: Wait for the Address tab to load before clicking
      cy.contains('Address', { timeout: 10000 }).should('be.visible').click();
  
      // Step 6: Ensure the address form is visible before interaction
      cy.get('input[placeholder="Enter your address"]', { timeout: 10000 }).should('be.visible').type('123 Main Street');
      cy.get('input[placeholder="Enter your city"]').type('Colombo');
      cy.get('input[placeholder="Enter your pincode"]').type('10100');
      cy.get('input[placeholder="Enter your phone number"]').type('0771234567');
      cy.get('textarea[placeholder="Enter any additional notes"]').type('Please call on arrival');
  
      // Step 7: Submit
      cy.contains('Add').click();
  
      // Step 8: Confirm success message
      cy.contains(/address added successfully/i, { timeout: 10000 }).should('be.visible');
    });
});
