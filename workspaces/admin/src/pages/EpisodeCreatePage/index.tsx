import { EpisodeDetailEditor } from '../../features/episodes/components/EpisodeDetailEditor';
import { episodeCreateRoute } from '../../routes';

export const EpisodeCreatePage: React.FC = () => {
  const { bookId } = episodeCreateRoute.useParams();

  return <EpisodeDetailEditor bookId={bookId} />;
};
