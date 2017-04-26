# simpleplugins

一些简单的js插件集合
===

在写页面的过程中，为了快速开发，我们经常会用到一些三方插件(诸如图片预览、文件上传等等)。用的时侯总是会抱怨插件太过臃肿，大部份功能完全用不上，为了解决这个问题写了几个小程序，分享一下 `jpreview`是一个图片预览的小程序，`jfileupload`多图上传小插件,`jtypeselect`快速选择小插件。[Haiwera](http://haiwera.xyz)

## jpreview

简单图片预览

### 用法 

* 首先在页面引用jquery.js 及 jpreview.js
* 在要预览的元素上添加onclick事件

~~~html

<img src="/images/thumb.png" onclick='jpreview("/images/image.png");' />
<!-- 或者 -->
<a href='javascript:jpreview("/images/image.png");'>预览</a>

~~~
## jtypeselect

快速搜索选择

### 用法

* 引入jquery及jtypeselect
* 在要添加效果的select 上添加类选择器 `jtypeselect`

~~~html
	<select class="jtypeselect">
		<option>javascript</option>
		<option>html</option>
		<option>php</option>
		<option>java</option>
		<option>c++</option>
		<option>c</option>
		<option>ruby</option>
		<option>python</option>
		<option>go</option>
	</select>
~~~

## jfileupload

图片上传，异步上传

### 用法

* 引入jquery及jfileupload
* 修改jfileupload.js中的上传地址
* 给form中的file添加multiple=multiple

~~~html

<input type="file" multiple="multiple" name="files[]" />

~~~
* 返回值

~~~javascript
// 成功
{
	"error" : 0,
	"data"  : "images/image.jpg"
}
// 失败
{
	"error" : 1,
	"data" : "上传失败"
}
~~~


