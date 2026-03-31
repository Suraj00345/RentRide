import React from "react";
import Audi from "../../assets/Audi.png";
import Jeep from "../../assets/jeep.png";
import Marcedies from "../../assets/marcedies.png";
import Toyota from "../../assets/Toyota.png";
import BMW from "../../assets/BMW.png";
import Ford from "../../assets/ford.png";

const CarLogo = () => {
  return (
    <div className="bg-gray-200 mx-9 flex mt-10 justify-around items-center h-35 rounded-2xl">
      <img src={Toyota} alt="Toyota Logo" />
      <img src={Ford} alt="Ford Logo" />
      <img src={Marcedies} alt="Marcedies Logo" />
      <img src={Jeep} alt="Jeep Logo" />
      <img src={BMW} alt="BMW Logo" />
      <img src={Audi} alt="Audi Logo" />
    </div>
  );
};

export default CarLogo;
