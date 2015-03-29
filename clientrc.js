var net=require("net");

var client=net.Socket();
client.connect(3000,function(){
	console.log("Connected to Server");
	// var helloer=setInterval(function(){
	// 	client.write("Hello Server");}, 1000);

	client.on("data", function(data){
		var text=data.toString().trim();
		console.log(text);
		});
		process.stdin.setEncoding('utf8');
		process.stdin.on('readable', function (){
		var chunk = process.stdin.read();
		if(chunk!= null){
			client.write(chunk);
		}
		});
	client.on("end", function(){
		console.log("disconnected from server");
		//clearInterval(helloer);
		});
	});