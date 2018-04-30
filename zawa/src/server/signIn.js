navigator.mediaDevices.getUserMedia({audio: true})
                            .then(
                                function(stream){
                                    gotMedia(stream);
                                })
                            .catch(
                                function(err){
                                    console.log(err);
                                }
                            );
window.PeerId = '';
                            
function gotMedia(stream){
    let idHost = '';
    let idUser = '';
    if(location.hash === '#host'){
        // console.log(document.getElementById('connectID').parentNode);
        // document.getElementById('connectID').parentNode.setAttribute('class', 'hide');
        // let peer1 = new Peer({key:'0fvhgmfjuf53766r'});
        // let peer1 = new Peer({
        //     config: {'iceServers': [
        //         // { url: 'stun:stun.l.google.com:19302' },
        //         { url: 'turn:112.23.227.91:3478', username:'u1',credential: 'p1' }
        //       ]} /* Sample servers, please use appropriate ones */
        // });

        /** 
        let peer1 = new Peer({
            config: {'iceServers': [
              { url: 'stun:stun.l.google.com:19302' },
              { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
            ]} //Sample servers, please use appropriate ones 
          });
          */

        let peer1 = new Peer({host: '123.206.180.98', port: 9000, path: '/'});

        peer1.on('open',function(id){
            console.log('peer1 opening');
            idHost += id;
            window.PeerId = id;
            document.getElementById('MyID').textContent = idHost;
        });
        peer1.on('call',function(call){
            call.answer(stream);
            console.log('peer1 resived');
            console.log('callProp: ', call.open);
            call.on('stream',function(stream){
                var video = document.createElement('video');
                // document.getElementById('SignTab').appendChild(video)
                //video.src = window.URL.createObjectURL(stream)
                video.srcObject = stream;   
                document.body.appendChild(video);
                video.play();
                document.getElementById('SignTab').hidden = true;
                // Initialize the React VR application
                ReactVR.init(
                    // When you're ready to deploy your app, update this line to point to
                    // your compiled index.bundle.js
                    '../index.vr.bundle?platform=vr&dev=true',
                    // Attach it to the body tag
                    document.body
                );
            })
            // if(call.open){
            //     var video = document.createElement('video');
            //     //video.src = window.URL.createObjectURL(stream)
            //     video.srcObject = stream;   
            //     document.body.appendChild(video);
            //     video.play();
            //     document.getElementById('SignTab').hidden = true;
            //     // Initialize the React VR application
            //     ReactVR.init(
            //         // When you're ready to deploy your app, update this line to point to
            //         // your compiled index.bundle.js
            //         '../index.vr.bundle?platform=vr&dev=true',
            //         // Attach it to the body tag
            //         document.body
            //     );
            // }
        });
    }else{
        // let peer2 = new Peer({key:'0fvhgmfjuf53766r'});
        // let peer2 = new Peer({
        //     config: {'iceServers': [
        //         { url: 'stun:stun.l.google.com:19302' },
        //         { url: 'turn:webrtcweb.com:7788', username:'muazkh',credential: 'muazkh' }
        //       ]} /* Sample servers, please use appropriate ones */
        // });

        /** 
        let peer2 = new Peer({
            config: {'iceServers': [
              { url: 'stun:stun.l.google.com:19302' },
              { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
            ]} // Sample servers, please use appropriate ones 
          });
          */
        let peer2 = new Peer({host: '123.206.180.98', port: 9000, path: '/'});
         
        peer2.on('open',function(id){
            console.log('peer2 opening');
            idUser += id;
        })
        let callHost = [];
            
            document.getElementById('confirm').addEventListener('click',()=>{
                idHost = document.getElementById('MyID').value;
                window.PeerId = idHost
                callHost = peer2.call(idHost,stream);
                console.log('idHost: ',idHost);
                
                callHost.on('stream',function(stream){
                    console.log('audio connected');
                    console.log(callHost.open)
                    var video = document.createElement('video');
                    //video.src = window.URL.createObjectURL(stream)
                    video.srcObject = stream;   
                    document.body.appendChild(video);
                    video.play();
                    document.getElementById('SignTab').hidden = true;
                    // Initialize the React VR application
                    ReactVR.init(
                        // When you're ready to deploy your app, update this line to point to
                        // your compiled index.bundle.js
                        '../index.vr.bundle?platform=vr&dev=true',
                        // Attach it to the body tag
                        document.body
                    );
                })
            })
    }
}



// var peer1 = new Peer({key:'0fvhgmfjuf53766r'});
// var peer2 = new Peer({key:'0fvhgmfjuf53766r'});

// var idHost = '';
// var idRoom = '';
// let conn1;
// let conn2;
// peer1.on('open',function(id){
//     idHost = idHost+id;
//     console.log("peer1 on",idHost);
    
// });
// peer2.on('open',function(id){
//     idRoom += id;
//     console.log('peer2 on',id);
//     conn2 = peer2.connect(idHost);
//     console.log('conn2:', conn2);
//     conn2.on('open',function(){
//         console.log('conn2 open');
//         conn2.send('hi');
//     });
    
// })




// peer1.on('connection',function(conn){
//     console.log(('peer1 connection'));
//     conn.on('open',function(){
//         console.log('conn1 open');
//     })
//     conn.on('data',function(data){
//         console.log('data:',data);
//         // console.log(data);
//     })
//     // Initialize the React VR application
//     ReactVR.init(
//         // When you're ready to deploy your app, update this line to point to
//         // your compiled index.bundle.js
//         '../index.vr.bundle?platform=vr&dev=true',
//         // Attach it to the body tag
//         document.body
//       );
// })

