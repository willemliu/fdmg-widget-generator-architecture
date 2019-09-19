import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import { Fragment } from '../components/EpisodeFragment';

@AutoSubscribeStore
class PlaylistStore extends StoreBase {
    private _playlist: Fragment[] = [];

    setPlaylist(playlist: Fragment[]) {
        this._playlist = [...playlist];
        this.trigger();
    }

    @autoSubscribe
    getPlaylist() {
        return this._playlist;
    }
}

export default new PlaylistStore();
