//1
function createElemWithText (param1, param2, param3) {
    let header = param1;
    let para = param2;
    let button = param3;
    if (header === undefined){
        docheader = document.createElement("p");
    }else{
        docheader = document.createElement(header);
    }
    if (para === undefined){
        docpara = document.createTextNode("");
    }else{
        docpara = document.createTextNode(para);
    }
    docheader.appendChild(docpara);
    if (button != undefined){
        docheader.classList.add(button);
    }
    const headerdoc = docheader;
    return headerdoc;

};
//passed---------------
//2
function createSelectOptions (userJSON){
    if (!userJSON) return;
    const selectbox = []
        userJSON.forEach(user => {
        let newoption = document.createElement("option");
        newoption.value = user.id;
        newoption.textContent = user.username; //-----not working??
        selectbox.push(newoption);
        });
    return selectbox;
};
//3 ---- passed
function toggleCommentSection (postID){
    if(postID != undefined){
    let post = document.querySelector(`[data-post-id='${postID}']`);
    if(post != undefined){
        post.classList.toggle("hide");
    }
    return post;
}
};
//4
function toggleCommentButton (postID){
 if(postID != undefined){   
    const combutton = document.querySelector("[post-data-id=\"" + postID + "\"]");
     if (combutton != undefined){
            if(combutton.innerHTML === "Show Comments"){
                combutton.innerHTML = "Hide Comments"
            }else if(combutton.innerHTML === "Hide Comments"){
                combutton.innerHTML = "Show Comments"
            }
    }
    console.log(combutton);
    return combutton;  
 }
};
//5
function deleteChildElements (parentElement){
    const htmlregex = new RegExp("/<\/?[a-z][\s\S]*>/")
    if(htmlregex.test(parentElement) === true){
    let lastchild = parentElement.firstChild;
    // while(lastchild){
    //     parentElement.removeChild(lastchild);
    // }
    parentElement.innerHTML = '';
    return parentElement;
}
};
//6
function addButtonListeners (){
    const allbuttons = document.querySelectorAll("main button");
    if(allbuttons != undefined){
        allbuttons.forEach(but => {
            const postID = but.dataset.data-post-id;
            but.addEventListener("click", function (e) {toggleCommentButton(e, postID)}, false);
        });
};
};

//7
function removeButtonListeners (){
    const allbuttons = document.querySelectorAll("main button");
    if(allbuttons != undefined){
        allbuttons.forEach(but => {
            const postID = but.dataset.data-post-id;
            but.removeEventListener("click", function (e) {toggleCommentButton(e, postID)}, false);
        });
};
};
//8
function createComments (commentsJSON){
    if(!commentsJSON) return;

    const frag = document.createDocumentFragment();
    commentsJSON.forEach(comment => {
        const article = document.createElement('article');
        const heading = createElemWithText('h3', comment.name);
        const paragraph = createElemWithText('p', comment.body);
        const paragraph2 = createElemWithText(`'p', 'From:'${comment.email}`);
        article.append(heading, paragraph, paragraph2);
        frag.append(article);
    }
    )
    return frag;
};
//9
function populateSelectMenu (userJSON){
    const getselect = document.getElementById("selectMenu");
    const options = createSelectOptions(userJSON);
    options.forEach(option => {
        getselect.appendChild(option);
    })
    return getselect;
};
//10
async function getUsers () {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const jsonUserData = await response.json();
    return jsonUserData;
};
//11
async function getUserPosts (userID) {
    if(!userID) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`);
    const jsonPosts = await response.json();
    return jsonPosts;
};
//12
async function getUser (userID) {
    if(!userID) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
    const jsonPosts = await response.json();
    return jsonPosts;
};
//13
async function getPostComments (postID){
    if(!postID) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`);
    const jsonPostsComments = await response.json();
    return jsonPostsComments;
};
//14
async function displayComments (postID){
    if(!postID) return;
    const section = document.createElement("section");
    section.setAttribute("postID", postID);
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postID);
    const fragment = creatComments(comments);
    section.append(fragment);
    return section;    
};
//15
async function createPosts (postsJSON) {
    if(!postsJSON) return;
    const frag = document.createDocumentFragment();
    for(post of postsJSON) {
        const article = document.createElement("article");
        const heading = post.title;
        const para = post.body;
        const para2 = `Post ID: ${post.id}`
        const author = await getUser(post.userID);
        const para3 = `Author: ${author.name}`;
        const para4 = author.company.catchPhrase;
        const btn = document.createElemWithText("button", "Show Comments");
        btn.setAttribute("postID", post.id);
        article.append(heading, para, para2, author,para3,para4,btn);
        const section = await displayComments(post.id);
        article.append(section);    
    };
    frag.append(article);
    return frag;
};
//16
async function displayPosts (postData) {
    let element = "";
    const main = document.querySelector("main");
    const def = main.querySelector("p").innerText
    if(!postData){
        element = document.createElemWithText("p", def);
        }else{
        element = await createPosts(posts);
};
    main.append(element);
};
//17
async function toggleComments (clickEvent, postID){
    if(!clickEvent||!postID) return;
};
//18
async function refreshPosts (postsJSON) {
    if(!postsJSON) return;
    removeButtonListeners();
};
//19
async function selectMenuChangeEventHandler () {

};
//20
async function initPage (){
    await getUsers();
}
//21
async function initApp () {
    initPage();
}