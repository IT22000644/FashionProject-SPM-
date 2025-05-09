describe('Promo Code Form Test', () => {
    it('logs in and submits the promo code form', () => {
      // Set viewport to ensure sidebar/menu is visible
      cy.viewport(1280, 800);
  
      // Step 1: Visit login page
      cy.visit('http://localhost:5173/auth/login');
  
      // Step 2: Fill in credentials
      cy.get('input[placeholder="Enter your name"]', { timeout: 10000 }).should('be.visible').type('Alex');
      cy.get('input[placeholder="Enter your password"]').type('Alex');
  
      // Step 3: Click the "Log In" button
      cy.contains('Log In').should('be.visible').click();
  
      // Step 4: Wait for redirect to admin dashboard
      cy.url({ timeout: 10000 }).should('include', '/admin');
  
      // Step 5: Navigate to Promo Codes using UI
      cy.contains('Promo Codes', { timeout: 10000 }).should('be.visible').click();
  
      // Step 6: Wait for form to load and fill fields
      cy.get('input[name="code"]', { timeout: 10000 }).should('be.visible').type('SUMMER50');
      cy.get('input[name="description"]').type('50% Summer Sale');
      cy.get('select[name="tier"]').select('Gold');
  
      // Fill ONLY one of the two discount fields (to avoid readonly error)
      cy.get('input[name="discountPercentage"]').type('50');
  
      cy.get('input[name="startDate"]').type('2025-06-01');
      cy.get('input[name="expiresAt"]').type('2025-06-30');
  
      // Step 7: Submit the form
      cy.contains('Create Promo Code').click();
  
      // Step 8: Confirm submission success (update text if needed)
      cy.contains('Promo code created successfully!').should('exist');
    });
  });
  