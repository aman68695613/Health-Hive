
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

import io from "socket.io-client";
import axios from "axios";
import L from "leaflet";

const socket = io("http://localhost:3000");

const ambulanceIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const userIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

function RecenterMap({ latlng }) {
  const map = useMap();
  useEffect(() => {
    if (latlng) {
      map.setView(latlng, 14);
    }
  }, [latlng]);
  return null;
}

const AmbulanceBookingPage = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [ambulanceLocations, setAmbulanceLocations] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(loc);
      },
      (error) => {
        console.error("Error getting location:", error);
        const defaultLoc = { lat: 28.6139, lng: 77.209 };
        setUserLocation(defaultLoc);
      }
    );
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/ambulances").then((response) => {
      setAmbulances(response.data);
    });

    // 🔥 Listen for location updates only for booked ambulance
    socket.on("ambulanceLocationUpdate", (data) => {
      setAmbulanceLocations((prev) => ({ ...prev, [data.ambulanceId]: data })); // 🔥
    });

    return () => {
      socket.off("ambulanceLocationUpdate");
    };
  }, []);

  const bookAmbulance = async (ambulance) => {
    const userId = parseInt(localStorage.getItem("userId"), 10);
  
    setSelectedAmbulance(ambulance); // 🔥 Set selected ambulance
  
    try {
      const response = await axios.post("http://localhost:3000/api/book", {
        ambulanceId: ambulance.id,
        userId,
        userLocation, // ✅ send it to backend
      });
      
  
      console.log("Ambulance booked", response.data);
  
      // 🔥 Emit userLocation to trigger backend simulation
      socket.emit("userLocation", {
        ...userLocation,
        ambulanceId: ambulance.id, // 🔥 Pass ambulanceId to backend
      });
  
    } catch (error) {
      console.error("Error booking ambulance:", error);
      alert("Failed to book ambulance. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b2bdc9] via-[#4f6c91] to-[#9e9eca] p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg tracking-tight mb-10">
          Book Ambulance
        </h2>

        {userLocation && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-10 border border-white/50">
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <RecenterMap latlng={userLocation} />

              <Marker position={userLocation} icon={userIcon}>
                <Popup>You are here</Popup>
              </Marker>

              {/* 🔥 Show only selected ambulance with location update */}
              {selectedAmbulance &&
                ambulanceLocations[selectedAmbulance.id] && (
                  <Marker
                    position={[
                      ambulanceLocations[selectedAmbulance.id].lat,
                      ambulanceLocations[selectedAmbulance.id].lng,
                    ]}
                    icon={ambulanceIcon}
                  >
                    <Popup>
                      <strong>Driver:</strong> {selectedAmbulance.driverName}
                      <br />
                      <strong>Price:</strong> ₹{selectedAmbulance.price}
                    </Popup>
                  </Marker>
                )}
            </MapContainer>
          </div>
        )}

        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/40">
          <h3 className="text-2xl font-semibold text-[#1f2937] mb-4">
            Available Ambulances
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {ambulances.map((ambulance) => (
              <div
                key={ambulance.id}
                className="rounded-xl bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-6 shadow-lg border border-gray-200"
              >
                <p className="font-medium text-gray-800">
                  <strong>Driver:</strong> {ambulance.driverName}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Price:</strong> ₹{ambulance.price}
                </p>
                <button
                  className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
                  onClick={() => bookAmbulance(ambulance)} // 🔥 booking flow trigger
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceBookingPage;

