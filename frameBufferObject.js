// Name: Berkay Şenköylü
// Id: N16226846

function createFrameBufferObject(gl){
	var framebuffer, texture, depthBuffer;

	// Define a function that handles errors
	var error = function(){
		if(framebuffer) gl.deleteFrambuffer(framebuffer);
		if(texture) gl.deleteTexture(texture);
		if(depthBuffer) gl.deleteRenderbuffer(depthBuffer);

		return null;
	}

	// Create a framebuffer object
	framebuffer = gl.createFramebuffer();
	if(!framebuffer){
		console.log("Failed to create frame buffer object");
		return error();
	}

	// Create a texture object and set its size and parameters
	texture = gl.createTexture();
	if(!texture){
		console.log("Failed to create texture object");
		return error();
	}
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2048, 2048, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	// Create a renderbuffer object and set its size and parameters
	depthBuffer = gl.createRenderbuffer();
	if(!depthBuffer){
		console.log("Failed to create render buffer object");
		return error();
	}
	gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 2048, 2048);

	// Attach the texture and the renderbuffer object to the framebuffer object
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

	// Check if framebuffer object is configured correctly
	var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	if(gl.FRAMEBUFFER_COMPLETE !== e){
		console.log("Frame buffer object is incomplete: " + e.toString());
		return error();
	}

	// Keep the required object
	framebuffer.texture = texture;

	// Unbind the buffer object
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);

	return framebuffer;
}