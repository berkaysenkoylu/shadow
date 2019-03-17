// Name: Berkay Şenköylü
// Id: N16226846

function Mesh(gl, vertices, indices, number=3){
	this.numberOfIndices = indices.length;

	this.vertexBuffer = createArrayBuffer(gl, vertices, number, gl.FLOAT);
	this.indexBuffer = createElementArrayBuffer(gl, indices, gl.UNSIGNED_BYTE);

	this.setColors = function(colors){
		this.colorBuffer = createArrayBuffer(gl, colors, number, gl.FLOAT);
	}
}

// MESHES (more can be added) //
function createPlaneMesh(gl){
	// Vertex coordinates
    var vertices = new Float32Array([
    	5.0, -1.7, 5.0,   -5.0, -1.7, 5.0,   -5.0, -1.7, -5.0,   5.0, -1.7, -5.0
    ]);

    // Colors
    var colors = new Float32Array([
      1.0, 1.0, 1.0,   1.0, 1.0, 1.0,   1.0, 1.0, 1.0,   1.0, 1.0, 1.0
    ]);

    // Indices
    var indices = new Uint8Array([0, 1, 2,   0, 2, 3]);

    var planeMesh = new Mesh(gl, vertices, indices, 3);
    planeMesh.setColors(colors);
    return planeMesh;
}

function createCubeMesh(gl){
	// Vertex coordinates
  	var vertices = new Float32Array([
    	1.0,  1.0,  1.0,  
   	  -1.0,  1.0,  1.0,  
   	  -1.0, -1.0,  1.0,
    	1.0, -1.0,  1.0,
    	1.0, -1.0, -1.0,
    	1.0,  1.0, -1.0, 
   	  -1.0,  1.0, -1.0,
   	  -1.0, -1.0, -1.0
    ]);

    // Colors
    var colors = new Float32Array([
    	1.0,  1.0,  1.0, 
    	1.0,  0.0,  1.0,
    	1.0,  0.0,  0.0,
    	1.0,  1.0,  0.0,
    	0.0,  1.0,  0.0,
    	0.0,  1.0,  1.0,
    	0.0,  0.0,  1.0,
    	0.0,  0.0,  0.0
    ]);

    // Indices
    var indices = new Uint8Array([
    	0, 1, 2,   0, 2, 3,    // front
    	0, 3, 4,   0, 4, 5,    // right
    	0, 5, 6,   0, 6, 1,    // up
    	1, 6, 7,   1, 7, 2,    // left
    	7, 4, 3,   7, 3, 2,    // down
    	4, 7, 6,   4, 6, 5     // back
    ]);

    var cubeMesh = new Mesh(gl, vertices, indices, 3);
    cubeMesh.setColors(colors);
    return cubeMesh;
}

function createTriangleMesh(gl){
	// Vertex coordinates
	var vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);

	// Colors
	var colors = new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0,  0.0, 0.0, 1.0]);

	// Indices
	var indices = new Uint8Array([0, 1, 2]);

	var triangleMesh = new Mesh(gl, vertices, indices, 3);
	triangleMesh.setColors(colors);
	return triangleMesh;
}

function createPlane1Mesh(gl){
	// Vertex coordinates
    var vertices = new Float32Array([
    	2.0, -1.0, 2.0,   -2.0, -1.0, 2.0,   -2.0, -1.0, -2.0,   2.0, -1.0, -2.0
    ]);

    // Colors
    var colors = new Float32Array([
      0.0, 1.0, 1.0,   0.0, 1.0, 0.4,   1.0, 0.0, 1.0,   1.0, 0.0, 0.0
    ]);

    // Indices
    var indices = new Uint8Array([0, 1, 2,   0, 2, 3]);

    var planeMesh = new Mesh(gl, vertices, indices, 3);
    planeMesh.setColors(colors);
    return planeMesh;
}
// ========================== //




// ===== Functions to handle buffers ===== //

// Function that handles the creation of an array buffer
function createArrayBuffer(gl, data, number, type){
  // Create a buffer object
  var buffer = gl.createBuffer();

  // Check for errors while creating the buffer object
  if(!buffer){
    console.log("Failed to create a buffer object");
    return null;
  }

  // Activate the buffer object that is just created
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // Write the data into the activated buffer object
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Store some useful info, for later use in vertexAttribPointer procedure later
  buffer.number = number;
  buffer.type = type;

  // Return the buffer
  return buffer;
}

// Function that handles the creation of an element array buffer
function createElementArrayBuffer(gl, data, type){
  // Create a buffer object
  var buffer = gl.createBuffer();

  // Check for errors while creating the buffer object
  if(!buffer){
    console.log("Failed to create a buffer object");
    return null;
  }

  // Activate the buffer object that is just created
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

  // Write the data into the activated buffer object
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Store some useful info, for later use in vertexAttribPointer procedure later
  buffer.type = type;

  // Return the buffer
  return buffer;
}

// ======================================= //