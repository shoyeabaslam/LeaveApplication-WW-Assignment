import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi'; // Example icon from react-icons

const InvalidPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r  to-blue-400">
      <div className="max-w-md w-full bg-slate-800 shadow-md rounded-md p-8">
        <div className="flex items-center justify-center text-yellow-500 mb-6">
          <FiAlertCircle className="w-12 h-12 mr-3" />
          <h1 className="text-xl font-bold">Access Denied</h1>
        </div>
        <p className="text-white text-center mb-6">
          It looks like you're not logged in. Please login to access this page.
        </p>
        <Link
          to="/"
          className="bg-blue-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 "
        >
          Login In
        </Link>
      </div>
    </div>
  );
};

export default InvalidPage;
