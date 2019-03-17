// Name: Berkay Şenköylü
// Id: N16226846

// Function handling the shader creation
function loadShader(gl, type, sourceCode){
	// Create a shader object
	var shader = gl.createShader(type);

	// Check if there is an error in the creation process
	if(shader == null){
		console.log("Failed to create a shader.");

		return null;
	}

	// Correspond the shader with its source code
	gl.shaderSource(shader, sourceCode);

	// Compile the shader
	gl.compileShader(shader);

	// Check if the compilation of shader went properly
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		console.log("Failed to compile shader: " + gl.getShaderInfoLog(shader));

		// Delete the shader
		gl.deleteShader(shader);

		return null;
	}

	return shader;
}

// Utilize google's webgl utils to set up webgl
function getWebglContext(canvas){
	// Get the rendering context for webgl
	var gl = WebGLUtils.setupWebGL(canvas);

	// Check if it is done successfully
	if(!gl){
		return null;
	}

	return gl;
}