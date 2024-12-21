import React, { useState, useEffect } from 'react';

// API URL for fetching technology news in English
const API_URL = 'https://gnews.io/api/v4/search?q=technology&lang=en&apikey=da879d86c56bf9f0a41d50d5b5c31639';

export function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white">Technology News</h1>
        <p className="mt-4 text-white">Latest updates on technology around the world.</p>
      </div>

      {/* Loading / Error State */}
      {loading && (
        <div className="mt-8 text-center text-white">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="mt-8 text-center text-white">
          <p>No articles found.</p>
        </div>
      )}

      {/* Display articles */}
      {!loading && !error && articles.map((article, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <img
            src={article.image || 'https://via.placeholder.com/400x250'}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
            <p className="mt-2 text-gray-700">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-purple-500 hover:text-purple-700"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
