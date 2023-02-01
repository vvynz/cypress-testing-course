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
- there are trade-offs though!

/// TRADE-OFFS
  /// PERMANENT TRADE-OFFS
  - not a general purpose automation tool
  - Cy commands run inside of a browser
  - will never be support for multiple browser tabs
  - cannot use Cy to drive 2 browsers at once
  - each test is bound to a single superdomain. Cross-origin navigation inside tests can be enabled by using the cy.origin command.

  /// TEMP TRADE-OFFS
  have open issues which Cypress will evetually address
  - workarounds for the lack of a cy.hover() command
  - no any native or mobile events support
  - iframe support is somewhat limited, but does work
*/

// COMMAND CHAINING

// - Cypress manages a Promise chain, each command yields a "subject" to the next command until the chain ends or there's an error

cy.get(".todo-list li").find("label").should("contain", "Buy Milk")

/* in the expect, cy.get() will provide the <li> subject to .find() which will then search for the <label> element. Finally, we make an assertion that the <label> contains the text "Buy Milk". 

IMPORTANT TO NOTE: not all Cy commands yield a subject that can be chained. Example, cy.clearCookies() yields null, which CANNOT be chained

Cy commands like cy.get() and cy.contains() yield DOM elements that can be chained
*/


// UNDERSTANDING THE ASYNCHRONOUS NATURE OF CYPRESS

/// RETURN VS. YIELD
// - Cy commands DO NOT return their subjects. The ex below is something you CANNOT DO: 
const button = cy.get("button")
button.click()

/* - main reason why it isnt recommended to use variables within tests
- Cy commands YIELDS their subjects
- cy commands are asynchronous and get queued for execution at a later time
  - while commands are executed, their subjects are yielded from one command to the next
  - due to a lot of helpful Cypress code that runs between each command to ensure everything is in order
*/

/// .then()

/* - to directly interact with a subject, can use .then()
  - .then() behaves similarly to Promises but cannot use things like async/await within Cy tests
  - whatever is returned from the cb function becomes the new subject and will flow into the following command (cept for undefined)
*/

cy.get("button").then(($btn) => {
  const cls = $btn.attr("class")
  // ...
})

// - when undefined is return from the cb function, the subject won't be modified, instead will carry over to the next command
// - like Promises, can return any compatible "tenable" (anything that has a .then() interface), and Cypress will wait for that to resolve before continuing forward through the chain of commands

/// .wrap()

// - in the ex above, $btn is a jQuery object - means that if we want Cypress to perform some action upon it, we first need to use cy.wrap() 

// ex. continued

cy.get("button").then(($btn) => {
  const cls = $btn.attr("class")
  
  cy.wrap($btn).click().should("not.have.class", cls)
})

// ^^ in the ex. first getting <button> HTML element. OUr subject, is hte <button> HTML element is yielded from cy.get() to .then()
  // - can access the subject as the variable $btn but need to .wrap() it to perform whatever operations or assertions we would like 
  // - before our assertion ().should("not.have.class", cls)), we first need Cy to .click() the button. For Cy to click our $btn, we first need to wrap it with cy.wrap() to give it the proper context for Cy to perform to click

// this is something we CANNOT DO

$btn.click().should("not.have.class", cls) // does not work

// MUST use cy.wrap() first. Cypress needs that context needed to interact with $btn

cy.wrap($btn).click().should("not.have.class", cls)


// WAITING & RETRY-ABILITY

/// RETRY-ABILITY & FLAKE RESISTANCE

/* - retry-ability is a core feature of Cypress
 - most testing tools will req you to add "hard" waits (you tell the tool to wait for a spec amount of time), Cypress will automatically wait for you -- because it runs in the browser
 - Cypress is notified: 
    - page loads & unloads
    - any events fired
  - smart enought o know how fast an element is animating and will wait for it to stop before acting upon it
  - will also automatically wait until an element becomes visible, becomes enabled, or when another element is no longer covering it
  - will pause execution of any commands when a page transitions occurs until new page is fully loaded
*/

/// ALIASES

// - use aliases to reference elements, reqs, or intercepts across our tests
// - to create an alias use .as():

cy.get("table").find("tr").as("rows")

// ^^ will get the <table> el, find all the <tr> el, and allow us to reference them as @rows throughout our tests
// - can access our alias using cy.get() by adding the @ char before our alias name, like:

cy.get("@rows")

// ^^ @rows is now a ref to the collection of <tr> el that can be chained off of and interacted with as you would any other el 
