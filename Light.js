// Name: Berkay Şenköylü
// Id: N16226846

function Light(){
	this.position = [0, 8, 3];

	this.diffuseColor = [1.0, 1.0, 1.0, 1.0];
	this.ambientColor = [0.2, 0.2, 0.2, 1.0];

	this.sendLightInformation = function(gl, program){
		if(program.uLightPosition != undefined)
			gl.uniform3f(program.uLightPosition, false, this.position[0], this.position[1], this.position[2]);

		if(program.uDiffuseColor != undefined)
			gl.uniform3f(program.uDiffuseColor, false, this.diffuseColor[0], this.diffuseColor[1], this.diffuseColor[2]);

		if(program.uAmbientColor != undefined)
			gl.uniform3f(program.uAmbientColor, false, this.ambientColor[0], this.ambientColor[1], this.ambientColor[2]);

	}
}