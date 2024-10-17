import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";



const ChatBox = ({ setIsChatBoxOpen, vendorInfo , product }) => {
    const [messages, setMessages] = useState([
        { text: 'Hi, how can we assist you?', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const { photo, name } = vendorInfo[0];


    const handleSend = () => {
        if (inputText !== '') {
            setMessages([...messages, { text: inputText, sender: 'user' }]);
            setInputText('');
        }
    };

    const handelCloseChat = () => {
        setIsChatBoxOpen(false)
    }

    return (
        <div className="flex flex-col max-h-[500px]  bg-white shadow-lg rounded-lg overflow-y-auto">

            {/* chat Header */}
            <div className="bg-blue-500 text-white p-4 font-bold text-center flex justify-between">
                <div className="avatar items-center gap-4">
                    <div className="w-12 rounded-full">
                        <img src={photo} />
                    </div>
                    <h1>{name}</h1>
                </div>
                <button onClick={handelCloseChat}><RxCross2 /></button>
            </div>

            {/* Chat Body */}
            <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`${message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-black'
                                } p-3 rounded-lg max-w-xs`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* chat Footer */}
            <div className="flex items-center p-4 bg-gray-200 text-black">
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
                    {/* <CiLocationArrow1/> */}
                    <FaLocationArrow />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
