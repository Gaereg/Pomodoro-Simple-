$(document).ready(function(){ // Evenement jQuery
   window.play = false;

   $('#play').click(function(){ !play&&$('#task').val()!= ''?timer.play():null; });
   $('#pause').click(function(){ timer.pause(); });
   $('#stop').click(function(){ timer.stop(); });
   console.log($('#task').val()==' ');
   $('form').submit(function(){
      !play&&$('#task').val()!= ''?timer.play():null; // Ternaire, si variable play==false et tache remplis lance la function play
      return false
});
});

var timer = { // Object timer avec ses méthode
   $secondes: 0,
   $minutes: 25,
   $nbTaff: 0,
   $repo: false,

   time: function(){ // Fonction qui gère le timer et l'affichage
      if(this.$secondes == 0 && this.$minutes > 0){ // Quand les seconde sont a zéro, minute -1
         --this.$minutes;
         this.$secondes = 59;
      } else if (this.$secondes > 0 && this.$minutes >= 0) { // Sinon seconde -1
         --this.$secondes;
      } else if (this.$secondes == 0 && this.$minutes == 0 && this.$repo == false) { //Quand le timer travail est fini
         $('#done').prepend("<li class='list-group-item'><s>"+$('#task').val()+"</s></li>");// Passe la tache dans done
         ++this.$nbTaff;
         var heure = parseInt(this.$nbTaff*25/60,10); //Calcule le temps passé a travailler
         var min = this.$nbTaff*25 - heure*60;
         $('#h2-done').text("Done "+heure+"h"+min);
         this.$repo = true;

         if (this.$nbTaff%4 == 0){ // Calcul le temps de pause en fonction du nombre de session de travaille faite, et lance diret la pause
            this.$minutes = 20;
            alert('20 minutes de pause');
         } else {
            this.$minutes = 5;
            this.$seconde = 0;
            alert('5 minutes de pause');
         }

      } else { // si timer pause fini, stop le timer
         alert('Fini la pause');
         this.stop();
         this.$repo = false;
      }

      if (this.$repo){ //Créer une chaine de caractère en fonction de si on est au boulot ou en pause
         var work = 'Pause';
      } else {
         var work = 'Boulot';
      }
      //Ternaire qui permet de rajouté un 0 devant les seconde (11,03, 02 ..) et affiche si on bosse ou si on est en pause
      this.$secondes<10? $('.time, title').text(this.$minutes+':0'+this.$secondes+' '+work) : $('.time, title').text(this.$minutes+':'+this.$secondes+' '+work);
   },

   play: function(){ //Fait boucler le timer
      play = true;
      window.playTime = setInterval(function(){ timer.time() }, 1000)
   },
   pause: function(){ // Stop le timer
      play = false;
      clearInterval(playTime);
   },
   stop: function(){ // Stop le timer et le réinitialise
      this.$minutes = 25;
      this.$secondes = 0;
      play = false;
      clearInterval(playTime);
      $('.time').text(this.$minutes+':00');
   }
};
