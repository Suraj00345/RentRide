import React from 'react'

const AuthContent = () => {
  return (
     <div className="hidden md:flex w-2/2 bg-[url('https://images.pexels.com/photos/2409592/pexels-photo-2409592.jpeg?_gl=1*ngvbnh*_ga*NjM1MjE5ODY4LjE3NzQ2MzI3MzY.*_ga_8JE65Q40S6*czE3NzQ2MzI3MzYkbzEkZzEkdDE3NzQ2MzI3NTYkajQwJGwwJGgw')]
     md:flex-shrink-0 md:h-screen md:w-[55%] bg-cover bg-center bg-no-repeat text-white flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-lime-900 via-lime-400 to-white bg-clip-text text-transparent">
            RentRide
            </span>
        </div>

        {/* Main copy */}
        <div className="mt-41">
          <h2 className="text-4xl font-bold leading-snug mb-4">
            Rent your next ride,<br />hassle-free.
          </h2>
          <p className="text-slate-100 text-base leading-relaxed max-w-sm">
            Choose from thousands of cars, book instantly, and hit the road —
            all with transparent pricing and 24/7 support.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["Easy booking", "No hidden fees", "Free cancellation"].map((f) => (
              <span
                key={f}
                className="text-xs bg-[#c8f53f] text-gray-900 px-3 py-1 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-slate-100 text-sm italic mb-3">
            "RentRide made renting a car so simple. Best experience I've had!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
              MJ
            </div>
            <div>
              <p className="text-sm font-medium">Michael J.</p>
              <p className="text-xs text-slate-500">Happy Customer</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AuthContent