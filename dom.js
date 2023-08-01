/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById("advWalkBtn")
    element.addEventListener("click", function () {
        printTree();
    });

    element = document.getElementById("customBtn")
    element.addEventListener("click",  function () {
        addCustom();
    })

    element = document.getElementById("safeDeleteBtn")
    element.addEventListener("click", function() {
        safeDelete();
    })

    element = document.getElementById("selectorDeleteBtn")
    element.addEventListener("click", function () {
        selectorDelete();
    })

    element = document.getElementById("cloneBtn")
    element.addEventListener("click", function () {
        clone();
    })

    element = document.getElementById("advCloneBtn")
    element.addEventListener("click", function () {
        advClone();
    })
}

function advClone() {
    const out = document.getElementById("customOutput");
    const card = document.getElementById("card-template");
  
    const clone = card.content.cloneNode(true);
    const h2 = clone.querySelector("h2");
    const randomNumber = Math.floor(Math.random() * 100);
    h2.textContent += ` ${randomNumber}`;
  
    out.appendChild(clone);
}
  
  
function clone() {
    let p = document.getElementById("p1")
    let out = document.getElementById("customOutput")
    out.appendChild(p.cloneNode(true))
}

function selectorDelete() {

    let selectorInput = document.getElementById("selector");

    const selector = selectorInput.value;
    const elements = document.querySelectorAll(selector);

    for (const element of elements) {
      element.remove();
    }

}

function safeDelete() {
    
    let section = document.getElementById("controls")
    let inner = section.innerHTML

    const html = document.querySelector('html');
    const elements = html.querySelectorAll('*');


    for (let i = elements.length - 1; i >= 0; i--) {
         const currElement = elements[i];
        currElement.remove();
    }

    html.remove();

    document.appendChild(section)
    section.innerHTML = inner
}

function addCustom() {

    let select = document.getElementById("customType")
    let text = document.getElementById("customName").value

    let targetOutput = document.getElementById("customOutput")

    
    //add text node with custom text
    if (select.value == "text") {

        if(text == ""){
            text = "New Text Node"
        }
        let textNode = document.createTextNode(text +" "+ new Date().toLocaleString());
        targetOutput.appendChild(textNode);
    } 
    
    if (select.value == "comment") {

        if(text == ""){
            text = "New Comment"
        }

        let comment = document.createComment(text +" "+ new Date().toLocaleString());
        comment
        targetOutput.appendChild(comment)
    } 
    
    if (select.value == "element") {

        if(text == ""){
            text = "New Element"
        }

        let element = document.createElement("custom-element");
        element.textContent = text +" "+new Date().toLocaleString()
        targetOutput.appendChild(element);
    }
}

function walk() {
    let el;

    el = document.getElementById('p1');
    let textArea = document.getElementById("walkText")

    textArea.textContent = ""
    showNode(el);

    el = el.firstChild;
    showNode(el);

    el = el.nextSibling;
    showNode(el);

    el = el.lastChild;
    showNode(el);

    el = el.parentNode.parentNode.parentNode;
    showNode(el);

    el = el.querySelector('section > *');
    showNode(el);


}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    // alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);

    let textArea = document.getElementById("walkText")

    textArea.textContent += (
        "Node type: " + nodeType + "\n" +
        "Node name: " + nodeName + "\n" +
        "Node value " + nodeValue + "\n\n"
    )
}

function printTree() {

    let html = document.getElementsByTagName("html")[0];

    let textArea = document.getElementById("walkText");
    textArea.textContent = ("HTML");

    treeLoop(html, 1);
}

function treeLoop(node, level) {

    let textArea = document.getElementById("walkText");

    for (let i = 0; i < node.childNodes.length; i++) {
        let child = node.childNodes[i];
        let indent = Array(level).join(" ");

        if (child.nodeType === Node.ELEMENT_NODE) {
            textArea.textContent += `\n${indent + "  "}${child.nodeName}`;
        }

        if (child.hasChildNodes()) {
            treeLoop(child, level + 1);
        }
    }
}


function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() {
    let h1 = document.getElementsByTagName("h1")[0];
    let style = document.getElementsByTagName("style")[0];

    h1.textContent = "DOM Manipulation is Fun!";

    const darkColors = [
        getComputedStyle(style).getPropertyValue("--darkcolor1"),
        getComputedStyle(style).getPropertyValue("--darkcolor2"),
        getComputedStyle(style).getPropertyValue("--darkcolor3"),
        getComputedStyle(style).getPropertyValue("--darkcolor4"),
        getComputedStyle(style).getPropertyValue("--darkcolor5"),
        getComputedStyle(style).getPropertyValue("--darkcolor6"),
    ];

    h1.style.color = darkColors[Math.floor(Math.random() * 6)];

    let p = document.getElementById("p1");

    if (p.classList.contains("shmancy")) {
        p.classList.remove("shmancy");
    } else {
        p.className = "shmancy";
    }

}



function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);