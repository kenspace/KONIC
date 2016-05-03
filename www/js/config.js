// 程序基本配置程序
var KONIC = {
    config: {},
    setConfig: function (type) {
        'use strict';
        switch (type) {
            case "local" :
                this.config = {
                    type: "local",
                    URL: "http://localhost",
                    debug: true,
                    alert: false
                };
                return;

            case "pro" :
                this.config = {
                    type: "pro",
                    URL: "http://localhost",
                    debug: false,
                    alert: false
                };
                return;
        }
    },
    debug: function (data, method) {
        'use strict';
        var methodName = method ? method : 'SYSTEM';
        if (this.config.alert === true) {
            alert('System time : ' + this.getTime() + '\n' + 'Method name : ' + methodName + '\n' + JSON.stringify(data));
        } else if (this.config.debug === true) {
            console.log('System time : ' + this.getTime() + '\n' + 'Method name : ' + methodName);
            console.log(data);
            console.log('#######################################');
            console.log('');
        }
    },
    getTime: function (type, afterDay) {
        'use strict';
        var curTime = new Date();
        var afterTime = new Date();
        if (afterDay) {
            afterTime.setDate(afterTime.getDate() + afterDay);
        }
        var sysTime = afterDay ? afterTime : curTime;
        var year = sysTime.getFullYear(),
            month = (sysTime.getMonth() + 1) > 9 ? sysTime.getMonth() + 1 : '0' + (sysTime.getMonth() + 1),
            day = sysTime.getDate() > 9 ? sysTime.getDate() : '0' + sysTime.getDate(),
            hour = (sysTime.getHours() > 9) ? sysTime.getHours() : '0' + sysTime.getHours(),
            minutes = (sysTime.getMinutes() > 9) ? sysTime.getMinutes() : '0' + sysTime.getMinutes(),
            seconds = (sysTime.getSeconds() > 9) ? sysTime.getSeconds() : '0' + sysTime.getSeconds(),
            milliseconds = sysTime.getMilliseconds();
        switch (type) {
            default:
                return (hour + ':' + minutes + ':' + seconds + ':' + milliseconds);
        }
    }
};

KONIC.setConfig('local'); // 'local' , 'pro'