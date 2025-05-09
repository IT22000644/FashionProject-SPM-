describe('Delete Address Test', () => {
    it('logs in and deletes an address', () => {
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
  
      // Step 5: Switch to Address tab
      cy.contains('Address', { timeout: 10000 }).should('be.visible').click();
  
      // Step 6: Locate and delete the address
      cy.contains('343,', { timeout: 10000 }).should('be.visible'); // Ensure address exists
      cy.contains('Delete').click(); // Click delete button
  
      // Step 7: Confirm deletion
      cy.contains(/address deleted successfully/i, { timeout: 10000 }).should('be.visible');
  
      // Step 8: Verify removal from DOM
      cy.contains('123 Main Street').should('not.exist');
    });
});
