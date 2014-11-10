describe("As a User I want to manage my todos so that I can achieve more in my life", function () {

    beforeEach(function (done) {
   //When opening the app
        open(done);
    });
    
    afterEach(function () {
        //Given no app
        close();
    });
    
    it("should open the app", function (){
    //Then the title todos is shown.
        expect($('h1').text()).toEqual("todos");
    //And the list is empty
        expect($("ul").html()).toEqual("");
    });

    it("should add an item", function () {
    //When adding item "Rule the web"
        $('input').val("Rule the web");
        $('form').submit();
        
    //Then "Rule the web" is in the list
        expect($("ul li").text()).toEqual("Rule the web");
    });
    

});

