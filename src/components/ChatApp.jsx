import React, { useState } from 'react';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
const emojis = ["😊", "😎", "🎉", "❤️", "👍", "🤔", "👋", "😂", "🙌", "🔥"];

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showUserList, setShowUserList] = useState(false);
    const [showEmojiList, setShowEmojiList] = useState(false);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') {
            return;
        }

        const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
        const newMessage = {
            user: randomUser,
            message: inputValue,
            likes: 0
        };

        setMessages([...messages, newMessage]);
        setInputValue('');
        setShowUserList(false);
        setShowEmojiList(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.endsWith('@')) {
            setShowUserList(true);
        } else {
            setShowUserList(false);
        }
    };

    const handleUserSelect = (username) => {
        setInputValue(inputValue.replace(/@$/, `@${username} `));
        setShowUserList(false);
    };

    const handleEmojiClick = () => {
        setShowEmojiList(!showEmojiList);
    };

    const handleEmojiSelect = (emoji) => {
        setInputValue(inputValue + emoji);
        setShowEmojiList(false);
    };

    const handleLike = (index) => {
        const updatedMessages = [...messages];
        updatedMessages[index].likes += 1;
        setMessages(updatedMessages);
    };

    return (
        <div className='fixed bottom-6 w-full'>
            <div className='ml-16 mb-6 space-y-3'>
                {messages.map((message, index) => (
                    <div key={index}>
                        <h1><strong>{message.user}</strong></h1>
                        <div className='flex'>
                            <p className='bg-slate-300 px-4 py-2 rounded-2xl'>{message.message}</p>
                            <button className='ml-3 flex items-center space-x-2' onClick={() => handleLike(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>
                                <p>{message.likes}</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='ml-2 flex items-center w-full'>
                <input
                    className='p-4 block w-full rounded-full border-0 py-1.5 text-gray-500 shadow-sm ring-2 ring-inset ring-gray-400 focus:ring-2 focus:outline-none sm:text-sm sm:leading-6'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className='relative right-10' onClick={handleSendMessage}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg></button>
                <button className='relative right-20' onClick={handleEmojiClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                </svg></button>
                {showUserList && (
                    <div style={{ display: 'flex', flexDirection: 'column' }} className='absolute left-6 bottom-10 px-4 py-2 bg-slate-300 rounded-2xl'>
                        {user_list.map((user) => (
                            <button className='border-b border-slate-400 hover:bg-slate-400' key={user} onClick={() => handleUserSelect(user)}>
                                {user}
                            </button>
                        ))}
                    </div>
                )}
                {showEmojiList && (
                    <div className='grid grid-cols-3 gap-2 absolute right-6 bottom-10 px-4 py-2 bg-slate-300 rounded-2xl'>
                        {emojis.map((emoji) => (
                            <button
                                className='hover:bg-slate-400'
                                key={emoji}
                                onClick={() => handleEmojiSelect(emoji)}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
