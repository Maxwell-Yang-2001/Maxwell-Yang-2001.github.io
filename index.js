// window.onload = function () {
//     loadNavigatorSelection();
//     loadHrefs();
// };

window.addEventListener('load', function () {
    loadNavigatorSelection();
    loadHrefs();
});

function loadNavigatorSelection() {
    let navigatorLis = document.getElementById("navigator").getElementsByTagName("td");
    let contentDivs = document.getElementById("content").children;
    let counter;

    for (counter = 0; counter < navigatorLis.length; counter ++) {

        navigatorLis[counter].onclick = function () {
            let counter = findIndex(navigatorLis, this);
            let innerCounter;

            contentDivs[counter].scrollIntoView({behavior: "smooth"});


            for (innerCounter = 0; innerCounter < navigatorLis.length; innerCounter ++) {
                if (innerCounter === counter) {
                    select(navigatorLis[innerCounter]);
                    select(contentDivs[innerCounter]);
                    selectContent(contentDivs[innerCounter], innerCounter);
                    contentDivs[counter].scrollIntoView({behavior: "smooth"});
                } else {
                    deselect(navigatorLis[innerCounter]);
                    deselect(contentDivs[innerCounter]);
                }
            }
        };
    }

    selectContent(contentDivs[0], 0);
}

function loadHrefs() {
    let temp = document.getElementById("view_transcript");
    temp.onclick = function() {
        window.open("files/Maxwell_Transcript.pdf");
    };
    temp = document.getElementById("view_resume");
    temp.onclick = function() {
        window.open("files/Maxwell_Resume.pdf");
    }
}

// Find the index of the specific element in the collection; return -1 if not found
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

// this is for div slideshow
function selectContent(div, index) {
    let temp, waitlist;
    switch(index) {
        case 0:
            // select me
            temp = div.children[0].getElementsByTagName("span");
            waitlist = [[temp[0], temp[1], temp[2]],
                            [temp[3]],
                            [temp[4]],
                            [div.children[0].getElementsByTagName("ul")[0]],
                            [div.children[1]]];
            break;
        case 1:
            waitlist = [[div.children[0]],
                        [div.getElementsByTagName("table")[0]],
                        [document.getElementById("view_transcript")]
            ];
            break;
        case 2:
            temp = div.getElementsByTagName("span");
            waitlist = [[temp[0]],
                        [temp[1]],
                        [div.getElementsByTagName("ul")[0]]];

            break;
        case 3:
            temp = div.getElementsByTagName("span");
            waitlist = [[temp[0]],
                        [temp[1]],
                        [div.getElementsByTagName("ul")[0]],
                        [div.getElementsByTagName("img")[0]]];
            break;
        case 4:
            temp = div.children;
            waitlist = [[temp[0]],
                        [temp[1]],
                        [temp[2]]];
            break;
        case 5:
            temp = div.children;
            waitlist = [[temp[0]],
                        [temp[1]]];
            break;
        case 6:
            temp = div.getElementsByTagName("tr");
            waitlist = [[temp[0]],
                        [temp[1]],
                        [div.children[1]]];
            break;
    }

    waitlist.forEach(sublist => {
        sublist.forEach(ele => {
            ele.style.opacity = "0";
        });
    });
    increaseOpacityForList(waitlist);
}

function increaseOpacityForList(waitList) {

    let timer;
    let timeOut = 0;

    waitList.forEach(sublist => {

        setTimeout(function(){
            timer = setInterval(function(){
                let currentOpacity = parseFloat(getComputedStyle(sublist[0]).getPropertyValue("opacity"));
                if (currentOpacity >= 1) {
                    clearInterval(timer);
                } else {
                    currentOpacity += 0.01;

                    sublist.forEach(ele => {
                        ele.style.opacity = currentOpacity.toString();
                    });
                }
            });
        }, timeOut);
        timeOut += 800;
    });
}