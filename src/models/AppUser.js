export default class AppUser {
    constructor(user) {
        this._user = user;
    }

    _user = null;
    _userData = null;

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
}
