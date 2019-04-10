
// authentication service
const Auth = {
    authenticate(formData) {
        // create a form object we can pass to fetch
        let form = new FormData();
        form.set("username", formData.username);
        form.set("password", formData.password);

        // return a promise to the calling component
        return new Promise((resolve, reject) => {
            fetch('https://victoria.venasoft.com/api.php', { // call the authentication script to authenticate our username and password
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors',
                body: form,
            })
            .then(response => response.json()).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    },

    // set session information
    setSession(response) {
        localStorage.setItem('session', response.session);
        localStorage.setItem('authenticated', true);
    },

    // forget session information
    signout(callback) {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('session');
        callback();
    },

    // retrieve session information
    session() {
        return localStorage.getItem('session');
    },

    // return if the user is authenticated or not
    isAuthenticated() {
        if (localStorage.getItem('authenticated')) {
            return true;
        }

        return false;
    }
};

export default Auth;
