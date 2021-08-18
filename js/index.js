const text = document.querySelector(".form__field"),
      addButton = document.querySelector(".addButton"),
      tagArea = document.querySelector(".tagArea"),
      modeSwitcher = document.querySelector("#cbx");

let tagNames = [];

//getters/setters
    
let tags = {
    tagNames: [],
    get tagList() {
        return this.tagNames.join();
    },
    set tagList(newTagList) { //Enter new tag list (Example: ["blue", "green", "yellow"])
        this.tagNames = newTagList;
        tagArea.innerHTML = ``;
        this.tagNames.forEach(element => {
            tagArea.innerHTML += `
                <div class="tag">
                    <div class="tagName">${element}</div>
                    <div class="closeBtn">
                        <span class="close"></span>
                    </div>
                </div>
            `;
        });
        localStorage.removeItem('tagList');
        addLocalStorage();
        return this.tagNames = newTagList;
    },
    set addOneTag(item) {
        let renderedTags = [];
        let tagList = document.querySelectorAll(".tagName");
        tagList.forEach(el => {
            renderedTags.push(el);
        });
        if (renderedTags.indexOf(item) === -1) {
            tagArea.innerHTML += `
                <div class="tag">
                    <div class="tagName">${item}</div>
                    <div class="closeBtn">
                        <span class="close"></span>
                    </div>
                </div>
            `;
            this.tagNames.push(item);
            localStorage.removeItem('tagList');
            addLocalStorage();
            return this.tagNames;
        }
    },
    set deleteOneTag(element) {
        this.tagNames = this.tagNames.filter(i => i !== element);
        tagArea.innerHTML = ``;
        this.tagNames.forEach(element => {
            tagArea.innerHTML += `
                <div class="tag">
                    <div class="tagName">${element}</div>
                    <div class="closeBtn">
                        <span class="close"></span>
                    </div>
                </div>
            `;
        });
        localStorage.removeItem('tagList');
        addLocalStorage();
        return this.tagNames;
    },
    set readonlyMode(condition) {
        if (condition === true) {
            toggleMode(condition);
            modeSwitcher.checked = true;
        } else if (condition === false) {
            toggleMode(condition);
            modeSwitcher.checked = false;
        }
    }
}

//localstorage

function addLocalStorage() {
    localStorage.setItem('tagList', tags.tagNames);
}

function refreshTagList() {
    let tagList = document.querySelectorAll(".tagName");
    tags.tagNames = [];
    tagList.forEach(item => {
        tags.tagNames.push(item.textContent);
    });
    localStorage.removeItem('tagList');
    addLocalStorage();
}

//render tag list

function renderTagList() {
    if (localStorage.getItem("tagList").length > 0){
        let tagsLS = localStorage.getItem("tagList").split(',');
        tags.tagNames = tagsLS
        tagsLS.forEach(element => {
            tagArea.innerHTML += `
                <div class="tag">
                    <div class="tagName">${element}</div>
                    <div class="closeBtn">
                        <span class="close"></span>
                    </div>
                </div>
            `;
        });
    }
}

renderTagList();

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
        text.value = "";
        refreshTagList();
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
    refreshTagList();
}

//readonly mode

function toggleMode(condition) {
    if (modeSwitcher.checked || condition === true) {
        text.disabled = true;
        addButton.disabled = true;
        addButton.classList.add("buttonDisabled");
        document.querySelectorAll(".closeBtn").forEach(element => {
            element.classList.add("disableClose");
        });
    } else if(modeSwitcher.checked != true || condition === false) {
        text.disabled = false;
        addButton.disabled = false;
        addButton.classList.remove("buttonDisabled");
        document.querySelectorAll(".closeBtn").forEach(element => {
            element.classList.remove("disableClose");
        });
    }
};

//btns

addButton.addEventListener("click", ()=> {
    createTag();
});

tagArea.addEventListener("click", (e)=> {
    deleteTag(e);
});

modeSwitcher.addEventListener("click", ()=> {
    toggleMode()
});