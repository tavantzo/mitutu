
export default {
    // Current logged user instance of AppUser model
    user: null,
    // The application Redux store instance
    store: null,

    config: {
        authManager: {
            google: {
                client_id: '325963210831-d9e51rne4a0qphbbqj3bb2gq9k03lb5n.apps.googleusercontent.com',
                project_id: 'authentication-c390c',
                auth_uri: 'https://accounts.google.com/o/oauth2/auth',
                token_uri: 'https://accounts.google.com/o/oauth2/token',
                auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
                client_secret: 'szaunCT23uSuhdjT49wRQWRj',
                redirect_uris: 'http://localhost/google'
            },
            facebook: {
                client_id: '127558087962862',
                client_secret: '93a41716b9eca2df7c7457dc33eb8682'
            }
        }
    }
};
