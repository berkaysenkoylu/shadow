// Name: Berkay Şenköylü
// Id: N16226846

function SceneObject(gl, mesh){
	this.mesh = mesh;

	this.modelMatrix = new Matrix4();
	this.mvpMatrix = new Matrix4();

	this.scale = [1, 1, 1];
	this.localPosition = [0, 0, 0];
	this.rotationAngle = 0;
	this.rotationAxes = [0, 1, 0];

	if(!window.sceneObjects){
		window.sceneObjects = [];
	}

	window.sceneObjects.push(this);

	// Funtion that calculates the model matrix
	this.calculateModelMatrix = function(){
		this.modelMatrix.setRotate(this.rotationAngle, this.rotationAxes[0], this.rotationAxes[1], this.rotationAxes[2]);
		this.modelMatrix.translate(this.localPosition[0], this.localPosition[1], this.localPosition[2]);
		this.modelMatrix.scale(this.scale[0], this.scale[1], this.scale[2]);
	}

	// Function that draws the meshes
	this.draw = function(gl, program, viewProjectionMatrix){
		// Enable the attributes (position)
		initializeAttributeVariable(gl, program.aPosition, this.mesh.vertexBuffer);

		// Check for color, if it exists, enable it too
		if(program.aColor != undefined){
			initializeAttributeVariable(gl, program.aColor, this.mesh.colorBuffer);
		}

		// Bind the buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);

		// Calculate the Model View Projection matrix:
		// First calculate the model matrix
		this.calculateModelMatrix(); 

		// Move to form the mvpMatrix
		this.mvpMatrix.set(viewProjectionMatrix);
		this.mvpMatrix.multiply(this.modelMatrix);

		// Send the model view projection matrix to the shader
		gl.uniformMatrix4fv(program.uMvpMatrix, false, this.mvpMatrix.elements);

		// Draw
		gl.drawElements(gl.TRIANGLES, this.mesh.numberOfIndices, gl.UNSIGNED_BYTE, 0);
	}
}

function drawAllSceneObjects(gl, program, viewProjectionMatrix){
	for(var i = 0; i < window.sceneObjects.length; i++){
		if(program.uMvpMatrixFromLight != undefined)
			gl.uniformMatrix4fv(program.uMvpMatrixFromLight, false, window.sceneObjects[i].mvpMatrix.elements);
     	window.sceneObjects[i].draw(gl, program, viewProjectionMatrix);
    }
}


function initializeAttributeVariable(gl, attribute, buffer){
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(attribute, buffer.number, buffer.type, false, 0, 0);
	gl.enableVertexAttribArray(attribute);
}