"use strict;"
var uploadUrl = "http://121.40.217.151/upload.php"; //文件上传路径
$(function(){


    var inputs = $('input[type=file]');
    $("head").append("<style>._file_element_upload{position:relative;float:left;border:1px solid #ccc;" +
        " width:100px;margin:10px 5px;height:100px;color:#ccc;cursor:pointer;border-radius:10px;box-shadow:0px 0px 3px #cccccc;" +
        "text-align:center;line-height:100px;font-size:18px;}" +
        "._file_element_upload span{position:absolute;left:90px;top:-10px;background:rgba(0,0,0,.7);color:white;font-weight:bold;width:20px;" +
        "line-height:20px;" +
        "height:20px; border-radius:10px;}</style>");

    for (var i = 0;i < inputs.length; i ++){
        var name = $(inputs[i]).attr('name');
        var multiful = $(inputs[i]).attr('multiple') ? true : false;
        createFileUpload(name,$(inputs[i]).parent(),multiful,inputs[i]);

    }
    $(document.body).on('click','._file_element_upload.upload-btn',function(e){
        if(!$(e.target).hasClass('btn'))
        {
            $(this).find('.btn').trigger('click');
        }
        //console.log($(this));

    });

    $(document.body).on('change','._file_element_upload.upload-btn .btn',function(e){
        var fileList = this.files;
        var name = $(this).attr('data-name');
        var multiful = $(this).attr('multiple') ? true : false;
        //console.log(realname);
        //$(this).parent().parent().find('._file_element_upload').not('.upload-btn').remove();
        for( var i = 0 ; i < fileList.length ; i++ ){
            //console.log(fileList[i]);
            var imageType = /image.*/;

            if (!fileList[i].type.match(imageType)) {
                continue;
            }

            var img = $("<div class='_file_element_upload'><img style='width:100%;position:absolute;left:0px;'/><span>x</span></div>");
            dataURL = windowURL.createObjectURL(fileList[i]);
            img.find('img')[0].src = dataURL;
            //img.attr('data-name',"" + fileList[i].name + fileList[i].size);
            img.find('img')[0].onload = function(){
				if($(this).width()  > $(this).height()){
					$(this).css('top',(100 - $(this).height()) / 2 + "px");
				}else{
					$(this).css({"width":"auto","height":"100%"});
					$(this).css('left',(100 - $(this).width()) / 2 + "px");
				}
            }
            that = this;
            if(multiful){
                //Array.prototype.push.apply(newFileList,fileList[i]);
                var formData = new FormData;
                formData.append('files',fileList[i]);
                $.ajax({
                    url: uploadUrl,
                    type: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(rs) {
                        rs = JSON.parse(rs);
                        if(rs.error){
                            alert(rs.data);
                        }
                        else{
                            var img = $("<div class='_file_element_upload'><img style='width:100%;position:absolute;left:0px;'/><span>x</span></div>");
                            img.find('img')[0].src =  rs.data;
                            img.find('img')[0].onload = function(){
								if($(this).width()  > $(this).height()){
									$(this).css('top',(100 - $(this).height()) / 2 + "px");
								}else{
									$(this).css({"width":"auto","height":"100%"});
									$(this).css('left',(100 - $(this).width()) / 2 + "px");
								}
                            }
                            img.append($('<input name="'+name+'" type="hidden" value="'+rs.data+'">'));
                            $(that).parent().before(img);
                        }

                    },
                    error: function(err) {
                    }
                });



            }else{
                $(this).parent().find('img').remove();
                $(this).parent().append($(img).find('img'));

            }
        }

    });
    $(document.body).on('click','._file_element_upload span',function(){
        console.log('del');
        var file = $(this).parent().parent().find('.btn')[0];
        var files = file.files;
        var img =  $(this).closest('._file_element_upload').find('img');

        $(this).closest('._file_element_upload').remove();
    });
});

/**
 *
 * @param name
 * @param parent
 * @param multiful
 */
var uphtml = "<div class='{name}wrap' style='height:120px;'><div id='{name}preview'><div  class='upload-btn _file_element_upload' style='' id='{name}button'>上传图片</div></div></div>";
var windowURL = window.URL || window.webkitURL;

function createFileUpload(name,parent,multiful,file){
    var realname = name;
    var tmp = uphtml;
    if(name.indexOf('[')){
        realname = name.replace('[]','');
    }
    //var realname = name.trim(']').trim('[');
    tmp = tmp.replace(/\{name\}/g,realname);
    //console.log(uphtml);

    var newBox = $(tmp);
    //console.log($(parent).children());
    $(file).css('display','none');
    $(file).addClass('btn');
    if(multiful){
        $(file).attr('data-name',name);
        $(file).attr('name','');
    }

    newBox.find('.upload-btn').append($(file));


    //console.log(parent);
    //$(parent).append(newBox);

    if(multiful){
        var files = $(file).attr('value');
        var jsFiles = [];
        if(files){
            jsFiles = JSON.parse(files);
        }

        //console.log(jsFiles);
        for(var i  = 0;i < jsFiles.length;i ++){
            var img = $("<div class='_file_element_upload'><img style='width:100%;position:absolute;left:0px;'/><span>x</span></div>");
			var imgObj = new Image();
			imgObj.src = "/" + jsFiles[i];
			img.find('img')[0].src = "/" + jsFiles[i];
		
            img.find('img').load(function(){
				if($(this)[0].width  > $(this)[0].height){
					$(this).css('top',(100 - $(this)[0].height / $(this)[0].width * 100) / 2 + "px");
				}else{
					$(this).css({"width":"auto","height":"100%"});
					$(this).css('left',(100 - $(this)[0].width / $(this)[0].height * 100) / 2 + "px");
				}
            });
            img.append($('<input name="'+name+'" type="hidden" value="'+jsFiles[i]+'">'));
            $(file).parent().before(img);
        }
    }else{
        var img = $("<div class='_file_element_upload'><img style='width:100%;position:absolute;left:0px;'/><span>x</span></div>");
        img.find('img')[0].src = "/" + $(file).attr('value');
        img.find('img').load(function(){
			if($(this).width()  > $(this).height()){
				$(this).css('top',(100 - $(this).height()) / 2 + "px");
			}else{
				$(this).css({"width":"auto","height":"100%"});
				$(this).css('left',(100 - $(this).width()) / 2 + "px");
			}
        });

        newBox.find('.upload-btn').append($(img).find('img'));
    }
    //console.log($(file).attr('value'));
    parent.append(newBox);


}
