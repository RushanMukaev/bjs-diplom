// Выход из личного кабинета

const logoutButton = new LogoutButton;
logoutButton.action = () => {
    ApiConnector.logout(user => {
        if(user.success) {
            location.reload();
        }
    })   
}    

// Получение информации о пользователе

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard;

const stocks = () => {ApiConnector.getStocks((response) => {
 if(response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data)
 }
})}
stocks();
setInterval(stocks, 60000);



// Пополнение баланса

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(response.success, "Успешно")
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}

// конвентирование валюты

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, (response) => {
        console.log(response)
        if(response.success) {
            ProfileWidget.showProfile(response.data)
            moneyManager.setMessage(response.success, "Успешно")
        } else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}

// Перевод валюты

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

//
const favoritesWidget = new FavoritesWidget;

// запрос избранного

ApiConnector.getFavorites((response) => {
    if(response.success) {
       favoritesWidget.clearTable();
       favoritesWidget.fillTable(response.data);
       moneyManager.updateUsersList(response.data);
    }
   })

// Добавление пользователя в избранное

favoritesWidget.addUserCallback = user => {
    ApiConnector.addUserToFavorites(user, (response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен");
         } else {
            favoritesWidget.setMessage(response.success, response.error);
         }
    }))
}

// Удаление пользователя из избранного

favoritesWidget.removeUserCallback = user => {
    ApiConnector.removeUserFromFavorites(user, (response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален из избранного");
         }
    }))
}

