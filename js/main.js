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
//2 --- passed
function createSelectOptions (userJSON){
    if (!userJSON) return;
    const selectbox = []
        userJSON.forEach(user => {
        let newoption = document.createElement("option");
        newoption.value = user.id;
        newoption.text = user.name; 
        selectbox.push(newoption);
        });
    return selectbox;
};
//3 ---- passed
function toggleCommentSection (postID){
    if(!postID) return;
    let post = document.querySelector(`section[data-post-id='${postID}']`);
    if(post != undefined){
        post.classList.toggle("hide");
    }
    return post;

};
//4 ---- passed
function toggleCommentButton (postID){
 if(!postID ) return;   
    let combutton = document.querySelector(`button[data-post-id='${postID}']`);
     if (combutton === null){
         return null;
     }else{
         let comText = combutton.innerText;
            if(comText === "Show Comments"){
                combutton.textContent = "Hide Comments"
            }else{
                    combutton.textContent = "Show Comments";
            }
            return combutton;
        }
    };
//5 ----- passed
function deleteChildElements (parentElement){
    if (!parentElement?.tagName) return;
        let child = parentElement.lastElementChild;
        while(child){
            parentElement.removeChild(child);
            child = parentElement.lastElementChild;
        }
        return parentElement;
};
//6 ------passed
function addButtonListeners (){
    const allbuttons = document.querySelectorAll("main button");
    if(allbuttons != undefined){
         allbuttons.forEach(btn => {
            const postID = btn.dataset.postId;
            btn.addEventListener("click", function (e) {toggleComments(e, postID)}, false);
        })
        return allbuttons;
    }else{
        return undefined;
    }
};
//7------passed
function removeButtonListeners (){
    const allbuttons = document.querySelectorAll("main button");
    allbuttons.forEach(btn => {
            const postID = btn.dataset.postId;
            btn.removeEventListener("click", function (e) {toggleComments(e, postID)}, false);
        })
        return allbuttons;
};
//8----------passed
function createComments (commentsJSON){
    if(!commentsJSON) return;

    let frag = document.createDocumentFragment();
    commentsJSON.forEach(comment => {
        const article = document.createElement('article');
        const heading = createElemWithText('h3', comment.name);
        const paragraph = createElemWithText('p', comment.body);
        const paragraph2 = createElemWithText('p', `From: ${comment.email}`);
        article.append(heading, paragraph, paragraph2);
        frag.append(article);
    })
    return frag;
};
//9--------passed
function populateSelectMenu (userJSON){
    if(!userJSON) return;
    const getselect = document.getElementById("selectMenu");
    const options = createSelectOptions(userJSON);
    options.forEach(option => {
        getselect.appendChild(option);
    })
    return getselect;
};
//10----------passed
async function getUsers () {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const jsonUserData = await response.json();
    return jsonUserData;
};
//11------------passed
async function getUserPosts (userID) {
    if(!userID) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`);
    const jsonPosts = await response.json();
    return jsonPosts;
};
//12--------------passed
async function getUser (userID) {
    if(!userID) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
    const jsonPosts = await response.json();
    return jsonPosts;
};
//13-------------passed
async function getPostComments (postID){
    if(!postID) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`);
    const jsonPostsComments = await response.json();
    return jsonPostsComments;
};
//14---------passed
async function displayComments (postID){
    if(!postID) return;
    const section = document.createElement("section");
    section.dataset.postId = postID;
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postID);
    const fragment = createComments(comments);
    section.append(fragment);
    return section;    
};
//15-------passed
async function createPosts (postsJSON) {
    if(!postsJSON) return;
    const frag = document.createDocumentFragment();
    for(let i = 0; i < postsJSON.length; i++) {
        let post = postsJSON[i];
        const article = document.createElement("article");
        const heading = createElemWithText('h2', post.title);
        const para = createElemWithText('p', post.body);
        const para2 = createElemWithText('p', `Post ID: ${post.id}`); 
        const author = await getUser(post.userId);
        const para3 = createElemWithText('p',`Author: ${author.name} with ${author.company.name}`);
        const para4 = createElemWithText('p', author.company.catchPhrase);
        const btn = createElemWithText("button", "Show Comments");
        btn.dataset.postId = post.id;
        article.append(heading, para, para2,author,para3,para4,btn);
        const section = await displayComments(post.id);
        article.append(section);
        frag.appendChild(article);
    };
    return frag;
};
//16---------passed
async function displayPosts (posts) {
    const main = document.querySelector("main");
    let element = "";
    if (posts !== undefined){
        element = await createPosts(posts);
    }else{
        element = createElemWithText("p", "Select an Employee to display their posts.");
        element.classList.add("default-text");
    }
    main.append(element);
    return element;
};
//17---------assertion error
async function toggleComments (e, postID){
    let resultarray = [];
    if(typeof e === 'undefined' || postID === undefined || e === null) {
        return undefined;
    }else{
    
        e.target.listener = true;
        const section = toggleCommentSection(postID);
        const button = toggleCommentButton(postID);
        resultarray.push(section);
        resultarray.push(button);
    }
    return resultarray;
};
//18
async function refreshPosts (postsJSON) {
    if(!postsJSON) return;
    const retarray = [];
    const removeButtons = removeButtonListeners();
    const main = await deleteChildElements(document.querySelector("main"));
    const fragment = await displayPosts(postsJSON);
    const addButtons = addButtonListeners();
    retarray.push(removeButtons, main, fragment, addButtons);
    return retarray;
};
//19
async function selectMenuChangeEventHandler (event) {
    const userId = event.target.value || 1;
    const posts = await getUserPosts(userId);
    const refresh = await refreshPosts(posts);
    const retarray = [userId, posts, refresh];
    return retarray;
};
//20
async function initPage (){
    const users = await getUsers();
    const drop = populateSelectMenu(drop);
    const rearray = [users, drop];
    console.log(rearray);
    return rearray;
}
//21
async function initApp () {
    initPage();
    const select = document.querySelector("#selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler(e));

}