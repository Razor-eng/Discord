import { DownloadIcon } from '@heroicons/react/outline'
import React from 'react'

function Login() {
    return (
        <div className='pb-8 md:pb-0 bg-discord_blue overflow-hidden'>
            <div className=' p-7 py-9 h-screen md:h-83vh relative md:flex'>
                <div className=' flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center'>
                    <h1 className=' text-5xl text-white font-bold flex justify-center'>IMAGINE A PLACE...</h1>
                    <h2 className=' text-white text-lg font-light tracking-wide lg:max-w-3xl w-full'>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h2>
                    <div className='flex flex-col xl:justify-center sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6'>
                        <button className=' bg-white w-full sm:w-60 font-medium flex items-center justify-center rounded-full p-4 sm:text-lg text-sm hover:shadow-2xl hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out'>
                            <DownloadIcon className=' w-6 mr-2' />
                            Download for Mac
                        </button>
                        <button className=' bg-gray-900 text-white w-full sm:w-72 font-medium flex items-center rounded-full justify-center right-full p-4 sm:text-lg text-sm hover:shadow-2xl hover:text-discord_blurple hover:bg-gray-800 focus:outline-none transition duration-200 ease-in-out'>Open Discord in your browser</button>
                    </div>
                </div>
                <div>
                    <img src="/bg2.png" alt="" className='absolute -left-36 mt-16 sm:-left-44 md:hidden' />
                    <img src="/bg3.png" alt="" className='absolute md:inline hidden' />
                </div>
            </div>
        </div >
    )
}

export default Login
