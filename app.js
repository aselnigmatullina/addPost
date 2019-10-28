console.log('worked');

const rootEl = document.getElementById('root')

const links = [];

const addFormEl = document.createElement('form');
addFormEl.innerHTML = `
<div class = "container">
    <div class = "row">
        <div class = "col-7">
            <label>Введите текст</label>
            <input data-id = "link" class = "form-control" type = "text"></input>
        </div>
        <div class = "col">
            <label>Выберите категорию</label>
            <select data-id = "type" class = "form-control"> 
                <option value = "regular">Обычный текст </option>
                <option value = "image">Картинка</option>
                <option value = "video">Видео</option>
                <option value = "audio">Аудио</option>
            </select>
        </div>
    </div>
        <button data-id = "add" class = "btn btn-primary">Добавить</button>
        <button data-id = "delete" class = "btn btn-danger">Удалить</button>

</div>
`;

const linkEl = addFormEl.querySelector('[data-id=link]');
const typeEl = addFormEl.querySelector('[data-id=type]')
const addEl = addFormEl.querySelector('[data-id=add]');

addEl.onclick = function(ev) {
    ev.preventDefault();
    const value = linkEl.value;
    const type = typeEl.value;
        links.push({
            value,
            type,
            likes:0,
        },);
    linkEl.innerHTML='';
    rebuildTree(formEl,links);
};

rootEl.appendChild(addFormEl);

const formEl = document.createElement('div');
rootEl.appendChild(formEl);

function rebuildTree(containerEl, items) {
    for (const item of [...containerEl.children]) {
        containerEl.removeChild(item);
    }

    for (const item of items) {
        const postEl = document.createElement('div');
        postEl.className = 'card';

        if (item.type == 'image') {
            postEl.innerHTML = `
            <div class = "card">
                <img src = "${item.value}" class = "card-img-top">
                <div class = "card-body">
                    <p class = "card-text">${item.text}</p>
                    <button data-action = "like" class = "btn btn-primary"> ❤ ${item.likes}</button>
                
            `;
        }
        else if (item.type == 'video') {
            postEl.innerHTML = `
            <div class = "card">
                <div class = "embed-responsive embed-responsive-16by9 card-img-top">
                    <video src = "${item.value}" class = "embed-responsive-item" controls>
                </div>
                <div class = "card-body">
                    <p class="card-text">${item.text}</p>
                    <button data-action = "like" class = "btn btn-primary"> ❤ ${item.likes} </button>
                    
                </div>
            </div>
            `;
        }
        else if (item.type == 'audio'){
            postEl.innerHTML = `
                <div class = "card">
                        <div class = "card-img-topcard-img-top embed-responsive embed-responsive-16by9">
                            <audio src = "${item.value}"  class = "embed-responsive-item" controls>
                        </div>
                        <div class = "card-body"
                            <p class="card-text">${item.text}</p>
                            <button data-action = "like" class = "btn btn-primary"> ❤ ${item.likes}</button>
                            
                        </div>
                </div>
                `;    
        }
        else if (item.type == 'regular') {
            postEl.innerHTML = `
                <div class = "card">
                        <div class = "card-body"
                            <p class="card-text">${item.value}</p>
                            <button data-action = "like" class = "btn btn-primary">❤ ${item.likes} </button>
                            
                        </div>
                    </div>
                `;
             
           
        }
        const deleteEl = addFormEl.querySelector('[data-id=delete]');
            deleteEl.onclick = function() {
            postEl.innerHTML = '';
            rebuildTree(containerEl,items);
        
    }

       
        const likeEl = postEl.querySelector('[data-action=like]');
        likeEl.onclick = function() {
            if(item.likes > 0){
                item.likes--;
            }
                else{
                    item.likes++;
                }
            rebuildTree(containerEl,items);
            
        };
        containerEl.appendChild(postEl);
    }
}; 