import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import { Fragment } from '../components/EpisodeFragment';

@AutoSubscribeStore
class FragmentStore extends StoreBase {
    private _fragment: Fragment = null;

    setFragment(fragment: Fragment) {
        this._fragment = fragment;
        this.trigger();
    }

    @autoSubscribe
    getFragment() {
        return this._fragment;
    }
}

export default new FragmentStore();
