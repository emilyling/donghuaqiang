function PhotoSlider()
{

}
PhotoSlider.prototype.images = new Array();
PhotoSlider.prototype.timeInternal = 0;
PhotoSlider.prototype.timer= null;
PhotoSlider.prototype.timerIndex= 0;
PhotoSlider.prototype.animationType= "random";
//PhotoSlider.prototype.animationType= "tada";

PhotoSlider.prototype.init = function(initObj){

	this.timeInternal = initObj.time;
	this.animationType = initObj.animationType;

	for (var i=0 ; i< $(".imageContainer img:not(.static)").length+2;i++) {
			this.images.push($(".imageContainer img:not(.static)").eq(i).attr('src'));
	}
	this.startTimer();
}

PhotoSlider.prototype.startTimer = function(){
	var _this = this;
	this.timer = setInterval(function(){
		_this.changePic();
	},this.timeInternal);
}

PhotoSlider.prototype.stopTimer  = function(){
	if(timer != null){
		clearInterval(this.timer);	
	}
}

PhotoSlider.prototype.changePic= function(){
	var _this = this;
	var num1 = Math.floor(Math.random()*this.images.length);
	var num2 = Math.floor(Math.random()*this.images.length);

	if(num1 != num2){
		setTimeout(function(){
			_this.changeAnotherPic(num2);
		},150*Math.floor(Math.random()*10));
	}
	this.timerIndex ++;
	if(this.timerIndex >= this.images.length){
		this.timerIndex = 0;
	}
	var imageObj = $(".imageContainer img:not(.static)").eq(num1);
	if(!imageObj.hasClass('hover')){
		//imageObj.css("opacity",0.75);
		imageObj.attr('src',_this.images[_this.timerIndex]);	
		_this.detectAnimationEvent(imageObj);
	}else{
		//this.changePic();
	}
}

PhotoSlider.prototype.changeAnotherPic = function(imageNum){
	var _this = this;
	var imageArrayNum = Math.floor(Math.random()*this.images.length);
	var imageObj = $(".imageContainer img:not(.static)").eq(imageNum);
	if(!imageObj.hasClass('hover')){
		//imageObj.css("opacity",0.75);
		imageObj.attr('src',_this.images[imageArrayNum]);
		_this.detectAnimationEvent(imageObj);
	}
}

PhotoSlider.prototype.detectAnimationEvent = function(imageObj){
	var _this = this;
	var animationIndex = Math.floor(Math.random()*this.animations.length);
	var type = this.animationType=="random"?this.animations[animationIndex]:this.animationType;
	imageObj.addClass("animated "+type);	

	imageObj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		function(){
			imageObj.removeClass("animated "+type);	
			imageObj.css("opacity",1);
		});
}

PhotoSlider.prototype.animations = ["bounce",
"flash","pulse","rubberBand","shake","headShake","swing","tada","wobble","jello","bounceIn","fadeIn","flipInX",
"flipInY","rollIn","zoomIn","lightSpeedIn","slideInUp","rotateIn"];