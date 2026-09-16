# Product Requirements Document (PRD)
**Project:** AgTech Dashboard Prototype
**Target Output:** Complete, functional frontend React code (modular structure preferred, or single-file if necessary for the prompt limit).
**Persona Prompt:** Act as an Expert UI/UX Designer and Full-Stack React Developer.

## 1. Project Overview
Develop the frontend interface for a prototype agriculture web application. The core application provides farmers with actionable insights, community resource sharing, and AI-driven guidance. The application must feature a modern, highly responsive design characterized by a "Dynamic Island" navigation pattern and modular widget architecture. 

## 2. Technical Stack Specifications
*   **Build Tool:** Vite.
*   **Framework:** React.js (Functional Components using Hooks: `useState`, `useEffect`).
*   **Styling:** Tailwind CSS (standard utility classes).
*   **Icons:** Lucide React (`lucide-react`).
*   **Data Visualization:** Recharts (using `ResponsiveContainer`, `LineChart`, `Line`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`).
*   **External APIs/Backend:** NONE. The prototype must operate entirely on client-side state using robust JSON mock data defined within the code.

## 3. UI/UX Architecture & Layout Strategy
*   **Color Palette:** Earthy and modern. Primary brand colors should utilize Tailwind's Emerald/Green scale for primary actions, Slate/Zinc for text and layout boundaries, and subtle off-white (`bg-slate-50`) for the canvas.
*   **Container Layout:** A fluid, full-height (`min-h-screen`) background container. Content should be centered within a responsive max-width wrapper (e.g., `max-w-6xl`) with appropriate padding.
*   **Card Anatomy:** All widgets must be housed inside consistent UI cards featuring subtle borders (`border-slate-200`), rounded corners (`rounded-2xl` or `3xl`), and soft shadows (`shadow-sm` transitioning to `shadow-md` on hover).

## 4. Navigation: Dynamic Island Pattern
*   **Concept:** Replace traditional sidebars or top-heavy navbars with a floating, pill-shaped navigation cluster (the "Dynamic Island") positioned at the bottom-center of the viewport to feel like a modern mobile/web hybrid app.
*   **Behavior:** 
    *   Features smooth transitions and a glassmorphic background (`backdrop-blur-md bg-white/80 border border-slate-200`).
    *   Contains icon + text labels for the primary views: **Overview**, **Market (Leasing)**, **AI Assistant**, and **Sandbox**.
    *   Active states must highlight fluidly with a colored background pill (e.g., `bg-emerald-100 text-emerald-800`) behind the active text/icon.
*   **State Hook:** Use a central `const [activeView, setActiveView] = useState('overview')` to toggle the dynamic main content display area directly above the island.

## 5. View & Component Specifications

### 5.1 Crop Price Prediction Widget (Overview View)
*   **Type:** Data Visualization / Chart Component.
*   **Elements:** 
    *   A header with a crop selector dropdown (Cardamom, Rubber, Black Pepper).
    *   A main Line chart using Recharts.
    *   A toggle button labeled "Show AI Forecast".
*   **Interaction:** Toggling "Show AI Forecast" should render the `predictedPrice` data points as a dashed line extending from the `actualPrice` data.

### 5.2 Farm Equipment Leasing Widget (Market View)
*   **Type:** Grid Layout / Shared Economy Cards.
*   **Elements:** 
    *   Filter chips for categories (Machinery, Labor, Storage).
    *   A grid of equipment cards displaying: Item Title, category, Price/Day, Location/Panchayat tag, and Owner Name.
*   **Interaction:** A prominent "Rent Now" button on each card that triggers a conditionally rendered Tailwind Modal confirming the request has been sent to the owner.

### 5.3 AI Farming Assistant Widget (AI Assistant View)
*   **Type:** Chat Interface.
*   **Elements:** 
    *   A scrollable message history window (`overflow-y-auto`).
    *   AI messages styled distinctly from User messages (e.g., emerald-tinted bubbles vs slate-tinted bubbles).
    *   An input field clamped to the bottom of the widget with a Send icon button.
    *   **Quick Prompts:** Include 2-3 clickable prompt chips above the input (e.g., "Monsoon prep for rubber", "Organic pest control").
*   **Interaction:** Implement a mock `setTimeout` function to simulate network delay and display a "typing..." indicator before returning a canned response about Kerala farming practices.

### 5.4 The "Sandbox" Component (Sandbox View)
*   **Type:** Extensible Wrapper / Developer Slot.
*   **Elements:** 
    *   A dedicated React component (`<SandboxWidget title="Future IoT Integrations">`) that explicitly uses the React `children` prop.
    *   Visually style this area with a dashed border (`border-dashed border-slate-300 bg-slate-50/50`) to indicate it is a development placeholder.
*   **Purpose:** To demonstrate modularity where future features like IoT soil moisture mapping or weather APIs can be injected.

## 6. Exact Mock Data Implementation (Seed Data)
You MUST use these exact arrays in the code for the mock data:

**Crop Price Data (₹/kg):**
```javascript
const cropData = [
  { month: 'Mar', actualPrice: 2100, predictedPrice: null, crop: 'Cardamom' },
  { month: 'Apr', actualPrice: 2150, predictedPrice: null, crop: 'Cardamom' },
  { month: 'May', actualPrice: 2050, predictedPrice: null, crop: 'Cardamom' },
  { month: 'Jun', actualPrice: 2200, predictedPrice: 2200, crop: 'Cardamom' },
  { month: 'Jul', actualPrice: null, predictedPrice: 2350, crop: 'Cardamom' },
  { month: 'Aug', actualPrice: null, predictedPrice: 2400, crop: 'Cardamom' }
];
```

**Leasing Economy Data:**
```javascript
const equipmentData = [
  { id: 1, title: 'Mahindra JIVO Tractor', category: 'Machinery', price: '₹800/day', owner: 'Thomas M.', location: 'Karimannoor Panchayat' },
  { id: 2, title: 'Skilled Tapping Labor (x2)', category: 'Labor', price: '₹900/day', owner: 'Rajan K.', location: 'Kuttikkanam' },
  { id: 3, title: 'Cardamom Drying Unit', category: 'Storage', price: '₹1200/batch', owner: 'AgriCoop', location: 'Painavu' },
  { id: 4, title: 'Power Tiller (Honda)', category: 'Machinery', price: '₹500/day', owner: 'Joseph V.', location: 'Karimannoor Panchayat' }
];
```

## 7. Output Quality & Constraints
*   **Comments:** The code must be heavily and explicitly commented, explaining the purpose of hooks, component boundaries, and where API/Supabase integration points will exist later.
*   **Error Handling:** Ensure the layout does not break if data arrays are empty. Use flexbox/grid safely to prevent overflow on mobile breakpoints.
*   **Completeness:** Provide the full, runnable code. Do not use placeholders like `// ... rest of code`. Ensure imports for `lucide-react` and `recharts` are present.

---
**Instruction for LLM:** Read the above PRD completely. Generate the React component code inside a code block. Ensure it uses Vite-compatible React syntax.