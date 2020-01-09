$(function () {
    let pics;
    let currentP=0;
    $.ajax({
        type:"GET",
        url:"pic.xml",
        success:function (data) {
            pics=$(data).find("pic");
            console.log(pics);
        }
    });
    console.log(pics);
    function Puzzle() {
        this.can=$("#can");
        this.imgArr=$("img");
    }
    Puzzle.prototype={
        init:function (url) {
            $(".next").css("display","none");
            let self=this;        //this是Puzzle
            // $self=$(this);
            let $image=$(new Image());
            $image.on("load",function () {
                //使用js对象可以直接调用proto方法
                self.randomImg();
                self.renderImg($image);
                self.dragEvent(url);
                //$self.attr("test1")();       //使用jq对象只能间接调用proto方法，这种方式无法正确识别this对象
                //$self[0].randomImg();        //这种方式可以正确识别this对象
            });
            $image.attr("src",url)
                .css("width",1920).css("height",1080)
                .css("z-index",-100).css("position","fixed")
                .css("top",0).css("left",0);
            $("body").css("background","url("+url+")");
        },
        randomImg:function () {
            let $imgArr=this.imgArr;
            $imgArr.sort(function () {
                return Math.random()-Math.random();
            });
        },
        renderImg:function ($image) {
            let canvas=$("canvas");
            let $self=$(this);
            let index=0;
            for (let i=0;i<3;i++){
                for (let j=0;j<3;j++){
                    /*
                    * @x,y图片中心坐标，不是图片左上角坐标
                    * @source图片地址，但是不可以传入jq对象
                    * @sx，sy图片裁剪的起始位置
                    * @sWidth，sHeight图片裁剪的内容宽高
                    * @scale图片的缩放比例，小于0.5时缩小
                    * */
                    let clip=canvas.drawImage({
                        source:$image[0],
                        x:150,y:150,
                        sx:300*j,sy:300*i,
                        sWidth:300,sHeight:300,
                        scale:1
                    }).getCanvasImage("jpeg");
                    $self.attr("imgArr").eq(index).attr("id",index);
                    $self.attr("imgArr").eq(index).attr("src",clip);
                    index++;
                }
            }
        },
        dragEvent:function () {
            let contain=$("#game");
            let next=$(".next");
            self=this;
            contain.on("dragstart",function (e) {
                let target=e.target;
                if (target.tagName.toLowerCase() == "img") {
                    e.originalEvent.dataTransfer.setData("id",target.id);
                }
            });
            contain.on("drop",function (ev) {
                let target=ev.target;
                if (target.tagName.toLowerCase() == "img") {
                    let $ori=$("#"+ev.originalEvent.dataTransfer.getData("id"));
                    let cache={
                        "src":$ori.attr("src"),
                        "id":$ori.attr("id")
                    };
                    let $end=$(target);
                    $ori.attr("id",$end.attr("id"));
                    $ori.attr("src",$end.attr("src"));

                    $end.attr("id",cache.id);
                    $end.attr("src",cache.src);

                    if($ori.attr("id")!=$end.attr("id")){
                        self.changeStep();
                    }
                    self.isSuccess();
                }
            });
            contain.on("dragover",function (ev) {
                ev.preventDefault();
            });


            next.on("click",function () {
                self.showTip();
                let pName=pics.eq(++currentP).text();
                let url="pic/"+pName+".jpg";
                console.log(url);
                self.init(url);
                $("#step").text(0);
            })
        },
        showTip:function () {
            let str=$(".next").text();
            str="胜利！"+str;
            $(".next").text(str);
        },
        changeStep:function () {
            let step=$("#step").text();
            $("#step").text(++step);
        },
        isSuccess:function () {
            let index=-1;
            let $imgs=$("#game img");
            //console.log($imgs);
            let flag=true;
            $imgs.each(function () {
                index++;
                let id=$(this).attr("id");
                if(index!=id){
                    flag=false;
                    return;
                }
            });
            if (flag){
                //alert("您通关了！！");
                setTimeout(function () {
                    $(".next").css("display","block");
                },200);
            }

        }
    };
    /**********测试时间**********/
    let pt=new Puzzle();
    pt.init("pic/Valkyrie.jpg");

});