var fs=require("fs"), net=require("net");
//Mustache=require("Mustache")
var Question=function(){
//get random numbers to add/multiply/subtract
	this.num= parseInt((Math.floor(Math.random()*10)), 10);
	this.num1= parseInt((Math.floor(Math.random()*10)), 10);
//get a random operator from this array
	var operators=["+","-","*"];
	this.operator=(operators[Math.floor(Math.random()*3)]);
	this.equation=this.num+" "+this.operator+" "+this.num1;
//What is the correct answer for the equation?
	this.answer=function(){
		//What operator are we using? Equation parser
		if (this.operator=== "*"){
			return this.num*this.num1;
		}else if(this.operator=== "-"){
			//Which is smaller? subtract small from large.
			return this.num-this.num1;
		} else if(this. operator=== "+"){
			return this.num+this.num1;
		}else{
			return "error";
		}
	};
//does the user's answer match the correct answer?
	this.answerCheck=function(ans){
		var correct=false;
		if(ans===this.answer()){
			correct=true;
		}
		return correct;
	};
};
//how many equations do you want
var maxEquations=10;
var eqarray = [];
for (var i=0; i<maxEquations; i++){
	eqarray.push(new Question());
	}
 console.log(eqarray);
var q=[];
for(var i=0;i<eqarray.length;i++){	
	q.push(eqarray[i].equation.toString());
}
//How many are wrong?
//How many are correct?
var right1=0, counter=0, wrong1=0, mathQ=0, port=3000;

//Where is history saved?
var history=[];
var hf="chathistory.json";
var User=function(socket){
	this.socket=socket;
	this.name="person";
	console.log(this.name);

};

var getHist=function(){
	fs.readFile(hf, function(err,data){
		if(err){
			console.log("creating history file.");
		} else{
			history= JSON.parse(data);
			console.log(history);
		}
		});
};
getHist();
var addHist=function(){
	fs.writeFile(hf, JSON.stringify(history),function(err){
		if(err){
			console.log("There is the following error: err");
		}
		});
};
setInterval(addHist,100000);

var users=[], clientCounter=-1;
var setup=function(){
var server=net.createServer(function(socket){
	clientCounter++;
	var user=new User(socket);
	users.push(user);
	console.log(clientCounter);
	console.log("Client, "+clientCounter+", has connected.");
	socket.write("Welcome, you are connector Number: "+clientCounter+"\n"+"At any time, type /commands to learn what you can do.\nFor now: Please select a Username whatever you type will be your user name!\n");
	console.log(users[clientCounter].name)
	socket.once("data", function(data){
		var namedata=data.toString().trim();
		user.name=namedata;
		user.socket.write("welcome: "+user.name+"! Thank you for joining!\n");
		user.socket.write(history.toString());
		socket.on("data",function(data){
			var text=data.toString().trim();
			var sayAll=function(){
				var speech=user.name+">: "+text+"\n";
				history.push(speech);
				for(var i=0;i<users.length;i++){
					users[i].socket.write(speech);
				}
			}

			if(text[0]==="/"){
				if(text==="/mathgame"){
					//mathGame();
					console.log("math");
				}
			}else{
				sayAll();
			}
			}); 
		});

// var mathGame= function(){
// 	// socket.once("data", function(err, data)){
// 	// 	if(err){
// 	// 		console.log(data)
// 	// 	}
// 		//make answers behave nicely.
// 		var text= data.toString().trim();
// 		//console.log(text);		
// 		var num=parseInt(text,10);
// 		// var mathGame=function(){
// 		console.log(num);
// 		//console.log("pre anything"+q[counter]);
// 		// if(text.toLowerCase().search("math game")!=-1){ 
// 			if(text.toLowerCase().search("math game")!=-1){
// 				console.log(text);
// 				if(eqarray[counter].answerCheck(num)){
// 					right1++;
// 					socket.write("\nGood Job! "+right1+"/10\n");
// 					counter++;
// 					//console.log("correct"+counter);
// 					socket.write("\n"+q[counter]+"\n");
// 					wrong1=0;
// 				}else{
// 					socket.write("\nSorry that's not correct\n");
// 					wrong1++;
// 					console.log("wrong  "+wrong1);
// 					//Have another try!
// 					if(wrong1<2){
// 						socket.write("\n"+q[counter]+"\n");
// 						//console.log("else if"+counter);
// 					} else{
// 						socket.write("\nWe'll try the next one\n");
// 						counter++;
// 						//console.log(q[counter]);
// 						socket.write("\n"+q[counter]+"\n");
// 						//console.log("elseelse"+counter);
// 						wrong1=0;
// 					}
// 				}
// 			}else{
// 				socket.write("sorry\n");
// 			}
// 			// socket.write("\n"+q[counter]+"\n");
// 			// }else{
// 			// 	socket.write("thank you");
// 			// 	//move on to next Question!
// 			// }
// 		// }else{ 
// 		// 	console.log(text);
// 		// //}

// 	});
// 	};
socket.on("end", function(){
		clientCounter--;
		console.log("A client has disconnected...");
		console.log("ended "+user.name);
		var i = users.indexOf(user);
		users.splice(i,1);
		});
	});
server.listen(port, function(){
	console.log("Listening on Port: "+port);
	});
};

setup();