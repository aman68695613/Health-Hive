import { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorsListPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl rainbow-text mb-6 bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium">
                    Our Specialists
                </h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-center mb-8 text-white">
                    <div>
                        <label className="block text-sm mb-1">Filter by Speciality:</label>
                        <select
                            value={specialityFilter}
                            onChange={(e) => setSpecialityFilter(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded px-3 py-2"
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
                        <label className="block text-sm mb-1">Max Fee: ₹{priceFilter}</label>
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
                    <p className="text-white text-lg">Loading doctors...</p>
                ) : filteredDoctors.length === 0 ? (
                    <p className="text-gray-400 text-lg mt-10">No doctors found for selected filters.</p>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-center">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="relative group w-72 h-[450px] flex flex-col items-center 
                                border border-gray-700 p-5 rounded-2xl shadow-lg bg-gray-800 
                                backdrop-blur-md bg-opacity-40 hover:bg-opacity-70 transition 
                                duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                                    opacity-0 group-hover:opacity-20 transition duration-500 rounded-2xl" />

                                <div className="h-80 w-full overflow-hidden rounded-xl">
                                    <img
                                        src={doctor.image || 'https://via.placeholder.com/150'}
                                        alt={doctor.name}
                                        className="h-full w-full object-cover transition duration-300 transform group-hover:scale-105"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold mt-4 text-white font-[Poppins] text-center">
                                    {doctor.name}
                                </h3>
                                <p className="text-gray-300 text-sm mt-1 font-[Inter]">
                                    Speciality: <span className="text-blue-400 font-semibold">{doctor.speciality}</span>
                                </p>
                                <p className="text-gray-100 font-semibold mt-2 font-[Inter]">
                                    💰 Fee: <span className="text-green-400 font-bold">&#8377;{doctor.fee}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorsListPage;


