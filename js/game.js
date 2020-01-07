$(function () {
    var posTop=0;
    var posLeft=0;
    var tdLen=0;
    console.log(posLeft+"px, "+posTop+"px, ",+tdLen+"px  ");
    function check() {

    }
    /*xml初始化*/
    function init(){
        var obj={
            type:"GET",
            url:"name.xml",
            success:function (data) {
                let countR=$(data).find("rowl");
                for(i=0;i<countR.length;i++){
                    console.log("success");
                    let countL=countR.eq(i).find("line");
                    $(".game").css("width",120*countL.length);
                    let newTr=$("<div></div>").addClass("gt").css("width",125*countR.length).addClass("clearfix");
                    for (j=0;j<countL.length;j++){
                        let countE=countL.eq(j);
                        let newTd=$("<div></div>").addClass("ge").attr("row",i).attr("line",j).css("float","left");
                        let newDiv=$("<div></div>").addClass("gc");
                        let newImg=$("<img>").addClass("gi").on("click",exchange);
                        window.vacant=newImg;
                        let str="images/"+countE.text()+".jpg";
                            newImg.attr("src",str);
                        newDiv.append(newImg);
                        newTd.append(newDiv);
                        newTr.append(newTd);
                    }
                    $(".game").first().append(newTr);
                }
                console.log(vacant.parents(".ge"));
            }
        }
        $.ajax(obj);
    }
    /*初始化下标*/
    function init1() {
        let alltr=$(".gt");
        console.log(alltr.length);
        for(i=0;i<alltr.length;i++){
            let evtd=alltr.eq(i).find(".ge");
            let j=0;
            for(j=0;j<evtd.length;j++){
                evtd.eq(j).attr("row",i);
                evtd.eq(j).attr("line",j);
                console.log(i+"+"+j);
            }
        }
    }
    init();
    /*动画*/
    function topchange($ori,$tar){
        let $paro=$ori.parent();
        let $part=$tar.parent();
        let oriTop=$ori.position().top+$ori.parents(".ge").attr("row")*tdLen;
        let tarTop=$tar.position().top+$tar.parents(".ge").attr("row")*tdLen;
        let oriLeft=$ori.position().left+$ori.parents(".ge").attr("line")*tdLen;
        let tarleft=$tar.position().left+$tar.parents(".ge").attr("line")*tdLen;
        $paro.css('visibility','hidden');
        $part.css('visibility','hidden');
        console.log("oriTop:"+oriTop);
        console.log("tarTop:"+tarTop);
        $ori.clone().insertAfter($ori).css({position:'absolute',visibility:'visible',left:oriLeft,top:oriTop}).animate({top:tarTop},500,function (){
            $(this).remove();
            $part.append($ori).css('visibility','visible');
        });
        $tar.clone().insertAfter($tar).css({position:'absolute',visibility:'visible',left:tarleft,top:tarTop}).animate({top:oriTop},500,function (){
            $(this).remove();
            $paro.append($tar).css('visibility','visible');
        });
    }
    function leftchange($ori,$tar){
        let $paro=$ori.parent();
        let $part=$tar.parent();
        let oriTop=$ori.position().top+$ori.parents(".ge").attr("row")*tdLen;
        let tarTop=$tar.position().top+$tar.parents(".ge").attr("row")*tdLen;
        let oriLeft=$ori.position().left+$ori.parents(".ge").attr("line")*tdLen;
        let tarleft=$tar.position().left+$tar.parents(".ge").attr("line")*tdLen;
        $paro.css('visibility','hidden');
        $part.css('visibility','hidden');
        $ori.clone().insertAfter($ori).css({position:'absolute',visibility:'visible',left:oriLeft,top:oriTop}).animate({left:tarleft},500,function (){
            $(this).remove();
            $part.append($ori).css('visibility','visible');
        });
        $tar.clone().insertAfter($tar).css({position:'absolute',visibility:'visible',left:tarleft,top:tarTop}).animate({left:oriLeft},500,function (){
            $(this).remove();
            $paro.append($tar).css('visibility','visible');
        });
    }
    /*处理交换图片*/
    function exchange(e) {
        let target=$(e.target);
        console.log(target);
        let part=target.parents(".ge");
        let parv=vacant.parents(".ge");
        if(target.is(vacant)){
            console.log("origin element!");
            return -1;
        }else if(part.attr("line")==parv.attr("line")&&Math.abs(part.attr("row")-parv.attr("row"))==1){
            console.log(parv);
            topchange(vacant,target);
            //part.append(vacant).css('visibility','visible');
            //parv.append(target).css('visibility','visible');
        }else if(part.attr("row")==parv.attr("row")&&Math.abs(part.attr("line")-parv.attr("line"))==1){
            leftchange(vacant,target);
        } else {
            console.log(part.attr("line")+" "+part.attr("row"));
            console.log(parv.attr("line")+" "+parv.attr("row"));
            console.log("incorrect exchange,not neighbour!");
        }
    }
    $("img").on("click",exchange);
})
