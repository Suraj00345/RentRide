// export const testimonials = [
//     {
//         id: 1,
//         name: 'Arjun Mehta',
//         location: 'Mumbai',
//         avatar: 'https://i.pravatar.cc/150?img=11',
//         rating: 5,
//         trip: 'Goa Weekend Trip',
//         text: 'Absolutely seamless experience. Booked a Honda CR-V for our Goa trip and the car was spotless. Pickup was on time and the staff was super helpful. Will definitely use RentRide again!',
//     },
//     {
//         id: 2,
//         name: 'Priya Sharma',
//         location: 'Bangalore',
//         avatar: 'https://i.pravatar.cc/150?img=5',
//         rating: 5,
//         trip: 'Corporate Travel',
//         text: 'Used RentRide for a week-long business trip. The BMW was in pristine condition and made every meeting feel premium. The app is clean and booking took under 2 minutes.',
//     },
//     {
//         id: 3,
//         name: 'Rohit Das',
//         location: 'Delhi',
//         avatar: 'https://i.pravatar.cc/150?img=15',
//         rating: 4,
//         trip: 'Family Road Trip',
//         text: 'Rented the Toyota Innova for a hill station drive with family. Spacious, comfortable, and fuel-efficient. Great value for money compared to other services I have tried.',
//     },
//     {
//         id: 4,
//         name: 'Sneha Iyer',
//         location: 'Chennai',
//         avatar: 'https://i.pravatar.cc/150?img=9',
//         rating: 5,
//         trip: 'Airport Transfer',
//         text: 'Quick, reliable, and affordable. I use RentRide every time I travel for work. The no-surprise pricing is what keeps me coming back. Highly recommend!',
//     },
//     {
//         id: 5,
//         name: 'Vikram Nair',
//         location: 'Pune',
//         avatar: 'https://i.pravatar.cc/150?img=18',
//         rating: 5,
//         trip: 'Weekend Getaway',
//         text: 'The entire experience was fantastic from start to finish. Returning the car was just as easy as picking it up. RentRide has completely changed how I think about car rentals.',
//     },
// ]

// export const StarRating = ({ rating }) => (
//     <div className='flex gap-0.5'>
//         {[1, 2, 3, 4, 5].map(s => (
//             <svg key={s} className={`w-4 h-4 ${s <= rating ? 'text-yellow-400' : 'text-gray-200'}`} fill='currentColor' viewBox='0 0 20 20'>
//                 <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
//             </svg>
//         ))}
//     </div>
// )