import AboutBenefits from "./AboutBenefits";
import AboutStats from "./AboutStats";

const AboutHero = () => (
  <div className="bg-white py-25 px-6 text-center ">
    <h1 className="text-5xl font-black text-gray-900 mb-2">About Us</h1>
   <nav className="text-sm font-medium text-gray-400">
      <span className="hover:text-lime-600 cursor-pointer">Home</span> /{" "}
      <span className="text-gray-800">About Us</span>
    </nav>
    <div className="max-w-6xl mx-auto mt-20 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
      <h2 className="text-4xl font-black leading-tight text-gray-900">
        Where every drive feels extraordinary
      </h2>

      {/* Feature Column 1 */}
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Variety Brands</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Platea non auctor fermentum sollicitudin. Eget adipiscing augue sit
            quam natoque ornare cursus viverra odio.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Maximum Freedom</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Diam quam gravida ultricies velit duis consequat integer. Est
            aliquam posuere vel rhoncus massa volutpat in.
          </p>
        </div>
      </div>

      {/* Feature Column 2 */}
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Awesome Support</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Eget adipiscing augue sit quam natoque ornare cursus viverra odio.
            Diam quam gravida ultricies velit.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Flexibility On The Go</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Vitae pretium nulla sed quam id nisl semper. Vel non in proin
            egestas dis faucibus rhoncus.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutHero;
