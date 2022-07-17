//窗口加载事件，指当html的内容加载完后才触发这里面的事件，onload加载
//这样在html中js调用标签就可以放到任意地方，而不是只能放到html后面了
window.addEventListener('load', function () {

    // 1、排他思想（算法） ,
    var btns = document.querySelector('#btns').querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            //点击事件后先把所有的人干掉（for），再把自己复活
            for (var i = 0; i < btns.length; i++) {
                btns[i].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'red';
        }
    }

    var nodes = document.querySelector('.nodes');
    //获取父节点
    console.log(nodes.parentNode);
    //获取所有子节点
    console.log(nodes.children);
    //获取第一个子节点内容
    console.log(nodes.firstElementChild);
    //获取最后一个子节点内容
    console.log(nodes.lastElementChild);
    //返回下一个兄弟元素
    console.log(nodes.nextElementSibling);
    console.log(nodes.previousElementSibling);
    //创建节点
    var a = document.createElement('a');
    //添加节点（在nodes里最后面）
    nodes.appendChild(a);
    //添加节点（在nodes里前面）
    nodes.insertBefore(a, nodes.children[0]);
    //删除节点，删除了第二个孩子【<a>删除我</a>】
    nodes.removeChild(nodes.children[1]);
    //克隆节点,有true则加上内容，没则只有标签没内容
    var lili = nodes.children[3].cloneNode(true);
    nodes.appendChild(lili);

    //点击die按钮，依次删除nodes里的孩子
    var die = document.querySelector('.die');
    die.onclick = function () {
        if (nodes.children.length == '') {
            this.disabled = 'true';
        } else {
            nodes.removeChild(nodes.children[0]);
        }
    }

    //事件高级应用
    var gaoji = document.querySelector('.gaoji');
    gaoji.addEventListener('click', function () {
        alert('高级搞定');
        alert('同一个元素 同一个事件可以添加多个监听器')
    })
    gaoji.addEventListener('click', function () {
        alert('方法监听注册事件就不会像传统方式（onclick）那样覆盖，而是会都依次输出');
    });
    //解绑事件
    var jiebang = document.querySelector(".jiebang");
    //传统方式的
    // jiebang.onclick = function(){
    //     alert('我只运行一次哦');
    //     jiebang.onclick = null;
    // }
    //方法监听注册方式
    jiebang.addEventListener('click', fn);
    function fn(e) {
        alert('高级技巧，我只运行一次哦')
        jiebang.removeEventListener('click', fn);
        console.log(e);
        console.log(e.type);
        console.log(e.target);
    }
    //事件对象e
    // jiebang.addEventListener('click',function(e){
    //     console.log(e);
    // })


    //事件委托
    var entrustul = document.querySelector('.entrust');
    entrustul.addEventListener('click', function (e) {
        alert('冒泡了，自动点击了');
        e.target.style.backgroundColor = "pink";
    });

    //mouse鼠标事件
    document.addEventListener('click', function (e) {
        console.log('位于浏览器坐标，x轴' + e.clientX);
        console.log('位于浏览器坐标，y轴' + e.clientY);
        console.log('位于文档坐标，  y轴' + e.pageX);
        console.log('位于文档坐标，  y轴' + e.pageY);
        console.log('位于屏幕坐标，  y轴' + e.screenX);
        console.log('位于屏幕坐标，  y轴' + e.screenY);
        console.log('-----------------------------------');
    })



    //常见的键盘事件
    //按键松开时触发
    document.onkeyup = function () {
        console.log('我松开了');
    }
    //按键按下时触发
    document.addEventListener('keydown', function (e) {
        console.log('我down按下了' + e.key);

    })
    //按键按下时触发，但不识别功能键，如shift
    document.addEventListener('keypress', function () {
        console.log('我press按下了');
        //e.keyCode淘汰了
    })


    //键盘点击事件，按s得到输入框焦点
    //focus()方法可以获得焦点
    var ipt = document.querySelector('.jiaodian');
    document.addEventListener('keyup', function (e) {
        if (e.key == 's') {
            ipt.focus();
        }
    })

    var seek = document.querySelector('.seek');
    window.addEventListener('resize', function () {
        console.log(window.innerWidth);
        if (window.innerWidth < 900) {
            seek.style.display = 'none';
        } else {
            seek.style.display = 'block';

        }
    })

    //定时器
    //1、setTimeout
    var timeout1 = setTimeout(function () {
        console.log('时间到了哦');
    }, 5000);

    var imggg = document.querySelector('#imggg');
    var timeout2 = setTimeout(time2, 5000);
    function time2() {
        imggg.style.display = 'none';
        console.log('5s结束，广告自动关闭');
    }
    //当点击停止按钮是停止广告定时器的自动关闭
    var tzhi = document.querySelector('#tz1');
    tzhi.addEventListener('click', function () {
        window.clearTimeout(timeout2);
        console.log('广告自动关闭已停止');
    })

    //图片切换
    // var in1 = document.querySelector('.interval1');
    // var flag1 = 0;
    // setInterval(function(){
    //     console.log('正常输出');
    //     if(flag1 == 0){
    //         in1.src="../img/背景换肤2.jpg";
    //         flag1 = 1;
    //     }else{
    //         in1.src="../img/背景换肤1.jpg";
    //         flag1 = 0;
    //     }
    // },4000);

    //倒计时
    var hour = document.querySelector('.hour');
    var minuter = document.querySelector('.minuter');
    var second = document.querySelector('.second');
    var inputTime = +new Date('2022-7-17 00:00:00');  //返回用户输入时间的总毫秒数,这个时间到当前时间形成倒计时
    countDown();  //先调用一次这个函数形成最初的页面，然后再用下面的每隔1s刷新一次
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date();     //获取总毫秒数
        var times = (inputTime - nowTime) / 1000;   //1秒=1000毫秒 ， times是剩余时间总毫秒数
        var h = parseInt(times / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        minuter.innerHTML = m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;
    }

    //定时器开关
    var kai = document.querySelector('.kai');
    var guan = document.querySelector('.guan');
    var timer = null;
    kai.addEventListener('click', function () {
        timer = setInterval(function () {
            console.log('你好久');
        }, 1000);
    })
    guan.addEventListener('click', function () {
        clearInterval(timer);  //停止timer
    })









})