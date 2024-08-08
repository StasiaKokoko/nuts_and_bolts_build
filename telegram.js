// telegram.js

window.TelegramAPI = {
    getUserName: function() {
        console.log("hello from js");
        const tg = window.Telegram?.WebApp;
        const user = tg?.initDataUnsafe?.user;
        if (user) {
            return user.username || `${user.first_name} ${user.last_name}`;
        }
        return null;
    },

    closeApp: function() {
        window.Telegram?.WebApp.close();
    },

    showAlert: function(message) {
        window.Telegram?.WebApp.showAlert(message);
    }

    // Добавь любые другие методы, которые тебе нужны
};
