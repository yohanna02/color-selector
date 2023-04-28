const boxes = document.querySelectorAll(".box");
const modal = document.querySelector(".modal-backdrop");
const modalCloseBtn = document.querySelectorAll('[data-dismiss="modal"]');

const colorInput = document.querySelector("#color");

let selectedBox = null;
let copiedBox = null;
let prevColor = null;

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (copiedBox) {
            copiedBox = null;
            boxes.forEach(box => {
                box.classList.remove("copied");
            });
        }
    }
})

boxes.forEach(box => {
    box.addEventListener("click", function(event) {
        if (event.ctrlKey) {
            modal.classList.remove("hide-modal");
            selectedBox = event.target;
            return;
        }
        
        if (!copiedBox) {
            console.log(selectedBox)
            copiedBox = event.target;
            boxes.forEach(box => {
                box.classList.add("copied");
            });
        }
        else {
            event.target.style.backgroundColor = copiedBox.style.backgroundColor;
        }
    });

    box.addEventListener("dragstart", function(event) {
        prevColor = window.getComputedStyle(this).backgroundColor;
        event.target.dataset.dragging = "true";
        event.target.classList.add("dragging");
    });
    box.addEventListener("dragleave", (event) => {
        event.target.classList.remove("dragging");
        event.target.dataset.dragging = "false";
    });

    box.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.target.classList.add("hover");
    });

    box.addEventListener("dragleave", (event) => {
        event.target.classList.remove("hover");
    });

    box.addEventListener("drop", (event) => {
        event.target.classList.remove("hover");
        event.target.style.backgroundColor = prevColor;
    });
});

modalCloseBtn.forEach(closeBtn => {
    closeBtn.addEventListener("click", (event) => {
        if (event.target.dataset.dismiss) {
            modal.classList.add("hide-modal");

            if (event.target.dataset.ok && selectedBox) {
                selectedBox.style.backgroundColor = colorInput.value;
            }
        }
    });
});