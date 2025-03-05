# Alma Immigration Lead Management System

A Next.js application for managing immigration visa leads and applications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Component Structure](#component-structure)
- [API Endpoints](#api-endpoints)

## Overview

This application provides a streamlined process for collecting and managing immigration visa leads. It includes a public-facing form for potential clients and an admin dashboard for managing submissions.

## Features

- **Lead Form**: Collects user information with validation
- **Admin Dashboard**: Manage and track leads
- **Search & Filter**: Find leads by name or status
- **Pagination**: Navigate through lead entries efficiently
- **Status Management**: Update lead status from pending to reached out

## System Architecture

### Architecture Diagram

┌─────────────────────────────────────────────────────────────┐
│ Client Browser │
└───────────────────────────────┬─────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ Next.js Application │
│ ┌─────────────────┐ ┌─────────────────┐ ┌────────────┐ │
│ │ React UI │ │ API Routes │ │ Redux │ │
│ │ Components │◄──┼──► (Server) │◄─┼─► Store │ │
│ └─────────────────┘ └─────────────────┘ └────────────┘ │
└───────────────────────────────┬─────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ Data Storage │
│ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ leads.json │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

### Technology Stack

- **Frontend**: React.js, Next.js
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules
- **Data Storage**: JSON file (leads.json)

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mansurjan/alma-immigration.git
   cd alma-immigration
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Component Structure

### Core Components

- **Lead Form**: Collects user information for visa applications
- **Dashboard**: Admin interface to manage leads
- **Main Layout**: Provides consistent layout across pages

### Data Flow

#### Lead Submission Flow

1. User fills out the lead form
2. Client-side validation occurs
3. Form data is submitted to `/api/leads` endpoint
4. New lead is added to leads.json
5. Thank you page is displayed to the user

#### Lead Management Flow

1. Dashboard loads and fetches leads
2. Admin can filter, search, and paginate leads
3. Admin can update lead status
4. Status updates are persisted to leads.json

## API Endpoints

- **GET /api/leads**: Retrieve all leads
- **POST /api/leads**: Create a new lead
- **PATCH /api/leads**: Update lead status

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
