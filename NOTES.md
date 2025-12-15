# Notes

This document describes key technical decisions, assumptions, and known limitations made during the implementation of the e2e test suite.

---

## Test environment selection

The initial implementation targeted the official **nopCommerce demo instance**, as nopCommerce represents a realistic, full-featured e-commerce platform commonly used in production systems.

During test execution, the public nopCommerce demo was found to be protected by **Cloudflare bot-protection mechanisms**, which prevented reliable automated browser execution across multiple user flows.

To ensure stable and repeatable test runs while preserving the same architectural approach and scenario coverage, the target application was switched to:

**https://demowebshop.tricentis.com**

This environment provides a publicly accessible e-commerce storefront with similar domain characteristics (catalog, search, cart, authentication) and allows deterministic automated testing without environment-level interference.

---

## Synchronization and UI stability

Dynamic UI updates caused by server-side sorting were synchronized using Playwright's built-in `expect().toPass()` polling mechanism.  
This approach avoids hard-coded waits and ensures resilience against asynchronous rendering and unstable ordering of product lists.

---

## Authentication and session handling

For the **Login / Session** scenario, a pre-existing test account was used.

In a production-grade setup, test users would typically be provisioned via backend APIs or database seeding to keep UI tests focused on authentication and session behavior rather than user creation.

Session persistence was verified by refreshing the page and asserting that the user remains in a logged-in state, reflecting real user behavior.

---

## Page Object Model and reusability

The test suite follows a **Page Object Model (POM)** approach with additional component abstractions.

Global navigation elements (header and top menu), which are present across all pages, were extracted into reusable components and composed into the `BasePage` to avoid duplication and ensure consistent interaction patterns.

---

## API-based test setup

To reduce overall test execution time and keep cart-related scenarios focused on business logic, adding products to the shopping cart was implemented via **backend API calls**.

This approach avoids repetitive UI interactions during test setup while still using the same session, validation rules, and backend behavior as the frontend, resulting in faster and more deterministic test runs.

---

## Deliberate non-implementation

An integration with **Allure Reports** was considered to provide richer reporting and historical test analytics.

However, this was intentionally not implemented, as Playwright’s built-in HTML reporting was deemed sufficient for clearly presenting test results and failures within the scope of this task, without introducing additional configuration complexity.
