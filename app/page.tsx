export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
        <h1 className="text-3xl font-bold mb-4">
            Welcome 
        </h1>

        <p className="text-gray-600 mb-6">
         Bizonance!
        </p>

        <a
          href="/dashboard"
          className="block bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
