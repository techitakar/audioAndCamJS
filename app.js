//camera
/*
navigator.mediaDevices.enumerateDevices()
.then(e=>{console.log(e);}) //to get input devices
 */

var canvas=document.querySelector('#canvas');
var context=canvas.getContext('2d');
var video=document.querySelector('#video');
var snap=document.querySelector('#snap');

var videoDevice=navigator.mediaDevices.getUserMedia({video:true});//create a video stream object
videoDevice.then(stream=>{
    video.srcObject=stream; 
    video.play();//since autoplay attribute is enabled, it will play.. you can set video.play() to an event listener likewise to video.stop()
})

snap.addEventListener('click',()=>{
    context.drawImage(video,0,0,600,400);
});


//audio

/*
The process of recording a stream is simple:
    1) Set up a MediaStream or HTMLMediaElement (in the form of an <audio> or <video> element) to serve as the source of the media data.
    2) Create a MediaRecorder object, specifying the source stream and any desired options.
    3) Set ondataavailable to an event handler for the dataavailable event; this will be called whenever data is available for you.
    4) Once the source media is playing and you've reached the point where you're ready to record video, call MediaRecorder.start() to begin recording.
    5) Your dataavailable event handler gets called every time there's data ready for you to do with as you will; the event has a data attribute whose value is a Blob that contains the media data. You can force a dataavailable event to occur, thereby delivering the latest sound t you so yoou can filter it, save it, or whatever.
    6) You can stop recording at any time by calling MediaRecorder.stop().
*/

var audioStart=document.querySelector('#audioStart');
var audioStop=document.querySelector('#audioStop');
var audio=document.querySelector('#audio');
var items=[];
var recorder;

var audioDevice=navigator.mediaDevices.getUserMedia({audio:true});//..1)creating stream
audioStart.addEventListener('click',()=>{
    audioStart.textContent="Recording started....."
    audioDevice.then(stream=>{
        recorder =new MediaRecorder(stream);//..2)passing stream to an object
        recorder.ondataavailable=e=>{//..3)
            items.push(e.data);
            if(recorder.state=='inactive'){
                var blob=new Blob(items,{type:'audio/webm'});//The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data
                audio.setAttribute('controls','controls');
                audio.innerHTML='<source src="'+URL.createObjectURL(blob)+'" type="video/webm"/>';
            }
        }
        recorder.start();//..5)
    }
)
}
);

audioStop.addEventListener('click',()=>{
    audioStart.textContent="Start Recording Audio"
    recorder.stop();//..6)
    }
);