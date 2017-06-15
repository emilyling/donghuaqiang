function photoWall(){
	this.height = $('body').height();
	this.imageWidth = 0;
	this.imageHeight = 0;
	this.mouseStatus = true;

	this.initView= function(){
		var _this = this;
		this.loadConfig();

		$(".imageContainer").css("height",this.height);
		$(".imageContainer").css("width",2*this.height);

		for (var i=0 ; i< $(".imageContainer img").length;i++) {
			this.initImage($(".imageContainer img").eq(i),i);
		}
		$(".imageContainer img").mouseover(function(x){
			_this.focusImage($(x.target));
		});
		$(".imageContainer img").mouseout(function(x){
			_this.blurImage($(x.target));
		});
	}

	this.loadConfig = function(){
		var allImagesObj = $(".imageContainer img");
		$.ajax({
		    type: 'GET',
		    url: "config.json" ,
		    success: function(data){
		    	if (data.style.length == 3) {
		    		for(var i = 0; i<3;i++){
		    			for(var m=6*i; m<6*(i+1);m++){
		    				allImagesObj.eq(m).attr('src',data.style[i].row[m-6*i]);
		    				if(data.style[i].row[m-6*i].indexOf("static")>=0){
		    					allImagesObj.eq(m).addClass("static");
		    				}
		    			}
		    		}
		    	};
		    }
		});
	}

	this.initImage = function(obj,index){
		obj.css("width",($(".imageContainer").width()-70)/6);
		obj.css("height",obj.width());
		this.imageWidth = obj.width();
		this.imageHeight = obj.height();
		if(index<6){
			obj.css("top",10);
			obj.css("left",(obj.width()+10)*index+10);
		}else if(index>=6 && index<12){
			obj.css("top",(obj.width()+10)*1+10);
			obj.css("left",(obj.width()+10)*(index-6)+10);
		}else if(index>=12 && index<18){
			obj.css("top",(obj.width()+10)*2+10);
			obj.css("left",(obj.width()+10)*(index-12)+10);
		}
	}

	this.focusImage = function(obj){
		//console.log();
		if (obj.hasClass('static')) {
			return;
		};
		obj.get(0).src = "./images/"+obj.get(0).src.split('thumbs/')[1];
		obj.css('width',obj.width()*3+20);
		obj.css('height',obj.height()*2+10);
		obj.css('z-index',10);
		obj.addClass('hover');
		if(obj.hasClass('right') && obj.hasClass('bottom')){
			if(obj.hasClass('rightone')){
				obj.css('left',(this.imageWidth+10)*1+10);
			}else if(obj.hasClass('righttwo')){
				obj.css('left',(this.imageWidth+10)*2+10);
			}else{
				obj.css('left',(this.imageWidth+10)*3+10);
			}
			obj.css('top',(this.imageHeight+10)*1+10);
			this.moveImageForBottomAndRight(obj,true);
		}else if (obj.hasClass('bottom')){
			obj.css('top',(this.imageHeight+10)*1+10);
			this.moveImageForBottom(obj,true);
		}else if (obj.hasClass('right')){
			if(obj.hasClass('rightone')){
				obj.css('left',(this.imageWidth+10)*1+10);
			}else if(obj.hasClass('righttwo')){
				obj.css('left',(this.imageWidth+10)*2+10);
			}else{
				obj.css('left',(this.imageWidth+10)*3+10);
			}
			this.moveImageForRight(obj,true);
		}else{
			this.moveImageForLeft(obj,true);
		}
	}

	this.blurImage = function(obj){
		if (obj.hasClass('static')) {
			return;
		};

		if(obj.hasClass('right') && obj.hasClass('bottom')){
			if(obj.hasClass('rightone')){
				obj.css('left',(this.imageWidth+10)*3+10);
			}else if(obj.hasClass('righttwo')){
				obj.css('left',(this.imageWidth+10)*4+10);
			}else{
				obj.css('left',(this.imageWidth+10)*5+10);
			}
			obj.css('top',(this.imageHeight+10)*2+10);
			this.moveImageForBottomAndRight(obj,false);
		}else if (obj.hasClass('bottom')){
			obj.css('top',(this.imageHeight+10)*2+10);
			this.moveImageForBottom(obj,false);
		}else if (obj.hasClass('right')){
			if(obj.hasClass('rightone')){
				obj.css('left',(this.imageWidth+10)*3+10);
			}else if(obj.hasClass('righttwo')){
				obj.css('left',(this.imageWidth+10)*4+10);
			}else{
				obj.css('left',(this.imageWidth+10)*5+10);
			}
			this.moveImageForRight(obj,false);
		}else{
			this.moveImageForLeft(obj,false);
		}

		obj.get(0).src = "./thumbs/"+obj.get(0).src.split('images/')[1];
		obj.css('z-index',0);
		obj.css('width',(obj.width()-20)/3);
		obj.css('height',(obj.height()-10)/2);
		obj.removeClass('hover');
	}

	this.moveImageForLeft = function(obj,status){
		var index = parseInt(obj.get(0).name);
		var tmpObj;
		if (status) {
			if (index<3) {
				for(var i = 0 ; i<5-index;i++){
					tmpObj = $(".imageContainer img").eq(index+i+1);
					tmpObj.css("left",(this.imageWidth+10)*(index+i+1)+10+obj.width()-this.imageWidth);
				}
				for(var i = 0 ; i<5-index+1;i++){
					tmpObj = $(".imageContainer img").eq(6+i+index);
					tmpObj.css("left",(this.imageWidth+10)*(index+i)+10+obj.width()+10);
				}
			}else{
				for(var i = 0 ; i<11-index;i++){
					tmpObj = $(".imageContainer img").eq(index+i+1);
					tmpObj.css("left",(this.imageWidth+10)*(index-6+i+1)+10+obj.width()-this.imageWidth);
				}
				for(var i = 0 ; i<11-index+1;i++){
					tmpObj = $(".imageContainer img").eq(6+i+index);
					tmpObj.css("left",(this.imageWidth+10)*(index-6+i)+10+obj.width()+10);
				}
			}
		}else{
			if (index<3) {
				for(var i = 0 ; i<5-index;i++){
					tmpObj = $(".imageContainer img").eq(index+i+1);
					tmpObj.css("left",(this.imageWidth+10)*(index+i+1)+10);
				}
				for(var i = 0 ; i<5-index+1;i++){
					tmpObj = $(".imageContainer img").eq(6+i+index);
					tmpObj.css("left",(this.imageWidth+10)*(index+i)+10);
				}
			}else{
				for(var i = 0 ; i<11-index;i++){
					tmpObj = $(".imageContainer img").eq(index+i+1);
					tmpObj.css("left",(this.imageWidth+10)*(index-6+i+1)+10);
				}
				for(var i = 0 ; i<11-index+1;i++){
					tmpObj = $(".imageContainer img").eq(6+i+index);
					tmpObj.css("left",(this.imageWidth+10)*(index-6+i)+10);
				}
			}
		}
	}

	this.moveImageForRight = function(obj,status){
		var index = parseInt(obj.get(0).name);
		var tmpObj;
		if (status) {
			if (index<6) {
				for(var i = 0 ; i<index;i++){
					tmpObj = $(".imageContainer img").eq(index-i-1);
					tmpObj.css("left",(this.imageWidth+10)*(index-3-i)+10);
				}
				for(var i = 0 ; i<index+1;i++){
					tmpObj = $(".imageContainer img").eq(6+index-i);
					tmpObj.css("left",(this.imageWidth+10)*(index-3-i)+10);
				}
			}else{
				for(var i = 0 ; i<index-6;i++){
					tmpObj = $(".imageContainer img").eq(index-i-1);
					tmpObj.css("left",(this.imageWidth+10)*(index-9-i)+10);
				}
				for(var i = 0 ; i<index+1-6;i++){
					tmpObj = $(".imageContainer img").eq(6+index-i);
					tmpObj.css("left",(this.imageWidth+10)*(index-9-i)+10);
				}
			}
		}else{
			if (index<6) {
				for(var i = 0 ; i<index;i++){
					tmpObj = $(".imageContainer img").eq(index-i-1);
					tmpObj.css("left",(this.imageWidth+10)*(index-i-1)+10);
				}
				for(var i = 0 ; i<index+1;i++){
					tmpObj = $(".imageContainer img").eq(6+index-i);
					tmpObj.css("left",(this.imageWidth+10)*(index-i)+10);
				}
			}else{
				for(var i = 0 ; i<index-6;i++){
					tmpObj = $(".imageContainer img").eq(index-i-1);
					tmpObj.css("left",(this.imageWidth+10)*(index-i-6-1)+10);
				}
				for(var i = 0 ; i<index+1-6;i++){
					tmpObj = $(".imageContainer img").eq(6+index-i);
					tmpObj.css("left",(this.imageWidth+10)*(index-i-6)+10);
				}
			}
		}
	}

	this.moveImageForBottom = function(obj,status){
		var index = parseInt(obj.get(0).name);
		var tmpObj;
		if (status) {
				for(var i = 0 ; i<18-index;i++){
					tmpObj = $(".imageContainer img").eq(index-6+i);
					tmpObj.css("left",(this.imageWidth+10)*(index-9+i)+10);
				}
				for(var i = 0 ; i<18-index-1;i++){
					tmpObj = $(".imageContainer img").eq(index+i+1);
					tmpObj.css("left",(this.imageWidth+10)*(index-9+i)+10);
				}
		}else{
				for(var i = 0 ; i<18-index;i++){
					tmpObj = $(".imageContainer img").eq(index-6+i);
					tmpObj.css("left",(this.imageWidth+10)*(index-12+i)+10);
				}
				for(var i = 0 ; i<18-index-1;i++){
					tmpObj = $(".imageContainer img").eq(index+i+1);
					tmpObj.css("left",(this.imageWidth+10)*(index-12+i+1)+10);
				}
		}
	}

	this.moveImageForBottomAndRight = function(obj,status){
		var index = parseInt(obj.get(0).name);
		var tmpObj;
		if (status) {
				for(var i = 0 ; i<index-12;i++){
					tmpObj = $(".imageContainer img").eq(index-i-1);
					tmpObj.css("left",(this.imageWidth+10)*(index-15-i)+10);
				}
				for(var i = 0 ; i<index-12+1;i++){
					tmpObj = $(".imageContainer img").eq(index-6-i);
					tmpObj.css("left",(this.imageWidth+10)*(index-15-i)+10);
				}

		}else{
				for(var i = 0 ; i<index-12;i++){
					tmpObj = $(".imageContainer img").eq(index-i-1);
					tmpObj.css("left",(this.imageWidth+10)*(index-13-i)+10);
				}
				for(var i = 0 ; i<index-12+1;i++){
					tmpObj = $(".imageContainer img").eq(index-6-i);
					tmpObj.css("left",(this.imageWidth+10)*(index-12-i)+10);
				}
		}
	}

}