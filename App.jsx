// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// if inside src/components/
import ResumeUploader from "./components/ResumeUploader.jsx";


function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
      <p className="text-gray-700">
        Here you will see your analysis history in the future (to be connected with MySQL).
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">AI Resume Analyzer</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ResumeUploader />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 text-center p-4">
          <p>© {new Date().getFullYear()} Resume Analyzer | Built with ❤️</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
