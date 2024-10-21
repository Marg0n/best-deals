import React, { useState } from 'react';
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
    const { data: chatList, isLoading , refetch } = useQuery({
        queryKey: ["chatlist"],
        queryFn: async () => {
            const res = await axiosCommon.get(`/inbox/${user?.email}`, {
            });
            return res.data;
        },
    });

    const myChatList = chatList?.filter(item => item.messageTo === user?.email)
    const myReply = chatList?.filter(item => item.messageFrom === user?.email)

    console.log(chatList);
    console.log(myChatList);
    console.log(myReply);



    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        console.log(selectedMessage);
    };

    const handleSend = async () => {
        if (inputText !== '') {
            setMessages([...messages, { text: inputText, sender: 'vendor' }]);
            const messageData = { text: inputText, messageTo: selectedMessage?.messageFrom, messageFrom: selectedMessage?.messageTo, sender: selectedMessage?.receiver, receiver: selectedMessage?.sender };

            try {
                const res = await axiosCommon.post('/inbox', messageData);
                console.log(res.data);
                refetch()
            } catch (error) {
                console.error('Failed to send message:', error);
            }

            setInputText('');
        }
    };

    return (
        <Box display="flex" p={2} bgcolor="#f5f5f5" height="100vh">
            {/* Message List */}
            <Paper elevation={3} sx={{ width: '30%', padding: '10px', marginRight: '20px', height: '90vh', overflowY: 'scroll' }}>
                <Typography variant="h6" gutterBottom>
                    Inbox
                </Typography>
                <List>
                    {myChatList?.map((chat) => (
                        <ListItem
                            button
                            key={chat.id}
                            onClick={() => handleSelectMessage(chat)}
                            selected={selectedMessage?.id === chat.id}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <MessageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={chat.sender}
                            // secondary={`${chat.subject} - ${message.time}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Message Details */}
            <Paper  elevation={3} sx={{ width: '70%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                {selectedMessage ? (
                 <div className='flex flex-col'>
                 <Typography variant="subtitle2" color="textSecondary">
                     From: {selectedMessage.messageFrom}
                 </Typography>
                 <Divider sx={{ marginY: 2 }} />
                 
                 {/* Display selected message */}
                 <Typography variant="body1">
                     {selectedMessage.messages.map((msg, idx) => (
                         <div key={idx} className="bg-gray-300 text-black p-3 mt-2 rounded-lg w-fit">
                             {msg.text}
                         </div>
                     ))}
                 </Typography>
             
                 {/* Display replies */}
                 <Typography variant="body1">
                     {myReply
                         ?.filter(reply => reply.messageTo === selectedMessage.messageFrom)
                         .map((reply, idx) =>
                             reply?.messages?.map((message, messageIdx) => (
                                 <div key={messageIdx} className="flex justify-end w-full">
                                     <div className="bg-blue-200 text-black p-3 mt-2 rounded-lg w-fit">
                                         {message?.text}
                                     </div>
                                 </div>
                             ))
                         )
                     }
                 </Typography>
             
                 {/* Input box for sending new messages */}
                 <div className="flex items-center p-4 mt-5 bg-gray-200 text-black">
                     <input
                         type="text"
                         className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
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
                        Select a message to view details
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default Inbox;