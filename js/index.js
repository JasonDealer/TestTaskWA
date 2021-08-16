const text = document.querySelector(".form__field"),
    addButton = document.querySelector(".addButton"),
    tagArea = document.querySelector(".tagArea");

//get tag name from input

let getTagName = function() {
    let inputValue = text.value;
    return inputValue;
}

//create new tag

function createTag() {
    if (getTagName() == 0) {
        alert("Write tag name");
    } else {
        tagArea.innerHTML += `
            <div class="tag">
                <div class="tagName">${getTagName()}</div>
                <div class="closeBtn">
                    <span class="close"></span>
                </div>
            </div>
        `;
        text.value = " ";
    }
}

//deleteTag

function deleteTag(e) {
    let closeBtns = document.querySelectorAll(".closeBtn");
    closeBtns.forEach(function(entry) {
        if(entry.contains(e.target)){
            tagArea.removeChild(entry.parentElement);
        }
    });
}

//btns

addButton.addEventListener("click", ()=> {
    createTag();
});

tagArea.addEventListener("click", (e)=> {
    deleteTag(e);
});
