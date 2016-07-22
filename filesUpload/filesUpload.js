window.onload=function(){
	var oBtn = document.getElementById('btn');
	var files = document.getElementById('files');
	var filesInfo = files.getElementsByClassName('filesInfo');

	oBtn.onclick=function(){

		if(filesInfo.length > 0){
			//为每一个文件的进度条增加效果
			for(var i = 0; i < filesInfo.length;i++){
				var bar = filesInfo[i].getElementsByClassName('bar')[0];
				// console.log(bar.className);
				bar.className = "bar animate";
			}
		}else{
			alert("没有待上传的文件")
		}
	}

	//进度完成后显示上传成功
	files.addEventListener("webkitAnimationEnd",function(){
		alert('文件上传成功');
	});
};

//选择文件后响应
function handleFiles(files){
	// console.log(files);
	var fileName = files[0].name.substring(0,5)+'...';
	var fileSize = parseInt(Math.round((files[0].size)/1024)) + "kb";
	// console.log(fileSize)
	//创建文件框和其他信息
	var oDiv = document.createElement('div');
	var titleName = document.createElement('h5');
	var titleSize = document.createElement('h5');
	var bar = document.createElement('div');
	var filesDiv = document.getElementById('files');

	// console.log(filesDiv);
	//生成样式
	oDiv.setAttribute('class','filesInfo');
	titleName.setAttribute('class','name');
	titleSize.setAttribute('class','size');
	bar.setAttribute('class','bar');

	oDiv.setAttribute('draggable','true');
	oDiv.setAttribute('ondragstart','drag(event)');
	oDiv.setAttribute('id','drag'+fileSize);

	//赋入name和size
	titleName.innerHTML = fileName;
	titleSize.innerHTML = fileSize;

	//插入节点
	oDiv.appendChild(titleName);
	oDiv.appendChild(titleSize);
	oDiv.appendChild(bar);
	filesDiv.appendChild(oDiv);
}

//文件拖拽
function allowDrop(ev){
	ev.preventDefault();
}
function drag(ev){
	ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev){
	ev.preventDefault();
	var data = ev.dataTransfer.getData("Text");
	// console.log(data);
	ev.target.appendChild(document.getElementById(data));
}