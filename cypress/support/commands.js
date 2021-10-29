// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import path from "path";
import validateImage from "../plugins/index";

Cypress.Commands.add("acceptCookie", () => {
  cy.visit("localhost:3000");
  cy.wait(10000);
  cy.get('[test-id="main-page-accept"]').click();
});

Cypress.Commands.add("checkPNG", () => {
  // image comes from a domain different from the page
  cy.get("p").contains("PNG").click({
    force: true,
  });
  cy.log("**confirm downloaded image**");
  validateImage();
});

Cypress.Commands.add("checkTooltip", () => {
  cy.get('[aria-label="Toggle more options"]').click();
  cy.get('[aria-label="Share"]').trigger("mouseover", {
    force: true,
  });
  cy.get(".MuiTooltip-popper").should("be.visible");
  cy.get('[aria-label="Download"]').click();
});

Cypress.Commands.add("checkCSV", (file, length) => {
  cy.get('[id="download-csv"]').click();
  cy.log("**read downloaded file**");
  const downloadsFolder = Cypress.config("downloadsFolder");
  const filename = path.join(downloadsFolder, file);
  cy.readFile(filename, { timeout: 15000 }).should("have.length.gt", length);
});
