// Name: Berkay Şenköylü
// Id: N16226846

function Camera(gl, canvas){
	this.position = [0, 0, 0];
	this.lookAt = [0, 0, 0];
	this.globalUp = [0, 1, 0];

	this.near = 1.0;
	this.far = 100.0;
	this.fieldOfViewOfY = 45;
	this.aspect = canvas.width / canvas.height;

	this.viewProjectionMatrix = new Matrix4();

	this.calculateViewProjectionMatrix = function(){
		this.viewProjectionMatrix.setPerspective(this.fieldOfViewOfY, this.aspect, this.near, this.far);
		this.viewProjectionMatrix.lookAt(this.position[0], this.position[1], this.position[2],
			this.lookAt[0], this.lookAt[1], this.lookAt[2], this.globalUp[0], this.globalUp[1], this.globalUp[2]);
	}

	this.clearScene = function(gl){
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);

		gl.viewport(0, 0, canvas.width, canvas.height);
	}
}