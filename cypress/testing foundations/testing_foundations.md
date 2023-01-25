# Testing Foundations
## Understanding the Testing Mindset
An easy way to start discussing on how to test a feature is to start with the end goal and work backwords.
  - what does this new feature need to do? - once this is understood/ defined, we can break the problem down into smaller incremental steps and translate those steps into tests.

## Identifying What to Test
### User Journeys
- if testing an already existing app, recommend beginning by testing the app's most "mission-critical" pieces. 
  - any portions of the app that cannot break
    - e.x. login/authentication, purchasing a product, processing a credit card, sign-up forms, etc.
    - recommend thest tests to be end-to-end tests
- user journey tests are the essential paths a user takes in your app.
  - e.x. for e-commerce app - user first searches for a product, add to shopping cart, fill out shipping info, enter payment info, and finally purchases it.
  - this entire journey should be tested with a single test => can ensure that all pieces within the app are working vs having several tests, testing each step in isolation
  - user journey tests also test all the layers within the tech stack => you test the front-end, back-end, database layer, networking/API layers, etc.

  