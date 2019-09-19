import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import { Fragment } from '../components/EpisodeFragment';
import { PodcastType } from '../components/PodcastList';

@AutoSubscribeStore
class PodcastStore extends StoreBase {
    private _podcast: PodcastType = null;

    setPodcast(podcast: PodcastType) {
        this._podcast = podcast;
        this.trigger();
    }

    @autoSubscribe
    getPodcast() {
        return this._podcast;
    }
}

export default new PodcastStore();
