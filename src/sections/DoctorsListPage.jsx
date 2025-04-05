import { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorsListPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get('/doctors');
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
            <div className="max-w-4xl w-full text-center">
                <h1
                    className="text-4xl rainbow-text text-center mb-8 tracking-wide bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                >
                    Our Specialists
                </h1>

                {loading ? (
                    <p className="text-white text-lg">Loading doctors...</p>
                ) : doctors.length === 0 ? (
                    <p className="text-gray-400 text-lg mt-10">No doctors found.</p>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-center">
                        {doctors.map((doctor) => (
                            <div key={doctor.id}
                                className="relative group w-72 h-[450px] flex flex-col items-center 
                                border border-gray-700 p-5 rounded-2xl shadow-lg bg-gray-800 
                                backdrop-blur-md bg-opacity-40 hover:bg-opacity-70 transition 
                                duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                                    opacity-0 group-hover:opacity-20 transition duration-500 rounded-2xl">
                                </div>

                                {/* Doctor Image */}
                                <div className="h-80 w-full overflow-hidden rounded-xl">
                                    <img src={doctor.image || 'https://via.placeholder.com/150'}
                                        alt={doctor.name}
                                        className="h-full w-full object-cover transition duration-300 transform group-hover:scale-105"
                                    />
                                </div>

                                {/* Doctor Details */}
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

