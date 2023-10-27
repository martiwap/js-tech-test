console.log("Update the code in script.js");

window.onload = function() {
    // uncomment the line below to see the overlay in gey
    setTimeout(() => { putOverlay() }, 1500); 
}

function putOverlay() {
    document.getElementById("greyDiv").style.width = "100%";
    document.getElementById("clickmelol").style.display = "flex";
}

//     const divBox = document.getElementById('selectionBox');
//     const selectionBox = divBox.getBoundingClientRect();
//     console.log(selectionBox); 
//     // {
//     //     "x": 0,
//     //     "y": 124,
//     //     "width": 1703,
//     //     "height": 0,
//     //     "top": 124,
//     //     "right": 1703,
//     //     "bottom": 124,
//     //     "left": 0
//     // }


let elementsInBoxDiv;

let draggingMouse = false;
let leftMouseDrag, topMouseDrag;
const startDrag = (e) => {
   if (e.type === 'mousedown') {
    draggingMouse = true;
    const mouseSelectDom = document.getElementById('selectionBox');
    const offset = mouseSelectDom.getBoundingClientRect();

    leftMouseDrag = e.pageX - offset.left;
    topMouseDrag = e.pageY - offset.top;

    mouseSelectDom.style.top = topMouseDrag + 'px';
    mouseSelectDom.style.left = leftMouseDrag + 'px';

    // observer every element in the meantime
    // const divs = document.querySelectorAll('div');
    // divs.forEach(el => {
    //     observer.observe(el);
    // });
   }
};
const stopDrag = () => {
    const mouseSelectDom = document.getElementById('selectionBox');
    const offset = mouseSelectDom.getBoundingClientRect();
    const centerX = offset.left + offset.width / 2;
    const centerY = offset.top + offset.height / 2;
    const diagonal = Math.sqrt(offset.width*offset.width + offset.height*offset.height);

    // elementsInBoxDiv = document.elementsFromPoint(centerX, centerY);
    // console.log('these are my elements', elementsInBoxDiv);
    elementsInBoxDiv = document.elementsFromPoint(centerX, offset.height / 2);
    elementsInBoxDiv.forEach(element => {
        PutBorderOnElement(element);
    });

    draggingMouse = false;
    leftMouseDrag = 0;
    topMouseDrag = 0;
    document.getElementById('selectionBox').removeAttribute('style');
};

const getDragSize = (e) => {
    const mouseSelectDom = document.getElementById('selectionBox');
   if (draggingMouse) {
    // const offsetDrag = mouseSelectDom.getBoundingClientRect();
    const top = e.pageY - topMouseDrag;
    const left = e.pageX - leftMouseDrag;

    const width = Math.abs(left);
    const height = Math.abs(top);

    if (top < 0) {
        mouseSelectDom.style.top = e.pageY + 'px';
    } else {
        mouseSelectDom.style.top = topMouseDrag + 'px';
    }

    if (left < 0) {
        mouseSelectDom.style.left = e.pageX + 'px';
    } else {
        mouseSelectDom.style.left = leftMouseDrag + 'px';
    }
    mouseSelectDom.style.width = width + 'px';
    mouseSelectDom.style.height = height + 'px';

    // observer every element in the meantime
    // const divs = document.querySelectorAll('div');
    // divs.forEach(el => {
    //     observer.observe(el);
    // });
   }
};

window.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', stopDrag);
window.addEventListener('mousemove', getDragSize);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        
        if (entry.isIntersecting) { // can I make it the IsIntersecting with a specif div? and not the root
            const centerX = entry.boundingClientRect.left + entry.boundingClientRect.width / 2;
            const centerY = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
            if (centerX <= boxWidth && centerY <= boxHeight) { // NOPE
                console.log(document.elementFromPoint(centerX, centerY));
                entry.target.style.border = 'blue 1px solid';
            }
        }
    })
    
});

function PutBorderOnElement(element) {

    // I need to exclude header, body, main and overlay
    if (!(element.parentNode === document.body) && !(element.parentNode ===  document.header)
        && !(element.parentNode ===  document.main)
        && !element.parentNode.classList.contains('overlay') &&
        !(element.parentNode.parentNode === document.body) && !(element.parentNode.parentNode ===  document.header))
    {
        element.parentNode.parentNode.style.border = 'red 1px solid';
        // this is a cheating Not to get the largest element, cause I couldn't work it out
        // but condiring the page each "main div/block" contains at least one child so
    }
   
}