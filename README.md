# 🎬 Movies Recommend App

A sleek and responsive **movie discovery** web app built with **React**, **Vite**, and **Tailwind CSS**, powered by The Movie Database (TMDB) API.

## 🔎 Core Features

- **Search & Discover**
  - Real-time movie search with **debouncing** to reduce redundant API calls.
  - Displays trending/popular movies on the homepage.

- **Movie Cards**
  - Each movie card shows cover image, title, rating, release year, and language.
  - High-quality image handling for visual clarity.

- **Asynchronous Data Handling**
  - Fetches data using modern **async/await** with loading state indicators and error messages.
  - Seamless toggling between search results and default discover results.

- **Built with Modern Tooling**
  - **React + Vite**: Fast development experience and optimized production builds.
  - **Tailwind CSS**: Easily customizable, utility-first styling.

- **Optional Integration Hooks**
  - Placeholder methods (`updateSearchCount`, `getTrandingMovies`) designed for future backend integration (e.g., with Appwrite, Firebase, or custom API).

## 🚀 Live Demo

[Click here to explore the app](https://moviesapp-ruby.vercel.app/)

## 🛠️ Getting Started

To run the project locally:

```bash
git clone https://github.com/yourusername/movieApp.git
cd movieApp
npm install
npm run dev
