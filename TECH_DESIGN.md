# Rick and Morty App - Technical Design Document

## 1. How to Run the Application

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd rick-and-morty

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Development Server

- **URL**: `http://localhost:5173` (default Vite port)
- **Hot Reload**: Enabled for instant updates during development
- **TypeScript**: Full type checking and IntelliSense support

---

## 2. Breakdown of Components

### 2.1 App Architecture

```
App (Root Component)
├── Provider (Redux Store)
│   ├── Header
│   ├── HomePage (Main Container)
│   │   ├── SearchBar
│   │   ├── CharacterList
│   │   │   └── CharacterCard (multiple)
│   │   ├── CharacterModal
│   │   ├── FavoriteCharactersList
│   │   │   └── CharacterCard (favorite variant)
│   │   └── Pagination
│   └── Footer
```

### 2.2 Component Details

#### **App.tsx**

- **Purpose**: Root component with the Redux Provider
- **Key Features**:
  - Redux store integration
  - Global layout structure
  - SCSS styling

#### **HomePage.tsx** (Main Container)

- **Purpose**: Central component
- **State Management**:
  - Characters data
  - Favorites data
  - Search functionality
- **Key Features**:
  - Search handling with debouncing
  - Pagination control
  - Error handling and retry logic
  - Favorites color theming

#### **CharacterCard.tsx**

- **Purpose**: Reusable character display component
- **Variants**:
  - `default`: For main character list
  - `favorite`: For favorites sidebar
- **Props**:
  - `character`: Character data object
  - `variant`: Display variant
  - `onToggleFavorite`: Add/remove from favorites
  - `onRemoveFavorite`: Remove from favorites
  - `onCardClick`: Open character modal
  - `isFavorite`: Current favorite status

#### **CharacterModal.tsx**

- **Purpose**: Detailed character information display
- **Features**:
  - Character image and details
  - Status indicators
  - Episode count
  - Origin information
  - Keyboard navigation (ESC to close)
  - Click outside to close

#### **SearchBar.tsx**

- **Purpose**: Character search functionality
- **Features**:
  - Debounced search (500ms delay)
  - Real-time search suggestions
  - Input validation

#### **CharacterList.tsx**

- **Purpose**: Grid layout for character cards
- **Features**:
  - Responsive grid system
  - Loading states
  - Empty states

#### **FavoriteCharactersList.tsx**

- **Purpose**: Sidebar for favorite characters
- **Features**:
  - Color theming (red, green, blue)
  - Remove functionality
  - Persistent storage

#### **Pagination.tsx**

- **Purpose**: Page navigation controls
- **Features**:
  - Page number display
  - Previous/Next navigation
  - Total items count
  - Loading state handling

#### **Header.tsx & Footer.tsx**

- **Purpose**: Application branding and navigation
- **Features**: Responsive design, consistent styling

---

## 3. Services

### 3.1 API Service (`rickAndMortyApi.ts`)

#### **RickAndMortyApiService Class**

- **Base URL**: `https://rickandmortyapi.com/api`
- **HTTP Client**: Axios
- **Error Handling**: Comprehensive error management

#### **Methods**:

##### `getCharacters(page: number = 1): Promise<ApiResponse>`

- **Purpose**: Fetch paginated character list
- **Parameters**: Page number (default: 1)
- **Returns**: API response with characters and pagination info

##### `searchCharacters(name: string, page: number = 1): Promise<ApiResponse>`

- **Purpose**: Search characters by name
- **Parameters**:
  - `name`: Character name to search
  - `page`: Page number (default: 1)
- **Returns**: Filtered API response

#### **Error Handling**:

- **Network Errors**: Connection issues, timeouts
- **HTTP Errors**: 4xx, 5xx status codes
- **API Errors**: Custom error messages from API
- **Fallback**: Generic error messages

### 3.2 State Management

#### **Redux Store Structure**

```typescript
{
  characters: CharactersState,
  favorites: FavoritesState
}
```

#### **Characters Slice** (`charactersSlice.ts`)

- **State**:

  - `characters`: Character array
  - `loading`: Loading state
  - `error`: Error information
  - `currentPage`: Current page number
  - `totalPages`: Total available pages
  - `totalItems`: Total character count
  - `searchQuery`: Current search term

- **Actions**:

  - `fetchCharacters`: Async thunk for API calls
  - `setSearchQuery`: Update search term
  - `goToPage`: Navigate to specific page
  - `refresh`: Reset to first page

- **Async Thunks**:
  - `fetchCharacters`: Handles both regular and search API calls

#### **Favorites Slice** (`favoritesSlice.ts`)

- **State**:

  - `favoriteCharacters`: Array of favorite characters
  - `favoriteIds`: Array of favorite character IDs
  - `favoriteColor`: Selected theme color

- **Actions**:

  - `addToFavorites`: Add character to favorites
  - `removeFromFavorites`: Remove character from favorites
  - `toggleFavorite`: Toggle favorite status
  - `clearFavorites`: Clear all favorites
  - `setFavoriteColor`: Update theme color

- **Persistence**:
  - `localStorage` integration
  - Automatic save/load on state changes
  - Error handling for storage failures

---

## 4. Interaction Flow Diagram

### 4.1 Component Render Flow

```
App Mount
├── Redux Store Initialization
│   ├── Load Favorites from localStorage
│   └── Initialize Characters State
├── HomePage Mount
│   ├── useEffect: fetchCharacters(page: 1)
│   ├── Render SearchBar
│   ├── Render CharacterList (loading state)
│   ├── Render FavoriteCharactersList
│   └── Render Pagination
└── API Call Complete
    ├── Update Characters State
    ├── Render CharacterList with data
    └── Update Pagination info
```

### 4.2 Search Flow

```
User Types in SearchBar
├── Debounce (500ms)
├── setSearchQuery Action
│   ├── Update searchQuery in state
│   ├── Reset to page 1
│   └── Clear current characters
├── fetchCharacters Async Thunk
│   ├── Check if searchQuery exists
│   ├── Call searchCharacters API
│   └── Update state with results
└── Re-render Components
    ├── CharacterList with filtered results
    └── Update Pagination
```

### 4.3 Modal Interaction Flow

```
CharacterCard Click
├── onCardClick Handler
├── Set Selected Character State
├── Open CharacterModal
│   ├── Display Character Details
│   ├── Show Status Indicators
│   └── Show Episode Count
└── Modal Close Options
    ├── Close Button Click
    ├── Escape Key Press
    └── Backdrop Click
```

### 4.4 Favorites Management Flow

```
Add to Favorites
├── CharacterCard Click (Heart/Plus Icon)
├── toggleFavorite Action
│   ├── Check if already favorite
│   ├── Add/Remove from favoriteCharacters
│   ├── Update favoriteIds array
│   └── Save to localStorage
├── Update CharacterCard UI
│   ├── Change icon (Heart/Plus)
│   └── Update button styling
└── Update FavoriteCharactersList
    └── Add/Remove from sidebar

Remove from Favorites
├── FavoriteCharactersList Remove Click
├── removeFromFavorites Action
│   ├── Filter out from favoriteCharacters
│   ├── Remove from favoriteIds
│   └── Update localStorage
└── Update UI
    ├── Remove from sidebar
    └── Update main list cards
```

### 4.5 Pagination Flow

```
Page Navigation
├── Pagination Component Click
├── goToPage Action
│   ├── Validate page number
│   ├── Update currentPage
│   └── Prevent if loading
├── fetchCharacters Async Thunk
│   ├── Use current searchQuery
│   ├── Call appropriate API
│   └── Update state with new page data
└── Re-render Components
    ├── CharacterList with new page data
    └── Update Pagination controls
```

---

## 5. Technical Specifications

### 5.1 Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **State Management**: Redux Toolkit 2.9.0
- **HTTP Client**: Axios 1.11.0
- **Styling**: SCSS
- **Icons**: React Icons 5.5.0
- **TypeScript**: 5.8.3

### 5.2 Performance Optimizations

- **Debounced Search**: 500ms delay to prevent excessive API calls
- **Redux State Management**: Centralized state with efficient updates
- **Component Memoization**: React.memo for expensive components
- **Lazy Loading**: Character images loaded on demand
- **Error Boundaries**: Graceful error handling

### 5.3 Data Flow

1. **Unidirectional Data Flow**: Redux → Components
2. **Action-Based Updates**: All state changes through Redux actions
3. **Async Operations**: Redux Toolkit async thunks for API calls
4. **Persistence**: localStorage for favorites and preferences

### 5.4 Error Handling

- **API Errors**: Comprehensive error catching and user feedback
- **Network Errors**: Retry mechanisms and fallback messages
- **Storage Errors**: Graceful degradation for localStorage failures
- **Component Errors**: Error boundaries and loading states

---

## 6. File Structure

```
src/
├── components/           # React components
│   ├── CharacterCard/    # Character display component
│   ├── CharacterList/    # Character grid container
│   ├── CharacterModal/   # Character detail modal
│   ├── FavoriteCharactersList/ # Favorites sidebar
│   ├── Footer/          # App footer
│   ├── Header/          # App header
│   ├── HomePage/        # Main page container
│   ├── Pagination/      # Page navigation
│   └── SearchBar/       # Search input component
├── services/            # External service integrations
│   └── rickAndMortyApi.ts # API service class
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   └── slices/          # Redux slices
│       ├── charactersSlice.ts # Characters state management
│       └── favoritesSlice.ts  # Favorites state management
├── types/               # TypeScript type definitions
│   └── Character.ts     # Character and API types
├── App.tsx              # Root component
├── App.scss             # Global styles
├── index.scss           # Base styles
└── main.tsx             # Application entry point
```

This technical design provides a comprehensive overview of the Rick and Morty application architecture, component structure, and interaction flows.
