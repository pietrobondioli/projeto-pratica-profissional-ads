import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Input } from '#/fe/shared/components/ui/input';
import { Button } from '#/fe/shared/components/ui/button';
import { useLoggedUser } from '#/fe/shared/state/logged-user';

function ChatList({
	chats,
	onSelectChat,
}: {
	chats: Chat[];
	onSelectChat: (chat: Chat) => void;
}) {
	const loggedUser = useLoggedUser();

	return (
		<div className="border-r h-full overflow-y-auto">
			{chats.map((chat) => (
				<Button
					key={chat.id}
					onClick={() => onSelectChat(chat)}
					className="w-full text-left p-4"
				>
					Chat with:{' '}
					{chat.user1.email === loggedUser?.email
						? chat.user2.email
						: chat.user1.email}
				</Button>
			))}
		</div>
	);
}

function ChatBox({
	chat,
	onSendMessage,
}: {
	chat: Chat;
	onSendMessage: (message: string) => void;
}) {
	const loggedUser = useLoggedUser();

	return (
		<div className="flex flex-col h-full">
			<div className="overflow-y-auto p-4">
				{chat.messages.map((message) => (
					<div
						key={message.id}
						className={`p-2 ${
							message.sender.email === loggedUser?.email
								? 'text-right'
								: ''
						}`}
					>
						<div>{message.content}</div>
						<small>{message.timestamp.toLocaleTimeString()}</small>
					</div>
				))}
			</div>

			<div className="border-t p-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="flex">
						<Input
							name="message"
							placeholder="Type a message..."
							className="flex-grow mr-2"
						/>
						<Button type="submit">Send</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

function ChatPage() {
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

	const chatsQry = useQuery(['chats'], () => {
		return [];
	});

	const chats = chatsQry.data ?? [];

	const sendMessageMtt = useMutation(async (message: string) => {
		return 'Ok';
	});

	return (
		<div className="flex h-screen">
			<ChatList chats={chats} onSelectChat={setSelectedChat} />
			{selectedChat && (
				<ChatBox
					chat={selectedChat}
					onSendMessage={(message) => sendMessageMtt.mutate(message)}
				/>
			)}
		</div>
	);
}

export default ChatPage;
