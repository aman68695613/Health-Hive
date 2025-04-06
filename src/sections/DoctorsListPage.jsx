import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function DoctorsListPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookedDoctors, setBookedDoctors] = useState({});
    const navigate = useNavigate()
    const handleBook = (id) => {
        setBookedDoctors((prev) => ({ ...prev, [id]: true }));

        Swal.fire({
            icon: 'success',
            title: 'Appointment Booked!',
            text: 'Your appointment has been successfully booked.',
            confirmButtonColor: '#6366f1', // Tailwind indigo-500
            background: '#f3f4f6', // Tailwind gray-100
            color: '#1f2937', // Tailwind gray-800
        });
    };



    const [specialityFilter, setSpecialityFilter] = useState('All');
    const [priceFilter, setPriceFilter] = useState(10000); // Max range

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get('/doctors');
                setDoctors(data);
                setFilteredDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        let filtered = doctors;

        if (specialityFilter !== 'All') {
            filtered = filtered.filter(doc => doc.speciality === specialityFilter);
        }

        filtered = filtered.filter(doc => doc.fee <= priceFilter);

        setFilteredDoctors(filtered);
    }, [specialityFilter, priceFilter, doctors]);

    const allSpecialities = [...new Set(doctors.map(doc => doc.speciality))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    🩺 Meet Our Doctors
                </h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Speciality:</label>
                        <select
                            value={specialityFilter}
                            onChange={(e) => setSpecialityFilter(e.target.value)}
                            className="bg-white/50 backdrop-blur-md border border-white/30 text-gray-800 px-4 py-2 rounded-xl shadow-sm focus:outline-none"
                        >
                            <option value="All">All</option>
                            {allSpecialities.map((spec, idx) => (
                                <option key={idx} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Fee: ₹{priceFilter}</label>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(parseInt(e.target.value))}
                            className="w-full md:w-64"
                        />
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg">
                            <Loader2 className="animate-spin text-indigo-600 w-6 h-6" />
                            <span className="text-gray-700 font-medium text-lg">Loading doctors...</span>
                        </div>
                    </div>
                ) : filteredDoctors.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No doctors found for selected filters.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white/40 backdrop-blur-md border border-white/30 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition hover:scale-[1.02]"
                            >
                                <img
                                    src={doctor.image || 'https://via.placeholder.com/300'}
                                    alt={doctor.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800 text-center bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-sm mt-2 text-center text-gray-700">
                                        Speciality: <span className="text-indigo-500 font-medium">{doctor.speciality}</span>
                                    </p>
                                    <p className="text-center text-green-600 mt-3 font-bold text-lg">₹{doctor.fee}</p>

                                    {!bookedDoctors[doctor.id] ? (
                                        <button
                                            onClick={() => handleBook(doctor.id)}
                                            className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
                                        >
                                            Book Now
                                        </button>
                                    ) : (
                                        // <button
                                        //     className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition"
                                        // >
                                        //     Chat
                                        // </button>
                                        <button
                                        onClick={() => {
                                            localStorage.setItem("doctorId", doctor.id);
                                            navigate(`/chat/${doctor.id}`);
                                          }}
                                          
                                            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition"
                                        >
                                            Chat
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorsListPage;



