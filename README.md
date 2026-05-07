# Tabdeal Aparat Videos

A responsive video listing and search application built with **Nuxt 4**, **Vue 3**, **TypeScript**, and **Tailwind CSS** for displaying videos from **Aparat**.

This project was developed with a production-oriented mindset, focusing on clean architecture, SSR-friendly data fetching, reusable UI components, and isolating unreliable third-party API behavior behind a small **BFF (Backend for Frontend)** layer.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Why BFF?](#why-bff)
- [Pagination Strategy](#pagination-strategy)
- [Search Pagination Limitation](#search-pagination-limitation)
- [SSR and Data Fetching](#ssr-and-data-fetching)
- [Component Design](#component-design)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Preview Production Build](#preview-production-build)
- [What I Focused On](#what-i-focused-on)
- [Known Limitations](#known-limitations)
- [Possible Future Improvements](#possible-future-improvements)
- [Author](#author)

---

## Overview

**Tabdeal Aparat Videos** is a Nuxt-based application for browsing and searching Aparat videos.

The application supports:

- server-side rendering
- video listing
- video search
- cursor-based pagination for the default video list
- cached visited pages
- responsive UI
- reusable components
- a small BFF layer for API normalization

The main goal was not only to make the UI work, but also to design the project in a way that is easier to maintain, debug, and extend.

---

## Tech Stack

- **Nuxt 4**
- **Vue 3**
- **TypeScript**
- **Tailwind CSS**
- **Nitro Server Routes**
- **Nuxt `useFetch`**
- **SSR Rendering**

---

## Features

- Display Aparat video list
- Search Aparat videos
- Cursor-based pagination for the default video list
- Previous / next page navigation
- Cached pages for better backward navigation experience
- SSR data fetching with `useFetch`
- Responsive layout
- Loading, error, and empty states
- Reusable atomic common components
- Lightweight design system for colors and typography
- BFF layer for isolating third-party API complexity

---

## Architecture

The project is structured around a clear separation of concerns.

### Frontend Layer

The frontend is responsible for:

- rendering UI
- handling user interactions
- managing loading, error, and empty states
- composing reusable components
- managing search and pagination state through composables

### BFF Layer

The BFF layer is implemented using Nuxt/Nitro server API routes inside `server/api`.

It is responsible for:

- calling Aparat APIs
- handling unstable third-party behavior
- normalizing API responses
- hiding external API complexity from the UI
- returning a cleaner and more predictable contract to the frontend

This keeps the UI layer simpler and reduces direct dependency on the raw Aparat API response structure.

---

## Why BFF?

Aparat APIs were not fully documented and their behavior was not always predictable.

Because of that, connecting the frontend directly to Aparat APIs would make the UI tightly coupled to an unstable third-party contract.

To solve this, I created a small **Backend for Frontend** layer.

### Benefits

- Isolates third-party API complexity
- Normalizes response shape
- Centralizes API handling logic
- Keeps frontend components focused on UI
- Makes the codebase easier to maintain
- Reduces the impact of external API changes
- Improves debugging and future scalability

In short, the frontend does not directly deal with all the complexity and inconsistency of the Aparat API.

---

## Pagination Strategy

Aparat API pagination is **cursor-based**, not traditional page/offset-based.

The API provides pagination links such as:

- `pagingForward`
- `pagingBack`

Because of that, the internal pagination logic is implemented using cursor navigation instead of real page numbers.

### Default Video List Pagination

For the default video list, pagination is supported using the cursor links returned by Aparat API.

The application supports previous and next navigation.

Visited pages are cached, so when the user navigates back to a previously visited page, the data can be served from cache instead of being fetched again.

This improves UX and avoids unnecessary repeated requests.

### UI Note

Although the UI may visually look similar to page-based pagination, the underlying API is not offset-based.

For cursor-based APIs, the technically safer and more accurate approach is usually **Next / Previous pagination**, because random page access is not guaranteed by the backend.

---

## Search Pagination Limitation

Search functionality is supported, but pagination for search results is currently disabled.

While implementing pagination for search mode, I found that Aparat API allows fetching the first page of search results, but requesting the next pages through the provided pagination links returns a login/access error.

Because of this API limitation, search pagination is intentionally disabled for now.

This decision was made to avoid exposing unstable or broken behavior to users.

If Aparat provides accessible pagination endpoints for search results in the future, search pagination can be enabled.

---

## SSR and Data Fetching

The project uses Nuxt `useFetch` for data fetching.

This allows pages to benefit from SSR rendering and Nuxt's built-in data fetching lifecycle.

Benefits include:

- better initial page rendering
- SEO-friendly output
- improved perceived performance
- cleaner integration with Nuxt
- shared server/client data fetching behavior

---

## Component Design

To keep the codebase maintainable and scalable, reusable components are placed in common/shared component folders.

The component architecture follows an atomic and composable mindset.

Examples of reusable UI pieces include:

- buttons
- video cards
- skeleton loaders
- error states
- empty states
- pagination controls
- layout primitives

This approach helps avoid duplication and keeps page-level components simpler.

---

## Design System

A lightweight design system was defined for:

- colors
- typography
- spacing consistency
- reusable UI patterns

The goal was not to build a full enterprise-level design system, but to create a clean and extendable foundation for consistent UI development.

---

## Project Structure

Example high-level structure:
```bash
.
├── app/
├── assets/
├── components/
│   ├── common/
│   └── video/
├── composables/
├── pages/
├── public/
├── server/
│   └── api/
├── shared/
├── nuxt.config.ts
├── package.json
└── README.md

> The exact structure may evolve as the project grows.

---

## Installation

bash
npm install

---

## Development

bash
npm run dev

The application will usually be available at:

bash
http://localhost:3000

---

## Build

bash
npm run build

---

## Preview Production Build

bash
npm run preview

---

## What I Focused On

During implementation, I focused on:

- clean separation of concerns
- production-oriented project structure
- isolating third-party API complexity with BFF
- SSR-friendly data fetching
- predictable API contracts for the UI
- reusable component architecture
- responsive UI implementation
- cursor-based pagination handling
- simple cache strategy for visited pages
- maintainable and extendable code organization

---

## Known Limitations

- Search pagination is currently disabled because Aparat API returns a login/access error when requesting next pages of search results.
- Pagination is cursor-based, so random page access is not guaranteed.
- The application depends on the behavior and availability of Aparat APIs.
- Some API responses may change because the external API contract is not fully controlled by this project.

---

## Possible Future Improvements

- Enable search pagination if Aparat provides accessible pagination endpoints
- Add unit and integration tests
- Add stronger typing for all API contracts
- Improve request retry and timeout handling
- Add better error monitoring
- Improve accessibility
- Add more advanced caching strategy
- Add SEO metadata per video/search page
- Consider infinite scroll as an alternative pagination UX
- Add screenshots and live demo link to README

---

## Author

Frontend Developer

Built with **Nuxt**, **TypeScript**, **Tailwind CSS**, and a production-oriented mindset.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
