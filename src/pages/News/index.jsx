import React, { useState, useEffect } from 'react';

// API URL for fetching technology news  
const API_URL = 'https://gnews.io/api/v4/search?q=technology&lang=en&apikey=da879d86c56bf9f0a41d50d5b5c31639';

export function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching news articles from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);

        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the API response has articles
        if (data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error('Failed to fetch news articles from the API.');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white">Technology News</h1>
        <p className="mt-4 text-white">Latest updates on technology around the world.</p>
      </div>

      {/* Loading / Error State */}
      {loading && (
        <div className="mt-6 text-center text-lg text-gray-600">Loading news...</div>
      )}
      {error && (
        <div className="mt-6 text-center text-lg text-red-500">{error}</div>
      )}

      {/* News Articles */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && !error && articles.length === 0 && (
          <div className="col-span-full text-center text-lg text-gray-600">No articles available.</div>
        )}

        {!loading && !error && articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <img
              src={article.image || 'https://via.placeholder.com/400x250'}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{article.description || 'No description available.'}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-teal-500 hover:text-teal-700"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}