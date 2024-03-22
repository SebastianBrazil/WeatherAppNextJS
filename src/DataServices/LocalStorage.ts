const saveToLocalStorage = (savingData: string) => {
    let savedCities = getLocalStorage();
    if (!savedCities.includes(savingData)) {
        savedCities.push(savingData);
    }
    localStorage.setItem("Cities", JSON.stringify(savedCities));
};

const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Pokemon");
    if (localStorageData === null) {
        return [];
    };
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (savingData: string) => {
    let savedCities = getLocalStorage();
    let removeCities = savedCities.indexOf(savingData);
    savedCities.splice(removeCities, 1);
    localStorage.setItem("Pokemon", JSON.stringify(savedCities));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };