import React from "react";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        {/* Logo */}
        <div className="flex justify-start mb-4">
          <img
            src="https://logospng.org/download/w3schools/w3schools-1536.png"
            alt="W3Schools Logo"
            className="w-12 p-0"
          />
        </div>

        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">
                Tutorials
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">
                References
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">
                Exercises
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-900 text-white p-4 flex justify-between">
          <span className="text-lg font-bold">W3Schools Clone</span>
          <button className="bg-green-500 px-3 py-1 rounded">Login</button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Welcome to W3Schools UI</h1>
          <p className="mt-4 text-gray-700">
            This is a simple UI similar to W3Schools. Update content as needed.
          </p>
        </main>
      </div>
    </div>
  );
};

export default App;
