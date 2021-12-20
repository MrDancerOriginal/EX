$(document).ready(function(){
  let counter = 0;
  const errorTimer = 4000;
  const timer = 3000;
  const maxTextLength = 25;

  let answers = new Array;

  var magic8Ball = {};
  magic8Ball.listofanswers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful.","Увійти"];
  
  var answersTumbler = false; // false - Сховані / true - Відображені
  magic8Ball.getAnswer = function(question)
  {
    var answer;
    if(question != "тестер" && question.length <= maxTextLength && onCyrillic(question)){ //Перевірка валідації
      if(question == "Увійти в АйТі?")
        answer = this.listofanswers[this.listofanswers.length-1];
      else{
        var randomNumber = Math.random();
        var randomAnswer = Math.floor(randomNumber * this.listofanswers.length-1);
        answer = this.listofanswers[randomAnswer];
      }
      
      $("#answer").text( answer );
      document.getElementById("answer").style.color = answer.length % 2 == 0? "blue" : "red"; //Перевірка на парність довжини тексту
      $("#answer").fadeIn(timer); 
      $("#8ball").attr("src", "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/answerside.png");
    }else{
      $("#error").animate({opacity: 1},100);
      $('#error').animate({opacity: 0}, errorTimer);
      answer = "error";
    }
      answers.push(answer);
      $("#8ball").effect( "shake" );
      
      console.log(question);
      console.log(answer);
  };
  $("#answer").hide();

  var onClick = function() //перевіряє на кількість відповідей,
  {
    if(counter <= 5){
      var question = document.getElementById("questionHolder").value;//дістає інформацію з інпуту та викликає функцію для отримання відповіді
      magic8Ball.getAnswer(question);
      counter++;
    }
    CloseWindow();
  };
  function onCyrillic(text) { //Перевірка кирилиці
    return /[а-я]/i.test(text);
  }
  function ShowAndHideAllAnswers(){ //Відкриває та закриває список відповідей
    if(answersTumbler){
      $(".answers-container").html("");
      $("#answersButton").html("Show my answers");
    }else if(!answersTumbler && answers.length > 0){
      answers.sort(function(a, b){return b.length - a.length}); //сортує за спаданням
      for(var i = 0;i < answers.length;i++) //Виводить відповіді
          $(".answers-container").append($("<div class = 'note'><h3>Answer #"+(i+1)+"</h3><hr>"+answers[i]+"</div>"));
      $("#answersButton").html("Hide my answers");
    }
    answersTumbler = !answersTumbler;
    console.log(answersTumbler);
  }
  function OpenWindow(event){ //відкриває вікно запитання
    $("#answer").hide();
    $("#8ball").attr("src", "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/magic8ballQuestion.png");
    event.preventDefault();
    $('#myOverlay').fadeIn(297,	function(){ //анімація появи
      $('#myModal') 
      .css('display', 'block')
      .animate({opacity: 1}, 198);
    });
  }
  function CloseWindow(){ //закриває вікно запитання
      $('#myModal').animate({opacity: 0}, 198, function(){ //анімація зникання
          $(this).css('display', 'none');
          $('#myOverlay').fadeOut(297);
      });
  }  
  $('#questionButton').click(OpenWindow);
  $('#answersButton').click(ShowAndHideAllAnswers);
  $('#myModal_close, #myOverlay').click(CloseWindow);
  $("#inputBtn").click( onClick );
});