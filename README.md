
# MarkKeeper - Markdown Note-Taking App

MarkKeeper is a beautiful, modern markdown-based note-taking application designed for simplicity and productivity. Organize your thoughts, code snippets, and ideas with a clean and intuitive interface.

![MarkKeeper Screenshot](https://lovable.dev/opengraph-image-p98pqg.png)

## Features

- **Rich Markdown Support**: Write in markdown with real-time preview and syntax highlighting
- **Folder Organization**: Keep your notes organized in custom folders
- **Tagging System**: Add tags to your notes for easy filtering and searching
- **Full-Text Search**: Quickly find your notes with powerful search capabilities
- **Customizable UI**: Change themes, font sizes, and other display settings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Offline Support**: All your notes are stored locally for privacy and offline access

## Installation

### Method 1: Docker (Recommended)

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/markkeeper.git
   cd markkeeper
   ```

2. Build and run with Docker:
   ```
   docker build -t markkeeper .
   docker run -p 8080:8080 markkeeper
   ```

3. Access MarkKeeper at `http://localhost:8080`

### Method 2: Local Development

#### Prerequisites
- Node.js (v16 or later)
- npm or yarn

#### Steps

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/markkeeper.git
   cd markkeeper
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Access MarkKeeper at `http://localhost:8080`

## Building for Production

```
npm run build
# or
yarn build
```

The built application will be in the `dist` directory.

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [sql.js](https://github.com/sql-js/sql.js/)

## Contributing

We welcome contributions to MarkKeeper! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built with [Lovable](https://lovable.dev/)
- Icons from [Lucide](https://lucide.dev/)
