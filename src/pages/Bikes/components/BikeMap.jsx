import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up default marker icons
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function BikeMap() {
  const [stations, setStations] = useState([]);

  const geoBounds = {
    latMin: 5, // Extending south for Sri Lanka
    latMax: 40, // Extending north for Nepal and Bhutan
    lonMin: 60, // Extending west for Pakistan
    lonMax: 100, // Extending east for Bangladesh
  };

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await fetch('https://api.citybik.es/v2/networks');
        const data = await response.json();

        // Filter stations based on geographical bounds
        const filteredStations = data.networks.filter((network) => {
          const { latitude, longitude } = network.location;
          return (
            latitude >= geoBounds.latMin &&
            latitude <= geoBounds.latMax &&
            longitude >= geoBounds.lonMin &&
            longitude <= geoBounds.lonMax
          );
        });

        setStations(filteredStations);
      } catch (error) {
        console.error('Error fetching bike stations:', error);
      }
    }

    fetchStations();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Bikes in India and Nearby Regions</h2>
        <p className="text-gray-600">Explore available bikes in your region.</p>
      </div>
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        className="w-full h-[500px] rounded-b-2xl"
        scrollWheelZoom
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.location.latitude, station.location.longitude]}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              Location: {station.location.city}, {station.location.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
