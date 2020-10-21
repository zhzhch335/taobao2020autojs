// /**
//  * 作者:Zhichen
//  * 时间：2020-10-21 23:13:53
//  */
"ui";
ui.layout(
    <vertical gravity="center">
        <text>开启悬浮窗有利于及时发现问题，毕竟老夫也不是什么高手</text>
        <text gravity="center" textSize="8">(而且你也知道结妹结束)</text>
        <text>需要开启APP的悬浮窗权限</text>
        <button id="openConsole" text="开启控制台" />

        <vertical h="20"></vertical>

        <text>根据你的网速和手机响应速度调整延迟，网速慢手机卡时选择快速可能会导致刷任务失败</text>
        <radiogroup>
            <radio id="fast" checked="true" text="快速（延迟1000ms）" />
            <radio id="normal" text="中速（延迟1500ms）" />
            <radio id="slow" text="慢速（延迟2000ms）" />
        </radiogroup>
        <button id="startTask" text="开始刷任务" />

        <vertical h="20"></vertical>

        <button id="startPlay" text="开始摸猫猫" />

        <vertical h="20"></vertical>

        <text>【夹带私货】如果你觉得这个软件用的好的话，不需要捐助，有时间的话帮忙关注一下我单推的vup吧！</text>
        <text gravity="center" textSize="8">(我永远单推小希小桃！)</text>
        <button id="support" text="请支持我" />
    </vertical>
);


ui.openConsole.on("click", () => {
    try {
        console.hide();
        threads.shutDownAll();//关闭之前开启的子线程（用于控制台反复开启）
        threads.start(function () {
            console.show();
        });
    }
    catch (e) {
        toast("控制台开启失败，请开启悬浮窗权限后再试")
    }
});

var speed = 1;

ui.fast.on("check", (checked) => {
    if (checked) {
        speed = 1;
    }
});
ui.normal.on("check", (checked) => {
    if (checked) {
        speed = 1.5;
    }
});
ui.slow.on("check", (checked) => {
    if (checked) {
        speed = 2;
    }
});

ui.startTask.on("click", () => {
    threads.start(function () {
        var i = 0;
        var j = 0;
        var taskList = ['去浏览', '去完成', '去逛逛', '去搜索'];
        var height = device.height;
        var width = device.width;
        setScreenMetrics(width, height);

        auto.waitFor();

        sleep(1000 * speed);

        log("打开淘宝");
        app.startActivity({
            action: "VIEW",
            data: "taobao://pages.tmall.com/wow/z/hdwk/act-20201111/index"
        })

        sleep(1000 * speed);
        log("正在等待进入吸猫活动页面");

        className("android.widget.Button").text("赚喵币").waitFor()
        sleep(1000);
        if (!textContains("累计任务奖励").exists()) {
            className("android.widget.Button").text("赚喵币").findOne().click()
            log("进入活动成功");
        }
        sleep(1500 * speed);
        if (className("android.widget.Button").text("签到").exists()) {
            className("android.widget.Button").text("签到").click()
            sleep(200);
            log("签到成功");
        } else { log("已签到"); }
        sleep(1500 * speed);

        taskList.forEach(task => {
            while (textContains(task).exists()) {
                log("开始做第" + (i + 1) + "次任务！");
                var a = text(task).findOnce(j);
                switch (task) {
                    case '去完成':
                        log("开始去完成任务")
                        click('去完成', 1);
                        sleep(1500 * speed);
                        if (textContains("当前淘宝账号").exists()) {
                            log("暂不支持跳转其它APP！");
                            back();
                            continue;
                        }
                        swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                        sleep(15000 * speed);
                        swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                        textContains("任务完成").findOne(10000 * speed);
                        i++;
                        log("已完成第" + i + "次任务！");
                        back();
                        break;
                    case '去浏览':
                        sleep(500 * speed);
                        a.click();
                        sleep(1500 * speed);
                        if (!textContains("跟主播聊").exists() || !textContains("赚金币").exists()) {
                            swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                            sleep(3500 * speed);
                            swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                            sleep(12000 * speed);
                            swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                        } else {
                            sleep(15000 * speed);
                        }
                        textContains("任务完成").findOne(10000 * speed);
                        i++;
                        log("已完成第" + i + "次任务！")
                        back();
                        break;
                    default:
                        log("感谢ROCEYS大大提供的思路，这部分功能一大半都是从他那搬过来的")
                        break;
                }
                sleep(2000 * speed);
            }
        });

        log("Done!");
        exit();

    });

});

ui.startPlay.on("click", () => {
    threads.start(function () {

        var count = rawInput("输入要摸的次数:",100);

        log("打开淘宝");
        app.startActivity({
            action: "VIEW",
            data: "taobao://pages.tmall.com/wow/z/hdwk/act-20201111/index"
        })
    
        sleep(2000);
        log("开始摸");
        for(var i=0;i<=count;i++){
            log("摸了第"+(i+1)+"次")
            className("android.widget.Button").text("我的猫，点击撸猫").findOne().click()
            sleep(500 + 500*Math.random());
        }
        toast("大哥别摸了，唱会儿歌吧");
        exit();
    });
})

ui.support.on("click", () => {
    try {
        //手机上安装B站APP的跳回流协议
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: " bilibili://space/5563350"
        });
    }
    catch (e) {
        //没有装b站的打开网页
        app.openUrl("https://m.bilibili.com/space/5563350");
    }
})
