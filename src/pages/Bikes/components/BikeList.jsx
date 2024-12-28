import React, { useState, useEffect } from 'react';
import { MapPin, Battery, Star } from 'lucide-react';

export function BikeList({ filters = {} }) {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const bikesPerPage = 10; // Limit the number of bikes per page

  useEffect(() => {
    async function fetchBikes() {
      try {
        const response = await fetch('http://api.citybik.es/v2/networks');
        const data = await response.json();
        const networks = data.networks.slice(0, 50); // Fetch only the first 50 networks
        const bikeData = networks.map((network) => ({
          id: network.id,
          name: network.name,
          location: network.location.city,
          distance: `${(Math.random() * 2).toFixed(1)} miles`,
          battery: Math.floor(Math.random() * 100),
          rating: (Math.random() * 5).toFixed(1),
          type: 'Regular'
        }));
        setBikes(bikeData);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBikes();
  }, []);

  // Calculate the bikes to display on the current page
  const indexOfLastBike = currentPage * bikesPerPage;
  const indexOfFirstBike = indexOfLastBike - bikesPerPage;
  const currentBikes = bikes.slice(indexOfFirstBike, indexOfLastBike);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {currentBikes.map((bike) => (
            <div key={bike.id} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{bike.name}</h3>
                  <p className="text-gray-600">{bike.location}</p>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{bike.rating}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{bike.distance}</span>
                    </div>
                    {bike.battery && (
                      <div className="flex items-center text-gray-600">
                        <Battery className="w-4 h-4 mr-1" />
                        <span>{bike.battery}%</span>
                      </div>
                    )}
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-teal-50 text-teal-700 rounded-xl">
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(Math.ceil(bikes.length / bikesPerPage)).keys()].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded-full ${currentPage === page + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
