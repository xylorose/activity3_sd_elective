console.log("index.js");
// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
    client.on('connect', function() {
        console.log('connected')
        $('#subBtn').click(function() {
            console.log(" sub-btn clicked");
            let subTopic = $('#sub-input').val()
            client.subscribe(subTopic, function(err) {
                if (err) {
                    console.log(err)
                }
            })
            subTopic = "";
        })
    })
    client.on('message', function(topic, message) {
            // message is Buffer
        console.log(topic.toString())
        console.log(message.toString())
        let tpc = topic.toString();
        let msg = message.toString();
        $('#msg').prepend(`<tr><td>${tpc}</td><td>${msg}</td></tr>`)
            //   client.end()
    })

    var pub_button = document.getElementById('pubBtn');
    pub_button.addEventListener('click', () => {
        let topic = document.getElementById('pub-input').value;
        let pub_input = document.getElementById('pub-input-payload').value;

        client.publish(topic, pub_input)

        topic = "";
        pub_input = "";
    })