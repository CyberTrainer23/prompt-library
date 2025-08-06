# Prompt Library GitHub Page Plan

## 1. Project Goal
Create a user-friendly, searchable, and filterable prompt library hosted on GitHub Pages. The library will be populated from the data in `Prompt LIbrary.xlsx`.

## 2. Data Source
The initial data is in `Prompt LIbrary.xlsx`. This will be converted to a clean `prompts.json` file for use on the website.

The JSON data will have the following structure for each prompt:
```json
{
  "business_unit": "Data & Analytics",
  "title": "AI-Powered Scheduling and Automated Reminders for Team Coordination",
  "role": "Executive Assistant; Office Manager",
  "description": "Managing complex schedules; coordinating meetings; and setting reminders efficiently using AI",
  "prompt": "<context>...</context><hone>...</hone><audience>...</audience><tone>...</tone>"
}
```

## 3. Website Features

### 3.1. Main Page
- A grid or list of cards, each representing a prompt.
- Each card will display the prompt's `title`, `role`, and `description`.

### 3.2. Search
- A search input field at the top of the page.
- The search will filter prompts in real-time based on matches in the `title`, `role`, and `description`.

### 3.3. Filtering
- Dropdown menus or a sidebar for filtering by:
  - **Business Unit**: A list of all unique business units.
  - **Role**: A list of all unique roles.

### 3.4. Prompt Details
- Clicking on a prompt card will reveal the full prompt.
- The prompt's `<context>`, `<hone>`, `<audience>`, and `<tone>` sections will be clearly formatted.
- A "Copy to Clipboard" button will be available to copy the full prompt text.

## 4. Technology Stack
- **HTML**: For the structure of the website.
- **CSS**: For styling and layout.
- **JavaScript**: For data loading, rendering, search, and filtering.
- **JSON**: As the data format for the prompts.

## 5. Development Steps
1.  **Clean and Convert Data**: Read `prompts.csv`, clean it, and convert it to `prompts.json`.
2.  **Create `index.html`**: Set up the basic HTML structure for the page, including containers for the search/filter controls and the prompt list.
3.  **Create `style.css`**: Add CSS for a clean, modern, and responsive design.
4.  **Create `script.js`**:
    - Fetch and parse `prompts.json`.
    - Dynamically generate the prompt cards.
    - Implement the search functionality.
    - Implement the filtering functionality.
    - Implement the "Copy to Clipboard" feature.
5.  **Testing**: Ensure all features work as expected.
