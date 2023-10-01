# Contributing Guide

## Table of Contents

-   [How to Help?](#how-to-help)

-   [Contribution Guidelines](#contribution-guidelines)

-   [Getting Started](#getting-started)

-   [Testing](#testing)

    -   [Unit tests](#unit-tests)
    -   [REPL](#repl)
    -   [Test build](#test-build)

-   [Code Style Guide](#code-style-guide)

    -   [Lint the Code](#lint-the-code)

-   [Documentation](#documentation)

    -   [JSDoc](#jsdoc)

## How to Help?

Help is always welcome. There are areas where you can help:

-   The core functionality (performance improvements, bug fixes,
    new features, etc.).

-   Documentation (markdown documents, JSDoc annotations in source code).

-   Test suite & development environment improvements.

If you see a gap, but don't have time, experience, or you just need help
with the library, don't hesitate to [start a discussion](https://github.com/sayeed205/fluent-downloader/discussions/new) or
[open a new issue](https://github.com/sayeed205/fluent-downloader/issues/new).

<!-- The functionality of fluent downloader is still in alpha stage. If you are interested in contributing to the project, please leave a comment to the [fluent downloader issue]() if your interested -->

External dependency binaries are shipped as sidecar. And this needed to be download in run time. If you want to contribute to functionality then please leave a comment to the [fluent downloader issue](https://github.com/sayeed205/fluent-downloader/issues/2) if your interested.

## Contribution Guidelines

Due to the alpha state of the project I am more than open to make it stable.

Please follow the main contributing rules, to maintain fluent-downloader's top quality:

-   Follow style guides:

    -   [Lint the code](#lint-the-code).

-   Write tests.

-   [Write documentation](#documentation).

-   Don't update the changelog.

-   Don't change the library version.

## Getting Started

1. Install latest [ Nodejs (LTS recommended)](https://nodejs.org/en/download/)

2. Install or upgrade to the latest [pnpm](https://pnpm.io/installation).

3. Fork the project, and clone your fork of the repo

4. Run `pnpm install` to install the dev dependencies

## Testing

Testing is not yet implemented. But will be implemented soon.

<!-- ### Unit tests

### REPL

### Test build -->

## Code Style Guide

### Lint the Code

The project follows [Prettier] code style and will use [ESLint] as the linter.

<!-- To lint the code, run:

```bash
pnpm lint
``` -->

[prettier]: https://prettier.io/
[eslint]: https://eslint.org/

## Documentation

### JSDoc

-   [TSDoc](https://tsdoc.org/) will be used for the code documentation.
