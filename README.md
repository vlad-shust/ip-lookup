# IP Lookup Application

## Overview

This application allows users to enter one or more IP addresses and retrieve the corresponding country information and local time. It uses the IPinfo API to fetch the details and displays the country flag and local time based on the timezone of the IP address.

## Features

- **Add Multiple IPs**: Users can add multiple IP addresses.
- **Country Information**: Displays the country flag of the entered IP address.
- **Local Time**: Shows the local time of the IP address location, updated every second.
- **Error Handling**: Validates IP addresses and shows error messages for invalid inputs.

## Prerequisites

- **Node.js**: Ensure you have Node.js version 18.0.0 or above installed.

## Project Structure

```plaintext
src/
  api/                # API related files
  components/         # Vue components
  types/              # TypeScript type definitions
  utils/              # Utility functions and constants
    constants.ts      # Constants used across the application
```


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/ip-lookup.git
cd ip-lookup
npm install
npm run dev
