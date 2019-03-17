// Name: Berkay Şenköylü
// Id: N16226846

// Create some global variables
var OFFSCREEN_WIDTH = 2048, OFFSCREEN_HEIGHT = 2048;

function main(){
	// Get canvas element
	var canvas = document.getElementById("shadow");
	// Get the webgl context
	var gl = getWebglContext(canvas);

	// Check for errors
	if(!gl){
		console.log("Failed to get the webgl context");
		return;
	}

	// Create a program that is going to handle the shadow mapping
	// and get attribute locations etc here, and check for errors that 
	// may be present while obtaining the attrib and uniform locations
	var shadowMappingProgram = new Program(gl, "shadow-vs", "shadow-fs"); 
	shadowMappingProgram.setVertexPositionAttributeName("aPosition");
	shadowMappingProgram.setModelViewProjectionMatrixUniformName("uMvpMatrix");
	if(shadowMappingProgram.aPosition < 0 || !shadowMappingProgram.uMvpMatrix){
		console.log("Failed to obtain the locations of the attribute and/or uniform variable for shadowMapping");
		return;
	}

	// Create a program that is going to handle the normal drawing
	// and get attribute locations etc here, and check for errors that 
	// may be present while obtaining the attrib and uniform locations
 	var normalDrawingProgram = new Program(gl, "normal-vs", "normal-fs");
 	normalDrawingProgram.setVertexPositionAttributeName("aPosition");
 	normalDrawingProgram.setVertexColorAttributeName("aColor");
 	normalDrawingProgram.setModelViewProjectionMatrixUniformName("uMvpMatrix");
    normalDrawingProgram.setModelViewProjectionMatrixFromLightUniformName("uMvpMatrixFromLight");
    normalDrawingProgram.setShadowMapUniformName("uShadowMap");

 	// Create meshes
 	var plane = createPlaneMesh(gl);
 	var cube = createCubeMesh(gl);
 	var triangle = createTriangleMesh(gl);
	var plane1 = createPlane1Mesh(gl);

	// Check if the meshes are created successfully
	if(!plane || !triangle){
	console.log("Failed to create meshes and set the respective vertex informations");
	return;
	}

	// Create a framebuffer object, which is going to be utilized in the process of 
	// shadow mapping.
	var frameBufferObject = createFrameBufferObject(gl);

	// Check to see if framebuffer object is created successfully
	if(!frameBufferObject){
		console.log("Failed to create a framebuffer object");
		return;
	}

	// Set a texture object to the texture unit (?)
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, frameBufferObject.texture);

	// Set the color and enable the depth test
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);

	// Set up the camera
	var camera = new Camera(gl, canvas);

	// Set up the light
	var light = new Light();
	// ===================== //

	// Since we are going to draw the scene from two different perspectives
	// we need different perspective and view matrices, for each shader programs.
	// Prepare view projection matrices from light's perspective and from the camera's perspective
	// For light's:
	var viewProjMatrixFromLight = new Matrix4(); 
	viewProjMatrixFromLight.setPerspective(70.0, OFFSCREEN_WIDTH/OFFSCREEN_HEIGHT, 1.0, 100.0);
	viewProjMatrixFromLight.lookAt(light.position[0], light.position[1], light.position[2], 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

	// For camera's:
	camera.position = [0.0, 7.0, 9.0];
	camera.calculateViewProjectionMatrix();
	//var viewProjMatrix = new Matrix4();
	//viewProjMatrix.setPerspective(45, canvas.width/canvas.height, 1.0, 100.0);
	//viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

	// Identify Scene objects, corresponding to the meshes that were created upstairs
	var planeSceneObject = new SceneObject(gl, plane);
	var cubeSceneObject = new SceneObject(gl, cube);
	var triangleSceneObject = new SceneObject(gl, triangle);
	var planeSceneObject1 = new SceneObject(gl, plane1);

	// Identify the features of the scene objects: position, rotation etc..
	planeSceneObject.rotationAxes = [0, 1, 1];
	planeSceneObject.rotationAngle = 0;
	planeSceneObject.localPosition = [0, 0, 0];

	cubeSceneObject.rotationAxes = [0, 1, 0];
	cubeSceneObject.localPosition = [0, 2, 2];
	cubeSceneObject.scale = [0.2, 0.2, 0.2]; 

	triangleSceneObject.rotationAxes = [0, 1, 0];
	triangleSceneObject.localPosition = [0, 1, 1];
	triangleSceneObject.scale = [0.25, 0.25, 0.25];

	planeSceneObject1.rotationAxes = [0, 1, 0];
	planeSceneObject1.localPosition = [3, 3, 0];
	planeSceneObject1.scale = [0.2, 0.2, 0.2];

	// Set up an angle to use in the naimation of some meshes
	var currentAngle = 0.0;

	var tick = function(){
		// Get a new angle for each step
		currentAngle = getNewAngle(currentAngle);

		// ====== SHADOW MAPPING ====== //

		// Set the drawing destination for framebuffer object
		// so that we can obtain the shadow depth map as a texture image
		gl.bindFramebuffer(gl.FRAMEBUFFER, frameBufferObject);

		// Set the view port for the frame buffer object
		gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

		// Clear for frame buffer object
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Use the corresponding shaders for shadow mapping (shadowMappingProgram)
		gl.useProgram(shadowMappingProgram.program);

		// Draw the meshes in the perspective of the light source
		// Animated objects' angles
		cubeSceneObject.rotationAngle = currentAngle; // CUBE
		triangleSceneObject.rotationAngle = -1 * currentAngle; // TRIANGLE
		planeSceneObject1.rotationAngle = currentAngle;
			
		drawAllSceneObjects(gl, shadowMappingProgram, viewProjMatrixFromLight);

		// End of shadow mapping, change to color buffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		camera.clearScene(gl);

		// ============================ //

		// ===== NORMAL DRAWING ===== //
		// Use the corresponding shaders for normal drawing (normalDrawingProgram)
		gl.useProgram(normalDrawingProgram.program);

		// Since gl.TEXTURE0 is enabled, pass the info in the correct index to the shader
		gl.uniform1i(normalDrawingProgram.uShadowMap, 0);

		// Draw the meshes normally
		drawAllSceneObjects(gl, normalDrawingProgram, camera.viewProjectionMatrix);
		
		// ========================== //

		window.requestAnimationFrame(tick, canvas);
	};
	tick();

	// ===== UI ELEMENTS ===== //
	var slider1 = createSlider("ROTATION SPEED: ", 40, 0, 200, function(){
		ANGLE_STEP = this.value;
	});
	// ======================= //
}

// Control the speed of the rotation here
var ANGLE_STEP = 40;

// For initiation
var last = Date.now();
function getNewAngle(angle){
	var now = Date.now();

  	// Elapsed time
	var elapsed = now - last;

  	// Last time becomes now
	last = now;

  	// Find a new angle by using elapsed and angle step, divide it with a number to further slowing it down
	var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;

  	// Return the 360's modulo of the newAngle
	return newAngle % 360;
}