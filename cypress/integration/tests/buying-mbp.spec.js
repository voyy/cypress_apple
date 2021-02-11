
describe('Buing a MBP 16', function() {
  before(function() {
    Cypress.on('window:before:load', (win) => {
      Object.defineProperty(win, 'self', {
        get: () => {
          return window.top
        }
      })
    })
    cy.visit('/');
  });

  it('shop should show up after visiting the "shop" link', function() {
    cy.url().should('eq', 'https://www.apple.com/');
  });

  it('should be possible to access the mac shop section', function() {
    cy.get('[id="ac-globalnav"]').within(function() {
      cy.get('[data-analytics-title="mac"]').click();
    });
    cy.url().should('eq', 'https://www.apple.com/mac/');
    cy.get('[id="chapternav"]').within(function() {
      cy.contains("MacBook Pro 16”").should('be.visible');
    });
  });

  it('user should be able to access the MBP16" store page', function() {
    cy.get('[id="chapternav"]').within(function() {
      cy.contains("MacBook Pro 16”").click();
    });
    cy.get('.typography-hero-headline').invoke('text').then((text) => {
      expect(text.replace(/\u00a0/, ' ')).equal('The best for the brightest.')
      });
    });

  it('user should be able to choose the desired version of the macbookpro', function() {
    cy.get('[data-analytics-title="buy"]').click();
    cy.get('[data-toggle-key="16inch"]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[name="colorOptionGroup_MBP2019_16-ultimate"][datacolor="Silver"]').click({ force: true }); // dodac walidację!
    cy.get('[data-part-number="MVVM2LL/A"]').within(function() {
      cy.contains("Select ").click();
    })
    cy.contains('Customize your 16-inch MacBook Pro - Silver').should('be.visible');
  });

  it('user should be able to choose a specification', function() {
    cy.contains('Which processor is right for you?').click();
    cy.contains('This MacBook Pro comes as standard with an 8-core Intel Core i9 processor. It features Turbo Boost, Hyper-Threading, support for fast 2666MHz DDR4 memory, a 16MB L3 performance cache and Intel UHD Graphics 630.').should('be.visible');
    cy.get('[data-autom="overlayCloseButton"][data-ase-overlay="processor__dummy_z0y3-learn_more_content"]').click();
    cy.contains('2.3GHz 8‑core 9th‑generation Intel Core i9 processor, Turbo Boost up to 4.8GHz').should('be.visible');
    cy.contains('2.4GHz 8‑core 9th‑generation Intel Core i9 processor, Turbo Boost up to 5.0GHz').should('be.visible').click();
    cy.contains('How much memory is right for you?').click();
    cy.contains('The 16-inch MacBook Pro comes standard with 16GB of high-performance 2666MHz memory and can be expanded to 32GB or 64GB, using 2666MHz Double Data Rate 4 (DDR4) synchronous dynamic random-access memory (SDRAM).').should('be.visible');
    cy.get('[data-autom="overlayCloseButton"][data-ase-overlay="memory__dummy_z0y3-learn_more_content"]').click();
    cy.contains('16GB 2666MHz DDR4 memory').should('be.visible');
    cy.contains('32GB 2666MHz DDR4 memory').should('be.visible');
    cy.contains('64GB 2666MHz DDR4 memory').should('be.visible').click();
    cy.contains('Which graphics option is right for you?').click();
    cy.contains('Three high-performance graphics options are available for this MacBook Pro. The standard option is an AMD Radeon Pro 5500M featuring 24 compute units paired with 4GB of GDDR6 memory. This discrete GPU delivers fast graphics performance, accelerating tasks like video editing, 3D workflows, and game development.').should('be.visible');
    cy.get('[data-autom="overlayCloseButton"][data-ase-overlay="graphics_dummy_z0y3-learn_more_content"]').click();
    cy.contains('AMD Radeon Pro 5500M with 4GB of GDDR6 memory').should('be.visible');
    cy.contains('AMD Radeon Pro 5500M with 8GB of GDDR6 memory').should('be.visible');
    cy.contains('AMD Radeon Pro 5600M with 8GB of GDDR6 memory').should('be.visible').click();
    cy.contains('How much storage is for you?').click();
    cy.contains('This MacBook Pro comes as standard with 1TB of fast SSD storage.¹ Apple flash storage delivers noticeable speed from the moment you start up your Mac all the way to data-intensive tasks.').should('be.visible');
    cy.get('[data-autom="overlayCloseButton"][data-ase-overlay="hard_drivesolid_state_drive__dummy_z0y3-learn_more_content"]').click();
    cy.contains('1TB SSD storage').should('be.visible');
    cy.contains('2TB SSD storage').should('be.visible');
    cy.contains('4TB SSD storage').should('be.visible').click();



  })
});