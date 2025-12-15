# E2E Tests – Playwright

This repository contains end-to-end tests implemented using **Playwright** and **TypeScript**.
The tests cover key e-commerce flows such as user authentication, product discovery,
cart operations, and discount validation.

## Prerequisites

- **Node.js** v18 or newer
- **npm** (included with Node.js)

## Installation

After cloning the repository, install all project dependencies:

```bash
npm install
```

Install Playwright browser binaries:

```bash
npx playwright install
```

## Running Tests

Run all tests in headless mode:

```bash
npx playwright test
```

Run tests in headed mode (browser visible):

```bash
npx playwright test --headed
```

Run tests in debug mode using Playwright Inspector:

```bash
PWDEBUG=1 npx playwright test
```

## Test Reports

After test execution, an HTML report is generated automatically.
To open the latest report, run:

```bash
npx playwright show-report
```

## Project Structure

```text
pages/          # Page Object Model classes
components/     # Reusable UI components (Header, Top Menu, etc.)
helpers/        # API helpers and test utilities
tests/          # Test spec files
```
