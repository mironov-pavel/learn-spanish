import {store} from "../index"
async function callNextQuestion () {
    await store.dispatch({type: "RESET_QUESTION_COMPONENT"});
    await store.dispatch({type: "SET_QUESTION_COMPONENT_WITH_FILTER_ID"});
}

function replaceAllLettersToEnglish (string) {
    let newString = string;
    newString = newString.replace(/á/gi, "a");
    newString = newString.replace(/é/gi, "e");
    newString = newString.replace(/í/gi, "i");
    newString = newString.replace(/ó/gi, "o");
    newString = newString.replace(/ú/gi, "u");
    newString = newString.replace(/ñ/gi, "n");
    newString = newString.replace(/ü/gi, "u");
    return newString;
}

function resetMarkNodeStyle (node) {
    node.style.display = `none`;
    node.style.opacity = `1.0`;
    // node.classList.remove("input_answers_mark_text_green");
    node.style.animation = 'none';
    node.scrollBy(); /* trigger reflow */
}

function updateDatabasePoints (points) {
    if(store.getState().loginStatus) {
        fetch(`${store.getState().serverURL}setpoints`, {
            method: "POST",
            body: JSON.stringify({points, token: window.localStorage.getItem(`token`)})
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                store.dispatch({type: "SET_USER_POINTS", points: data.points});
            })
    }
};

export {
    callNextQuestion,
    replaceAllLettersToEnglish,
    resetMarkNodeStyle,
    updateDatabasePoints
}
