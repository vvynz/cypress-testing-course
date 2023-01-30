// HOW TO WRITE A TEST

import { functions } from "lodash"

// writing test should follow a pattern that makes them easy to write, reason about, and expand. 
  // 1 pattern : AAA (Arrage-Act-Assert) - encourages the organization of the test code in a way that allows the most readability and flexibility

  /* AAA
  step 1. Arrange - perform some setup for your test
   ex. in e2e testing, need to tell Cypress to open the browser and navigate to the correct URL
  */
 cy.visit("http://localhost:8888")

// step 2. Act - perform some action.
// ex. in the case of a todo app, you want to test that you can add a single todo

cy.get(".new-todo").type("Buy Milk{enter}")

// ^^ in this ex, we get the element with the class .new-todo and then type "Buy Milk" to simulate pressing the enter key to add the todo

// step 3. Assert - assert the thing you acted upon in step 2 did what you expected

cy.get(".todo-list li").should("have. length", 1)

// ^^ in this ex, we get the element that contains the todo items that we added to the app and are asserting that there is only a single todo
// this is what a simple Cypress end-to-end test looks like for a TodoMVC application


/// A SIMPLE END-TO-END TEST

describe("React TodoMVC", () => {
  it("adds a single todo", () => {
    cy.visit("http://localhost:8888") // Arrange
    cy.get(".new-todo").type("Buy Milk{enter}") // Act
    cy.get(".todo-list li").should("have. length", 1) // Assert
  })
})

// - Cypress is built upon Mocha
// - all of the functions, other than those that start with cy, come from Mocha 


// CYPRESS RUNS IN THE BROWSER

/* - Cypress runs inside of the browser 
 - means your tests are being executed in the same environment as your app
 - this allows Cypress to detect all events that are fired by your browser and give it real native access to everything within your tests
 - unlike most other testing tools (like Selenium) - run outside of browser & execute remote commands across the network to control the browser
 - Cypress also operates at the network level by reading & altering web traffic on the go.
  - can therefore modify everything coming in and out of the browser, which will allow yout o test your app in ways no other testing tools can
  - also gives native access to things like the window object, document, DOM elements, service workers etc.
  - this distinction is helpful in many ways, including setting up or modifying the FE state libs such as Redux or MobX directly from your Cypress tests
  - anything the browser can access, Cypress can too
*/