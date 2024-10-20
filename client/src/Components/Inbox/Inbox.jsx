import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper, Divider, Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from '@tanstack/react-query';
import useAuth from "../../hooks/useAuth";


const messages = [
    {
        id: 1,
        sender: 'John Doe',
        subject: 'Meeting Reminder',
        content: 'Just a reminder for our meeting tomorrow at 10 AM.',
        time: '9:45 AM',
    },
    {
        id: 2,
        sender: 'Jane Smith',
        subject: 'Project Update',
        content: 'The project is on track, and we will meet the deadline.',
        time: '8:15 AM',
    },
    {
        id: 3,
        sender: 'Mark Johnson',
        subject: 'Vacation Request',
        content: 'I would like to take a vacation from Sept 25th to Sept 30th.',
        time: 'Yesterday',
    },
];




const Inbox = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const { user } = useAuth();

    const axiosCommon = useAxiosCommon();
    const { data: chatList, isLoading } = useQuery({
        queryKey: ["chatlist"],
        queryFn: async () => {
            const res = await axiosCommon.get(`/inbox/${user?.email}`, {
            });
            return res.data;
        },
    });

    console.log(chatList);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
    };

    return (
        <Box display="flex" p={2} bgcolor="#f5f5f5" height="100vh">
            {/* Message List */}
            <Paper elevation={3} sx={{ width: '30%', padding: '10px', marginRight: '20px', height: '90vh', overflowY: 'scroll' }}>
                <Typography variant="h6" gutterBottom>
                    Inbox
                </Typography>
                <List>
                    {chatList.map((chat) => (
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
            <Paper elevation={3} sx={{ width: '70%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                {selectedMessage ? (
                    <>
                        <Typography variant="subtitle2" color="textSecondary">
                            From: {selectedMessage.sender} 
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body1">{}</Typography>

                    </>
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
