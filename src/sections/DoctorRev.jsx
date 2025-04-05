import { useState } from 'react';

const hospitals = [
  'Apollo, Delhi',
  'Fortis, Mumbai',
  'AIIMS, Delhi',
  'Medanta, Gurugram',
  'Narayana, Bangalore',
  'CMC, Vellore',
  'Max, Noida',
  'Manipal, Manipal',
  'Sankara, Coimbatore',
  'Tata Memorial, Mumbai'
];

const doctors = Array.from({ length: 30 }).map((_, i) => {
  const reviews = [
    {
      name: ['Sakura', 'Naruto', 'Luffy'][i % 3],
      comment: 'Excellent treatment!',
      rating: 4 + (i % 2),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${i + 1}`
    },
    {
      name: ['Ichigo', 'Goku', 'Mikasa'][(i + 1) % 3],
      comment: 'Very professional and caring.',
      rating: 3 + (i % 3),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${i + 10}`
    },
    {
      name: ['Levi', 'Hinata', 'Inuyasha'][(i + 2) % 3],
      comment: 'Helped me recover quickly!',
      rating: 4 + ((i + 1) % 2),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${i + 20}`
    },
  ];

  return {
    id: i + 1,
    name: `Dr. ${['Ananya', 'Ravi', 'Kavita', 'Amit', 'Sneha', 'Rahul', 'Priya', 'Vikram', 'Neha', 'Suresh'][i % 10]}`,
    speciality: ['Heart Surgery', 'Neuro Surgery', 'Orthopedic Surgery', 'Eye Surgery'][i % 4],
    fee: (1000 + i * 50).toFixed(0),
    location: hospitals[i % hospitals.length],
    reviews,
    avgRating: (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1)
  };
});

const uniqueSurgeries = [...new Set(doctors.map((d) => d.speciality))];

export default function DoctorReviews() {
  const [expandedId, setExpandedId] = useState(null);
  const [surgeryFilter, setSurgeryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  const filtered = doctors
    .filter((doc) =>
      surgeryFilter === 'All' ? true : doc.speciality === surgeryFilter
    )
    .sort((a, b) =>
      sortOrder === 'desc'
        ? b.avgRating - a.avgRating
        : a.avgRating - b.avgRating
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-center mb-4">
        Doctor Reviews
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          value={surgeryFilter}
          onChange={(e) => setSurgeryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white"
        >
          <option value="All">All Surgeries</option>
          {uniqueSurgeries.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white"
        >
          <option value="desc">Rating: High to Low</option>
          <option value="asc">Rating: Low to High</option>
        </select>
      </div>

      {/* Doctor Cards */}
      {filtered.map((doc) => {
        const isOpen = expandedId === doc.id;
        return (
          <div
            key={doc.id}
            onClick={() => setExpandedId(isOpen ? null : doc.id)}
            className={`transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-md hover:shadow-2xl ${
              isOpen ? 'h-64 md:h-72' : 'h-28'
            } w-full flex items-center`}
          >
            {/* Left: Doctor DP */}
            <div className="min-w-[110px] h-full flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt={doc.name}
                className="w-20 h-20 rounded-full border border-gray-500 object-cover"
              />
            </div>

            {/* Middle: Doctor Info */}
            <div className="flex-1 px-6 py-4 text-white">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
              <p className="text-sm text-blue-400">🩺 {doc.speciality}</p>
              <p className="text-sm text-gray-300 mt-1">🏥 {doc.location}</p>
              <p className="text-sm text-green-400 mt-1">💰 ₹{doc.fee}</p>
              <p className="text-sm text-yellow-400 mt-1">⭐ {doc.avgRating} / 5</p>

              {isOpen && (
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                  {doc.reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 bg-gray-700 p-3 rounded-lg w-full md:w-1/3"
                    >
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full border border-gray-400"
                      />
                      <div>
                        <p className="font-semibold text-pink-400">{rev.name}</p>
                        <p className="text-sm text-gray-200">{rev.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}






