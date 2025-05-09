describe('E2E Shopping Flow Test', () => {
    it('logs in, adds product to cart, views cart, and checks out', () => {
      cy.viewport(1280, 800);
  
      // Step 1: Clear previous session and go to login
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('http://localhost:5173/auth/login');
  
      // Step 2: Fill in credentials and login
      cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Anne');
      cy.get('input[name="password"]').type('anne');
      cy.contains('Log In').click();
  
      // Step 3: Confirm redirect to shop/home/profile
      cy.url({ timeout: 10000 }).should('include', '/shop');
  
      // Step 4: Navigate to product listing
      cy.visit('http://localhost:5173/shop/listing'); // or /shop/home if that's where products are
  
      // Step 5: Add first product to cart
      cy.contains('Add to cart', { matchCase: false }).first().should('be.visible').click();
  
      // Step 6: Go to cart
      cy.visit('http://localhost:5173/shop/cart');
  
      // Step 7: Confirm product is in cart
      cy.contains('Your Cart').should('exist');
      cy.get('[data-testid="cart-item"]').should('have.length.at.least', 1); // Adjust selector if needed
  
      // Step 8: Proceed to checkout
      cy.contains('Checkout', { timeout: 10000 }).should('be.visible').click();
  
      // Step 9: Confirm checkout page loaded
      cy.url({ timeout: 10000 }).should('include', '/checkout');
      cy.contains('Checkout').should('be.visible'); // or 'Place Order', or any checkout UI
    });
  });
  