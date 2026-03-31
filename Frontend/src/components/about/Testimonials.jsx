const REVIEWS = [
  {
    id: 1,
    name: "Emanuel Boyle",
    company: "Kuphal LLC",
    text: "Et aliquet netus at sapien pellentesque mollis nec dignissim maecenas. Amet erat volutpat quisque odio purus feugiat.",
  },
  {
    id: 2,
    name: "River Graves",
    company: "Glover - Orn",
    text: "Purus consectetur varius quis urna phasellus enim mattis. Sem tincidunt tortor nunc egestas amet adipiscing ligula.",
  },
  {
    id: 3,
    name: "Ryder Malone",
    company: "Haag LLC",
    text: "Quam neque odio urna euismod felis. Sit egestas magna in quisque famesdapibus quis sapien magna.",
  },
];

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-sm border border-gray-100">
    <div className="p-8 flex-grow">
      <span className="text-6xl text-green-600 font-serif opacity-20 block h-10">
        “
      </span>
      <p className="text-gray-600 text-[13px] leading-relaxed italic mt-2">
        {review.text}
      </p>
    </div>

    <div className="bg-green-600 p-6 flex flex-col items-center relative pt-12">
      {/* Avatar positioned on the line */}
      <div className="absolute top-0 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-gray-200">
        <img
          src={`/avatar-${review.id}.jpg`}
          alt={review.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-[10px] text-green-100 uppercase tracking-tighter mb-1">
        {review.company}
      </p>
      <p className="text-white font-bold text-sm">{review.name}</p>
    </div>
  </div>
);

const Testimonials = () => (
  <section className="bg-gray-50 py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-black text-center text-gray-900 mb-16">
        Reviews from our customers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
