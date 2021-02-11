import {
  MBP_NAME,
  BRIGHTESTS_TEXT,
  CFG_TEXTS
} from '../constants/texts'

import {
  GLOBAL_NAV,
  CHAPTER_NAV,
  CLOSE_MODAL,
  KB_LNG_DROPDOWN,
  MBP_SILVER_COLOR
} from '../constants/selectors'

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
    cy.get(GLOBAL_NAV).within(function() {
      cy.get('[data-analytics-title="mac"]').click();
    });
    cy.url().should('eq', 'https://www.apple.com/mac/');
    cy.get(CHAPTER_NAV).within(function() {
      cy.contains(MBP_NAME).should('be.visible');
    });
  });

  it('user should be able to access the MBP16" store page', function() {
    cy.get('[id="chapternav"]').within(function() {
      cy.contains(MBP_NAME).click();
    });
    cy.get('.typography-hero-headline').invoke('text').then((text) => {
      expect(text.replace(/\u00a0/, ' ')).equal(BRIGHTESTS_TEXT)
      });
    });

  it('user should be able to choose the desired version of the macbookpro', function() {
    cy.get('[data-analytics-title="buy"]').click();
    cy.get('[data-toggle-key="16inch"]').should('have.attr', 'aria-pressed', 'true');
    cy.get(MBP_SILVER_COLOR).click({ force: true });
    cy.get('[data-part-number="MVVM2LL/A"]').within(function() {
      cy.contains("Select ").click();
    })
    cy.contains('Customize your 16-inch MacBook Pro - Silver').should('be.visible');
  });

  it('user should be able to choose a specification', function() {
    cy.contains(CFG_TEXTS.PROCESSOR.IS_RIGHT).click();
    cy.contains(CFG_TEXTS.PROCESSOR.LONG_TEXT).should('be.visible');
    cy.get(CLOSE_MODAL.PROCESSOR).click();
    cy.contains(CFG_TEXTS.PROCESSOR.OPTION_ONE).should('be.visible');
    cy.contains(CFG_TEXTS.PROCESSOR.OPTION_TWO).should('be.visible').click();
    cy.contains('- $200.00').should('be.visible');
    cy.contains(CFG_TEXTS.MEMORY.IS_RIGHT).click();
    cy.contains(CFG_TEXTS.MEMORY.LONG_TEXT).should('be.visible');
    cy.get(CLOSE_MODAL.MEMORY).click();
    cy.contains(CFG_TEXTS.MEMORY.OPTION_ONE).should('be.visible');
    cy.contains(CFG_TEXTS.MEMORY.OPTION_TWO).should('be.visible');
    cy.contains(CFG_TEXTS.MEMORY.OPTION_THREE).should('be.visible').click();
    cy.contains('- $800.00').should('be.visible');
    cy.contains(CFG_TEXTS.GRAPHICS.IS_RIGHT).click();
    cy.contains(CFG_TEXTS.GRAPHICS.LONG_TEXT).should('be.visible');
    cy.get(CLOSE_MODAL.GRAPHICS).click();
    cy.contains(CFG_TEXTS.GRAPHICS.OPTION_ONE).should('be.visible');
    cy.contains(CFG_TEXTS.GRAPHICS.OPTION_TWO).should('be.visible');
    cy.contains(CFG_TEXTS.GRAPHICS.OPTION_THREE).should('be.visible').click();
    cy.contains('- $700.00').should('be.visible');
    cy.contains(CFG_TEXTS.STORAGE.IS_RIGHT).click();
    cy.contains(CFG_TEXTS.STORAGE.LONG_TEXT).should('be.visible');
    cy.get(CLOSE_MODAL.STORAGE).click();
    cy.contains(CFG_TEXTS.STORAGE.OPTION_ONE).should('be.visible');
    cy.contains(CFG_TEXTS.STORAGE.OPTION_TWO).should('be.visible');
    cy.contains(CFG_TEXTS.STORAGE.OPTION_THREE).should('be.visible');
    cy.contains(CFG_TEXTS.STORAGE.OPTION_FOUR).should('be.visible').click();
    cy.contains('- $2,200.00').should('be.visible');
    cy.get(KB_LNG_DROPDOWN).select('Backlit Magic Keyboard - British');
    cy.get('[data-autom="addToCart"]').click();
    cy.contains('16-inch MacBook Pro - Silver').should('be.visible');
  })
});