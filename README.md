# Superhero-hunter

## Description

This project utilizes the Marvel API to fetch information about superheroes. Users can view a list of superheroes, search for specific ones, view details about each superhero, and add them to their favorites list. Additionally, users can view their favorite superheroes on a separate page and remove them from the favorites list as needed.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ayushisaini14/superhero-hunter.git
   ```

2. Generate public and private keys from the [Marvel Developer Portal](https://developer.marvel.com/signup).

3. Follow the instructions on [authorization](https://developer.marvel.com/documentation/authorization) to create an MD5 hash using the provided keys and timestamp.

4. Replace `<public-key>`, `<private-key>`, and `<time-stamp>` in the API URL with your actual keys and timestamp.

## Usage

1. Explore the home page to search for superheroes, view their details, and add them to your favorites list.

2. Navigate to the "My favorite superheroes" page to view and manage your favorite superheroes.

## Features

### Home Page

- Displays a list of superheroes fetched from the Marvel API.
- Includes a search bar to filter superheroes based on user input.
- Each superhero item includes a favorite button to add them to the favorites list.

### Superhero Page

- Provides detailed information about a selected superhero, including their name, photo, biography, and other information obtained from the Marvel API (e.g., comics, events, series, stories).

### My Favorite Superheroes Page

- Displays a list of all favorite superheroes.
- Persists the list of favorite superheroes even after closing the browser.
- Each superhero item includes a remove from favorites button to remove them from the favorites list.

## Dependencies

- Crypto-js

