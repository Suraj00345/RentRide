import { useRef, useState } from 'react'
import heroPic from '../../assets/heroPic.jpg'
import { assets } from '../../assets/assets'

// TODO: Replace these temp states with useContext(AppContext) once you create context/AppContext.jsx
// const { setSearchFilter, setIsSearched } = useContext(AppContext)

const Hero = () => {

    const [searchFilter, setSearchFilter] = useState({ title: '', location: '', personRef: '', dropRef: '' })
    const [isSearched, setIsSearched] = useState(false)

    const titleRef = useRef(null)
    const locationRef = useRef(null)
    const personRef = useRef(null)
    const dropRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value,
            personRef: personRef.current.value,
            dropRef: dropRef.current.value
        })
        setIsSearched(true)
        console.log('Search triggered:', titleRef.current.value, locationRef.current.value)
    }

    return (
        <div className='container 2xl:px-20 mx-auto pt-24 my-10'>
            <div
                style={{ backgroundImage: `url(${heroPic})` }}
                className='bg-cover bg-center text-white min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center mx-2 rounded-xl relative'
            >
                {/* Dark overlay */}
                <div className='absolute inset-0 bg-black/40 rounded-xl' />

                {/* Content — w-full so it stretches and centers properly */}
                <div className='relative z-10 w-full flex flex-col items-center px-4'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Your Gateway to the Destinations</h2>
                    <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
                        Find your perfect ride —Over 10,000+ Cars to Rent. browse thousands of cars available near you and hit the road today!
                    </p>
                    <div className='flex flex-col md:flex-row gap-3 md:gap-0 items-stretch md:items-center bg-white rounded-xl text-gray-600 w-full max-w-4xl p-4'>
                        <div className='flex items-center flex-1 border-b md:border-b-0 md:border-r pr-2'>
                            <span className='text-gray-400 pl-2'>
                                <img className='h-4 sm:h-5' src={assets.search_icon} alt='' />
                            </span>
                            <input
                                type="text"
                                placeholder='Search for a car'
                                className='text-sm p-2 outline-none w-full'
                                ref={titleRef}
                            />
                        </div>
                        <div className='flex items-center flex-1 border-b md:border-b-0 md:border-r pr-2'>
                            <span className='text-gray-400 pl-2'>
                                <img className='h-4 sm:h-5' src={assets.location_icon} alt='' />
                            </span>
                            <input
                                type="text"
                                placeholder='Pick-up location'
                                className='text-sm p-2 outline-none w-full'
                                ref={locationRef}
                            />
                        </div>
                        <div className='flex items-center flex-1 border-b md:border-b-0 md:border-r pr-2'>
                            <span className='text-gray-400 pl-2'>
                                <img className='h-4 sm:h-5' src={assets.peoplePick_icon} alt='' />
                            </span>
                            <input
                                type="text"
                                placeholder='No. of persons'
                                className='text-sm p-2 outline-none w-full'
                                ref={personRef}
                            />
                        </div>
                        <div className='flex items-center flex-1 pr-2'>
                            <span className='text-gray-400 pl-2'>
                                 <img className='h-4 sm:h-5' src={assets.date_search} alt='' />
                            </span>
                            <input
                                type="text"
                                placeholder='Drop-off date'
                                className='text-sm p-2 outline-none w-full'
                                ref={dropRef}
                            />
                        </div>
                        <button onClick={onSearch} className='bg-lime-900 px-6 py-3 rounded-lg text-white w-full md:w-auto'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero