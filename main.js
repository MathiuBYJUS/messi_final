object=[];
status="";

function preload()
{
 video=createVideo('messi.mp4');

}

function setup()
{
    canvas=createCanvas(400,400);
    canvas.center();
    video.hide();
}

function Start()

{
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="se estan detectando objetos";

}

function modelLoaded()
{
    console.log("El modela esta cargado");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,result)
{
if (error)
{
    console.log(error);
}

else 
{
    console.log(result);
    object=result;

}
}

function draw()
{
    image(video, 0, 0, 400, 400);
    if(status != "")
    {
      objectDetector.detect(video, gotResult);
      for (i = 0; i < object.length; i++) {
        document.getElementById("status").innerHTML = "Estado: objeto detectado";
        document.getElementById("objetos_detectados").innerHTML = "Número de objetos detectados: "+ object.length;

        fill("#FF0000");
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
      }
    }
}

    
