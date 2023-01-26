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

  ### New Features
  - helpful technique for writing tests when implementing a new feature is to start with the end goal in mind.
    - what exactly does this feature need to do?
    - what problem does it solve?
  - helps to break down the feature into smaller, incremental steps, all of which can be translated into tests
  - once you have a suite of tests for each step, you can write the necesary code to pass each step. 
    - allows you to easily refactor code later on && if tests are still passing, give you confidence that you haven't broken things during refactoring

### Bugs
- good approach: first write a failing test around the bug before fixing it. Once it's fixed, your test will pass && verfies your code eliminates the bug

## Manual vs Automated Testing
### Manual Testing
- involves physically interacting with an app
- often very time-consuming as it requires repetitive tasks over and over again

### Continuous Integration (CI)
- the practice of automating the integration of code changes from multiple developers into a single repo. CI allows devs to frequently merge their code to a central repo where builds & tests run against their changes. If a builder test fails the CI system will block the code from being merged with the main branch. 
- having tests run in CI, every time a new feature is introduced, bug fix, or merge a pull request, we can be confident that the latest change has not broken our app. 
- testing in CI also provides a useful feedback loop. If any tests fail, the errors will be logged. The cyber's dashboard will allow users know exactly where tests are failing in their CI pipelines so they can quickly debug their code.
- to ensure the entire stack is configured and working properly, need to test the ui, apis, and even the db layer => all can be done through a single cypress e2e test 

### Automated Testing
- more are adopting CI/CD systems and want to push to production multiple times a day, automated tests are the only way to scale such demand
- shift left - devs are becoming more involved with testing. The industry now is "shifting left" by having the responsibility of testing fall more and more upon the devs. So testing is now being integrated into the entire software dev lifecycle from the very beginning.

