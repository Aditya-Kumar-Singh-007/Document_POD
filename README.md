# 📄 Document POD

A modern, responsive document management system built with React. Upload, organize, and manage your documents with an intuitive interface and beautiful design.

## 🌟 Features

- **📱 Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **🔐 User Authentication**: Secure login and registration system
- **📂 Document Management**: Upload, view, download, and organize documents
- **🎨 Modern UI**: Glass morphism design with smooth animations
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📊 Dashboard**: Overview of your documents with statistics
- **🔍 Search & Filter**: Find documents quickly by name or category
- **⚡ Fast Performance**: Optimized for speed and smooth user experience

## 🚀 Live Demo

Visit the live application: [Document POD on Netlify](https://storeforyourdocument.netlify.app/)

## 🛠️ Tech Stack

- **Frontend**: React 19.2.3
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: CSS3 with Glass Morphism
- **Graphics**: OGL for WebGL background effects
- **Build Tool**: Create React App
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aditya-Kumar-Singh-007/Document_POD.git
   cd Document_POD/document_pod_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment on Netlify

### Automatic Deployment (Recommended)

1. **Connect to GitHub**
   - Go to [Netlify](https://netlify.com)
   - Click \"New site from Git\"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18` (add in Environment Variables)

3. **Deploy**
   - Click \"Deploy site\"
   - Your site will be live at `https://your-app-name.netlify.app`

### Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=build
```

## 📁 Project Structure

```
document_pod_frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   ├── components/         # React components
│   │   ├── Navbar.js      # Responsive navigation
│   │   ├── Home.js        # Landing page
│   │   ├── Dashboard.js   # User dashboard
│   │   ├── Document.js    # Document listing
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.js # Dark/light theme
│   ├── redux/             # State management
│   │   ├── store.js       # Redux store
│   │   ├── actions/       # Action creators
│   │   └── ...
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   ├── image/             # Static images
│   ├── App.js             # Main app component
│   ├── App.css            # Global styles
│   └── index.js           # Entry point
├── package.json           # Dependencies
└── README.md             # This file
```

## 🎨 Key Components

### Navigation (Navbar.js)
- **Responsive Design**: Unified card layout for mobile, original cards for desktop
- **Smart Detection**: Automatically adapts to screen size
- **Smooth Animations**: Glass morphism effects with backdrop blur

### Dashboard (Dashboard.js)
- **Statistics Overview**: Document count, categories, storage usage
- **Recent Documents**: Quick access to recently uploaded files
- **Quick Actions**: Fast navigation to common tasks

### Document Management (Document.js)
- **Grid Layout**: Responsive document cards
- **Search & Filter**: Real-time filtering by name and category
- **Actions**: View, download, and delete documents

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_backend_api_url
REACT_APP_VERSION=1.0.0
```

### Netlify Configuration
Create `netlify.toml` in the root directory:

```toml
[build]
  publish = \"build\"
  command = \"npm run build\"

[[redirects]]
  from = \"/*\"
  to = \"/index.html\"
  status = 200
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: ≤ 480px (Single column, unified navigation)
- **Tablet**: 481px - 768px (Two columns, adapted layouts)
- **Desktop**: ≥ 769px (Multi-column, full features)

## 🎯 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Compressed images and WebP format
- **Caching**: Service worker for offline functionality
- **Bundle Optimization**: Tree shaking and minification
- **Mobile Performance**: Reduced WebGL effects on mobile devices

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS**: Secure communication (Netlify provides SSL)
- **Content Security Policy**: Protection against code injection

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aditya Kumar Singh**
- 📍 Location: Prayagraj, Uttar Pradesh, India
- 📧 Email: [2604aditya@gmail.com](mailto:2604aditya@gmail.com)
- 📞 Phone: [+91 9696833917](tel:+919696833917)
- 🔗 GitHub: [@Aditya-Kumar-Singh-007](https://github.com/Aditya-Kumar-Singh-007)
- 💼 LinkedIn: [Aditya Kumar Singh](https://www.linkedin.com/in/aditya-kumar-singh2604)
- 🌐 Portfolio: [iamadityakumarsingh.netlify.app](https://iamadityakumarsingh.netlify.app/)

## 🙏 Acknowledgments

- React team for the amazing framework
- Redux team for state management
- OGL for WebGL graphics
- Netlify for hosting platform
- All contributors and testers

## 📞 Support

If you have any questions or need help with deployment, please:

1. Check the [Issues](https://github.com/Aditya-Kumar-Singh-007/Document_POD/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about your setup and the issue

---

**Made with ❤️ by Aditya Kumar Singh**