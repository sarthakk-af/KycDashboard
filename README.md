# KYC Dashboard

A dynamic, feature-rich dashboard for monitoring KYC (Know Your Customer) application metrics, built with Next.js 14, Tailwind CSS, and Recharts.

## ✨ Features

-   **Interactive Data Visualizations**: Clean and intuitive charts to display complex data, including bar charts for daily comparisons and multi-layer pie charts for statistical breakdowns.
-   **Dynamic Data Filtering**: Filter the entire dashboard view by different time ranges:
    -   Today
    -   This Month
    -   Custom Date Range
-   **Multiple Data Views**: Toggle between different data contexts like "Individual" vs. "Non-Individual" and "Solicited" vs. "Unsolicited" to get granular insights.
-   **PDF Export**: Generate and download a complete PDF report of the current dashboard view with a single click.
-   **Light & Dark Mode**: A sleek, modern UI with full support for both light and dark themes.
-   **Responsive Design**: The dashboard is fully responsive and accessible on various screen sizes.
-   **Skeleton Loading States**: Smooth loading experience while data is being fetched in the background.

***

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
-   **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)

***

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have Node.js (version 18.17.0 or later) installed on your system.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd kyc-dashboard
    ```

2.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```
   

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
   

4.  **Open the application:**
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard in action.

***

## 📁 Project Structure

Here's an overview of the key directories and files in the project:

-   **`/app`**: Contains the core application pages, layouts, and the mock API route.
    -   **`/app/page.jsx`**: The main dashboard page that manages state and renders all components.
    -   **`/app/api/dashboard/route.js`**: The mock API endpoint that serves dynamic, randomized data to the frontend.
-   **`/components`**: All the reusable React components are located here.
    -   `KycDashboard.jsx`: The central component displaying KPIs and charts.
    -   `PanStats.jsx`: Component for the PAN data pie chart and statistics.
    -   `Tabs.jsx`: The header section with date and filter controls.
    -   `Sidebar.jsx` & `Topbar.jsx`: The main navigation and header UI.
-   **`/lib`**: Contains helper functions, including the API fetching logic.
    -   `api.js`: The utility function for fetching data from the backend API.

***

## 🔌 API Endpoint

The project uses a mock API route to simulate a backend data source.

-   **Endpoint**: `/api/dashboard`
-   **Method**: `GET`
-   **Functionality**: This endpoint generates and returns a randomized JSON object with all the necessary data for the dashboard. It accepts query parameters to tailor the data response.
-   **Query Parameters**:
    -   `range`: (`today`, `month`, `custom`, `date`)
    -   `from`: (string, e.g., "2025-08-01") - Start date for the custom range.
    -   `to`: (string, e.g., "2025-08-10") - End date for the custom range.
    -   `date`: (string, e.g., "2025-08-05") - A single date.
    -   `view`: (`individual`, `non-individual`)
    -   `type`: (`solicited`, `unsolicited`)
