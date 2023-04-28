const boxes = document.querySelectorAll(".box");
const modal = document.querySelector(".modal-backdrop");
const modalCloseBtn = document.querySelectorAll('[data-dismiss="modal"]');

const colorInput = document.querySelector("#color");

let selectedBox = null;
let copiedBox = null;

boxes.forEach(box => {
    box.addEventListener("dblclick", (event) => {
        modal.classList.remove("hide-modal");
        selectedBox = event.target;
    });

    box.addEventListener("click", function(event) {
        if (!copiedBox) {
            copiedBox = event.target;
        }
        else {
            event.target.style.backgroundColor = copiedBox.style.backgroundColor;
            copiedBox = null;
        }
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