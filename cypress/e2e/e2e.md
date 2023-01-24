# e2e testing tips

### Getting Elements Best Practice
cy.get("h1")

This test works but isn't ideal. The get command accepts a variety of different things such as HTML elements, classes like .button & IDs #button. However, best practices says it's important to use things that don't change.

Usually classes and IDs are used for styling and to target elements with JS. They also tend to change over time, which means that if you're using them in your tests, the tests will break.

To prevent this, Cypress recommends using data attributes on your elements. The course uses data-test attributes and they are solely used for testing purposes. They won't change if later on your designs changes!