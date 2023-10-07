import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Container } from '#/fe/shared/components/container';
import { FormItem, FormLabel } from '#/fe/shared/components/form';
import { Input } from '#/fe/shared/components/input';
import { Button } from '#/fe/shared/components/ui/button';
import { getChat, listChats, sendMessage } from '#/fe/shared/services/api';
import { Chat } from '#/fe/shared/services/api-types';
import { useLoggedUser } from '#/fe/shared/state/logged-user';
import { toast } from 'react-toastify';

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
				<div
					key={chat.id}
					onClick={() => onSelectChat(chat)}
					className="w-full text-left p-4 hover:bg-gray-200 cursor-pointer border-b"
				>
					Chat with:{' '}
					{chat.user1.id === loggedUser?.id
						? `${chat.user2.userProfile.firstName} ${chat.user2.userProfile.lastName}`
						: `${chat.user1.userProfile.firstName} ${chat.user1.userProfile.lastName}`}
				</div>
			))}
		</div>
	);
}

function ChatBox({ chatId }: { chatId: string }) {
	const loggedUser = useLoggedUser();

	const chatQry = useQuery(['chat', chatId], async () => {
		return getChat(chatId);
	});

	const messages = chatQry.data?.messages ?? [];

	const [message, setMessage] = useState('');

	const sendMessageMtt = useMutation(
		async (message: string) => {
			if (!chatId) return;

			return await sendMessage(chatId, {
				message,
			});
		},
		{
			onSettled: () => {
				chatQry.refetch();
			},
			onSuccess: () => {
				toast.success('Message sent!');
			},
			onError: (err: any) => {
				chatQry.refetch();
			},
		},
	);

	if (chatQry.isLoading) return <div>Loading...</div>;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			sendMessageMtt.mutate(message);
		}
	};

	return (
		<div className="flex flex-col h-full w-full">
			<div className="overflow-y-auto p-4 flex-grow flex gap-4 flex-col">
				{[...messages].reverse().map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.sender.id === loggedUser?.id
								? 'justify-end'
								: ''
						}`}
					>
						<div
							className={`rounded-lg p-2 max-w-xs break-words ${
								message.sender.id === loggedUser?.id
									? 'bg-blue-700 text-white'
									: 'bg-gray-200'
							}`}
						>
							<div className="flex justify-between items-center mb-2 gap-2">
								<div className="font-bold">
									{message.sender.id === loggedUser?.id
										? 'You'
										: message.sender.userProfile.firstName}
								</div>
								<div className="text-sm text-gray-500">
									{new Date(
										message.createdAt,
									).toLocaleString()}
								</div>
							</div>
							{message.content}
						</div>
					</div>
				))}
			</div>

			<div className="border-t p-4">
				<div className="flex">
					<Input
						name="message"
						placeholder="Type a message..."
						className="flex-grow mr-2"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Button onClick={() => sendMessageMtt.mutate(message)}>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}

function ChatPage() {
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

	const [page, setPage] = useState(1);
	const [userSearch, setUserSearch] = useState('');

	const { data: chats } = useQuery(['chats', page, userSearch], () => {
		return listChats({
			page,
			limit: 50,
			targetUserSearch: userSearch,
		});
	});

	return (
		<Container className="max-h-screen flex">
			<div className="flex flex-col w-1/3 p-4 gap-4 lg:w-1/4">
				<FormItem>
					<FormLabel>Usuário</FormLabel>
					<Input
						placeholder="Pesquisar usuário"
						value={userSearch}
						onChange={(e) => setUserSearch(e.target.value)}
					/>
				</FormItem>
				<ChatList
					chats={chats?.items ?? []}
					onSelectChat={setSelectedChat}
				/>
			</div>
			<div className="flex-grow max-h-screen">
				{selectedChat?.id && <ChatBox chatId={selectedChat.id} />}
			</div>
		</Container>
	);
}

export default ChatPage;
