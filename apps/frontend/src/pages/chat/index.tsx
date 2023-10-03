import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { FormItem, FormLabel } from '#/fe/shared/components/form';
import { Input } from '#/fe/shared/components/input';
import { Button } from '#/fe/shared/components/ui/button';
import { getChat, listChats } from '#/fe/shared/services/api';
import { Chat } from '#/fe/shared/services/api-types';
import { useJwtToken, useLoggedUser } from '#/fe/shared/state/logged-user';

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
					{chat.user1.id === loggedUser?.id
						? chat.user2.firstName
						: chat.user1.firstName}
				</Button>
			))}
		</div>
	);
}

function ChatBox({
	chatId,
	onSendMessage,
}: {
	chatId: string;
	onSendMessage: (message: string) => void;
}) {
	const loggedUser = useLoggedUser();
	const loggedJwt = useJwtToken();

	const { data: chat, isLoading } = useQuery(
		['chat', loggedJwt, chatId],
		async () => {
			if (loggedJwt) return getChat(loggedJwt, chatId);
		},
	);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col h-full">
			<div className="overflow-y-auto p-4">
				{chat?.messages.map((message) => (
					<div
						key={message.id}
						className={`p-2 ${
							message.sender.id === loggedUser?.id
								? 'text-right'
								: ''
						}`}
					>
						<div>{message.content}</div>
						<small>{message.createdAt.toString()}</small>
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

	const loggedJwt = useJwtToken();

	const [page, setPage] = useState(0);
	const [userSearch, setUserSearch] = useState('');

	const chatsQry = useQuery(['chats', loggedJwt, page, userSearch], () => {
		if (!loggedJwt) return;
		return listChats(loggedJwt, {
			page,
			limit: 10,
			targetUserSearch: userSearch,
		});
	});

	const chats = chatsQry.data ?? [];

	const sendMessageMtt = useMutation(async (message: string) => {
		return 'Ok';
	});

	return (
		<div className="flex h-screen">
			<div className="border-r w-1/4 h-full overflow-y-auto">
				<FormItem>
					<FormLabel>Usuário</FormLabel>
					<Input
						placeholder="Pesquisar usuário"
						value={userSearch}
						onChange={(e) => setUserSearch(e.target.value)}
					/>
				</FormItem>
				<ChatList chats={chats} onSelectChat={setSelectedChat} />
			</div>
			{selectedChat?.id && (
				<ChatBox
					chatId={selectedChat.id}
					onSendMessage={(message) => sendMessageMtt.mutate(message)}
				/>
			)}
		</div>
	);
}

export default ChatPage;
