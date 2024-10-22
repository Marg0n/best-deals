import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaLocationArrow } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import useUserProfile from '../../hooks/useUserProfile';
import { Link } from 'react-router-dom';
import { IoArrowRedo } from "react-icons/io5";


const ChatBox = ({ setIsChatBoxOpen, vendorInfo }) => {
    const { user } = useAuth();
    const { profile } = useUserProfile();
    const axiosCommon = useAxiosCommon();
    console.log(profile[0].role);


    const { photo: vendorPhoto, name: vendorName, email: vendorEmail } = vendorInfo[0];

    const [messages, setMessages] = useState([{ text: "Hi, how can we assist you?", sender: 'vendor' }]);
    const [inputText, setInputText] = useState('');
    const [existingChatId, setExistingChatId] = useState(null); // to store existing chatId if chat exists

    // Fetch chat list
    const { data: chatList, isLoading, refetch } = useQuery({
        queryKey: ["chatlist"],
        queryFn: async () => {
            const res = await axiosCommon.get(`/inbox/${user?.email}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (chatList) {
            // Check if a chat with the vendor exists
            const existingChat = chatList.find(chat => chat.messageTo === vendorEmail);
            if (existingChat) {
                // If chat exists, set the chatId
                setExistingChatId(existingChat._id);
            }
        }
    }, [chatList, vendorEmail]);

    const handleSend = async () => {
        if (inputText !== '') {
            setMessages([...messages, { text: inputText, sender: 'user' }]);
            const messageData = {
                text: inputText,
                messageTo: vendorEmail,
                messageFrom: user?.email,
                sender: user?.displayName,
                receiver: vendorName,
                receiverPic: vendorPhoto,
                senderPic: user?.photoURL,
                chatId: existingChatId // Include chatId if it exists
            };

            try {
                const res = await axiosCommon.post('/inbox', messageData);
                console.log(res.data);
                refetch(); // Refetch chat list to include the new message
            } catch (error) {
                console.error('Failed to send message:', error);
            }

            setInputText('');
        }
    };

    const handleCloseChat = () => {
        setIsChatBoxOpen(false);
    };

    return (

        <div className="flex flex-col max-h-[500px] bg-white shadow-lg rounded-lg overflow-y-auto">
            {/* Chat Header */}
            <div className="bg-blue-500 text-white p-4 font-bold text-center flex justify-between">
                <div className="avatar items-center gap-4">
                    <div className="w-12 rounded-full">
                        <img src={vendorPhoto} alt="Vendor" />
                    </div>
                    <h1>{vendorName}</h1>
                </div>
                <button onClick={handleCloseChat}>
                    <RxCross2 />
                </button>
            </div>

            {/* Chat Body */}
            <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* Display user or vendor photo based on sender */}
                        {message.sender === 'vendor' ? (
                            <div className="flex items-start gap-2">
                                <img
                                    src={vendorPhoto}
                                    alt="Vendor"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs">
                                    {message.text}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-2">
                                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                                    {message.text}
                                </div>
                                <img
                                    src={user?.photoURL}
                                    alt="User"
                                    className="w-5 h-5 rounded-full"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat Footer */}
            <div className="flex items-center p-4 bg-gray-200 text-black">
                <input
                    type="text"
                    className="flex-grow p-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white p-2 ml-2 rounded-full hover:bg-blue-800 focus:outline-none"
                >
                    <FaLocationArrow />
                </button>
            </div>

            <div className='flex items-center justify-center '>
                <div>
                    <Link to='/userDashboard/inbox' className='dark:text-blue-500 text-blue-500 text-center py-2'>View All Message</Link>
                </div>
                <div>
                    <IoArrowRedo className='dark:text-blue-500 text-blue-500 ' />
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
