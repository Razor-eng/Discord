import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom';
import ServerIcon from './ServerIcon';
import { ChevronDownIcon, CogIcon, LogoutIcon, MicrophoneIcon, PhoneIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/outline';
import Channel from './Channel';
import Chat from './Chat';

function Home() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [channels] = useCollection(db.collection('channels'));

    const handleAdd = () => {
        const channelName = prompt('Enter the channel name');
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName,
            })
        }
    }
    return (
        <>
            {!user && navigate('/')}
            <div className='flex h-screen'>
                <div className='sm:flex flex-col space-y-3 bg-discord_sidebar p-3 min-w-max hidden'>
                    <div className='server-default hover:bg-discord_purple' >
                        <img src="/logo.png" alt="" className='h-5' />
                    </div>
                    <hr className=' border-gray-700 border w-8 mx-auto' />
                    <ServerIcon image={user.photoURL} />
                    <div className='server-default hover:rounded-full group hover:bg-discord_green'>
                        <PlusIcon className=' text-discord_green h-7 group-hover:text-white' />
                    </div>
                    <div className='server-default hover:rounded-full group hover:bg-discord_green' onClick={() => auth.signOut()}>
                        <LogoutIcon className=' text-discord_green h-7 group-hover:text-white -scale-x-100' />
                    </div>
                </div>
                <div className=' bg-discord_channelsBg flex flex-col min-w-max'>
                    <h2 className='flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer'>
                        {user.displayName}
                        <ChevronDownIcon className='h-5 ml-2 hidden sm:inline' />
                    </h2>
                    <div className=' text-discord_channel flex-grow overflow-y-scroll scrollbar-hide'>
                        <div className='flex items-center p-2 mb-2'>
                            <ChevronDownIcon className='h-3 mr-2' />
                            <h4 className=' font-semibold'>Channels</h4>
                            <PlusIcon className='h-6 ml-auto cursor-pointer hover:text-white hidden sm:inline' onClick={handleAdd} />
                        </div>
                        <div className='flex flex-col space-y-2 px-2 mb-4'>
                            {channels?.docs.map((doc) => (
                                <Channel key={doc.id} id={doc.id} channelName={doc.data().channelName} />
                            ))}
                        </div>
                        <hr className='w-full border-gray-700 border mx-auto sm:hidden' />
                        <PlusCircleIcon className='h-8 ml-auto mt-2 mr-auto cursor-pointer rounded-full hover:text-white sm:hidden' onClick={handleAdd} />
                    </div>
                    <div className=' bg-discord_userSectionBg p-2 flex justify-between items-center space-x-8'>
                        <div className=' flex items-center space-x-1'>
                            <img src={user?.photoURL} alt="" className='h-10 rounded-full' onClick={() => auth.signOut()} />
                            <h4 className=' text-white text-xs font-medium'>
                                {user?.displayName}
                                <span className=' text-discord_userId block'>#{user?.uid.substring(0, 6)}</span>
                            </h4>
                        </div>
                        <div className=' text-gray-400 sm:flex items-center hidden'>
                            <div className=' hover:bg-discord_iconHoverBg p-2 rounded-md'>
                                <MicrophoneIcon className='h-5 icon' />
                            </div>
                            <div className=' hover:bg-discord_iconHoverBg p-2 rounded-md'>
                                <PhoneIcon className='h-5 icon' />
                            </div>
                            <div className=' hover:bg-discord_iconHoverBg p-2 rounded-md'>
                                <CogIcon className='h-5 icon' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' bg-discord_chatBg flex-grow'>
                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Home
