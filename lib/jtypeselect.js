"use strict";
var g_cnt =  0;
var reNewSelect = function(select){
    ++g_cnt;
    var elem = "<div class='_re_new_select'><input  class='cnt_"+g_cnt+"'><ul></ul></div>";
    var parent = $(select).parent();
    var next = $(select).next();
    var dom  = $(elem);
    if($(select).find('option:selected').val()){
        dom.find('input').val($(select).find('option:selected').text());
    }else{
        dom.find('input').val($(select).find('option:first-child').text());
    }
    if(next.length > 0){
        $(next).before(dom);
    }
    else{
        parent.append(dom);
    }
    $(select).addClass('cnt_' + g_cnt);
    $(select).css('display','none');
}


$(function(){
    var selector = 'select.jtypeselect';
    var selects = $(selector);
    $("head").append("<style>._re_new_select{width:80px;height:20px;background:#000;display:inline-block;position:relative;margin-right:5px;}" +
        "._re_new_select input{width:100%}" +
        "._re_new_select ul{cursor:pointer;z-index:999;width:100%;list-style:none;padding:0px;margin:0px;position:absolute;background:#fff;border:1px solid #ccc;display:none}" +
        "._re_new_select ul li{line-height:20px;height:20px;border-top:1px solid #ccc;color:#666;text-indent:5px;" +
        "}" +
        "._re_new_select ul li:hover{background:#eee;}</style>");
    $(document.body).on('change',selector,function(){
    });

    for(var i = 0;i < selects.length;i ++){
        reNewSelect(selects[i]);
    }
    $(document.body).on('keyup',"._re_new_select input",function(){

        var cnt = $(this).attr("class");
        var opts = $(this).parent().parent().find('select.'+ cnt +' option');
        var ul = $(this).closest('._re_new_select').find('ul');
        var txt = $(this).val();
        ul.css('display','block');
        ul.empty();
        for(i = 0;i < opts.length;i ++){

            if($(opts[i]).text().indexOf(txt) >= 0){
                var li = $("<li data-val='"+$(opts[i]).val()+"'>"+$(opts[i]).text()+"</li>");
                ul.append(li);
            }

        }
    });
    $(document.body).on('focus',"._re_new_select input",function(){

        var input = $(this);
        var cnt = input.attr("class");
        var opts = $(this).parent().parent().find('select.'+cnt+' option');
        var ul = $(this).parent().find('ul');
        input.val('');
        ul.css('display','block');
        ul.empty();
        for(i = 0;i < opts.length && i < 20;i ++){
            var li = $("<li data-val='"+$(opts[i]).val()+"'>"+$(opts[i]).text()+"</li>");
            ul.append(li);
        }
    });
    $(document.body).on('blur',"._re_new_select input",function(){
        var that = this;
        setTimeout(function(){
            $(that).parent().find('ul').css('display','none');
        },500);

    });

    $(document.body).on('click',"._re_new_select ul li",function(){

        var value = $(this).attr('data-val');
        var input = $(this).closest('._re_new_select').find('input');
        var name = $(this).text();
        var cnt = input.attr("class");
        var options = $(this).closest('._re_new_select').parent().find('select.'+ cnt +' option');
        options.removeAttr('selected');
        for(var i = 0;i < options.length;i ++){
            if(value == $(options[i]).val()){
                $(options[i]).attr('selected','selected');
            }
        }
        $(this).closest('._re_new_select').find('input').val(name);
    });

})
