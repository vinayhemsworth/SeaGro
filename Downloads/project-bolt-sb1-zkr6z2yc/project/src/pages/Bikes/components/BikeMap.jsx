import React from 'react';
import { MapPin } from 'lucide-react';

export function BikeMap() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Available Bikes Near You</h2>
        <p className="text-gray-600">Find and reserve bikes in your area</p>
      </div>
      <div className="aspect-[16/9] bg-gray-100 relative">
        {/* Map placeholder - In production, integrate with a real map service */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <p className="text-gray-600">Interactive map will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}