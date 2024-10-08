import React from 'react'

export default function Profile() {
    return (
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full h-[60vh]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://res.cloudinary.com/dhrys2lqz/video/upload/v1726195353/vecteezy_aerial-view-of-pink-beach-in-komodo_30468522_kqrsuk.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-first-color">
              <div>
                <h1 className="self-center text-6xl playfair-display-bold">
                  InstaStay
                </h1>
                <span className="text-2xl text-white text-left w-full playfair-display-regular">
                  Tu estadía, al instante.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center p-8 md:flex-row md:justify-center md:space-x-10">
            <div className="flex-1 mt-8 md:mt-0 max-w-sm">
              <h2 className="text-2xl font-bold text-center">Inicio de sesión</h2>
               
            </div>

          </div>
        </div>
      );
    }