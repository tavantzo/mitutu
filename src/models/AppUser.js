import { EventEmitter } from 'fbemitter';
import _ from 'lodash';
import RNFirebase from 'react-native-firebase';

export default class AppUser extends EventEmitter {
    constructor(user) {
        super();
        this._user = user;
        this.onUpdate((newData) => {
            console.log('User Updated', newData);
        });

        RNFirebase.app().database().ref(`/users/${user.uid}`)
            .on('value', snapshot => {
                this._userData = snapshot.val();
                this.emit('updated', this, snapshot.val());
            });

        RNFirebase.app().database().ref(`/plates/${user.uid}`)
            .on('value', (snapshot) => {
                const plates = snapshot.val();
                if (plates) {
                    this._plates = _.map(plates, (record, id) => {
                        return { id, ...record };
                    });
                }

                this.emit('updated', this, snapshot.val());
            });
    }

    _user = null;
    _userData = null;
    _plates = null;

    get phoneNumber() {
        return this._user && (this._user._user.phoneNumber || '');
    }

    get firstName() {
        return this._userData && this._userData.firstName
            ? this._userData.firstName : '';
    }

    get lastName() {
        return this._userData && this._userData.firstName
            ? this._userData.firstName : '';
    }

    get email() {
        return this._user.email || '';
    }

    get emailVerified() {
        return this._user.emailVerified;
    }

    get displayName() {
        return this._user.displayName || '';
    }

    get uid() {
        return this._user.uid;
    }

    get photoURL() {
        return this._user.photoURL || '';
    }

    get plates() {
        return this._plates || [];
    }

    addPlate(plateNumber) {
        return RNFirebase.app().database().ref(`/plates/${this.uid}`)
            .push({ plateNumber, validated: false })
            .catch(err => {
                console.log(err);
            });
    }

    onUpdate(handler) {
        this.addListener('updated', handler);
        return this;
    }
}
