// Name: Berkay Şenköylü
// Id: N16226846

// Program object
function Program(gl, vertexShaderId, fragmentShaderId){
	this.name = "myProgram";

	// Get the source codes of the shaders
	var vertexShaderSource = document.getElementById(vertexShaderId).innerHTML;
	var fragmentShaderSource = document.getElementById(fragmentShaderId).innerHTML;

	// Create shader objects and assign them as attributes of the program
	this.vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	this.fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	// Check to see whether shader objects are created successfully
	if(!this.vertexShader || !this.fragmentShader){	
		console.log("Failed to create/load shaders successfully.");

		// Return null to check it upstairs (see line 9)
		return null;
	}

	// Create a program object
	this.program = gl.createProgram();

	// Check if the program object is created successfully
	if(!this.program){
		console.log("Failed to create a program.");

		// Return null to be able to check later (see line 9)
		return null;
	}

	// Attach the shaders that were created
	gl.attachShader(this.program, this.vertexShader);
	gl.attachShader(this.program, this.fragmentShader);

	// Link the program
	gl.linkProgram(this.program);

	// Check if the program is linked properly
	if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)){
		console.log("Failed to link program: " + gl.getProgramInfoLog(this.program));

		// Clear the mess
		gl.deleteProgram(this.program);
		gl.deleteShader(this.vertexShader);
		gl.deleteShader(this.fragmentShader);

		// Return null to check elsewhere
		return null; 
	}

	this.setVertexPositionAttributeName = function(vertexPositionAttributeName){
        this.aPosition = gl.getAttribLocation(this.program, vertexPositionAttributeName);
    }

    this.setVertexColorAttributeName = function(vertexColorAttributeName){
        this.aColor = gl.getAttribLocation(this.program, vertexColorAttributeName);
    }

    this.setModelViewProjectionMatrixUniformName = function(modelViewProjectionMatrixUniformName){
        this.uMvpMatrix = gl.getUniformLocation(this.program, modelViewProjectionMatrixUniformName);
    }

    this.setModelViewProjectionMatrixFromLightUniformName = function(modelViewProjectionMatrixFromLightUniformName){
        this.uMvpMatrixFromLight = gl.getUniformLocation(this.program, modelViewProjectionMatrixFromLightUniformName);
    }

    this.setShadowMapUniformName = function(shadowMapUniformName){
    	this.uShadowMap = gl.getUniformLocation(this.program, shadowMapUniformName);
    }
}