import Reducer from 'focus-redux-reducer';


class MenuReducer extends Reducer {
    menuItemClicked(clickedItemKey) {
        return { clickedItemKey };
    }
}

export default new MenuReducer({
    clickedItemKey: null
});
