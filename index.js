window.addEventListener('load', function () {
    changeSelected();
    loadNavigatorSelection();
    loadHrefs();
});

function changeSelected() {
    deselect(document.getElementById("before-loading"));
    select(document.getElementById("about_me"));
}

function loadNavigatorSelection() {
    let navigatorLis = document.getElementById("navigator").getElementsByTagName("td");
    let contentDivs = document.getElementById("content").children;
    contentDivs[0].style.opacity = "0";
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

    contentDivs[0].style.opacity = "1";
    selectContent(contentDivs[0], 0);
}

function loadHrefs() {
    document.getElementById("view_transcript").onclick = function() {
        window.open("files/Maxwell_Transcript.pdf");
    };
    
    document.getElementById("view_resume_2p").onclick = function() {
        window.open("files/Maxwell_Resume.pdf");
    }

    document.getElementById("view_resume_1p").onclick = function() {
        window.open("files/Maxwell_Resume_1p.pdf");
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
    let spanList, waitlist, ulList;
    switch(index) {
        case 0:
            // select me
            spanList = div.children[0].getElementsByTagName("span");
            waitlist = [[spanList[0], spanList[1], spanList[2]],
                            [spanList[3], spanList[4]],
                            [spanList[5]],
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
            spanList = div.getElementsByTagName("span");
            ulList = div.getElementsByTagName("ul");
            waitlist = [[spanList[0], spanList[1]],
                        [ulList[0]],
                        [spanList[4], spanList[5]],
                        [ulList[1]],
                        [spanList[17], spanList[18]],
                        [ulList[2]]];
            break;
        case 3:
            spanList = div.getElementsByTagName("span");
            waitlist = [[spanList[0]],
                        [spanList[1]],
                        [div.getElementsByTagName("ul")[0]],
                        [div.getElementsByTagName("img")[0]]];
            break;
        case 4:
            spanList = div.children;
            waitlist = [[spanList[0]],
                        [spanList[1]],
                        [spanList[2]],
                        [spanList[3]],
                        [spanList[4]]];
            break;
        case 5:
            spanList = div.children;
            waitlist = [[spanList[0]],
                        [spanList[1]]];
            break;
        case 6:
            spanList = div.getElementsByTagName("tr");
            waitlist = [[spanList[0]],
                        [spanList[1]],
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

    let timers = new Array(waitList.length);
    let timeOut = 0;

    for (let counter = 0; counter < waitList.length; counter ++) {

        setTimeout(function(){
            timers[counter] = setInterval(function() {
                let currentOpacity = parseFloat(getComputedStyle(waitList[counter][0]).getPropertyValue("opacity"));
                if (currentOpacity >= 1) {
                    clearInterval(timers[counter]);
                } else {
                    currentOpacity += 0.01;
                    waitList[counter].forEach(ele => {
                        ele.style.opacity = currentOpacity.toString();
                    });
                }
            })}, timeOut);
        timeOut += 800;
    }
}