# HR Dashboard

A modern HR Dashboard with multi-tenant support, employee management, leave tracking, announcements, and more.  
Built with **React (TypeScript)**, **TailwindCSS**, and mock APIs using **Express/NodeJS**.

---

## 🚀 Getting Started

### 🔧 Run the Application Locally

Follow these steps to run the application in your local development environment:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:dhivyabharathis14/hr_dashboard.git

   cd hr_dashboard
   npm install
   npm run dev

   ```

Run the Application Using Docker
docker build -f deployment/Dockerfile -t hr-dashboard .
docker run -p 5173:5173 hr-dashboard

The HR Dashboard is built with a modular and scalable front-end architecture using React (TypeScript) and supports the following key features:

🔄 Layout System
Private Layouts:
The app uses a private layout component to restrict access to authenticated users only. Different layouts are rendered based on the user’s role (Admin or Employee).

Routes are protected and rendered conditionally depending on login state.

Layouts include a shared sidebar, topbar (with user/company info), and dynamic content.

🏢 Company Switcher
A dropdown menu is implemented to switch between companies in a multi-tenant environment.

On selection, the UI dynamically reloads relevant data (employees, leave balances, announcements) specific to the selected company.

Each company’s data is isolated and scoped to that tenant context.

👥 Role-Based Login
Admin and Employee Roles:

Admins can manage employees, view leave requests, publish announcements, etc.

Employees can view their own profiles, leave balances, and announcements.

Role-based routing ensures each user sees only the pages and data relevant to their access level.

🔧 Component Structure
components/: Reusable UI components like buttons, modals, dropdowns.

layouts/: Contains layout components such as PrivateLayout, AdminLayout, etc.

lib/: Route-based components for different screens (Dashboard, Employee Details, etc.).

services/: API interaction logic (mock).

store/: For state management (e.g., user authentication, company context).
