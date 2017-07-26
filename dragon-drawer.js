
/*
Dragon Fractal with Triangles Program
Author: Gideon Jeffrey
Created: June 22nd, 2017

This interactive program draws a kind of fractal very similar to what's called a "dragon curve," but I thought I'd try it with triangles instead of line segments!  It was originally written as a project on Khan Academy: https://www.khanacademy.org/computer-programming/triangle-spin-off-dragon-fractal-with-triangles/5085265758322688.  They use JavaScript / ProcessingJS.
*/

//MAIN DRAGON FUNCTION CODE

var dragon = function(xStart, yStart, xEnd, yEnd, itNum, color) {
    
    var triangles = [{x1: xStart, y1: yStart, x2: xEnd, y2: yEnd, x3: xStart + (xEnd - xStart)/2 - (yEnd - yStart)/2, y3: yStart + (yEnd - yStart)/2 + (xEnd - xStart)/2}];
    /* This creates an array with one object in it, an object that contains x and y coordinates for all the vertices of the initial triangle.  The parameters xStart, yStart, xEnd, and yEnd - if you drew a line between them - form the base of a right isosceles triangle, the way I've set things up here.
    */
    
    var length = triangles.length;
    
    while (length < pow(2, itNum)) {
        for (var i = 0; i < length; i++) 
        {
            triangles.splice(2*i, 1, {x1: triangles[2*i].x3, y1: triangles[2*i].y3, x2: triangles[2*i].x2, y2: triangles[2*i].y2, x3: triangles[2*i].x3 + (triangles[2*i].x2 - triangles[2*i].x3)/2 - (triangles[2*i].y2 - triangles[2*i].y3)/2, y3: triangles[2*i].y3 + (triangles[2*i].y2 - triangles[2*i].y3)/2 + (triangles[2*i].x2 - triangles[2*i].x3)/2}, {x1: triangles[2*i].x3, y1: triangles[2*i].y3, x2: triangles[2*i].x1, y2: triangles[2*i].y1, x3: triangles[2*i].x3 + (triangles[2*i].x1 - triangles[2*i].x3)/2 - (triangles[2*i].y1 - triangles[2*i].y3)/2, y3: triangles[2*i].y3 + (triangles[2*i].y1 - triangles[2*i].y3)/2 + (triangles[2*i].x1 - triangles[2*i].x3)/2});
        }
        length = length*2;
    }
    /* This code modifies the initial array, replacing the existing objects with objects that contain the x and y positions of the next iteration's triangles.  It looks a bit of a mess - but it works!
    */
    
    for (var i = 0; i < length; i++) {
        noStroke();
        fill(color);
        triangle(triangles[i].x1, triangles[i].y1, triangles[i].x2, triangles[i].y2, triangles[i].x3, triangles[i].y3);
    }
    /*Finally, this section of code draws a triangle with the vertices contained in every object in the above array.
    */
    
};

// ENVIRONMENT CODE

var itNumNow = -1; //starts here since we'll add 1 by clicking the left button.

noStroke();

textAlign(CENTER, CENTER);
textSize(20);
fill(3, 3, 3);
text("Dragon Fractal with Triangles", 200, 40); //title text

textSize(16);
text("Click the left button to get started!", 200, 70); //prompt text
        
fill(0, 255, 38);
ellipse(50, 100, 40, 40);
textSize(10);
fill(3, 3, 3);
text ("Increase iterations", 50, 130); //Left button and caption
fill(255, 0, 0);
ellipse(350, 100, 40, 40);
fill(3, 3, 3);
text ("Decrease iterations", 350, 130); //Right button and caption

// CODE TO DRAW THE FRACTAL INTERACTIVELY

draw = function() {
    
    /*  There are two big "if" statements here - the first telling the program to draw a dragon fractal with a HIGHER iteration number if the "Increase iterations" button is pressed, the second telling the prgram to draw a dragon fractal with a LOWER iteration number if the "Decrease iterations" button is pressed.
    */
    

    // LEFT BUTTON CODE
    if (mouseIsPressed && itNumNow < 15 && sqrt(sq(mouseX - 50) + sq(mouseY - 130)) < 40) {
        itNumNow += 1;

        background(255, 255, 255); 
        /* Since we need the background to reset to white each time the new iteration of the fractal is drawn, we need to re-draw the environment - making slight changes depending on what the value of the itNumNow variable is.
        */
        
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(3, 3, 3);
        text("Dragon Fractal with Triangles", 200, 40);

        textSize(16);
        if (itNumNow === 1) {
            text("after " + itNumNow + " iteration", 200, 70);
        }
        else {
            text("after " + itNumNow + " iterations", 200, 70);
        }
        
        fill(0, 255, 38);
        ellipse(50, 100, 40, 40);
        textSize(10);
        fill(3, 3, 3);
        text("Increase iterations", 50, 130);
        fill(255, 0, 0);
        ellipse(350, 100, 40, 40);
        fill(3, 3, 3);
        text("Decrease iterations", 350, 130);
    
        dragon(100, 230, 300, 230, itNumNow, color(212, 34, 34));
    
    }
    
    //RIGHT BUTTON CODE
    
    if (mouseIsPressed && sqrt(sq(mouseX - 350) + sq(mouseY - 130)) < 40 && itNumNow > -1) {
        
        itNumNow -= 1;

        background(255, 255, 255);
        
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(3, 3, 3);
        text("Dragon Fractal with Triangles", 200, 40);

        textSize(16);
        if (itNumNow === 1) {
        text("after " + itNumNow + " iteration", 200, 70);
        }
        else if (itNumNow === -1) {
            text("Negative iterations aren't a thing :-)", 200, 70);
            itNumNow = itNumNow + 1;
            // (They aren't.  Not for this program, at least!)
        }
        else {
        text("after " + itNumNow + " iterations", 200, 70);
        }
        
        fill(0, 255, 38);
        ellipse(50, 100, 40, 40);
        textSize(10);
        fill(3, 3, 3);
        text("Increase iterations", 50, 130);
        fill(255, 0, 0);
        ellipse(350, 100, 40, 40);
        fill(3, 3, 3);
        text("Decrease iterations", 350, 130);
        
        dragon(100, 230, 300, 230, itNumNow, color(212, 34, 34));
    } 
    
    if (itNumNow > 14) {
        textAlign(CENTER, CENTER);
        textSize(13);
        fill(3, 3, 3);
        text("Sorry, I'm a little program and can't do more than 15 iterations!", 200, 380);
        /* I discovered this when testing the dragon function - any higher than 15 seems to make the Oh Noes guy stress out. */
        return;
    }
};

/* If you want to just experiment with the dragon function itself, you can comment out the code for the environment and the draw function and just call the dragon function a bunch of times, changing the arguments you pass to it, and see what happens! 
*/

