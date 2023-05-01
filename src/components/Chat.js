import React, { useRef, useState } from 'react'
import { BellIcon, ChatIcon, EmojiHappyIcon, GiftIcon, HashtagIcon, InboxIcon, PlusCircleIcon, QuestionMarkCircleIcon, SearchIcon, UsersIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../features/channelSlice'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import Message from './Message'

function Chat() {
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [user] = useAuthState(auth);
    const [inputRef, setInputRef] = useState('')
    const chatRef = useRef(null);

    const [messages] = useCollection
        (
            channelId && db
                .collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
        );

    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputRef !== '') {
            db.collection('channels').doc(channelId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: inputRef,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
            });
        }
        setInputRef('');
        scrollToBottom();
    };
    return (
        <div className=' flex flex-col h-screen'>
            <header className=' flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1'>
                <div className=' flex items-center space-x-1'>
                    <HashtagIcon className='h-6 text-discord_chatHeaderIcon' />
                    <h4 className=' text-white font-semibold'>{channelName}</h4>
                </div>
                <div className='md:flex space-x-3 hidden'>
                    <BellIcon className='icon' />
                    <ChatIcon className='icon' />
                    <UsersIcon className='icon' />
                    <div className=' flex bg-discord_chatHeaderInputBg text-xs p-1 rounded-md'>
                        <input type="text" placeholder='Search' className=' bg-transparent focus:outline-none text-white pl-1 placeholder-discord_chatHeaderIcon' />
                        <SearchIcon className='h-4 text-discord_chatHeaderIcon mr-1' />
                    </div>
                    <InboxIcon className='icon' />
                    <QuestionMarkCircleIcon className='icon' />
                </div>
            </header>

            <main className='flex-grow overflow-y-scroll scrollbar-hide'>
                {messages?.docs.map((doc) => {
                    const { message, timestamp, name, photoURL, email } = doc.data();
                    return <Message key={doc.id} id={doc.id} message={message} timestamp={timestamp} name={name} photoURL={photoURL} email={email} />
                })}
                <div ref={chatRef} className='pb-16' />
            </main>

            <div className='flex items-center p-2.5 bg-discord_chatInputBg mx-5 mb-7 rounded-lg'>
                <PlusCircleIcon className='icon mr-4 hidden sm:inline' />
                <form className=' flex-grow'>
                    <input type="text" disabled={!channelId} placeholder={channelId ? `Message #${channelName}` : 'Select a channel'} className='bg-transparent focus:outline-none text-discord_iconHover w-full placeholder-discord_chatHeaderIcon text-sm' value={inputRef} onChange={(e) => setInputRef(e.target.value)} />
                    <button hidden type='submit' onClick={sendMessage}>Send</button>
                </form>
                <GiftIcon className='icon mr-2 hidden sm:inline' />
                <EmojiHappyIcon className='icon hidden sm:inline' />
            </div>
        </div>
    )
}

export default Chat
