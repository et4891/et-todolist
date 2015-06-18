/**
 * Created by ET on 6/14/2015.
 */
$(document).ready(function() {

    //Action when submit is clicked
    //e is an event object to get the preventDefault() method which is used to prevent the default action of the element
    //$('.submit').click(function(e){
    $('.item-add').on('click', '.submit', function(e){
        var todoText = $("input[name='todoText']").val();
        e.preventDefault();

        //Ajax for adding todoText
        $.ajax({
            method: "POST",
            url: "add-ajax.php",
            data: {todoText: todoText},
            dataType: "json"
        })
            .done(function(data){
                $('p.empty').empty();
                $('input.input').val('');
                $('ul.items').append('<li>'+todoText+' '+
                '<a href="done-ajax.php?as=done&item=' + data.id +
                '" class="done-button">Mark as Done</a></li>');
            })
    });

    //Action when done button is clicked
    $('ul.items').on('click', '.done-button', function(e){
        e.preventDefault();

        //making sure only work with the current element
        var $clicked = $(this);

        //get the href attribute value and parse it to get the item # which is the item's id
        var attrValue = $clicked.attr('href');
        var parseAttrValue = attrValue.split('&');
        var parseItem = parseAttrValue[1].split('=');
        var item = parseItem[1];

        //Ajax for Mark as Done Button
        $.ajax({
            method: "GET",
            data:{as: 'done', item: item},
            url: "done-ajax.php"
        })
            .done(function(){
                $clicked.prev().addClass('done');
                $clicked.removeClass('done-button').empty();
                $clicked.addClass('delete-button').text('Delete Task');
                $clicked.removeAttr('href');
                $clicked.attr('href','delete-ajax.php?as=delete&item='+item);
            });
    });

    //Action when delete button is clicked
    $('ul.items').on('click', '.delete-button', function(e){
        e.preventDefault();

        //making sure only work with the current element
        var $clicked = $(this);

        //get the href attribute value and parse it to get the item # which is the item's id
        var attrValue = $clicked.attr('href');
        var parseAttrValue = attrValue.split('&');
        var parseItem = parseAttrValue[1].split('=');
        var item = parseItem[1];

        //Ajax for Mark as Done Button
        $.ajax({
            method: "GET",
            data:{as: 'delete', item: item},
            url: "delete-ajax.php"
        })
            .done(function(){
                $clicked.closest('li').remove();
                $clicked.remove();
            });
    });
});