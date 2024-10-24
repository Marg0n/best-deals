import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper, Divider, Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from '@tanstack/react-query';
import useAuth from "../../hooks/useAuth";
import { FaLocationArrow } from 'react-icons/fa';


const Inbox = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([])

    const { user } = useAuth();


    const axiosCommon = useAxiosCommon();
    const { data: chatList, isLoading, refetch } = useQuery({
        queryKey: ["chatlist"],
        queryFn: async () => {
            const res = await axiosCommon.get(`/inbox/${user?.email}`, {
            });
            return res.data;
        },
    });

    // Effect to update selectedMessage when chatList changes
    useEffect(() => {
        if (chatList && selectedMessage) {
            const updatedChat = chatList.find(chat => chat._id === selectedMessage._id);
            if (updatedChat) {
                setSelectedMessage(updatedChat); // Update the selectedMessage with the latest data
            }
        }
    }, [chatList, selectedMessage]);


    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        console.log(selectedMessage);
        console.log(messages);
    };

    console.log(inputText);


    const handleSend = async () => {
        if (inputText !== '') {
            setMessages([...messages, { text: inputText, sender: 'Vendor' }]);
            const messageData = { text: inputText, chatId: selectedMessage?._id, messageFrom: user?.email, senderPic: user?.photoURL };

            try {
                const res = await axiosCommon.post('/inbox', messageData);
                console.log(res.data);
                refetch()
            } catch (error) {
                console.error('Failed to send message:', error);
            }
            setInputText('');
            refetch()

        }
    };

    console.log(selectedMessage);


    return (
        <div className='flex flex-col gap-4 lg:flex-row md:min-h-[90vh] p-8'>
            {/* Message List */}
            <div
                className='glass bg-red-300 p-10 lg:w-1/3 w-full lg:h-[90vh] min-h-[40vh] overflow-auto'
                style={{ marginRight: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Inbox
                </Typography>
                <List>
                    {chatList?.map((chat) => (
                        <ListItem
                            button
                            key={chat.id}
                            onClick={() => handleSelectMessage(chat)}
                            selected={selectedMessage?.id === chat.id}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {
                                        chat?.messageTo === user?.email ?
                                            <img src={chat?.senderPic} alt="" /> :
                                            <img src={chat?.receiverPic} alt="" />
                                    }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={chat?.messageTo === user?.email ? chat.sender : chat.receiver}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Message Details */}
            <div
                className="glass bg-red-300 lg:w-2/3 w-full p-10 min-h-[50vh] lg:h-[90vh] overflow-auto"
                style={{ display: 'flex', flexDirection: 'column' }}>
                {selectedMessage ? (
                    <div className='flex flex-col max-h-screen bg-white shadow-lg rounded-lg overflow-y-auto '>
                        <Typography variant="subtitle2" color="textSecondary">
                            <div className='flex items-end'>

                                {
                                    selectedMessage?.messageTo === user?.email ?
                                        <img src={selectedMessage?.senderPic} className='rounded-full w-16 h-16 ' alt="" srcset="" /> :
                                        <img src={selectedMessage?.receiverPic} className='rounded-full w-16 h-16 ' alt="" srcset="" />
                                }

                                {
                                    selectedMessage?.messageTo === user?.email ?
                                        <h1 className='font-bold'>{selectedMessage?.sender}</h1> :
                                        <h1 className='font-bold'>{selectedMessage?.receiver}</h1>
                                }
                            </div>


                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        {/* Chat Body */}
                        <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100">
                            {selectedMessage?.messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender === user?.email ? 'justify-end' : 'justify-start'}`}
                                >
                                    {/* Display user or vendor photo based on sender */}
                                    {message.sender === user?.email ? (
                                        <div className="flex items-start gap-2">
                                            <div className=" avatar items-center gap-1 ">
                                                <h1 className='bg-blue-500 text-white p-2 rounded-lg'>{message.text}</h1>
                                                <div className="w-8 rounded-full">
                                                    <img className='felx justify-end' src={user?.photoURL} alt="Vendor" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-2">
                                            <div className=" avatar items-center gap-1 ">
                                                <div className="w-8 rounded-full">
                                                    <img src={message.senderPic} alt="Vendor" />
                                                </div>
                                                <h1 className='bg-blue-500 text-white p-2 rounded-lg'>{message.text}</h1>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Chat Footer */}
                        <div className="flex items-center p-4 bg-gray-200 text-black">
                            <input
                                type="text"
                                className="flex-grow p-2 bg-white dark:bg-white  border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
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
                    </div>

                ) : (
                    <Typography variant="h6" color="textSecondary">
                        <span className='text-black'>
                            Select a message to view details
                        </span>
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default Inbox;