import moment from 'moment/moment'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { TrashIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../features/channelSlice';

function Message({ id, message, timestamp, name, photoURL, email }) {
    const [user] = useAuthState(auth);
    const channelId = useSelector(selectChannelId);

    return (
        <div className='flex items-center sm:p-1 sm:pl-5 my-5 sm:mr-2 hover:bg-discord_messageBg group'>
            <img src={photoURL} alt="" className='h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl' />
            <div className='flex flex-col'>
                <h4 className='flex items-center space-x-2 font-medium sm:flex-row flex-col'>
                    <span className=' hover:underline text-white text-sm cursor-pointer'>{name}</span>
                    <span className=' text-discord_messageTime text-xs'>
                        {moment(timestamp?.toDate().getTime()).format('lll')}
                    </span>
                </h4>
                <p className='text-sm text-discord_message ml-3 sm:ml-0'>{message}</p>
            </div>
            {user?.email === email && (
                <div className='hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer'
                    onClick=
                    {() =>
                        db
                            .collection('channels')
                            .doc(channelId)
                            .collection('messages')
                            .doc(id)
                            .delete()
                    }>
                    <TrashIcon className='h-5 hidden group-hover:inline' />
                </div>
            )}
        </div>
    )
}

export default Message
