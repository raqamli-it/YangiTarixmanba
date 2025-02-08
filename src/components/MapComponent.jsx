import { useEffect, useState } from 'react';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { Link } from 'react-router-dom';
import { endpoints } from '../config/endpoints';
import { DataService } from '../config/dataService';

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await DataService.get(endpoints.categoryResourceApi);
      setCategories(response);
    } catch (error) {
      setError('Error fetching categories');
      console.error('Error fetching categories:', error);
    }
  };

  const fetchLocations = async (categoryId) => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const response = await DataService.get(
        endpoints.locationApiById(categoryId),
      );
      setLocations(response);
      setLoading(false);
    } catch (error) {
      setError('Error fetching locations');
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      fetchLocations(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold text-white">Interaktiv Xarita</h1>
      </div>
      <div className="p-4 flex justify-center">
        <div className="flex w-2/3 h-full flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`px-2 md:px-2 lg:px-2 py-1 md:py-0 lg:py-1 rounded-full border text-sm md:text-sm lg:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                selectedCategoryId === category.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-4/6 h-5/6 rounded-lg shadow-lg overflow-hidden relative">
          {loading && <div className="text-white">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <Map defaultCenter={[41.2995, 69.2401]} defaultZoom={6}>
            <ZoomControl />
            {locations.map((location, index) => (
              <Marker
                key={index}
                width={30}
                anchor={[
                  parseFloat(location.latitude),
                  parseFloat(location.longitude),
                ]}
                onClick={() => setSelectedLocation(location)}
              />
            ))}
            {selectedLocation && (
              <Overlay
                anchor={[
                  parseFloat(selectedLocation.latitude),
                  parseFloat(selectedLocation.longitude),
                ]}
              >
                <div className="bg-blue-300 p-2 shadow-lg w-36 rounded-lg flex justify-center">
                  <Link
                    className="text-amber-500 text-xs"
                    to={`/cardDetail/${selectedLocation.resource_id}`}
                  >
                    {selectedLocation.resource_title}
                  </Link>
                </div>
              </Overlay>
            )}
          </Map>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
