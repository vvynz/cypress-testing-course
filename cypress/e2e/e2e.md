# e2e testing tips

### Getting Elements Best Practice
test: cy.get("h1")

This test works but isn't ideal. The get command accepts a variety of different things such as HTML elements, classes like .button & IDs #button. However, best practices says it's important to use things that don't change.

Usually classes and IDs are used for styling and to target elements with JS. They also tend to change over time, which means that if you're using them in your tests, the tests will break.

To prevent this, Cypress recommends using data attributes on your elements. The course uses data-test attributes and they are solely used for testing purposes. They won't change if later on your designs changes!

updated test: cy.get("[data-test='hero-heading']")

There will be times where using data attributes won't be possible. For ex, if using a 3rd party component library. Typically we won't have the ability to modify the underlying HTML markup and add custom attributes to the elements. Instead we could target an HTML instead.

test: in the lesson, cy.get("dt") => showed an array of 3 in the Cypress console. 

If we want to target one of the <dt> then we can use the .eq() command. This command will allow us to access a specific index within an array of elements.

updated test: cy.get("dt").eq(0)

Should also try to use data attributes in tests but when they aren't possible, we should try to use modified tests (not using data attributes) sparingly. 

### Hooks
- beforeEach()
  - a function that gets called before each test is run
  Instead of putting cy.visit() at the start of each test, we can simplify and use the beforeEach() hook at the beginning of our tests

### Custom Cypress Commands
Custom commands allows us to reuse code or functionality across all of our Cypress spec files. 

  In the lesson, we created the getByData custom command.
  test: cy.get("[data-test='hero-heading']")
  updated test: cy.getByData("hero-heading")

### Happy vs Unhappy Paths
When writing tests we want to consider testing happy paths, the paths a user can take that lead to successful results, and unhappy paths, the paths a user can take that could get them into trouble, throw an error, cause your app to crash, etc. Should also write tests to ensure malicious users can't get access to private info, perform XSS attacks, and so on.

### Organizing Test With Context
The context method allows us to group related tests together, making our spec files easier to read. 