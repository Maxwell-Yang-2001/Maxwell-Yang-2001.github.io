window.onload = function () {
    loadNavigatorSelection();
};

function loadNavigatorSelection() {
    let navigatorLis = document.getElementById("navigator").getElementsByTagName("li");
    let contentDivs = document.getElementById("content").children;
    let counter;

    for (counter = 0; counter < navigatorLis.length; counter ++) {

        navigatorLis[counter].onclick = function () {
            let counter = findIndex(navigatorLis, this);
            let innerCounter;
            for (innerCounter = 0; innerCounter < navigatorLis.length; innerCounter ++) {
                if (innerCounter === counter) {
                    select(navigatorLis[innerCounter]);
                    select(contentDivs[innerCounter]);
                } else {
                    deselect(navigatorLis[innerCounter]);
                    deselect(contentDivs[innerCounter]);
                }
            }
        };
    }
}

function findIndex(htmlCollection, element) {
    let counter;
    for (counter = 0; counter < htmlCollection.length; counter ++) {
        if (element === htmlCollection[counter]) {
            return counter;
        }
    }
    return -1;
}

function select(element) {
    element.classList.add("selected");
}

function deselect(element) {
    element.classList.remove("selected");
}