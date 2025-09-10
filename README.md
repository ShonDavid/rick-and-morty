# 🚀 Rick and Morty Character Explorer

A modern React application that allows you to explore and manage your favorite characters from the Rick and Morty universe. Built with React, Redux Toolkit, and TypeScript for a smooth, responsive experience.

![Rick and Morty App](https://img.shields.io/badge/React-19.1.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.2-purple) ![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-purple)

## ✨ Features

- 🔍 **Search Characters**: Find your favorite characters by name
- ❤️ **Favorites Management**: Add/remove characters to your favorites list
- 🎨 **Customizable Themes**: Choose from red, green, or blue color themes
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🔄 **Real-time Updates**: Instant search with debounced input
- 💾 **Persistent Storage**: Your favorites are saved locally
- 🎭 **Character Details**: View detailed information in beautiful modals
- 📄 **Pagination**: Navigate through all available characters

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd rick-and-morty
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open Your Browser

Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

## 📋 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build the app for production             |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint to check code quality         |

## 🎯 How to Use the App

### 🔍 Searching Characters

1. **Type in the search bar** at the top of the page
2. **Wait for results** - the search is debounced (500ms delay)
3. **View filtered results** in the main character grid
4. **Clear search** by deleting the text to see all characters

### ❤️ Managing Favorites

#### Adding to Favorites

1. **Click the heart icon** on any character card
2. **Character appears** in the favorites sidebar
3. **Icon changes** to a filled heart to indicate favorited status

#### Removing from Favorites

1. **Click the X icon** in the favorites sidebar
2. **Or click the heart icon** again on the character card
3. **Character is removed** from favorites

#### Changing Favorite Theme

1. **Select a color** from the dropdown in the favorites sidebar
2. **Choose from**: Red, Green, or Blue themes
3. **Theme persists** across browser sessions

### 🎭 Viewing Character Details

1. **Click on any character card** to open the detailed modal
2. **View comprehensive information**:
   - Character image
   - Status (Alive, Dead, Unknown)
   - Species and gender
   - Episode count
   - Origin information
3. **Close the modal** by:
   - Clicking the X button
   - Pressing the Escape key
   - Clicking outside the modal

### 📄 Navigating Pages

1. **Use pagination controls** at the bottom of the page
2. **Click page numbers** to jump to specific pages
3. **Use Previous/Next buttons** for sequential navigation
4. **View total count** of characters and pages

## 🏗️ Project Structure

```
rick-and-morty/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── CharacterCard/     # Character display component
│   │   ├── CharacterList/     # Character grid container
│   │   ├── CharacterModal/    # Character detail modal
│   │   ├── FavoriteCharactersList/ # Favorites sidebar
│   │   ├── Header/            # App header
│   │   ├── Footer/            # App footer
│   │   ├── HomePage/          # Main page container
│   │   ├── Pagination/        # Page navigation
│   │   └── SearchBar/         # Search input component
│   ├── services/          # External services
│   │   └── rickAndMortyApi.ts # Rick and Morty API service
│   ├── store/             # Redux store
│   │   ├── index.ts           # Store configuration
│   │   └── slices/            # Redux slices
│   │       ├── charactersSlice.ts # Characters state
│   │       └── favoritesSlice.ts  # Favorites state
│   ├── types/             # TypeScript definitions
│   │   └── Character.ts       # Character and API types
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── *.scss             # Styling files
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎨 Technology Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **State Management**: Redux Toolkit 2.9.0
- **Language**: TypeScript 5.8.3
- **Styling**: SCSS
- **HTTP Client**: Axios 1.11.0
- **Icons**: React Icons 5.5.0
- **Linting**: ESLint

## 🔧 Development

### Code Quality

The project uses ESLint for code quality checks:

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Previewing Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## 🌐 API Information

This app uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data:

- **Base URL**: `https://rickandmortyapi.com/api`
- **Characters Endpoint**: `/character`
- **Search Endpoint**: `/character/?name={query}`
- **Pagination**: Supports page-based navigation

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process using port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Node version issues:**

```bash
# Check your Node version
node --version
# Should be 18 or higher
```

**Dependencies issues:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**

```bash
# Check TypeScript errors
npx tsc --noEmit
# Check linting errors
npm run lint
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the character data
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

---

**Happy exploring! 🚀**

_"Wubba Lubba Dub Dub!"_ - Rick Sanchez
