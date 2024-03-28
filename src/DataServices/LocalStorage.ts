const saveToLocalStorage = (savingData: string) => {
    let savedCities = getLocalStorage();
    if (!savedCities.includes(savingData)) {
        savedCities.push(savingData);
    }
    localStorage.setItem("Cities", JSON.stringify(savedCities));
};

const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Cities");
    if (localStorageData === null) {
        return [];
    };
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (savingData: string) => {
    let savedCities = getLocalStorage();
    let removeCities = savedCities.indexOf(savingData);
    savedCities.splice(removeCities, 1);
    localStorage.setItem("Cities", JSON.stringify(savedCities));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };