# Brighter Mark Enterprises LLC - Website Architecture

## Project Structure
```
brighter-mark-site/
├── index.html                 # Homepage
├── services.html              # Services page
├── service-areas.html         # Service areas page
├── about.html                 # About page
├── contact.html               # Contact page
├── css/
│   ├── style.css              # Main stylesheet
│   ├── responsive.css         # Mobile responsiveness
│   └── components.css         # Reusable components
├── js/
│   ├── main.js                # Main JavaScript
│   ├── contact-form.js        # Form handling
│   └── navigation.js          # Mobile navigation
├── images/
│   ├── hero-bg.jpg            # Hero background
│   ├── service-icons/         # Service category icons
│   └── local-landmarks/       # Arkansas landmark images
└── assets/
    ├── favicon/               # Favicon package
    └── fonts/                 # Web fonts if needed
```

## Page Architecture

### 1. Homepage (`index.html`)
**SEO Title:** "Commercial Cleaning Services Little Rock & Pine Bluff AR | Brighter Mark Enterprises"
**Structure:**
- Hero section with primary CTA and phone number
- Services overview grid (6 services)
- Why Choose Us section (local ownership emphasis)
- Service areas highlight
- Contact section with quick form
- Footer with business info

### 2. Services Page (`services.html`)
**SEO Title:** "Professional Cleaning Services in Little Rock & Pine Bluff Arkansas"
**Sections:**
- Office Cleaning Services
- Medical Facility Cleaning
- Post-Construction Cleanup
- Carpet Cleaning
- Window Cleaning
- Commercial Residential Cleaning

### 3. Service Areas Page (`service-areas.html`)
**SEO Title:** "Serving Little Rock & Pine Bluff Arkansas - Commercial Cleaning"
**Geographic Focus:**
- Little Rock, AR (primary)
- Pine Bluff, AR (primary)
- Surrounding Central Arkansas areas

### 4. About Page (`about.html`)
**SEO Title:** "Locally Owned Commercial Cleaning Company | Brighter Mark Enterprises"
**Key Messages:**
- Local ownership vs franchise
- Community commitment
- Business background
- Trust building elements

### 5. Contact Page (`contact.html`)
**SEO Title:** "Contact Brighter Mark Enterprises - Commercial Cleaning Little Rock AR"
**Features:**
- Contact form with validation
- Business information display
- Service area map
- Multiple contact methods

## Technical Implementation

### CSS Architecture
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Brand color variables
- Component-based styling

### JavaScript Features
- Mobile navigation toggle
- Contact form validation
- Smooth scrolling
- Phone CTA functionality

### SEO Implementation
- Local business schema markup
- Service area structured data
- Meta tags optimization
- Semantic HTML structure

## Color System
```css
:root {
  --primary-blue: #00D3F2;
  --primary-green: #0A8100;
  --background-white: #F7FFF7;
  --accent-orange: #E87600;
  --text-dark: #333333;
  --text-light: #666666;
}
```

## Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Key Components
- Navigation header with mobile menu
- Service cards grid
- CTA buttons (primary/secondary)
- Contact form with validation
- Footer with business info
- Hero sections with background images