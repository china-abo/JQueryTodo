var log = function() {
    console.log.apply(console, arguments)
}
todoList = []
//模板字符串插入todo
var insert = function(todo) {
    var t =
        `
        <div class="todo-cell ${todo.done}" >
            <button class='btn-complete btn btn-primary' type="button" name="button">完成</button>
            <button class='btn-del btn btn-primary' type="button" name="button">删除</button>
            <button class='btn-edit btn btn-primary' type="button" name="button">编辑</button>
            <span class='span input form-control ' contenteditable="false">${todo.task}</span>
        </div>
        `
    return t
}
//事件绑定
$('#id-add').on('click', function(){
    var task = $('#id-input').val()
    var done = ''
    var todo = {
        'task': task,
        'done': '',
    }
    todoList.push(todo)
    log(todo)
    $('#id-todo-list').append(insert(todo))
    saveTodos()
})

//事件删除
/*
错误示范，这样会删除所有的todo。因为没有传入 event事件，执行del的是所有的btn
$('.btn-del').on('click', function(){
    $('.btn-del').closest('.todo-cell').remove()
})
*/
// function绑定一个接受一个event,为你点击的按钮。
//还有一种写法，使用this,不用event
//$(this).closest('.todo-cell').remove()
//删除弹窗提示
var alert = function(title, message, callback) {
    $('document').ready(function(){
        var t = `
        <div class="window remove">
            <div class="alert abo-veicalCenter">
                <div class="alert-title">
                    <h2>${title}</h2>
                </div>
                <div class="alert-message">
                    <p>${message}</p>
                </div>
                <div class="alert-btn">
                    <button class='alert-btn btn btn-primary ' type="button" data-type='cancle'>Cancel</button>
                    <button class='alert-btn btn btn-primary' type="button" data-type='ok'>OK</button>
                 </div>
            </div>
        </div>
        `
        var style =
            `
            <style class="remove" media="screen">
                .abo-veicalCenter{
                    top: 50%;
                    position: relative;
                    transform: translateY(-150%);
                }
                .window{
                    position: fixed;
                    top: 0px;
                    left:0px;
                    width: 100%;
                    height: 100%;
                    background: black;
                    opacity: 0.5;
                }
                .alert{
                    margin: auto;
                    width: 200px;
                    border: 2px solid black;
                    background: yellow;
                    opacity: 1;
                }
                .alert-title{
                    text-align: center;
                    margin-top: 10px;
                }
                .alert-message{
                    text-align: center;
                }
                .alert-btn{
                    text-align: center;
                }
                .alert-btn button{
                    margin: 0px;
                    background-color:red;

                }
            </style>
            `
        $('body').append(t)
        $('head').append(style)
        $('.btn').on('click', function(event){
            var type = $(this).data('type')
            if(type === 'ok') {
                callback()
            }
            $('.remove').remove()
        })

    })
}
//删除功能
$('#id-todo-list').on('click','.btn-del',function(event){
    alert('确认删除吗',' ', function() {
            // log($(event.target))
            var element = $(event.target)
            // log(element.parent)
            var index = indexOfElement(element.parent())
            todoList.splice(index,1)
            saveTodos()
            var del = $(event.target)
            del.closest('.todo-cell').remove()
    })
})
//完成功能
$('#id-todo-list').on('click','.btn-complete',function(event){
    var complete = $(event.target)
    // log('comlete done')
    var span = complete.closest('.todo-cell').find('span')
    span.toggleClass('done')
})
//编辑功能

$('#id-todo-list').on('click','.btn-edit',function(event){
    var span = $(event.target).closest('.todo-cell').find('span')
    span.attr('contenteditable','true')
    span.focus()
    span.blur(function(){
        span.attr('contenteditable','false')
    })
})
//enter失去焦点
$('#id-todo-list').on('keydown', '.span', function(event){
    if(event.which === 13) {
        event.target.blur()
        event.preventDefault()
    }
})
// 保存添加的内容
var saveTodos  = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

//获取当前任务在父元素中的下标
/*
element 为 button按钮的父类‘todo-cell’
*/

var indexOfElement = function(element) {
    var parent = element.parent()
    log('element',element)
    log('parent',parent)
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e == element) {
            return i
        }
    }
}
//提取
var loadTodos = function() {
    var s = localStorage.todoList
    return JSON.parse(s)
}
//加载todo
var initTodos = function() {
    todoList = loadTodos()
    var l = todoList.length
    for (var i = 0; i < l; i++) {
        $('#id-todo-list').append(insert(todoList[i]))
    }
}
initTodos()
