
class Action{
    constructor(parameter) {
        let that = this;
        this._logo_group = $('.logo-group');
        this._logo = this._logo_group.find('img');
        this._color_blod = $('.login-color-blod');
        this._box_group = $('.box-group');
        this._img_group = $('.main-group .pic');


        (async function() {
            await that._sleep(0.5);
            that._init_fun();
        })();
        $(window).resize( function  () {           //当浏览器大小变化时
            that._init_fun();
        });
    }
    _sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time*1000));
    }
    // (async function() {
    //     await sleep(1);
    // })();
    _init_fun (){
        let that = this;
        (async function() {
            let pc_whidth = document.body.offsetWidth;
            let max_width = 850;
            console.log(pc_whidth);
            that._logo_group.css('width', (pc_whidth>max_width ? '30%' :'100%'));
            await that._sleep(1);
            that._logo.css('opacity', 1);
            await that._sleep(1);
            that._color_blod.addClass('color-blod');
            await that._sleep(0.2);
            that._box_group.css('opacity', 1);
            await that._sleep(1);
            that._img_group.css('width', (pc_whidth>max_width ? '40vw' : '100vw'));
        })();
        
    }
}