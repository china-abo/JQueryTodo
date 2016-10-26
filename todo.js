var log = function() {
    console.log.apply(console, arguments)
}

var insert = function(todo) {
    var t =
        `
        <div class="todo-cell" >
            <button class='btn-complete btn btn-primary' type="button" name="button">完成</button>
            <button class='btn-del btn btn-primary' type="button" name="button">删除</button>
            <button class='btn-edit btn btn-primary' type="button" name="button">编辑</button>
            <span class='span input form-control ' contenteditable="false">${todo}</span>
        </div>
        `
    return t
}
//事件绑定
$('#id-add').on('click', function(){
    var todo = $('#id-input').val()
    $('#id-todo-list').append(insert(todo))
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
$('.btn-del').on('click', function(event){

    $(event.target).closest('.todo-cell').remove()
})

//事件委托
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
            var del = $(event.target)
            del.closest('.todo-cell').remove()
    })
})
//完成功能
$('#id-todo-list').on('click','.btn-complete',function(event){
    var complete = $(event.target)
    log('comlete done')
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
