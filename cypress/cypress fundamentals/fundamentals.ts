// HOW TO WRITE A TEST

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

