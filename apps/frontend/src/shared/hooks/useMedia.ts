import { useQuery } from '@tanstack/react-query';
import { getMedia } from '../services/api';

export function useMediaUrl(mediaId?: string) {
	const { data: media } = useQuery(
		['media', mediaId],
		async () => {
			if (!mediaId) {
				throw new Error('No media id provided');
			}

			return getMedia(mediaId);
		},
		{
			enabled: !!mediaId,
		},
	);

	return media?.url;
}
