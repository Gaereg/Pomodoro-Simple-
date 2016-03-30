var i = 0;
test();
function test(){
   if(i==5){
      clearTimeout(myVar);
   }
   i++;
   console.log(i);
   var myVar = setTimeout(test, 500);
}
